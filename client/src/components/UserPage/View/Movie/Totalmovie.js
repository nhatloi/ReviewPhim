import React,{useState,useEffect}from 'react'
import {Row,Col} from 'antd';
import axios from 'axios'


function Totalmovie() {
    const [results, setresults] = useState([])


    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
             const res = await axios.get(`/movie/getallmovie/`)
            setresults(res.data.movie)
        } catch (err) {
           return;
        }
    }



    return (
        <div className='container'>
            <div className='list-movies'>
                <Row gutter={[8, 8]}>
                        {results && results.map((movie, index) => (
                            <React.Fragment key={index}>
                               <Col span={6} >
                                   <div className='card-movie'>
                                       <label>{movie.episode}</label>
                                        <a href={`/movie/${movie._id}`}>
                                            <img alt ='poster' src={movie.poster_path}/>
                                            <div className='movie-infor'>
                                                {movie.title}<p/>
                                                Khởi chiếu: {movie.date}
                                                </div>
                                        </a>
                                   </div>
                                    
                                    
                                </Col>
                                
                            </React.Fragment>
                                
                        ))}
                </Row>
            </div>
        </div>
    )
}

export default Totalmovie
