import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; 


const app = express();

// __dirname setup (because we are using ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files (like index.html, login.html)
app.use(express.static(path.join(__dirname, "../public")));

// Cookie parser
app.use(cookieParser());

// API routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter)


// Default route (serve index.html on root)
app.get("/", (req, res) => {
  const token = req.cookies?.accessToken;
  if(token){
     res.sendFile(path.join(__dirname, "../public/main.html"));
  }else{
     res.sendFile(path.join(__dirname, "../public/login.html"));
  }
 
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/chatapp/:username", (req, res) => {
  const {username} = req.params;
    const token = req.cookies?.accessToken;
    if(token){
        res.sendFile(path.join(__dirname, "../public/chatapp.html"));
    } else{
        res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  
});

export default app;













// import express from "express";
// import cookieParser from "cookie-parser";
// const app = express();
// import userRouter from "./routes/user.route.js";

// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended:true, limit:"16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser());


// app.use("/api/v1/users",userRouter);


// export default app