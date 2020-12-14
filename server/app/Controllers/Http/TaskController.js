'use strict'
const Project = use('App/Models/Project');

const Task = use('App/Models/Task');

const AuthorizationService = use('App/Services/AuthorizationService');

class TaskController {

    async index({ auth, params }) {
        const user = await auth.getUser();
        const { id } = params;
        const project = await Project.find(id);
        const tasks = await project.tasks().fetch();
        return tasks;
    }

    async create({ request, auth, params }) {
        const user = await auth.getUser();
        const { description } = request.all();
        const { id } = params;
        const project = await Project.find(id);
        AuthorizationService.verifyPermission(project, user)
        const task = new Task();
        task.fill({
            description
        })
        await project.tasks().save(task) //Here task is asscoiated with project
        return task;
    }

    async destroy({ request, auth, params }) {
        const user = await auth.getUser();
        const { id } = params
        const task = await Task.find(id);
        console.log(task)
        const project = await task.project().fetch();
        console.log(project)
        AuthorizationService.verifyPermission(project, user)
        await task.delete();
        return task;
    }

    async update({ request, auth, params }) {
        const user = await auth.getUser();
        const { id } = params
        // const { description } = request.all();
        // const { completed } = request.all();

        const task = await Task.find(id);

        const project = await task.project().fetch();
        AuthorizationService.verifyPermission(project, user)
        task.merge(request.only([ 'description', 'completed' ]));

        await project.tasks().save(task);
        return task;
    }



}

module.exports = TaskController
