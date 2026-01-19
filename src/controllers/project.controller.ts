import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId; 
    
    const projects = await prisma.project.findMany({
      where: { ownerId: userId }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
};

export const createProject = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    console.log("Datos recibidos para crear proyecto:", req.body);
    const userId = req.user.userId;
    console.log("Creando proyecto para el usuario ID:", req.user);
    const newProject = await prisma.project.create({
      data: {
        name,
        ownerId: userId
      }
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};