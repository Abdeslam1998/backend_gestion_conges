import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError , UnAuthenticatedError } from '../errors/index.js'


const register = async (req, res) => {
    
    const {nom, prenom, email, password, type} = req.body
    if(!nom || !prenom || !email || !password || !type) {
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }


    const user = await User.create({ nom, prenom, email, password, type })

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user:{
        
        nom:user.nom,
        prenom:user.prenom,
        email:user.email,
        password:user.password,
        type:user.type,
    }, 
        token})
}

const login = async (req, res) => {
    const {email,password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({email}).select('+password')
    if(!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    //console.log(user);

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()

    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token })

    //res.send('login user')
}
/*const updateUser = async (req, res) => {
    const {nom, prenom, email} = req.body
    if(!nom || !prenom || !email) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId});
    user.nom = nom
    user.prenom = prenom
    user.email = email


    await user.save()

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user,token })
}*/

export { register, login/*, updateUser*/}