const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const userCtrl = require('../controllers/userCtrl');

const dir = './uploads';
if(!fs.existsSync(dir)) fs.mkdirSync(dir);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  var upload = multer({ storage });

router.post('/user', userCtrl.registerUser);
router.get('/user',userCtrl.getUserDetails);
router.post('/check-user', userCtrl.checkUser);
router.post('/project', userCtrl.createProject);
router.get('/projects', userCtrl.showProjects);

router.post('/status', userCtrl.setStatus);
router.get('/:projectName', userCtrl.getStatus);
router.put('/:projectName', upload.fields([
  {name: "audio", maxCount: 1},
  {name: "image", maxCount: 1},
  {name: "video", maxCount: 1}
]), userCtrl.addFiles);

module.exports = router;



// router.post('status', upload.fields([
  // router.put('/:projectName', upload.single('image'), userCtrl.addImage);
  // router.get('/:name',userCtrl.getUserDetails);
//     {name: "audio", maxCount: 1},
//     {name: "image", maxCount: 1},
//     {name: "video", maxCount: 1},
//     {name: 'projectName', maxCount: 1}
// ]), userCtrl.addFiles);







// const dir = './uploads';
// if(!fs.existsSync(dir)) fs.mkdirSync(dir);

// const storage = multer.diskStorage({
//     destination : './uploads',
//     filename : function (req, file, cb) {
//         const uniqueToken = Date.now() + '-' + Math.round(Math.random()* 1E9);
//         const fileName = uniqueToken + '-' + file.originalname;
//         req.image = fileName;
//         // req.fileName = fileName;
//         cb(null,fileName);
//     }
// });

// const upload = multer({storage:storage});
