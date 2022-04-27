import {useReducer, createContext, useEffect} from 'react'

//criando o estado inicial
const initialState = {
    user: null
}

//criando um contexto
const Context = createContext();

//criando o reducer
const rootReducer = (state, action) =>{
    
    switch(action.type){
        case "LOGIN":
            return {...state , user: action.payload };
        case "LOGOUT":
            return {...state, user: null};
        default:
            return state
    }
}
//criando o provider que recebe a aplicação por parâmetro
const Provider = ({children}) =>{
    const [state, dispatch] = useReducer(rootReducer, initialState);

    useEffect(()=>{
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem('user')) 
        })
    },[])
    
    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>        
}

export {Context, Provider};