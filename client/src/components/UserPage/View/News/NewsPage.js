import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Newspage.css'


function NewsPage() {
    //const
    const [News, setNews] = useState([])

    //effect
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () =>{
        try {
            const res = await axios.get('/news/get_allnews')
            return setNews(res.data.news);
        } catch (err) {
           return err.response.data.msg
        }
    }



    //render
    return (
        <div className="news_page">
            <h2>News</h2>
            <div className='list_news relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                {News && News.map((news, index) => (
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
          
        </div>
    )
}

export default NewsPage
