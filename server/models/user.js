import mongoose from 'mongoose'
const {Schema} = mongoose;
//nome, email, password, picture, 

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: "/avatar.png"
    },
    role: {
        type: [String],
        default: [],
        enum: ["subscriber", "instructor", "admin"]
    },
    stripeAccountId: "",
    stripeSeller: {},
    stripeSession: {}
}, {timestamps: true});

export default mongoose.model("User", userSchema);