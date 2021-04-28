import React ,{useState}from 'react'
import { Input, Modal, Rate } from 'antd';
import {useSelector} from 'react-redux'
import axios from 'axios'

function AddRate(props) {
    const {visible,handle,Movie_id,user_id} = props
    const token = useSelector(state => state.token)
    const [rate, setrate] = useState(0)
    const [content, setcontent] = useState("")

    const  handleOk = async() => {
        try {
            const res = await axios.post('/movie/postrate',{rate:rate,Movie_id:Movie_id,content:content,WriterId:user_id},{headers:{Authorization:token}})
            handle();
        } catch (error) {
            console.log(error.response.data.msg)
        }
        
      };




    return (
        <div>
            <Modal title="Basic Modal"
             visible={visible} 
            onOk={handleOk}
            onCancel={handle}

            >
            <Rate onChange={(e)=>{setrate(e)}}/>
            <Input onChange={(e)=>{setcontent(e.target.value)}}/>
            </Modal>
        </div>
    )
}

export default AddRate
