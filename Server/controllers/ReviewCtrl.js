const axios = require('axios');
const cheerio = require('cheerio');
const Review = require('../models/Review');
const fs = require("fs");
const url= "https://www.gocdienanh.com/review-phim/"
const { generateKeywords, clearKeywords } = require('keywords-extractor');
var ws = require('word-salience');

const fetchData = async(url) =>{
    const result = await axios.get(url)
    return result.data
}


const ReviewCtrl = {
    GetReviews : async (req,res) =>{
        const page = req.header("page")
       try{
            const content = await fetchData(`${url}page/${page}/`)
            const $ =cheerio.load(content)
            const reviews=[]

            $('.td_module_10.td_module_wrap.td-animation-stack').each((i,e)=>{
                const source = $(e).find('.td-module-thumb >a').attr('href');
                const img = $(e).find('.td-module-thumb >a>img').attr('data-img-url');
                const description = $(e).find('.item-details>h3>a').text();
                oneReview ={
                    description:description,
                    source:source,
                    img:img,
                }
                reviews.push(oneReview)
            })
            const total_results = $('.page-nav.td-pb-padding-side').find('>a.last').text();
            
            res.json({reivew:reviews,total_results:total_results})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    GetDetailReview : async (req,res) =>{
        const url = req.header("url")
        try{
            const content = await fetchData(url)
            const $ =cheerio.load(content)
            let review = {
                title:'',
                description :'',
                post_date:'',
                content : [],
                keywords:[],
              };
            const article = $('article');
            review.title = article.find('.td-post-header>header>h1.entry-title').text();
            review.description = article.find('.td-post-header>header >.td-post-sub-title').text();
            review.post_date = article.find('.td-post-header>header .td-module-meta-info').text().trim();
            $('p').filter((i,e)=>{
            if($(e).attr('style') === 'text-align: justify;'){
                review.content.push($(e).text());
            }
            if($(e).find('img').attr('class'))
                review.content.push(`(img) ${$(e).find('img').attr('src')}`);
            })
            const stopwords = fs.readFileSync('stopwords.txt');
            var data = fs.readFileSync('stopwords.txt');
            
            const keywords = generateKeywords(review.content.join(' '));
            review.keywords = clearKeywords(keywords, stopwords).slice(0,30);
             res.json({review:review})
            } catch (error) {
             return res.status(500).json({msg: error.message})
         }    
     },

    AddReview : async (req,res) =>{
        try {
            const {WriterId,description,post_date,content,keywords} = req.body
            const check_result = await Review.findOne({WriterId,description,post_date,content})
            if(check_result) return res.status(400).json({msg:'this Review already exists!'})
            const newResult = new Review({WriterId,description,post_date,content,keywords})
            await newResult.save();
            res.json({msg:"Review Added!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    GetallReview : async (req,res) =>{
        try {
            Review.
            find().
            exec(function (err, reviews) {
                if (err) return handleError(err);
                return res.json({review:reviews})
            });
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
}


module.exports = ReviewCtrl