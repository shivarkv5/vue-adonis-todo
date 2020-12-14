'use strict'

const Project = use('App/Models/Project')
const AuthorizationService = use('App/Services/AuthorizationService')

class ProjectController {
    // To return all the projects of the user. 
    async index({ auth }) {
        const user = await auth.getUser()
        const projects = await user.projects().fetch();
        return projects;
    }

    async create({ request, auth }) {
        const user = await auth.getUser();
        console.log(`user id: ${user.id}`)
        const { title } = request.all(); // Takin our title value
        console.log(title);
        const project = new Project(); // Creating an instance of the lucid model
        project.fill({ title }); //The fill method will override all existing key/pair values of the model instance.
        await user.projects().save(project) //Associated project with the user
        return project; // Return project back  
    }

    async destroy({ request, auth, params }) {
        const user = await auth.getUser();
        // console.log(user);
        const { id } = params

        const project = await Project.find(id ) // Finding an project from Project Model

        // console.log(project);

        AuthorizationService.verifyPermission(project,user)
        await project.delete();
        return project;
    }
}


module.exports = ProjectController
