const News = require('../models/News');
const Movie = require('../models/Movie');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");


const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}

const NewCtrl = {

    AddNews : async (req,res) =>{
        try {
            const {WriterId,description,link,source,time,img,title} = req.body
            const check_News = await News.findOne({description,link,source,time,img,title})
            if(check_News) return res.status(400).json({msg:'this News already exists!'})
            const newNews = new News({WriterId,description,link,source,time,img,title})
            await newNews.save();
            res.json({msg:"News Added!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    
    GetNews : async (req,res) =>{
       try{
            var url = ''
            const key = req.header("key")
            if(key === 'topics')
                url = "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNREoyZUc0U0FuWnBLQUFQAQ?hl=vi&gl=VN&ceid=VN%3Avi";
            else 
               {
                const check_News = await Movie.findById(key)
                if(check_News){
                    url = `https://news.google.com/search?q=(phim) ${check_News.title}&hl=vi&gl=VN&ceid=VN%3Avi`;
                    url = encodeURI(url)
                }
               }
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            const news=[]
            var totalnews=0
            $('.NiLAwe.y6IFtc.R7GTQ.keNKEd.j7vNaf.nID9nc').each((i,e)=>{
                const title = $(e).find('h3 >.DY5T1d').text();
                const source = $(e).find('.wEwyrc').text();
                const time =  $(e).find('.WW6dff').attr('datetime');
                const description = $(e).find('.xBbh9').text();
                const link = 'https://news.google.com/' + $(e).find('.VDXfz').attr("href") +'\n';
                const img =$(e).find('img.tvs3Id.QwxBBf').attr("src")+'\n';
                oneNews ={
                    description:description,
                    link:link,
                    source:source,
                    time:time,
                    img:img,
                    title:title
                }
                news.push(oneNews)
                totalnews++;
            })
            res.json({news:news,totalnews:totalnews})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }    
    },

    GetAllNews : async (req,res) =>{
        try {
            News.
                find().sort('-time').populate('WriterId').
                exec(function (err, news) {
                    if (err) return handleError(err);
                    return res.json({news:news})

                });

          
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    DeleteNews : async (req,res) =>{
        try {
            await News.findByIdAndDelete(req.params.id)
            res.json({msg:'Delete News successfully!'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },


}


module.exports = NewCtrl