const Product = require('../model/productModel')
const slugify = require('slugify')
const jwt = require('../utils/jwt')
const fs = require('fs')
const CategoryModel = require('../model/categoryModel')


const productController = {
            async create(req,res){
                try{
                    const {name, description,slug,price,quantity,category,shipping} = req.fields;
                    const {photo} = req.files;
                    switch (true) {
                        case !name:
                            return res.status(500).send({error:"name feild is required"})
                            case !description:
                            return res.status(500).send({error:"description feild is required"})
                            case !category:
                            return res.status(500).send({error:"category feild is required"})
                            case !shipping:
                            return res.status(500).send({error:"shpping feild is required"})
                            case !price:
                            return res.status(500).send({error:"price feild is required"})
                            case !quantity:
                            return res.status(500).send({error:"quantity feild is required"})
                            case photo && photo.size >1000000:
                            return res.status(500).send({error:"photo feild is required and should be less than 1mb"})


                            
                           
                    }

                    const product = new Product({...req.fields, slug:slugify(name)})
                    if(photo){
                        product.photo.data = fs.readFileSync(photo.path)
                        product.photo.contentType = photo.type
                    }
                    await product.save()
                    res.status(200).send({
                        success:true,
                        message:"producr created succesfully",
                        product
                    })
                }
                catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"error in creating product"
        
                    })
                }
            },

            async getProduct (req,res){
                try{
                    const product = await Product.find({})
                    .populate('category')
                    .select("-photo").limit(12).sort({createdAt:-1})
                    res.status(200).send({
                        success:true,
                        message:"All product",
                        product,
                       countTotal:product.length,

                    })
                    


                }
                catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"error in geting product"
        
                    })
                }

            },
            async getSingleProduct (req,res){
                try{
                    
                    const product = await Product.find({slug:req.params.slug}).select("-photo").populate('category')
                    res.status(200).send({
                        success:true,
                        message:"one product",
                        product,
                       countTotal:product.length,

                    })

                }
                catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"error in geting product"
        
                    })
                }

            },
       

     async getPhoto(req, res) {
     try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
},

//             async getPhoto(req, res) {
//     try {
//         const product = await Product.findById(req.params.pid).select("photo");
//         if (product && product.photo && product.photo.data) {

//             // Convert Buffer to Base64
//             let image = Buffer.from(product.photo.data).toString('base64');
            
//             // Sending back the photo as a Data URL
//             return res.status(200).send({ 
//                 photo: `data:${product.photo.contentType};base64,${image}` 
//             });

//         } else {
//             return res.status(404).send({ message: "Product photo not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "error in getting product photo"
//         });
//     }
// },

            async deleteProduct(req,res){
                try{
                    const product = await Product.findByIdAndDelete(req.params.pid).select("photo");
                    return res.status(200).send({
                        success:true,
                        message:"product deletted succesfully"
                    })
                }
                catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"error in deleting product"
        
                    })
                }
            },
             async updateProduct(req,res){
                try{
                    const {name, description,slug,price,quantity,category,shipping} = req.fields;
                    const {photo} = req.files;
                    switch (true) {
                        case !name:
                            return res.status(500).send({error:"name feild is required"})
                            case !description:
                            return res.status(500).send({error:"description feild is required"})
                            case !category:
                            return res.status(500).send({error:"category feild is required"})
                            case !shipping:
                            return res.status(500).send({error:"shpping feild is required"})
                            case !price:
                            return res.status(500).send({error:"price feild is required"})
                            case !quantity:
                            return res.status(500).send({error:"quantity feild is required"})
                            case photo && photo.size >1000000:
                            return res.status(500).send({error:"photo feild is required and should be less than 1mb"})


                            
                           
                    }

                    const product = await Product.findByIdAndUpdate(req.params.pid,{
                        ...req.fields,slug:slugify(name)},{new:true})
                    if(photo){
                        product.photo.data = fs.readFileSync(photo.path)
                        product.photo.contentType = photo.type
                    }
                    await product.save()
                    res.status(200).send({
                        success:true,
                        message:"producr updated succesfully",
                        product
                    })

                    console.log("chal gaya")
                }
                catch (error) {
                    console.log(error)
                    res.status(500).send({
                        success:false,
                        error,
                        message:"error in updating prooduct"
        
                    })
                }
            },

             async filterProduct(req,res){
                try{
                    const {checked,radio} = req.body;
                    let args= {};
                    if(checked.length>0)args.category=checked;
                    if(radio.lenght) args.price = {$gte:radio[0], $lte: radio[1]};
                    const product = await Product.find(args);
                    res.status(200).send({
                        success:true,
                        product,
                    });
                }
                catch(error){
                    console.log(error)
                    return res.status(500).send({
                        success:false,
                        message:"error is fltering product",
                        error
                    })
                }
            },
            async productCount(req,res){
                try{
                    const total = await Product.finnd({}).estimatedDocumentCount();
                    res.status(500).send({
                        success:true,
                        message:"product count suuccesfuled",
                        total,
                    })

                }
                catch(error){
                console.log(error)
                return res.status(500).send({
                    success:false,
                    message:"error in priduct count",
                    error
                })
                }
            },
            async productList(req,res){
                try{
                    const perPage = 6;
                    const page = req.params.page ? req.params.page :1;
                    const product = await Product.find({})
                    .select("-photo")
                    .skip((page-1)*perPage)
                    .limit(perPage)
                    .sort({createdAt:-1});
                    res.status(200).send({
                        success:true,
                        product,
                    })
                }
                 catch(error){
                console.log(error)
                return res.status(500).send({
                    success:false,
                    message:"error in gettign product list",
                    error
                })
                }
            },

            async searchProduct(req,res){
                try{
                    const {keyword} = req.params;
                    const results = await Product.find({
                        $or:[
                            {name:{$regex:keyword,$options:"i"}},
                            {description:{$regex:keyword,$options:"i"}},

                            ]
                    }).select("-photo")
                    res.json(results);
                }
                catch(error){
                console.log(error)
                return res.status(500).send({
                    success:false,
                    message:"error in search product api",
                    error
                })
                }

            },
            async relatedProduct(req,res){
                try{

                    const {pid,cid} = req.params;
                    const product = await Product.find({
                        category:cid,
                        _id:{$ne:pid},
                    })
                    .select("-photo")
                    .limit(3)
                    .populate("category")
                    res.status(200).send({
                        success:true,
                        product,
                    })
                }
                catch(error){
                console.log(error)
                return res.status(500).send({
                    success:false,
                    message:"error in similar product api",
                    error
                })
                }
            },

            async prodcutCategory(req,res){
                try{
                    const category = await CategoryModel.findOne({slug: req.params.slug})
                    const product = await Product.find({ category }).populate("category")
                    res.status(200).send({
                        success:true,
                        message:"succesfully got",
                        product,
                        category
                    })
                }
                catch(error){
                console.log(error)
                return res.status(500).send({
                    success:false,
                    message:"error in getting product category with",
                    error
                })
                }

            },

           

             
}



module.exports =  productController;