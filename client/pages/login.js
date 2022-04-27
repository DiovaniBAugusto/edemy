import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-toastify'
import {Context} from '../context'
import { useRouter } from 'next/router'


const Login = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {state: {user}, dispatch} = useContext(Context);
    

    const router = useRouter();

    useEffect(()=>{
        if(user !== null)
            router.push("/");
    },[user])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/login', {
                email,
                password
            });
            
            //salvando as informações do usuário no contexto da aplicação
            dispatch({
                type: "LOGIN",
                payload: data
            })       
            //salvando as mesmas informação no localStorage
            window.localStorage.setItem("user",JSON.stringify(data));
            
            //redirecionando o usuário a rota principal
            router.push("/");

        }catch(err){
            toast.error(err.response.data);
        }
    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary ">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input className='form-control p-4 mb-4' type="email" value={email} onChange={e => {setEmail(e.target.value)}} placeholder = "Informe o email" required/>
                    <input className='form-control p-4 mb-4' type="password" value={password} onChange={e => {setPassword(e.target.value)}} placeholder = "Informe a senha" required/>
                    <br/>
                    <button className="btn form-control btn-primary" type="submit">
                        login
                    </button>  
                </form>
                <p className="text-center p-3">
                    Não possui uma conta? 
                    <Link href="/register">
                        <a> Cadastre-se</a>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Login;