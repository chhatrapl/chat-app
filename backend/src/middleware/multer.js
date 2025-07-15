import multer from"multer";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb){
    cb(null,path.join(process.cwd(), "public", "temp"))
    },
    filename: function(req, file, cb){
        const ext = file.originalname.split(".").pop() 
        cb(null, `${file.fieldname}_${Date.now()}.${ext}`); 
    }
})

export const upload = multer({storage:storage})