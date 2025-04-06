import express from "express";
import {getUser, createUser, updateUser, deleteUser, getUserbyId} from "../controllers/user.controller";

const router = express.Router();

router.get('/', getUser);
router.post('/', createUser);
router.put("/:id", updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserbyId )

export default router;