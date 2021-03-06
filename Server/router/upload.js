const router= require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadposter = require('../middleware/UploadImgMovie')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/upload_avatar',uploadImage,auth,uploadCtrl.uploadAvatar)
router.post('/uploadimg',uploadposter,auth,uploadCtrl.uploadImg)
router.post('/img',uploadCtrl.uploadImg2)


module.exports = router