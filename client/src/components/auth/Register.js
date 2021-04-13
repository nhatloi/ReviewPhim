import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {dispatchLogin} from '../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import {
    Form,
    Input,
    Checkbox,
    Button,
    message
  } from 'antd';


function Register2() {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) =>{
        try {
           
            const res = await axios.post('/user/register', {name:e.name,email:e.email,password:e.password,cf_password:e.confirm})
            const success ={
                title:'Sign Up Success!',
                subTitle:'Check email for activation!'
            }
            history.push(`/success/${success.title}/${success.subTitle}`)
            message.success(res.data.msg)

        } catch (err) {
            message.error(err.response.data.msg)
        }
    }
    const responseGoogle = async (response) => {
        try {
            const res = await axios.post('/user/google_login',{tokenId:response.tokenId})
            localStorage.setItem('firstLogin',true)
            dispatch(dispatchLogin())
            history.push('/')
            message.success(res.data.msg)
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
    }

    const responseFacebook = async(response) => {
        try {
            const {accessToken,userID} = response
            const res = await axios.post('/user/facebook_login',{accessToken,userID})
            localStorage.setItem('firstLogin',true)
            dispatch(dispatchLogin())
            history.push('/')
            message.success(res.data.msg)
        } catch (error) {
            message.error(error.response.data.msg)
        }

    }


    return (
        <div>
            <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                <div> 
                    <FacebookLogin
                        size = 'small'
                        appId="745646699415583"
                        fields="name,email,picture"
                        callback={responseFacebook}
                    />
                </div>
                  <GoogleLogin
                            clientId="925372749044-6foob3s5elcv3invl18q8lo19d7h8cuj.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        > 
                </GoogleLogin>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <Form
                
                    name="register"
                    onFinish={handleSubmit}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <Input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                        ]}
                    >
                        <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <Input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                    </Form.Item>

                   

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please your password!',
                            },
                            () => ({
                                validator(rule, value) {
                                if (value.length < 6) {
                                    
                                    return Promise.reject('password must be at least 6 character.');
                                }
                                return Promise.resolve();
                                },
                            }),
                            ]}
                    >
                        <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <Input.Password
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                    </Form.Item>
                   

                        <Form.Item
                        name="confirm"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                            ]}
                    >
                        <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <Input.Password
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                    </Form.Item>


                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                        ]}
                        
                    >
                        <Checkbox>
                        I have read the <a href="/agreement">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item >
                    <div className="text-center mt-6">
                        <Button style={{height:60}} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="primary" htmlType="submit">
                        Register
                        </Button>
                        </div>
                    </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Register2
