import React,{useState,useEffect} from 'react'
import { Card,Row,Divider,Button ,Form,Input,message} from 'antd';
import { CameraOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux'
import banner from '../../../assets/img/banner.jpg'
import {Islengt} from '../../utils/functionCheck'
import axios from 'axios'
import {useDispatch} from 'react-redux'


const initialState ={
    avatar:'',
    name : '',
    email: '',
    password : '',
    cf_password:'',
    _id:''
}

function Profile() {
    //const 
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(true);
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.token)
    const [inforUser, setinforUser] = useState(initialState)
    const [session, setsession] = useState([])
  
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    

    useEffect(() => {
        setinforUser({...user})
        fetchSession()
     },[user])

     

    const changeAvatar = async (e) =>{
        e.preventDefault();
        try {
            const file = e.target.files[0]
           if(!file) return console.error('No files were uploaded.');
           if(file.size > 1024 * 1024)  return console.error('Image too large.');
           if(file.type !== 'image/jpeg' && file.type !== 'image/png') return console.error('file format incorrect.');

           let formData = new FormData()
           formData.append('file',file)
           const res = await axios.post('/api/upload_avatar',formData,{
               headers:{'content-type':'multipart/form-data',Authorization:token}
           })
           setVisible(false)
           setinforUser({...user,avatar:res.data.url})

        } catch (error) {
            console.error(error);
        }
    }

    const SaveInfor = async e =>{
        //change password
        if(e.password){
            if(!Islengt(e.password))
                return message.error('password must be at least 6 character.')
            try {
                await axios.post('/user/reset',{password:e.password},{
                    headers:{Authorization:token}
                })
                message.success('change password successfully')


            } catch (error) {
                return console.error(error);
            }
        }
        //change information
        try {
            await axios.patch('/user/update',{avatar:inforUser.avatar,name:e.name},{headers:{Authorization:token}})
            message.success('change information successfully')
        } catch (error) {
            return console.error(error);
        } 
        setVisible(true)
        const getToken = async()=>{
            const res = await axios.post('/user/refresh_token',null)
            dispatch({type:'GET_TOKEN',payload: res.data.access_token})
          }
        getToken()
    }

    const fetchSession = async () =>{
        try {
            if(user._id){
                const res = await axios.get('/user/getsession/',{headers:{_id:user._id}})
                return setsession(res.data);
            }
        } catch (err) {
           return err.response.data.msg
        }
    }


    return (
        <div className='profile'>
            <Row>
                    <div className='card'>
                        <Card 
                        loading={
                            inforUser.name?false:true
                        }>
                            <div >
                                    <Divider orientation="left">
                                        <div className='avatar'>
                                            <img alt='' src = {inforUser.avatar?inforUser.avatar:false}/>
                                            <span>
                                                <CameraOutlined/>
                                                <p>Change</p>
                                                <input type='file' name='file' id='file_up' onChange={changeAvatar}/>
                                            </span>
                                            
                                        </div>
                                    </Divider>
                                
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{
                                        name: inforUser.name,
                                        email: inforUser.email,
                                        
                                      }}
                                    onFinish={SaveInfor}
                                    >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input disabled={true}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            { required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input disabled={visible}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                    >
                                        <Input.Password disabled={visible}/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Cf_Password"
                                        name="cf_password"
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                                },
                                            })
                                        ]}
                                    >
                                        <Input.Password disabled={visible}/>
                                    </Form.Item>
                                        <Form.Item >
                                                <Button type="primary" onClick={()=>setVisible(false)}>
                                                Change information
                                                </Button>
                                        </Form.Item>
                                        <Form.Item >
                                                <Button type="primary" htmlType="submit" disabled={visible}>
                                                Save
                                                </Button>
                                        </Form.Item>
                                    </Form>
                            </div> 
                        </Card>
                    </div>
                    <div className='recent-activity'>
                        <Card style={{ width: 800,height:'100%'}}>
                            <h2>Recent activity</h2>
                            <Divider/>
                            {session && session.map((val, index) => (
                                <div>
                                    {val.movie?
                                    <a href={`movie/${val.movie._id}`}>
                                        {'Movie: ' + val.movie.title}
                                    </a>
                                    :null}

                                    {val.review?
                                     <a href={`review/${val.review._id}`}>
                                        {'Review: ' + val.review.description}
                                    </a>
                                    :null}

                                    {val.news?  
                                     <a href={val.news.link} target='_blank'>
                                        {'News: ' + val.news.description}
                                    </a>
                                    :null}
                                    <p/>
                                    {new Date(val.updatedAt).toLocaleString()}
                                    <hr/>
                                </div>
                            ))}
                        </Card>
                    </div>
             </Row>  
        </div>
    )
}

export default Profile
