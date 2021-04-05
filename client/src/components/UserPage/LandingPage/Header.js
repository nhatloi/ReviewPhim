import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import logo from '../../../access/images/Logo.png';  
import {BackTop , Menu, Dropdown} from 'antd';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    Button
  } from 'reactstrap';
import { Drawer } from 'antd';
import Login from '../../auth/Login'





function NavHeader() {
    //const
    const auth = useSelector(state => state.auth)
    const {user,isLogged} = auth;
    const [visible, setvisible] = useState(false)

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = async() =>{
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href='/';
        } catch (error) {
            window.location.href='/';
        }
    }
    const handleLogin =() =>{
        setvisible (!visible)
    }

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="/profile">Profile</a>
          </Menu.Item>
          <Menu.Item key="1">
            <label onClick={handleLogout}>Logout</label>
          </Menu.Item>
        </Menu>
    );

    const userInfor = () =>{
        return <Dropdown overlay={menu} trigger={['click']}>
            <div>
                <label className='user'>    
                <img alt='' src={user.avatar}/>
                {user.name}
                </label>
            </div>
    </Dropdown>
    }

    //


    // Render
    return (
        <div className='header'>
            <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
            <img alt='logo' src={logo}/>
            FRadar</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
          <NavItem>
              <NavLink href="/movies">Movies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/news">News</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/movies">Reviews</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            </UncontrolledDropdown>
          </Nav>
          {isLogged?userInfor()
          :
          <div><Button onClick={handleLogin}>login</Button>
                <Drawer
                    title="Login"
                    placement="right"
                    onClose={handleLogin}
                    visible={visible}>
                    <Login/>
                </Drawer>
          </div>
          
          }
        </Collapse>
      </Navbar>
        <BackTop>
          <Button className='backtop'>UP</Button>
        </BackTop>
        </div>
    )
}

export default NavHeader
