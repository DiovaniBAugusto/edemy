import User from "../models/user"
import { hashPassword, comparePassword } from "../utils/auth"
import webToken from 'jsonwebtoken';



export const register = async (req,res)=>{
    try{

        const { name, email, password} = req.body;

        //validações
        if(!name) 
            return res
            .status(400)
            .send("O nome do usuario nao pode ser vazio");

        if(!password || password.length < 6) 
            return res
            .status(400)
            .send("A senha deve conter pelo menos 6 caracteres");
        if(!email)
            return res
            .status(400)
            .send("O campo email nao pode ser vazio");

        let emailExist = await User.findOne({ email : email }).exec();
        if(emailExist)
            return res
            .status(400)
            .send("Este email já foi cadastrado");

        //hash de senha
        const passwordHashed = await hashPassword(password);

        const user = new User({
            name,
            email,
            password : passwordHashed
        })
        await user.save();
       
        return res.json({ok: true});

    } catch(err){
        console.log(err);
        return res.status(400).send("Erro ao registrar")
    }
}

export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;
        //validações
        if(!email) 
            return res
            .status(400)
            .send("O campo email precisa estar preenchido");

        if(!password || password.length < 6)
            return res
            .status(400)
            .send("A senha precisa possuir ao menos 6 caracteres");

        let user = await User.findOne({ email: email}).exec();
        
        if(!user)
            return res
            .status(400)
            .send("Uma conta com este email não existe");
        
        
        const result = await comparePassword(password, user.password)
        if(!result)
            return res
            .status(400)
            .send("Senha incorreta");


        const token = webToken.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        user.password = undefined;

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.status(200).json({user});
        
    }catch(err){
        res.send(err)
    }
}

export const logout = (req, res)=>{
    try{
        res.clearCookie("token");
        res.json({message: "sessão encerrada com sucesso"})
    }catch(err){
        console.log(err)
    }
}