import User from "../models/user"
import { hashPassword, comparePassword } from "../utils/auth"

export const register = async (req,res)=>{
    try{
        //criando variaveis
        const { name, email, password} = req.body;

        //validações
        if(!name) return res.status(400).send("O nome do usuario nao pode ser vazio");

        if(!password || password.length < 6) return res.status(400).send("A senha deve conter pelo menos 6 caracteres");
        if(!email) return res.status(400).send("O campo email nao pode ser vazio");
        let emailExist = await User.findOne({email}).exec();
        if(emailExist) return res.status(400).send("Este email já foi cadastrado");

        //hash de senha
        const passwordHashed = await hashPassword(password);

        const user = new User({
            name,
            email,
            password : passwordHashed
        })
        await user.save();
        console.log(user);
        return res.json({ok: true});

    } catch(err){
        console.log(err);
        return res.status(400).send("Erro ao registrar")
    }
}