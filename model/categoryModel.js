const mongoose = require('mongoose')
const slugify = require('slugify')

const CategorySchema = new mongoose.Schema({
    name:{
    type:String,
    required:true,
    unique:true,
},
slug:{
    type:String,
    lowercase:true,
}
})

module.exports = mongoose.model('Category', CategorySchema);