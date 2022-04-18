const projectModel = require('../Model/projectModel');

const addProject = (data) => {
const project = new projectModel(data);
return project.save();
}

const showProjects = () => {
const projection = { __v:0, __id:0};
        const filter = {}; //status of project
        return projectModel.find(filter, projection);
}
module.exports = { addProject, showProjects };