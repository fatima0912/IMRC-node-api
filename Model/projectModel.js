const mongoose = require('mongoose');

const schema = mongoose.Schema({
     projectName:{
         type: String,
         required: true
     },
     createdAt: Date,
     updatedAt: {
         type: Date,
         default: Date.now()
     },
        address: [
            {
            longitude : {
               type: Number,
                //required: true
            },
            latitude : {
                type: Number,
                 //required: true
             },
             city:String,
             state: String,
             zipcode:String
            }
        ],
        contact1:
            {
            type: Number,
            contactType: String, // Primary or Secondary
            validate: {
                //  format 123-456-7890
                validator: v => /[0-9]{10}/.test(v),
                message: () => 'Invalid Phone number'
            }
        },
        contact1Name:{type: String},
        contact2:
        {
            type: Number,
            contactType: String, // Primary or Secondary
            validate: {
                // format 123-456-7890
                validator: v => /[0-9]{10}/.test(v),
                message: () => 'Invalid Phone number'
            }
        },
        contact2Name:{type: String},
        active: {
            type: Boolean,
            default: 1 
        }
         
 });

 const projectModel = mongoose.model('project', schema);
 
 module.exports = projectModel;