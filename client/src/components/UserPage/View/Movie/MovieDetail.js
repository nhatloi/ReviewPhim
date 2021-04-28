import React, {useState,useEffect}from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import {Row} from 'antd'
import {useSelector} from 'react-redux'
import './MovieDetail.css'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import AddRate from './Sections/AddRate' 
import {
    PlayCircleOutlined,
  } from '@ant-design/icons';
import { Button,Rate,Tabs } from 'antd'
const { TabPane } = Tabs;

function MovieDetail(props) {

    //const
    const id = props.match.params.id
    const [movie, setmovie] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.token)
    const [movieRelate, setmovieRelate] = useState([])
    const [newsRelate, setnewsRelate] = useState([])
    const [reviews, setreviews] = useState([])
    const [rate, setrate] = useState(0)
    const [modalvis, setmodalvis] = useState(false)

    useEffect(() => {
        fetchData();
    },[modalvis])

    useEffect(() => {
        postSession();
    },[user])

    const setvis = () =>{
        try {
            setmodalvis(!modalvis)
        } catch (err) {
           return;
        }
    }


    const postSession = async () =>{
        try {
            if(token){
                await axios.post(`/user/postsession/`,{WriterId:user._id,movie:id},{headers:{Authorization:token}})
            }
        } catch (err) {
           return;
        }
    }

    const getMovieRelate = async (_id) =>{
        try {
            if(movie){
                const res = await axios.get(`/movie/getmovierelate/${_id}`)
                setmovieRelate(res.data)
            }
        } catch (err) {
           return;
        }
    }

    const getNewslate = async (key) =>{
        try {
            if(movie){
                const res = await axios.get(`/news/getnews`,{headers:{key:key}})
                setnewsRelate(res.data.news)
            }
        } catch (err) { 
           return console.log(err);
        }
    }

    const getReviewrelate = async (key) =>{
        try {
            if(movie){
                const res = await axios.get(`/movie/getreviewbymovie/${id}`)
                setreviews(res.data.reviews)
            }
        } catch (err) { 
           return console.log(err);
        }
    }
    
    const getRate = async () =>{
        try {
            if(movie){
                const res = await axios.get(`/movie/getrate/${id}`)
                setrate(res.data.rate)
                console(res.data.rate)
            }
        } catch (err) { 
           return console.log(err);
        }
    }


    const fetchData = async () =>{
        try {
            const res = await axios.get(`/movie/getmoviebyid/${id}`)
            setmovie(res.data)
            getNewslate(id)
            getMovieRelate(id)
            getReviewrelate()
            getRate()
            
            axios.post('/comment/getComments', { movieId: res.data._id})
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
        } catch (err) {
           return;
        }
    }
    return (
        <div style={{marginBottom:'100px'}}>
            <Tabs defaultActiveKey="movie">
                <TabPane tab="Movie" key="movie">
                    <div className="movie-detail">
                <div class="text">
                    <p style={{marginTop:"5%"}}><h1 style={{color:'red'}}>{movie.original_title}</h1><p/>
                    Actors : 
                    {movie.actors && movie.actors.map((item, index) => (
                        index===0?`"${item}"`:` , "${item}"`
                                                ))}
                    <p/>
                    Directors : 
                    {movie.directors && movie.directors.map((item, index) => (
                        index===0?`"${item}"`:` , "${item}"`
                                                ))}
                    <p/>
                    {movie.overview}<p/>
                    <Button onClick={()=>{setvis()}}>Add Your Rate</Button>: <Rate allowHalf disabled value={rate} /><p/>
                    <AddRate visible={modalvis} handle={setvis} Movie_id={id} user_id={user._id}/>
                    <div className='likedislike'>
                        <LikeDislikes video videoId={id} userId={user._id} /> <a href="#trailer"><PlayCircleOutlined/>Trailer</a>
                        <a href='#comment'> Comment<p/></a>
                    </div>
                    </p>
                    <img style={{height:"500px",width:"300px",opacity:'1',float:'right'}} src={movie.poster_path}/>
                </div>
                    <img src={movie.backdrop_path}/>
                
                <div className='poster'>
                </div>
                </div>
                <div id='trailer' className="detail-trailer">
                    <div style={{width:'70%'}}>
                        <ReactPlayer url={movie.trailer}
                        height='100%'
                        width='100%' 
                        playIcon
                        controls={true}  
                        />
                    </div>
                    <div className='People_view'>
                        <h2>   People also view</h2>
                    
                        {movieRelate && movieRelate.map((val, index) => (
                                    <div className='movie-relate'>
                                        <a href={`${val._id}`}>
                                            <img alt='' src={val.poster_path}/>
                                        {val.title}
                                        </a>
                                    </div>
                                ))}
                    </div>
                </div>
                        <div id='comment' className="detail-comment">
                        <Comments CommentLists={CommentLists} postId={movie._id} refreshFunction={fetchData} />
                    </div>
                </TabPane>
                <TabPane tab="News relate" key="news_relate">
                <div className="news_page">
                    <h2>News</h2>
                    {newsRelate && newsRelate.map((news, index) => (
                    <div className='cast_news'>
                            <img alt='' src={news.img }/>
                        <a alt="source" href={news.link}  target="_blank" >
                        <div style={{marginLeft:'30px'}}>
                                <h1>{news.description}</h1>
                                <label>{news.source} - {news.time}</label>
                        </div>
                        </a>
                    </div>
                ))}
                
                </div>
                </TabPane>
                <TabPane tab="Review" key="review">
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
                </TabPane>
            </Tabs>
            
        </div>
    )
}

export default MovieDetail
