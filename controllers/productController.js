const Product = require('../models/Product');
const Category = require('../models/Category');


exports.postCreateProduct = async (req,res)=>{
    // console.log(db.Category.find());
    try{

        const name = req.body.name;
        const price = req.body.price;
        const detail = req.body.detail;
        // const images=req.body.images;
        // const posterImage = images[0];
        const quantity = req.body.quantity;
        const description= req.body.description;
        const tag= req.body.tag;
        const categoryId = req.body.categoryId;
        const detailProductId= req.body.detailProductId;

        
        const product = new Product({
            name,
            price,
            detail,
            // images,
            // posterImage,
            quantity,
            description,
            tag,
            categoryId,
            detailProductId,
        });

        await product.save();
        res.status(201).json({
            message: 'Product created successfully',
            product: product,
        });
    }
    catch(err){
        throw err;
    }
};

exports.updateProduct = async(req,res)=>{
    try{
        const _id = req.params._id;
        const name = req.body.name;
        const price = req.body.price;
        const detail = req.body.detail;
        // const images=req.body.images;
        // const posterImage = images[0];
        const quantity = req.body.quantity;
        const description= req.body.description;
        const tag= req.body.tag;
        const categoryId = req.body.categoryId;
        const detailProductId= req.body.detailProductId;
        const product = await Product.findById(_id);
        product.name =name;
        product.price=price;
        product.detail=detail;
        // product.images=images;
        // product.posterImage=posterImage;
        product.quantity=quantity;
        product.description=description;
        product.tag=tag;
        product.categoryId=categoryId;
        product.detailProductId=detailProductId;
        const updateProduct = await product.save();
        res.status(200).json({
            message: 'Product updated',
            product: updateProduct,
        });
    }
    catch(err){
        throw err;
    }
};

exports.deleteProduct =async(req,res)=>{
    try{
        const _id = req.params._id;
        // console.log(_id);
        const product= await Product.findByIdAndUpdate({_id},{isDeleted: true},);

        res.status(200).json({
            message: 'Delete product successfully',
            product: product,
        });    }
    catch(err){
        throw err;
    }
}

exports.getProductById = async(req,res)=>{
    try{
        
        const _id = req.params._id;
        const product = await Product.findById(_id);
       if(product){
        res.status(200).json(product);
       }
       else{
        throw new NotFoundError('Product not found');
       }
    }
    catch(err){
        throw err;
    }
};

exports.getAllProduct = async(req,res)=>{
    Product.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        throw err;
    })
};