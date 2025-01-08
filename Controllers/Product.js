import { productModel } from "../Models/Product.js";

export const getAllProducts= async(req, res)=>{
    try{
        let data =await productModel.find();
        res.json(date)
    }
    catch (err){
        console.log(err)
        res.status(400).json({title:"cannot get all",message:err.message})
    }
}
export const getById= async(req, res)=>{
    let {productId} =req.params
    try{
        let data = await productModel.findById(productId)
        if(!data)
            return res.status(400).json({title:"cannot find by id",
        message:"product with such id not found"})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({title:"cannot get byId",message:err.message})
    }
} 
export const update = async (req,res)=>{
    let {productId} = req.params
    let body =  req.body;
    try{
        let data=await productModel.findByIdAndUpdate(productId,body,{new:true})
        if(!data)
            return res.status(404).json({title:"cannot update by id",message:"book with such id not found"})
        res.json(date)
    }
    catch(err){
        console.log(err)
        res.status(400).json({title:"cannot updata",message:err.message})
    }
}
export const deleteById = async(req,res)=>{
    let {productId} =req.params
    try{
        let data = await productModel.findByIdAndDelete(productId)
        if(!data)
            return res.status(400).json({title:"cannot delete by id",message:"product with such id not found"})
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(400).json({title:"cannot delete",message:err.message})
    }
}
export const add = async (req,res) =>{
    let {productId} =req;
    if(!body.productName||!body.description)
        return res.json({title:"cannot add",message:"missing parameters name or descripition"})
    try{
        let newProduct=new productModel(body);
        let data=await newProduct.save()
        res.json(data)
    }
    catch(err){
        console.log(err)
        res.status(404).json({title:"cannot add",message:err.message
        })
    }

}


