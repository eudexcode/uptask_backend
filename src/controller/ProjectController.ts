import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    
    //POST /api/projects
    static creteProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).json({ message: 'Proyecto creado correctamente'});
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el proyecto' });
        }

    }

    //GET /api/projects
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los proyectos' });
        }
    }

    //GET /api/projects/:id
    static getProjectById = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const project = await Project.findById(id).populate('tasks');

            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ message: error.message });
            }

            res.status(200).json(project);

        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los proyectos' });
        }
    }

    //UPDATE /api/projects/:id
    static updateProject = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const project = await Project.findById(id);

            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ message: error.message });
            }

            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;
            project.startDate = req.body.startDate;
            project.endDate = req.body.endDate;
            project.status = req.body.status;

            await project.save();
            res.status(200).json('Proyecto actualizado correctamente');

        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el proyecto' });
        }
    }

    //DELETE /api/projects/:id
    static deleteProject = async (req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const project = await Project.findByIdAndDelete(id);

            if (!project) {
                const error = new Error('Proyecto no encontrado');
                return res.status(404).json({ message: error.message });
            }

            res.status(200).json('Proyecto eliminado correctamente');
            await project.deleteOne();

        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el proyecto' });
        }
    }

}