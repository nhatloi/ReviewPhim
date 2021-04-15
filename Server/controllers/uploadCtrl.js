const cloudinary = require('cloudinary')
const fs = require('fs');
const path = require('path')

const CLIENT_URL = process.env.CLIENT_URL;


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret :process.env.CLOUD_API_SECRET
})

const uploadCtrl = {
    uploadAvatar : (req,res) =>{
        try {
            
            const file  = req.files.file;
        
            cloudinary.v2.uploader.upload(file.tempFilePath,{
                folder: 'avatar',
                width:150,
                height:150,
                crop:'fill'
            }, async(err,result) => {
                if(err) throw err;
                removeTmp(file.tempFilePath)

                res.json({url:result.secure_url})
                
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    uploadImg : (req,res) =>{
        try {
            
            const file  = req.files.file;
        
            cloudinary.v2.uploader.upload(file.tempFilePath,{
                folder: 'img',
            }, async(err,result) => {
                if(err) throw err;
                removeTmp(file.tempFilePath)

                res.json({url:result.secure_url})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    uploadImg2 : async(req,res) =>{
        try {
            
            const file  = req.files;
            const TempFilePath = file.tempFilePath;
            console.log(file)
          
            // cloudinary.v2.uploader.upload(TempFilePath,{
            //     folder: 'img',
            // }, async(err,result) => {
            //     if(err) throw err;
            //     removeTmp(TempFilePath)
            //      res.json({url:result.secure_url})
            // })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
}
const removeTmp= (path) =>{
    fs.unlink(path,err =>{
        if(err) throw err
    })
}

module.exports = uploadCtrl