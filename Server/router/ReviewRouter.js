const router = require('express').Router()
const ReviewCtrl = require('../controllers/ReviewCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/getallreviews', ReviewCtrl.GetallReview)
router.get('/getreviews', ReviewCtrl.GetReviews)
router.get('/getdetail', ReviewCtrl.GetDetailReview)
router.post('/addreview',auth,authAdmin,ReviewCtrl.AddReview)

module.exports = router