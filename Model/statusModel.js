const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const schema = mongoose.Schema({
    projectName:{    
        type: String,
        required: true
                }, 
    preProgress:{
           type: Boolean,
           required: true,
           default: true
                },
    inProgress:{ 
                type: Boolean 
                },
    completed:{ 
                type: Boolean 
            },
    image:{
            type: String,
           required: true
            },
    audio:{
            type: String,
            required: true
          },
    video:{
            type: String,
            required: true
          },
    createdAt: {
            type:Date
                },
    updatedAt:{
                type: Date,
                default: Date.now()
            }
    
});


const statusModel = mongoose.model('status', schema);

schema.index( {projectName: 1});

module.exports = statusModel;