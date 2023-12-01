
const productController = require('../controller/productControler')
const express = require('express')
const router = express.Router()
const formidable = require('express-formidable')

router.post('/create-product',formidable(),productController.create)
router.put('/update-product/:pid',formidable(),productController.updateProduct)

router.get('/get-products',productController.getProduct)
router.get('/get-product/:slug',productController.getSingleProduct)
router.get('/product-photo/:pid',productController.getPhoto)

router.delete('/delete-product/:pid', productController.deleteProduct)
router.post('/filter-product', productController.filterProduct)
router.get('/count-product',productController.productCount)
router.get('/product-list/:page',productController.productList)
router.get('/search/:keyword',productController.searchProduct)
router.get('/related-product/:pid/:cid',productController.relatedProduct)
router.get('/product-category/:slug',productController.prodcutCategory)




module.exports = router;