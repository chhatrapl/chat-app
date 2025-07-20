import express , {Router} from "express";
import { getAllUsers, login, logout, signup } from "../controllers/user.controller.js";
import {upload} from "../middleware/multer.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js";



const router = express.Router();

router.post("/signup", upload.fields([
    {name:"profilePic", maxCount:1}
]),signup);
router.post("/login",login);
router.post("/logout", isAuthenticated,logout);
router.get("/allUser", isAuthenticated, getAllUsers);


export default router;