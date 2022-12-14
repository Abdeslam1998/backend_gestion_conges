import Conge from '../models/Conge.js'
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from '../errors/index.js'


const createConge = async (req,res) => {

    const {type_conge,date_debut,date_fin} = req.body

    if(!type_conge || !date_debut || !date_fin){
        throw new BadRequestError('Please provide all values')
    }

    req.body.createdBy = req.user.userId
    const conge = await Conge.create(req.body)
    
    res.status(StatusCodes.CREATED).json({ conge })
}

const getAllConges = async (req, res) => {
    const conges = await Conge.find( {} ) //createdBy: req.user.factureId
  
    res
      .status(StatusCodes.OK)
      .json({ conges })
}


export { createConge,getAllConges }