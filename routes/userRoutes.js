const express = require('express')
const authController = require('../controller/authController')
const {verifyToken, isAdmin} = require('../utils/jwt')
// const {}
const router = express.Router()

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.get('/admin', verifyToken,isAdmin, authController.testController )
router.get('/user-auth', verifyToken, (req,res) =>{
    res.status(200).send({ok:true});
})
router.get('/admin-auth', verifyToken, isAdmin, (req,res) =>{
    res.status(200).send({ok: true});
})
router.put('/update-profile',verifyToken,authController.UpdateProfile)


module.exports= router;