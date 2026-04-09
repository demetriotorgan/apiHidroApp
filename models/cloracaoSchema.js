const mongoose = require('mongoose');

const FORMA_UTILIZADA = ['cloro', 'estoque'];

const cloracaoSchema = new mongoose.Schema({
    reservatorio:{
        type:Number,
        required:true
    },
    concentracao:{
        type:Number,
        required:true
    },
    produto:{
        type:Number,
        required:true
    },
    estoque:{
        type:Number,
        required:true
    },
    data:{
        type:Date,
        required:true
    },
    utilizado:{
        type:String,
        enum:FORMA_UTILIZADA,
        required:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Cloro', cloracaoSchema);