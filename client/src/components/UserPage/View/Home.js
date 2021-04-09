import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import './Home.css'

function Home() {

    const [Movies, setMovies] = useState([])
    const nullvideo = 'https://www.youtube.com/watch?v=TY3IAqm-gpE'

    useEffect(() => {
        movies_eff()
    }, [])

    const movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie')
            setMovies(res.data.movie)
        }catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='contaier'>
            <h2>Trailer</h2>
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
                                    Xem thêm
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
                                Xem thêm
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
                                        Xem thêm
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
                                    Xem thêm
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
                                    Xem thêm
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
                                    Xem thêm
                                </div>
                            </div>
                        </div>
                        

                    </div>



                    
                </div>

                <div className='row-2'>
                        
                </div>
            </div>:
            null
            }
            
        </div>
    )
}

export default Home
