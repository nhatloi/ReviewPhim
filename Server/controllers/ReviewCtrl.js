const axios = require('axios');
const sw = require('stopword')
const cheerio = require('cheerio');
const Review = require('../models/Review');
    const fs = require("fs");
const url= "https://www.gocdienanh.com/review-phim/"
const url2= "https://reviewchodzui.com/category/phim-viet-nam/"

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

            var text = review.content;
            var stopwords = fs.readFileSync('stopwords.txt');
            text = await removeStop(text,stopwords);
            review.keywords =await extract_keywords(text,20);

            res.json({review:review})
            } catch (error) {
             return res.status(500).json({msg: error.message})
         }    
     },

     GetReviewsKhenphim : async (req,res) =>{
        const page = req.header("page")
       try{
            const content = await fetchData(`${url2}page/${page}/`)
            const $ =cheerio.load(content)
            const reviews=[]

            const article = $('.inner-wrapper');
            $('.article-wrap-inner').each((i,e)=>{
                const source = $(e).find('.featured-thumb>a').attr('href');
                const img = $(e).find('.featured-thumb>a>img').attr('src');
                const description = $(e).find('.content-wrap-inner>header.entry-header>h3').text();
                oneReview ={
                    description:description,
                    source:source,
                    img:img,
                }
                reviews.push(oneReview)
            })
            
            res.json({reivew:reviews})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    GetDetailReviewKhenphim : async (req,res) =>{
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
        
            review.title = $('header.entry-header').find('h1').text();
            review.post_date = $('header.entry-header').find('time.entry-date').text();
            review.description = $('.entry-content > blockquote').find('strong').text();
            $('p').filter((i,e)=>{
                if($(e).attr('style') === 'text-align: justify;'){
                    review.content.push($(e).text());
                }
                if($(e).find('img').attr('loading') == 'lazy')
                    review.content.push(`(img) ${$(e).find('img').attr('src')}`);
                })
            review.content.pop();

            var text = review.content;
            var stopwords = fs.readFileSync('stopwords.txt');
            text = await removeStop(text,stopwords);
            review.keywords =await extract_keywords(text,20);

            res.json({review:review})
            } catch (error) {
             return res.status(500).json({msg: error.message})
         }    
     },

    AddReview : async (req,res) =>{
        try {
            const {WriterId,poster,description,post_date,content,keywords,movie} = req.body
            const check_result = await Review.findOne({WriterId,poster,description,post_date,content,movie})
            if(check_result) return res.status(400).json({msg:'this Review already exists!'})
            const newResult = new Review({WriterId,description,poster,post_date,content,keywords,movie})
            await newResult.save();
            res.json({msg:"Review Added!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    GetallReview : async (req,res) =>{
        try {
            Review.
            find().sort('post_date').
            populate('movie').
            exec(function (err, reviews) {
                if (err) return handleError(err);
                return res.json({review:reviews})
            });
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    DeleteReview : async (req,res) =>{
        try {
            await Review.findByIdAndDelete(req.params.id)
            res.json({msg:'Delete Review successfully!'})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

}

function removeStop(text,stopwords){
    text = text.join('. ');
    text = text.split(' ');
    stopwords = stopwords.toString().split('\r\n')
    text.forEach((element,index) => {
       if(stopwords.includes(element.toLowerCase())==true)
       {
            text.splice(index, 1);
       }
   });
   text = text.join(' ')
   return text;
}

function extract_keywords(content,number) {
    let regex = /([A-Z]+[^\(\_].)(([ \-][^a-z\.\:\(])*['’\wÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ])*[^\. \:\,\)\(\”\?]/gm
    var keywords = []
    var temp = []

    while ((array1 = regex.exec(content)) !== null) {
        if(temp.includes(array1[0]) == false)
        {
            temp.push(array1[0]);
            keywords.push('1_'+array1[0]);
        }
        else{
            var count = parseInt(keywords[temp.indexOf(array1[0])][0]) + 1;
            keywords[temp.indexOf(array1[0])] = count+'_'+array1[0];
        }
    }
    keywords.sort()
    keywords.reverse()
    keywords.forEach(function(item, index) {
        keywords[index] = item.slice(2);
    });
    if(!number) return keywords;
    return keywords.slice(0,number);
}

module.exports = ReviewCtrl