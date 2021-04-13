import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Menu} from 'antd';
import {PoweroffOutlined,
    VideoCameraOutlined,
    FundOutlined,
    FundViewOutlined,
    UserOutlined,
    ForwardOutlined
} from '@ant-design/icons';

function LeftMenu() {

    const user = useSelector(state => state.auth.user)
    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }

    return (
        <div>
            <Menu style={{height:"100vh"}} theme="dark" mode="inline">
                    <div className='user-Admin'>{user.name}</div>
                    <Menu.Item key="account" icon={<UserOutlined />}><a href='/adm/account'/>Account</Menu.Item>
                    <Menu.Item key="movies" icon={<VideoCameraOutlined />}><a href='/adm/movies'/>Movies</Menu.Item>
                    <Menu.Item key="news" icon={<FundOutlined />}><a href='/adm/news'/>News</Menu.Item>
                    <Menu.Item key="Review" icon={<ForwardOutlined />}><a href='/adm/review'/>Review</Menu.Item>
                    <Menu.Item key="advertisement" icon={<FundViewOutlined />}><a href='/adm/advertisement'/>Advertisement</Menu.Item>
                <Menu.Item onClick={handleLogout} key="logout" icon={<PoweroffOutlined />}>
                    Logout
                    </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
