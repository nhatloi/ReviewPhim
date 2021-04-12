import React,{useState,useEffect} from 'react'
import { Checkbox,Select ,message,Modal} from 'antd';
import axios from 'axios'
import {useSelector} from 'react-redux'

const {Option} = Select;

function AddNewReview(props) {
    const {readmore, custom,visible,poster,handle} = props
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.auth.user)
    const [movies, setmovies] = useState([])
    const [keywords, setkeywords] = useState([])
    const [tag, settag] = useState('none')


    useEffect(() => {
        Movies_eff()
    },)

    const  handleCancel = () => {
        handle(!visible);
    };
    
    const Movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie')
            setmovies(res.data.movie)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }
          
    const  handleOk = async() => {
        try {
            if(tag === 'none'){
                const res = await axios.post('/review/addreview',{keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
                message.success(res.data.msg)
            }
            else {
                const res = await axios.post('/review/addreview',{movie:tag,keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
                message.success(res.data.msg)
            }
            handle(!visible);
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };
         
      const  ChangeKeywords = async(e) => {
        try {
            setkeywords(e)
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };

      const  handleChange = (e) => {
        try {
            settag(e)
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };

    return (
        <div>
            <Modal
                width='80%'
                visible={visible}
                title={readmore.title}
                onOk={handleOk}
                onCancel={handleCancel}
                >

              
             <div className='Page-review'>
                            <div style={{fontFamily:'sans-serif',color:'gray',fontStyle:'oblique'}}>
                                {readmore.description}<p/>
                                {readmore.post_date}<p/>
                                </div>
                            {readmore.content && readmore.content.map((line, index) => (
                                <div className='review-content'>
                                    {line.slice(0,5)==='(img)'?
                                    <img alt='line' src={line.slice(6,line.length)}/>
                                    :line
                                    }
                                </div>
                            ))}
                            <div>
                                <h2>Tag</h2>
                                <Select defaultValue='none' style={{ width: 120 }} onChange={handleChange}>
                                <Option value="none">None</Option>
                                {movies && movies.map((movie, index) => (
                                    <Option value={movie._id}>{movie.title}</Option>
                            ))}
                                </Select>
                            </div>
                            {readmore.keywords?
                                    <Checkbox.Group options={readmore.keywords} onChange={ChangeKeywords}/>:null}
                        </div>
                </Modal>
        </div>
    )
}

export default AddNewReview
