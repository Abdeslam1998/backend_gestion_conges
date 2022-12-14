import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema= new mongoose.Schema({
    nom:{
        type: String, 
        required : [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    prenom:{
        type: String, 
        required : [true, 'Please provide prenom'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email:{
        type: String, 
        required : [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'please provide a valid email'
        },
        unique: true,
    },
    password:{
        type: String, 
        required : [true, 'Please provide password'],
        minlength: 6,
        select: false,
    },
    type:{
        type: String
    },
    solde_conge:{
        type: Number,
        default:30,
    },
    etat_maternite:{
        type: Number,
        default:0,
    },
    etat_paternite:{
        type: Number,
        default:0,
    },
    nbr_jours_rtt:{
        type: Number,
        default:15,
    },
    nbr_heurs_travail:{
        type: Number,
        default:0,
    },
},
{timestamps:true}
)

UserSchema.pre('save', async function(){
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    //console.log(this.password);
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id},process.env.JWT_SECRET,{ 
        expiresIn: process.env.JWT_LIFETIME 
    })
    //console.log(this);
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('User',UserSchema)