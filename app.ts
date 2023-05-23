import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import db from './models'
import { users } from './seeders/users'
import { projects } from './seeders/projects'
import { ProjectAssignments } from './seeders/projectassignments'
import cors from 'cors'

const app = express();
app.use(cors())
const port:number = parseInt(process.env.PORT || '5000')

// const createProjectsAssign = () => {
//     ProjectAssignments.map(proj=>{
//         db.ProjectAssignments.create(proj)
//     })
// }

// createProjectsAssign()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const startSetver = async () => {
    try {
        await db.sequelize.sync();
        app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error)
    }    
}

startSetver();

app.get('/users', async (req:Request, res:Response)=> {
    try {
        const result = await db.User.findAll({
            attributes: ['name', 'email']
        })
        res.status(200)
        .json({
            data: result
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/projects', async (req:Request, res:Response)=> {
    try {
        const projects = await db.Project.findAll({
            attributes: ['title', 'status'],
            where: {
                status: 'completed'
            }
        })
        res.status(200)
        .json({
            data: projects
        })
    } catch (error) {
        
    }
})

app.get('/user_projects', async( req:Request, res:Response)=> {
    try {
        const user_projects = await db.User.findAll({
            include: {
                model : db.Project
            }
        })
        res.status(200)
        .json({
            data: user_projects
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/users', async (req:Request, res:Response)=> {
    try {
        const user = await db.User.create(req.body)
        res.status(201)
        .json(user)
    } catch (error) {
        console.log(error)
    }
})

// app.listen(port, ()=>console.log(`Server is running on port ${port}`))

