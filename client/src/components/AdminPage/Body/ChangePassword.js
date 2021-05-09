import React,{useState} from 'react'
import {Typography,Form, Input, Button,Result,message} from 'antd';
import {useSelector} from 'react-redux'
import axios from 'axios'
const { Text} = Typography;
function ChangePassword() {
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.auth.user)
    const [success, setsuccess] = useState(false)

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };
      
      const tailLayout = {
        wrapperCol: { offset: 2, span: 4 },
      };

      const onFinish = async(values) => {
          try {
            const res = await axios.post('/user/changepwadm', {_id:user._id,password:values.password,old_pw:values.old_password},{headers:{Authorization:token}})
            setsuccess(true)
          } catch (error) {
            message.error(error.response.data.msg)
          }
      };

    return (
        <div>
            {
                !success?<div className='body-container'>
                <h2><Text underline>Change Password</Text></h2>
                <div style={{marginLeft:'30%'}}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="old_password"
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
                      Old Password
                    </label>
                    <Input.Password
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

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Change
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            </div>
            :<div className='body-container'>
                <Result
                    status="success"
                    title="Change password Successfully"
                />
            </div>
            }
           
        </div>
    )
}

export default ChangePassword
