import express  from "express"
import  dotenv  from "dotenv"
import connectDB from "./config/db.js"
dotenv.config();
const app=express()
import cookieParser from "cookie-parser"

//cookies and filemiddleware
app.use(cookieParser())


// morgan middlewares
import morgan from "morgan"
app.use(morgan("tiny"))

// regular middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// import all routes here
import userRoutes from "./routes/userRoutes.js"
import collegeRoutes from "./routes/collegeRoutes.js"
// router middleware
app.use("/api/user",userRoutes);
app.use("/api/college",collegeRoutes);

export default app;