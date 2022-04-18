// const projectModel = require('../Model/projectModel');
// const userModel = require('../Model/userModel');
const userRepository = require('../repository/userRepository');
const projectRepository = require('../repository/projectRepository');
const statusRepository = require('../repository/statusRepository');

const alreadyExists = (e) => e.message && e.message.indexOf('duplicate key') > -1

const hasErrors = (e) => e._message === 'user validation failed'

const handleErrors = (e, res) => {
    //logger.error({ message: 'Failed to create user', error: e });
    if (alreadyExists(e))
        res.status(409).send('User already exists');
    else if (hasErrors(e))
        res.status(400).json(e.errors);
    else
        res.status(500).send(e);
}


const registerUser = async (req, res) => {
    try{
    //const createdAt = Date.now;
    const data = req.body;
    await userRepository.add(data);
    res.status(201);
    res.json();
    }catch(e){
        console.log(e);
        res.status(500);
        res.send('Internal server error');
    }

};

const checkUser = async (req, res) => {
    const payload = req.body;
    const dbUser = await userRepository.getUser(payload.firebaseUID);
    if(!dbUser){
        res.status(401).send("User Not Found");
        return;
    } else {
        res.status(200).send("User Found")
    }
};

const createProject = async (req,res) => {
    try{ 
        const data = req.body;
        data.createdAt = Date.now();
        await projectRepository.addProject(data);
        res.status(201);
        res.json();

    }catch(e){
        handleErrors(e, res);
    }
};

const setStatus = async(req, res) =>{
   try{
        const data = req.body;
        data.createdAt = Date.now();
        await statusRepository.setStatus(data);
        res.status(201);
        res.json();
    }catch(e){
       handleErrors(e, res);
    }
};

const getStatus = async (req, res) =>{
 const model = req.params.model;
 try{
     const status = await statusRepository.getStatus();
     res.status(201);
     res.json(status);
    }catch(e){
     handleErrors(e, res);
}
};
const getUserDetails = async(req,res)=>{
    const model = req.params.body;
    try{
        const user = await userRepository.getUserDetails();
        res.status(201);
        res.json(user);
    }catch(e){
        handleErrors(e,res);
    }
};

const showProjects = async (req, res) =>{
  const model = req.params.model;
  try{
    const project = await projectRepository.showProjects();
    res.status(201);
    res.json(project);
}catch(e){
    handleErrors(e, res);
  }      
};

const addImage = async(req, res) =>{
    try { 
        const projectName = req.params.projectName;
        req.body.image = req.image;
        await statusRepository.addImage(projectName, req.body);
        res.status(204);
        res.send();
    } catch (e) {
        res.status(500).send('Internal Server Error here');
    }
};

const addFiles = async(req, res) =>{
    try { 
        const projectName = req.params.projectName;
        req.body.image = req.image;
        req.body.audio = req.audio;
        req.body.video = req.video;
        // const [image,audio, video] = files;
        // req.body.files = req.files;
         await statusRepository.addFiles(projectName, req.body);

        res.status(204);
        res.json();
    } catch (e) {
        res.status(500).send('Internal Server Error here');
        console.log(res)
    }
};
module.exports = { addFiles, registerUser, createProject, checkUser, handleErrors, showProjects, getStatus, setStatus, addImage, getUserDetails };