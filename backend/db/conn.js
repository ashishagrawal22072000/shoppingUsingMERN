const mongoose = require('mongoose');
const {dbPass} = require("../config")

mongoose.connect(`mongodb+srv://shoppingweb:${dbPass}@cluster0.rgvjjlz.mongodb.net/?retryWrites=true&w=majority`).then((res) =>{
    console.log("Connection Successfully")
}).catch((err) =>{
    console.log(err)
})