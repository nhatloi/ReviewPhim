const router = require('express').Router()
const ReviewCtrl = require('../controllers/ReviewCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/getallreviews', ReviewCtrl.GetallReview)
router.get('/getreviews', ReviewCtrl.GetReviewsKhenphim)
router.get('/getdetail', ReviewCtrl.GetDetailReviewKhenphim)
router.post('/addreview',auth,ReviewCtrl.AddReview)
router.delete('/delete/:id',auth,authAdmin,ReviewCtrl.DeleteReview)


module.exports = router