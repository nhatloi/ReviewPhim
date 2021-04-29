import React, {useState,useEffect}from 'react'
import axios from 'axios'
import {Row} from 'antd'
import {useSelector} from 'react-redux'
import './Review.css'


function ReviewDetail(props) {

    const id = props.match.params.id
    const [result, setresult] = useState([])
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.token)
    const [reviewRelate, setreviewRelate] = useState([])
    
    useEffect(() => {
        fetchData();
    },[])

    useEffect(() => {
        postSession();
    },[user])

    const postSession = async () =>{
        try {
            if(token){
                await axios.post(`/user/postsession/`,{WriterId:user._id,review:id},{headers:{Authorization:token}})
            }
        } catch (err) {
           return;
        }
    }
    const getReviewRelate = async () =>{
        try {
            if(result){
                const res = await axios.get(`/review/getreviewrelate/${id}`)
                setreviewRelate(res.data)
            }
        } catch (err) {
           return;
        }
    }

    
    const fetchData = async () =>{
        try {
            const res = await axios.get(`/review/getdetailreview/${id}`)
            setresult(res.data.review)
            getReviewRelate()
        } catch (err) {
           return;
        }
    }


    return (
        <div>
            {
                result?<div>
                    <div className='review-page'>
                            <div style={{fontFamily:'sans-serif',color:'gray',fontStyle:'oblique'}}>
                            <h2>{result.description}</h2>
                                {result.post_date}<p/>
                                </div>
                            {result.content && result.content.map((line, index) => (
                                <div className='review-content'>
                                    {line.slice(0,5)==='(img)'?
                                    <img alt='line' src={line.slice(6,line.length)}/>
                                    :line
                                    }
                                </div>
                            ))}
                        </div>
                </div>
                :null
            }
            <h2 style={{textAlign:'center',fontSize:'30px'}}>Review Relate</h2>
            <div className='review-page bg-white shadow-lg'>
                <Row gutter={[8, 8]}>
                    {reviewRelate && reviewRelate.map((review, index) => (                        
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

export default ReviewDetail
