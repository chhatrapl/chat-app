import express, {Router} from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { deleteMessage, getAllMessages } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/:_id", isAuthenticated, getAllMessages);
router.delete("/:_id",isAuthenticated, deleteMessage);


export default router
