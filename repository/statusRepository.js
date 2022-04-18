//const { status } = require('express/lib/response');
const res = require('express/lib/response');
const statusModel = require('../Model/statusModel');

const setStatus = (data)=>{
    const status = new statusModel(data);
    return status.save();
};

const getStatus = () => {
    const projection = { __v:0, __id:0 };
    const filter = {}; //status of project
    return statusModel.findOne(filter, projection);
};

// const addImage = (projectName,data) => {
//     const { preProgress,
//             inProgress,
//             completed,
//             image } = data;
//     return statusModel.updateOne({projectName}, {
//         $set: {
//             preProgress,
//             inProgress,
//             completed,
//             image,
//            updatedAt: Date.now()
//         }
//     }).save();
// };

const addFiles = (projectName,data) => {
 const { preProgress,
            inProgress,
            completed,
            image,
            audio,
            video } = data;
        return statusModel.updateOne({projectName}, {
        $set: {
            preProgress,
            inProgress,
            completed,
            image,
            audio, 
            video,
           updatedAt: Date.now()
        }
        
    }).save();
    
};


module.exports = { addFiles, setStatus, getStatus };