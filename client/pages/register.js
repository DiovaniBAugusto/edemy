import React, { useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'
import { SyncOutlined } from "@ant-design/icons"
import Link from 'next/link'

const Register = ()=>{

    

    const [name, setName] = useState("diovani");
    const [email, setEmail] = useState("diovani@gmail.com");
    const [password, setPassword] = useState("senha123");
    const [loading, setLoading] = useState(false);

   

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post(`/api/register`,{ 
            name,
            email,
            password
            });
            toast.success("Usuario cadastrado com sucesso");
            
        } catch(err){
            toast.error(err.response.data);
            setLoading(false);  
        }
        setLoading(false);  
    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary ">Cadastro</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input className='form-control p-4 mb-4' type="text" value={name} onChange={e => {setName(e.target.value)}} placeholder = "Informe o nome" required/>
                    <input className='form-control p-4 mb-4' type="email" value={email} onChange={e => {setEmail(e.target.value)}} placeholder = "Informe o email" required/>
                    <input className='form-control p-4 mb-4' type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder = "Informe a senha" required/>
                    <br/>
                    <button className="btn form-control btn-primary" type="submit"
                    disabled = { !name || !email || !password || loading}>
                        {loading ? <SyncOutlined spin /> : "Cadastrar"}
                    </button>   
                </form>
                <p className="text-center p-3">
                    Já possui uma conta? 
                    <Link href="/login">
                        <a> Login</a>
                    </Link>
                </p>
            </div>

        </>
    )
}

export default Register;