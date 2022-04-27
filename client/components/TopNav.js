import { useState, useEffect, useContext } from 'react';
import {Menu} from 'antd'
import Link from 'next/link'
import { HomeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, MenuOutlined} from '@ant-design/icons'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../context';
import Title from 'antd/lib/skeleton/Title';

const {Item, SubMenu} = Menu;

const TopNav = ()=>{
    const {state, dispatch} = useContext(Context);

    const {user} = state;
    

    const router = useRouter();


    const logout = async ()=>{
        dispatch({
            type: "LOGOUT",
        })
        window.localStorage.removeItem("user")
        const {data} = await axios.get("/api/logout")
        toast(data.message);
        router.push('/login');
    }


    return (
        <Menu key="/" mode="horizontal">
            <Item icon = {<HomeOutlined />}> 
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Item>

            {user === null && (
                <>
                <Item key="/login" icon = {< LoginOutlined/>} className="mg-l-auto" >
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </Item>

                <Item key="/register" icon = {< UserAddOutlined/>}>
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </Item>
                </>
            )}

            {user != null && (
                <SubMenu icon={<MenuOutlined />} title={user && user.user.name} className="mg-l-auto">
                    <Menu.Item onClick={logout} icon = {< LogoutOutlined/>}  >
                        Logout
                    </Menu.Item>
                </SubMenu>
            )}

           
        
        </Menu>
    )   
}



export default TopNav;