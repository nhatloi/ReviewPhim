import React,{useState,useEffect} from 'react'
import {Row,message,Button} from 'antd';
import axios from 'axios'

import './Review.css'
import AddNewReview from '../../../AdminPage/Body/commons/AddNewReview'

function Review() {
    const [customvisible, setcustomvisible] = useState(false)
    const [results, setresults] = useState([])

    useEffect(() => {
        Reviews_eff()
    }, [])

    const Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getlistreviews')
            setresults(res.data.review)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }

    return (
        <div style={{margin:'100px'}}>
             <Button onClick={()=>{setcustomvisible(!customvisible)}}>Post Review</Button>
            <div className='review-page bg-white shadow-lg'>
                <AddNewReview custom visible={customvisible} handle ={setcustomvisible}/>
                <Row gutter={[8, 8]}>
                    {results && results.map((review, index) => (                        
                            <div className='card-review bg-white shadow-lg'>
                                <div class="flip-box-inner">
                                    <a href={`/review/${review._id}`}>
                                        <div className='img-box'>
                                            <img alt ='poster' src={review.poster}/>
                                        </div>
                                            <div className='infor'>
                                                {review.description}<p/>
                                            </div>                                            
                                        </a>
                                </div>
                                
                            </div>
                    ))}
                </Row>
            </div>
           
            
        </div>
    )
}

export default Review
