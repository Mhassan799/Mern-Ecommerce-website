const express = require('express')
const { verifyToken, isAdmin } = require('../utils/jwt')
const categoryController =require('../controller/categoryController')
const router = express.Router();

router.post('/create-category',verifyToken,isAdmin, categoryController.create)
router.put('/update-category/:id',verifyToken,isAdmin,categoryController.updateCategory)
router.delete('/delete-category/:id',verifyToken,isAdmin,categoryController.deleteCategory)

router.get('/get-category',categoryController.getAllCategory)
router.get('/get-single-category/:slug',verifyToken,isAdmin,categoryController.getSingleCategory)





module.exports = router;