import mongoose from "mongoose";
interface IProducts{
id:number;
title:string;
description:string;
price:number;
discountPercentage:number;
rating:number;
stock:number;
brand:string;
category:string;
thumbnail:string;
images:string[];
}

const productsSchema = new mongoose.Schema<IProducts>({
  id: {
    type: Number,
    required: [true, "Id is must"],
  },
  title: {
    type: String,
    required: [true, "Title is must"],
    
  },
  description:{
    type:String,
    required:[true,"Description is must"]

  },
  price: {
    type:Number,
    required: [true, "Price is must"],
  },
  discountPercentage: {
    type: Number,
    required: [true, "Discount is must"],
    
  },

  rating:{
type:Number,
    required: [true, "Discount is must"],


  },

  stock:{
    type:Number,
        required: [true, "Stock is must!"],


  },

brand:{
    type:String,
    required:[true,"Brand is must!"]
},
category:{

    type:String,
        required:[true,"Brand is must!"]

},
thumbnail:{

    type:String,
        required:[true,"Brand is must!"]


},
images:{
    type:[String],
}

});


export const Products = mongoose.model<IProducts>("products", productsSchema);
