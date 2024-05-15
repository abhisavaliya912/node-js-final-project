const { mongoose } = require('mongoose')
let category = require('../models/categorymodel')
var fs = require('fs');
let path=require('path')
const catform = async (req, res) => {

    let allcat = await category.find({})
    res.render("category", {
        catInfo: allcat,
        editUser: {},
        userName: 'abc'
    })
}

const savecatData = async (req, res) => {
    const { caid, name, email, age } = req.body;
    const filename = req.file ? req.file.filename : '';

    if (caid != '') {
        
        // update
        if (filename != '') {
            let edituser = await category.findById(caid)
        
            let ans = await category.findByIdAndUpdate(caid, { name })
        } else {
            let ans = await category.findByIdAndUpdate(caid, { name})
            console.log(ans)
        }

    } else {
        image = filename;
        const car = new category({ name });
        await car.save();
    }


    res.redirect("/category");
}
const deletecatData = async (req, res) => {
    try {
        delete_id = req.params.id
        let deleteuser = await category.findByIdAndDelete(delete_id)

        res.redirect("/category");

    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).send("Internal Server Error");
    }

};
const editcatData = async (req, res) => {
    let edit_id = req.params.id

    let allcat = await category.find({})

    let editUser = await category.findById(edit_id)

    res.render("category", {
        catInfo: allcat,
        editUser: editUser,
        userName: 'abc'
    })
}

module.exports = { catform, savecatData, deletecatData, editcatData };