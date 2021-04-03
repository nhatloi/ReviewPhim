const router = require('express').Router()
const ReviewCtrl = require('../controllers/ReviewCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/getreviews', ReviewCtrl.GetReviews)
router.get('/getdetail', ReviewCtrl.GetDetailReview)


module.exports = router