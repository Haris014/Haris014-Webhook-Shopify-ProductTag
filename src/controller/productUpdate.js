require('dotenv').config();
const asyncHandler = require('../middlewares/asyncHandler');
const Shopify = require('shopify-api-node');
const {
  calculatePercentageDifference,
  determineSaleTagValue,
  determineLowestDiscountValue
} = require('../utils/productUtils')
// const ErrorHandler = require('../utils/errorHandler');


const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
});
// callLimits = {
//   remaining: 30,
//   current: 10,
//   max: 40
// } 
// shopify.on('callLimits', (limits) => console.log(limits)); 

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = req.parsedWebhookData;
  const productTags = product.tags.toLowerCase();
  const variants = product.variants;

  let lowestDiscount;
  let lowestDiscountValue = [];
  let noDiscount = true;
  let productTagsArray = product.tags.split(',').map(tag => tag.trim());

  console.log("old tags", productTagsArray)

  // Assuming variants is an array of variant objects with price and compare_at_price properties
  for (const variant of variants) {
    const compare_at_price = variant.compare_at_price;
    if (compare_at_price !== null) {
      noDiscount = false;
      const price = variant.price;
      const percentageDifference = await calculatePercentageDifference(compare_at_price, price);
      const saleTag = await determineSaleTagValue(percentageDifference);
      lowestDiscount = await determineLowestDiscountValue(lowestDiscountValue, saleTag);
      console.log({ id: variant.id, price, compare_at_price, percentageDifference, saleTag, lowestDiscount })
    }
  };

  if ((noDiscount) && (productTags.includes('on-sale') || productTags.includes('onsale-'))) {
    // remove all on-sale tags from product if any with Admin Api
    console.log("no discount")
    productTagsArray = removeDiscountTag(productTagsArray);
    updateProductTags(product, `${productTagsArray}`);
  } else if (!noDiscount) {
    console.log("yeahh discountt")
    productTagsArray = removeDiscountTag(productTagsArray);
    updateProductTags(product, `${productTagsArray},ON-SALE,OnSale-${lowestDiscount}`);
  }

  res.sendStatus(200);
});

function updateProductTags(product, tags) {
  shopify.product.update(product.id, {
    tags: tags
  }).then((data) => {
    console.log("update tags", {
      id: product.id,
      tags: data.tags
    });
  }).catch((error) => {
    console.log(error);
  })
}

function removeDiscountTag(productTagsArray) {
  return productTagsArray.filter(tag => {
    return !(tag.toLowerCase().includes('on-sale') || tag.toLowerCase().includes('onsale-'));
  });
}