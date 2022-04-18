const mongoose = require('mongoose');
const config = require('../config');

const get = (req, res)=>{
    res.status(200);
    res.send('IMRC Borewell Project');
};

const health = async (req, res) =>{
     try {
        await mongoose.connect(config.dbConStr);
        res.status(200);
        res.json({db: 'Up'});
        mongoose.connection.close();
    } catch(e) {
        res.status(500);
        res.send('Internal server error');
    }
};



module.exports = { get, health };