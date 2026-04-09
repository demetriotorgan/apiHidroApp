const mongoose = require('mongoose');

const phSchema = new mongoose.Schema({
    reservatorio:{
        type:Number,
        required:true
    },
    phAtual:{
        type:Number,
        required:true
    },
    phObjetivo:{
        type:Number,
        required:true
    },
    acido:{
        type:Number,
        required:true
    },
    data:{
        type:Date,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('pH', phSchema);