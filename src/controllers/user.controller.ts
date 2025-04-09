import {Request, Response} from 'express';
import prisma from '../prisma/client';

type CreateUserInput={
    name:string;
    email: string;
    password:string;
};

type UpdateUserInput={
    name?:string;
    email?:string;
    
    
}


export const getUser = async(req:Request, res:Response):Promise<void>=>{

    try{
        const user = await prisma.user.findMany();
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: 'Failed to fetch users', error});
    }
   
};

export const createUser = async(req: Request, res: Response):Promise<void>=>{

    try{
        const {name,email,password}: CreateUserInput=req.body;
        const user = await prisma.user.create({data:{name,email, password,}});
        res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({message: "Failed to create users", error});
    }
    
};

export const updateUser = async(req: Request, res:Response):Promise<void>=>{

    try{
    const {id} = req.params as {id:string};
    const {name, email}: UpdateUserInput=req.body;
    const user = await prisma.user.update({
        where: {id:Number(id)},
        data:{name,email},
    });
    res.status(200).json(user);
}catch(error){
    res.status(500).json({message: "Failed to update user", error})

}
};

export const deleteUser = async (req:Request, res:Response): Promise<void>=>{
    try{
        const {id} = req.params as {id:string};
        await prisma.user.delete({where:{id: Number(id)}});
        res.status(200).json({message: 'User deleted'});
    }catch(error){
        res.status(500).json({message:"Filed to delete user", error})
    }
    
};

export const getUserbyId = async(req:Request, res:Response): Promise<void>=>{

    try{
        const{id}= req.params;
        const user = await prisma.user.findUnique({
            where: {id:Number(id)}
        });

        if(!user){
            res.status(404).json({message:"user not found"});
            return;
        }

        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:"Failed to fetch user", error});
    }
    
}