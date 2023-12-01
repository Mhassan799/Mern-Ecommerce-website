const Category = require('../model/categoryModel')
const jwt = require('../utils/jwt')
const slugify = require('slugify')


const categoryController ={
    async create (req,res){

        try {

            const {name} = req.body;

            if(!name){
                return res.status(401).json({message:"name feild is required"})
            }
            const existingCategory = await Category.findOne({name})

            if(existingCategory){
                return res.status(200).send({
                    success:true,
                    message:"category already existed"
                })
            }
            const category = await new Category({
                name,
                slug:slugify(name)
            }).save()

            res.status(201).send({
                success:true,
                message:"new category created succesfully",
                category
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"error in creating category"

            })
        }
    },

   async updateCategory (req,res){
        try{
            const {name} = req.body;
            const {id} = req.params;
            const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
            res.status(201).send({
                success:true,
                message:"updated category succesfully",
                category
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"error in creating category"

            })
        }
    },

    async deleteCategory (req,res){
        try{
            const {name} = req.body;
            const {id} = req.params;
            const category = await Category.findByIdAndDelete(id);
            res.status(201).send({
                success:true,
                message:"deleted category succesfully",
                category
            })

        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"error in deletiing category"

            })
        }
    },

    async getAllCategory (req,res){
        try{
            const category = await Category.find({})
            res.status(200).send({
                success:true,
                message:"all categories",
                category
            })

        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"error in getting category"

            })
        }
    },
    async getSingleCategory (req,res){
        try{
            const category = await Category.findOne({slug:req.params.slug})
            res.status(201).send({
                success:true,
                message:"get single category succesfully",
                category
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"error in getting category"

            })
        }
    }
}


module.exports = categoryController;