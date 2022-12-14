import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
//to Error (try and catch)
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// db and authenticateUser
import connectDB from './db/connect.js'
// routers
import authRouter from './routes/authRoute.js'
import usersRouter from './routes/usersRoutes.js'
import congesRouter from './routes/congesRoutes.js'



// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'




if (process.env.NOD_ENV !== 'production') {
    app.use(morgan('dev'))
}

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/build')))
/* **** */
app.use(express.json());

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
/* **** */
app.get('/', (req, res) => {
    //throw new Error('error')
    res.json({ msg:'Welcome !'})
})

app.get('/api/v1', (req, res) => {
    //throw new Error('error')
    res.json({ msg:'API'})
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/conges', authenticateUser, congesRouter) 







app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log('Server is listening on port ' + port)
        })
    }catch(error){
        console.log(error)
    }
}

start()