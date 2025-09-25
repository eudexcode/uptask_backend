import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {

  //POST /api/:projectId/tasks
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.status(200).json("Tarea creada correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error al crear tarea" });
    }
  };

  //GET /api/:projectId/tasks
  static getProjectTask = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({project: req.project.id}).populate('project')
        res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json({ message: "Error al crear tarea" });
    }
  };

  //GET /api/:projectId/tasks/:taskId
  static getTaskById = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.task)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
  }

  //UPDATE /api/:projectId/tasks/:taskId
  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.title = req.body.title;
      req.task.description = req.body.description;

      await req.task.save();
      res.status(200).json('Tarea actualizada correctamente')
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
  }

  //DELETE /api/:projectId/tasks/:taskId
  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString())
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.status(200).json('Tarea eliminada correctamente')
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
  }


  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      
      req.task.status = status;
      await req.task.save();
      res.status(200).json('Estado de la tarea actualizado correctamente')

    }catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado de la tarea" });
    }
  }

  static updatePriority = async (req: Request, res: Response) => {
    try {
      const { priority } = req.body;
      
      req.task.priority = priority;
      await req.task.save();
      res.status(200).json('Prioridad de la tarea actualizado correctamente')

    }catch (error) {
        res.status(500).json({ message: "Error al actualizar la prioridad de la tarea" });
    }
  }
}
