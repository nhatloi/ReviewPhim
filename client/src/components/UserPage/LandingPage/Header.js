import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios';
import logo from '../../../assets/img/Logo.png';
import {BackTop , Menu, Dropdown,Input} from 'antd';
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
const { Search } = Input;





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

    const onSearch = async(e) =>{
      if(e){
        window.location.href=`/search?${e}`;
      }
        
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
            <Navbar light expand="md" sticky="top">
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
              <NavLink href="/movie">Movies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/news">News</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/review">Reviews</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            </UncontrolledDropdown>
          </Nav>
          <div style={{marginRight:'30px',width:'30%'}}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          </div>
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
