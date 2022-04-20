import { useState, useEffect } from 'react';
import {Menu} from 'antd'
import Link from 'next/link'
import { HomeOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons'

const {Item} = Menu;

const TopNav = ()  =>{
    const [current, setCurrent] = useState("");

    return (
        <Menu key="/" mode="horizontal" selectedKeys={current}>
            <Item onClick={e=>{setCurrent(e.key)}} icon = {<HomeOutlined />}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Item>

            <Item key="/login" icon = {< LoginOutlined/>} >
                <Link onClick={e=>{setCurrent(e.key)}} href="/login">
                    <a>Login</a>
                </Link>
            </Item>

            <Item key="/register" icon = {< UserAddOutlined/>}>
                <Link onClick={e=>{setCurrent(e.key)}} href="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )   
}

export default TopNav;