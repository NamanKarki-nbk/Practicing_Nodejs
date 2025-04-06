import {Request, Response} from 'express';
import prisma from '../prisma/client';

export const getUser = async(req:Request, res:Response):Promise<void>=>{
    const user = await prisma.user.findMany();
    res.json(user);
};

export const createUser = async(req: Request, res: Response):Promise<void>=>{
    const {name,email}=req.body;
    const user = await prisma.user.create({data:{name,email}});
    res.json(user);
};

export const updateUser = async(req: Request, res:Response):Promise<void>=>{
    const {id} = req.params;
    const {name, email}=req.body;
    const user = await prisma.user.update({
        where: {id:Number(id)},
        data:{name,email},
    });
    res.json(user);
};

export const deleteUser = async (req:Request, res:Response): Promise<void>=>{
    const {id} = req.params;
    await prisma.user.delete({where:{id: Number(id)}});
    res.json({message: 'User deleted'});
};

export const getUserbyId = async(req:Request, res:Response): Promise<void>=>{

    const{id}= req.params;
    const user = await prisma.user.findUnique({
        where: {id:Number(id)}
    });
    res.json(user);
}