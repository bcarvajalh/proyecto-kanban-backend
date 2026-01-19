import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ error: "Se requiere el ID del proyecto para filtrar" });
    }
    const tasks = await prisma.task.findMany({
      where: {
        projectId: String(projectId)
      },
      include: {
        tags: true,
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error en getTasks:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    await prisma.task.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id as string; 
  
  const { title, description, tags, status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { 
        id: id
      },
      data: {
        title,
        description,
        status,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag: any) => ({
            where: { name: tag.name },
            create: { name: tag.name, color: tag.color || '#c7c9ca' }
          }))
        }
      }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, projectId, tags } = req.body;
    console.log(tags);
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'TODO',
        projectId,
        tags: {
          connectOrCreate: tags.map((tag: any) => ({
            where: { name: tag.name },
            create: { name: tag.name, color: tag.color || '#c7c9ca' }
          }))
        }
      },
      include: {
        tags: true
      }
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await prisma.task.update({
    where: { id },
    data: { status }
  });
  res.json(task);
};