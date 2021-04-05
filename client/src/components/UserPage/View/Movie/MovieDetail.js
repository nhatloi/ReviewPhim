import React, {useState,useEffect}from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './MovieDetail.css'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import {
    PlayCircleOutlined,
    LikeOutlined,
    DislikeOutlined
  } from '@ant-design/icons';
import { Button,Comment, Avatar,Form, List, Input,Rate} from 'antd'
const { TextArea } = Input;

function MovieDetail(props) {

    //const
    const id = props.match.params.id
    const [movie, setmovie] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const user = useSelector(state => state.auth.user)
    const [loadcomment, setloadcomment] = useState(0)
    const [viewComment, setviewComment] = useState(false)

    useEffect(() => {
        fetchData();
    },[])

    
    const fetchData = async () =>{
        try {
            const res = await axios.get(`/movie/getmoviebyid/${id}`)
            setmovie(res.data)
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
        <div>
            <div className="movie-detail">
            <div class="text">
                <p style={{marginTop:"5%"}}><h1 style={{color:'red'}}>{movie.original_title}</h1><p/>
                Actors : 
                {movie.actors && movie.actors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                Directors : 
                {movie.directors && movie.directors.map((item, index) => (
                    index==0?`"${item}"`:` , "${item}"`
                                            ))}
                <p/>
                {movie.overview}<p/>
                <Button>Add Your Rate</Button>: <Rate allowHalf disabled defaultValue={2.5} /><p/>
                <div className='likedislike'>
                    <LikeDislikes video videoId={id} userId={user._id} /> <a href="#trailer"><PlayCircleOutlined/>Trailer</a>
                    <Button style={{background:'transparent',color:'white'}} onClick={()=>{setviewComment(!viewComment)}}>Comment</Button><p/>
                </div>
                </p>
                <img style={{height:"500px",width:"300px",opacity:'1',float:'right'}} src={movie.poster_path}/>
            </div>
                <img src={movie.backdrop_path}/>
               
             <div className='poster'>
            </div>
            </div>
            {
                viewComment?
                    <div id='comment' className="detail-comment">
                    <Comments CommentLists={CommentLists} postId={movie._id} refreshFunction={fetchData} />
                </div>
                :
                null
            }
             <div id='trailer' className="detail-trailer">
                <ReactPlayer url={movie.trailer}
                height='100%'
                width='100%' 
                playIcon
                controls={true}  
                />
            </div>
        </div>
    )
}

export default MovieDetail
