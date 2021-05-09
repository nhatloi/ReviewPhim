const router = require('express').Router()
const ReviewCtrl = require('../controllers/ReviewCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.get('/getallreviews',auth,authAdmin, ReviewCtrl.GetallReview)
router.get('/searchreview', ReviewCtrl.SearchReview)
router.get('/getlistreviews', ReviewCtrl.GetlistReview)
router.get('/getreviews', ReviewCtrl.GetReviews)
router.get('/getdetail', ReviewCtrl.GetDetailReviewKhenphim)
router.get('/getreviewrelate/:id',ReviewCtrl.GetReviewRelate)
router.post('/active/:id',ReviewCtrl.ActiveReview)
router.get('/getdetailreview/:id',ReviewCtrl.GetDetailReview)
router.post('/addreview',auth,ReviewCtrl.AddReview)
router.delete('/delete/:id',auth,authAdmin,ReviewCtrl.DeleteReview)



module.exports = router