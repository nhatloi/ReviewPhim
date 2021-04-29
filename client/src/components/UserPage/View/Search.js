import React,{useState,useEffect}from 'react'
import {Col,Row,Empty} from 'antd'
import axios from 'axios'

function Search() {
    const search = new URLSearchParams(window.location.search)
    const [movies, setmovies] = useState([])
    const [reviews, setreviews] = useState([])

    useEffect(() => {
        fetchData();
    },[])


    const fetchData = async () =>{
        try {
            const res = await axios.get(`/review/searchreview?search=${search}`)
            setmovies(res.data.movies)
            setreviews(res.data.reviews)
        } catch (err) {
           return;
        }
    }

    return (
        <div>
            {movies.length!==0  || reviews.length!==0  ?
            <div>
                <h2 style={{color:'black',fontFamily:'-moz-initial',fontSize:'60px',textAlign:'center'}}>Movies</h2>
             <div className='list-movies'>
             <Row gutter={[8, 8]}>
                     {movies && movies.map((movie, index) => (
                         <React.Fragment key={index}>
                            <Col span={6} >
                             
                                <div className='card-movie bg-white shadow-lg'>
                                     <a href={`/movie/${movie._id}`}>
                                     <div className='imgbox'>   <img alt ='poster' src={movie.poster_path}/></div>

                                      
                                         <div className='movie-infor'>
                                             {movie.title}<p/>
                                             Khởi chiếu: {new Date(movie.release_date).toDateString()}
                                             </div>
                                     </a>
                                </div>
                                 
                                 
                             </Col>
                             
                         </React.Fragment>
                             
                     ))}
             </Row>
            </div>
            <h2 style={{color:'black',fontFamily:'-moz-initial',fontSize:'60px',textAlign:'center'}}>Reviews</h2>
            <div className='review-page bg-white shadow-lg'>
                <Row gutter={[8, 8]}>
                    {reviews && reviews.map((review, index) => (                        
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
            
            :<div><Empty /></div>}
        </div>
    )
}

export default Search
