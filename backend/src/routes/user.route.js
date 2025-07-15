import express , {Router} from "express";
import { signup } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.js"



const router = express.Router();

router.post("/signup", upload.fields([
    {name:"profilePic", maxCount:1}
]),signup)

export default router;