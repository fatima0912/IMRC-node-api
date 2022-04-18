const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Name is required'],
        minLength: [5, 'Min five characters'],
        maxLength: [30, 'Max 50 character']
    },
    contact:{    // contacts has to be associated with user module
        type: String,
        required:[ true, 'Phone number is mandatory'],
        validate: {
            // 123-456-7890
             validator: v => /[0-9]{10}/.test(v),
            message: () => 'Invalid Phone number'
        }
    },
    alternateContact:{    // contacts has to be associated with user module
        type: String,
        required:[ true, 'Phone number is mandatory'],
        validate: {
            // 123-456-7890
             validator: v => /[0-9]{10}/.test(v),
            message: () => 'Invalid Phone number'
        }
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
            message: () => 'Invalid Email'
        }

    },
    firebaseUID:{
        type:String,
        // required:true
    },
    active: {
        type: Boolean,
        default: false,
    },
    createdAt:Date
});

const userModel = mongoose.model('user', schema);
schema.index({ name: 1 });
schema.index({ contact: 1 });
module.exports = userModel;