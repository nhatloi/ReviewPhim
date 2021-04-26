import React, {useState,useEffect}from 'react'
import axios from 'axios'
import './Review.css'


function ReviewDetail(props) {

    const id = props.match.params.id
    const [result, setresult] = useState([])
    
    useEffect(() => {
        fetchData();
    },[])

    
    const fetchData = async () =>{
        try {
            const res = await axios.get(`/review/getdetailreview/${id}`)
            setresult(res.data.review)
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
        </div>
    )
}

export default ReviewDetail
