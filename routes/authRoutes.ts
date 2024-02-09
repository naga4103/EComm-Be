const express = require('express');

// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const productController=require('./../controllers/productController');
const  jwtCheckController=require('./../middleware/authentication')

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/insertProducts',productController.insertProductsData);
router.post('/topFiveProducts',productController.getTopFiveProducts);
router.post('/getAllProducts',productController.getAllProducts);
router.post('/sortHighToLow',productController.sortHighToLow);
router.post('/sortLowToHigh',productController.sortLowToHigh);
router.get("/enableCart", jwtCheckController.jwtCheck,productController.addToCartEnable);


// router.post('/login', authController.login);
// router.post('/success', authController.success);

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser)
//   .get(userController.getUser);
module.exports = router;
