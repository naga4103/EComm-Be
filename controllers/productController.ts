import {Products}  from "./../models/productsModel"
import { Request,Response } from "express";
import axios from "axios";
exports.insertProductsData = async (req:Request, res:Response, next:any) => {
  try {
    
axios.get('https://dummyjson.com/products')
  .then(response => {
    
console.log("Response...",response)
    
    Products.insertMany(response.data.products)
      .then(() => {
        console.log('Data inserted successfully!');
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching API data:', error);
  });



    res.status(201).json({
      status: "Success",
      
      data: "Products Data Inserted Successfully..."
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTopFiveProducts=async (res:Response)=>{

try{

      const data = await Products.find().sort({_id:1}).limit(5);

 res.status(200).json({
      status: "Success",
      
      data,
    });



}catch(err:any){

 res.status(400).json({
      status: "fail",
      message: err.message,
    });

}



}

exports.getAllProducts=async (req:Request,res:Response,next:any)=>{
try{
const allProducts:any = await Products.find({});
res.status(200).json({
      status: "Success",
      data: allProducts,
      success:1
    });
}catch(err:any){
res.status(400).json({
      status: "fail",
      message: err.message,
    });

}
}

exports.sortHighToLow=async (req:Request,res:Response,next:any)=>{
try{
const productsHighToLow:any = await Products.find().sort({price:-1});


res.status(200).json({
      status: "Success",
      data: productsHighToLow,
      success:1
    });
}catch(err:any){
res.status(400).json({
      status: "fail",
      message: err.message,
    });

}
}

exports.sortLowToHigh=async (req:Request,res:Response,next:any)=>{
try{
const productsLowToHigh:any = await Products.find().sort({price:1});


res.status(200).json({
      status: "Success",
      data: productsLowToHigh,
      success:1
    });
}catch(err:any){
res.status(400).json({
      status: "fail",
      message: err.message,
    });

}
}

exports.addToCartEnable = async (req:Request, res:Response, next:any) => {
  try {
    
    
    return res.send({
      success: 1,
      message: "Enable Add To Cart",
    });
  } catch (err:any) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
