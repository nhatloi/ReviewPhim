import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import {Col} from 'antd'
import './Home.css'

function Home() {

    const [Movies, setMovies] = useState([])
    const [news, setnews] = useState([])
    const [reviews, setreviews] = useState([])
    const nullvideo = 'https://www.youtube.com/watch?v=TY3IAqm-gpE'

    useEffect(() => {
        movies_eff()
        news_eff()
        Reviews_eff()
    }, [])

    const movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie')
            setMovies(res.data.movie)
        }catch (error) {
            console.log(error);
        }
    }

    const news_eff = async() =>{
        try{
            const res = await axios.get('/news/get_allnews')
            setnews(res.data.news)
        }catch (error) {
            console.log(error);
        }
    }
    const Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getallreviews')
            setreviews(res.data.review)
        }catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='contaier'>
            <hr/>
            <h2>Trailer</h2>
            <hr/>
            {Movies.length && Movies.length>6?
                <div className='trailer'>
                <div className='row-1'>
                    <div className='colunm-1'>
                        <div className='videotrailer'>
                                <ReactPlayer
                                        controls
                                        muted={true}
                                        playing={true}
                                        className='react-player'
                                        url={Movies[0].trailer!='null'?Movies[0].trailer:nullvideo}
                                        width='100%'
                                        height='100%'
                                        />
                                <div className='information'>
                                <h2> Trailer : {Movies[0].title}</h2>
                                 
                                </div>
                            </div>
                        <div className='videotrailer'>
                            <ReactPlayer
                                    controls
                                    muted={true}
                                    playing={true}
                                    className='react-player'
                                    url={Movies[1].trailer!='null'?Movies[1].trailer:nullvideo}
                                    width='100%'
                                    height='100%'
                                    />
                            <div className='information'>
                                <h2> Trailer : {Movies[1].title}</h2>
                               
                            </div>
                        </div>

                    </div>



                    
                    <div className='colunm-2'>
                        <div>
                            <div className='videotrailer'>
                                    <ReactPlayer
                                            controls
                                            muted={true}
                                            playing={true}
                                            className='react-player'
                                            url={Movies[2].trailer!='null'?Movies[2].trailer:nullvideo}
                                            width='90%'
                                            height='70%'
                                            />
                                    <div className='information'>
                                    <h2> Trailer : {Movies[2].title}</h2>
                                   
                                    </div>
                                </div>

                            <div className='videotrailer'>
                                <ReactPlayer
                                        controls
                                        muted={true}
                                        playing={true}
                                        className='react-player'
                                        url={Movies[3].trailer!='null'?Movies[3].trailer:nullvideo}
                                        width='90%'
                                        height='70%'
                                        />
                                <div className='information'>
                                    <h2> Trailer : {Movies[3].title}</h2>
                            
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='videotrailer'>
                                <ReactPlayer
                                        controls
                                        muted={true}
                                        playing={true}
                                        className='react-player'
                                        url={Movies[4].trailer!='null'?Movies[4].trailer:nullvideo}
                                        width='90%'
                                        height='70%'
                                        />
                                <div className='information'>
                                    <h2> Trailer : {Movies[4].title}</h2>
                                 
                                </div>
                            </div>

                            <div className='videotrailer'>
                                <ReactPlayer
                                        controls
                                        muted={true}
                                        playing={true}
                                        className='react-player'
                                        url={Movies[5].trailer!='null'?Movies[5].trailer:nullvideo}
                                        width='90%'
                                        height='70%'
                                        />
                                <div className='information'>
                                    <h2> Trailer : {Movies[5].title}</h2>
                                    
                                </div>
                            </div>
                        </div>
                        

                    </div>



                    
                </div>
                <hr/>
                <div>
                        <h2>Movies</h2>
                    </div>
                    <hr/>
                <div className='row-2'>
                    <div className='list-movie'>
                    {Movies && Movies.map((movie, index) => (
                                <React.Fragment key={index}>
                                <Col span={4} >
                                    <div>
                                        <label>{movie.episode}</label>
                                            <a href={`/movie/${movie._id}`}>
                                                <img alt ='poster' src={movie.poster_path}/>
                                                <div className='infor'>
                                                    {movie.title}<p/>
                                                    Khởi chiếu: {new Date(movie.release_date).toDateString()}
                                                    </div>
                                            </a>
                                    </div>
                                        
                                    </Col>
                                    
                                </React.Fragment>
                                    
                            ))}   
                    </div>
                            
                </div>
                <hr/>
                <div>
                        <h2>Reviews - News</h2>
                    </div>
                    <hr/>
                    <div className='row-2'>
                    <div className='list-review'>
                    {reviews && reviews.map((review, index) => (
                        <a href='/'>
                             <div className='review-card'>
                                        <div><img src={review.poster}/></div>
                                        <div className='infor'>{review.description}<p/>
                                        <div style={{color:'gray',fontSize:'20px'}}>
                                        {review.keywords && review.keywords.map((keyword, index) => (
                                            `#${keyword} `
                                        ))}
                                        </div>
                                          </div> 
                                    </div>
                        </a>
                                   
                                    
                            ))}   
                    </div>
                    <div className='list-news'>
                    {news && news.map((item, index) => (
                        <a href={item.link}>
                             <div className='news-card'>
                                        <div><img src={item.img}/></div>
                                        <div className='infor'>{item.description}<p/>
                                        <div style={{color:'gray',fontStyle:'italic',fontSize:'10px'}}>
                                            {item.source}-{new Date(item.time).toDateString()}
                                        </div>
                                        </div>
                                    </div>
                        </a>
                                   
                                    
                            ))}   
                    </div>


                            
                </div>
            </div>:
            null
            }
            
        </div>
    )
}

export default Home
