const { mongoose } = require('mongoose')
let Product = require('../models/productmodel')
let category = require('../models/categorymodel')
var fs = require('fs');
let path = require('path');

const proform = async (req, res) => {
    let allcat = await category.find({})
    console.log(allcat, 'allcatdata');
    let allpro = await Product.find({}).populate('catid')
    console.log(allpro)
    res.render("product", {
        proInfo: allpro,
        editproduct: {},
        userName: 'abc',
        allcat: allcat
    })
}

const saveproData = async (req, res) => {
    const { prid, catid, productname, price, desc } = req.body
    const fileName = req.file ? req.file.filename : '';
    if (prid != '') {
        if (fileName != '') {
            let editproduct = await Product.findById(prid).populate('catid')
            let oldimage = editproduct.image
            if (oldimage != '') {
                fs.unlinkSync(path.join(__dirname, '../public/uploads/' + oldimage))
            }
            image = fileName;
            let ans = await Product.findByIdAndUpdate(prid, {productname, price, desc, image})
        } else {
            let ans = await Product.findByIdAndUpdate(prid, {productname})
            console.log(ans)
        }
    } else {
        image = fileName;
        const pr = new Product({ prid, catid, productname, price, desc, image });

        await pr.save();
        console.log(pr);
    }
    res.redirect('/product')

}

const deleteproData = async (req, res) => {
    try {
        delete_id = req.params.id
        let deleteuser = await Product.findByIdAndDelete(delete_id)

        res.redirect("/product");

    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send("Internal Server Error");
    }

};
const editproData = async (req, res) => {
    let edit_id = req.params.id

    // console.log(edit_id);

    let allpro = await Product.find({}).populate('catid')

    let editproduct = await Product.findById(edit_id).populate('catid')

    let allcat = await category.find({})

    // console.log(editproduct);
    res.render("product", {
        proInfo: allpro,
        editproduct: editproduct,
        userName: 'abc',
        
        allcat: allcat
    })
}

module.exports = { proform, saveproData, deleteproData, editproData };