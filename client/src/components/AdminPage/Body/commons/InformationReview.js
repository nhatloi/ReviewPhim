import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import moment   from 'moment';
import {Skeleton,Form,Input,List,DatePicker,InputNumber,Button,message} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios'
import './commons.css'

function InformationReview(props) {
    const {data, custom} = props
    const token = useSelector(state => state.token)
    const [result, setresult] = useState()

    useEffect(() => {
        if(!custom)
            fetcData(data)
    }, [data])

    const fetcData = async(data) => {
        try {
            const res = await axios.get('/review/getdetail',{headers:{url:data.source}})
            setresult(res.data.review)
            console.log(result)
        } catch (err) {
           return err.response.data.msg
        }
       
    }
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      };

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };


    
    const uploadButton = (
        <div>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const Loading = (
        <div>
            <Skeleton.Image active={true} /> 
            <Skeleton active={true}/> 
        </div>
    );
    
    const onFinish = async(e) =>{
        try{
            
            console.log(e)

        }catch (error) {
            message.error('add failed!');
        }
    }

    const onCustom = async(e) =>{
        try{

        }catch (error) {
            message.error('add failed!');
        }
    }
      
    // const upImage = async(e) =>{
    //     e.preventDefault();
    //     try {
    //         const file = e.target.files[0]
    //        if(!file) return console.error('No files were uploaded.');
    //        if(file.type !== 'image/jpeg' && file.type !== 'image/png') return console.error('file format incorrect.');

    //        let formData = new FormData()
    //        formData.append('file',file)
    //        const res = await axios.post('/api/uploadimg',formData,{
    //            headers:{'content-type':'multipart/form-data',Authorization:token}
    //        })

    //        if(e.target.id=="poster"){
    //             setposterImg(res.data.url)
    //        }
    //        if(e.target.id=="banner"){
    //             setbannerImg(res.data.url)
    //       }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    if(custom)
    {
        return (
            <div>
                    
                </div>
        )
    }
    else{
        return (
            <div> 
            {result?
                <div>
                     <Form
                        name="validate_other"
                        {...formItemLayout}
                        onFinish={onFinish}
                        initialValues={{
                            ['description']: result.title,
                          
                        }}
                        >
                        <Form.Item label="description" name='description'>
                       { result.title}
                            <Input/>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Form.Item>
                        </Form>

                </div>
                :<div>{Loading}</div>
            }
                          
            </div>
        )
    }

    }

// }

export default InformationReview
