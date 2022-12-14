import mongoose from 'mongoose'


const CongeSchema = new mongoose.Schema({
    etat_conge:{
        type: Number,
        default:0
    },
    type_conge:{
        type: String
    },
    date_debut:{
        type: Date
    },
    date_fin:{
        type: Date
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required : [true, 'please provide user']
    },
},
{timestamps:true}
)


export default mongoose.model('Conge', CongeSchema)