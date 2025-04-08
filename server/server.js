import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDb } from './config/connectToDb.mjs'
import authRoutes from './routes/auth_routes/index.js'
import mediaRoutes from './routes/instructor-routes/media-routes.js'
import instructorRoutes from './routes/instructor-routes/course-routes.js'
import StudentRoutes from './routes/student-routes/course-routes.js'
import OrderRoutes from './routes/student-routes/order-routes.js'
import StudentCoursesRoutes from './routes/student-routes/student-courses.js'
import StudentCoursesProgressRoutes from './routes/student-routes/course-progress-routes.js'


dotenv.config()

connectToDb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
      origin: ["http://localhost:5173","https://learning-managment-system-frontend.onrender.com"],
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  
app.use(express.json())

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



//middleware

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        success : false,
        message : 'Internal server error'
    })
})

//routes configuration

app.use('/auth', authRoutes)
app.use('/media', mediaRoutes)
app.use('/instructor',instructorRoutes )
app.use('/student',StudentRoutes )
app.use('/student/order',OrderRoutes )
app.use('/student/courses',StudentCoursesRoutes )
app.use('/student/course-progress',StudentCoursesProgressRoutes )





app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})
