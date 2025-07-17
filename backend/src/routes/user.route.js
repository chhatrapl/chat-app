import express , {Router} from "express";
import { login, signup } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.js"



const router = express.Router();

router.post("/signup", upload.fields([
    {name:"profilePic", maxCount:1}
]),signup);
router.post("/login", login);

export default router;