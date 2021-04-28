const router = require('express').Router()
const moviesCtrl = require('../controllers/moviesCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/fetchMovieTheaters',moviesCtrl.MovieTheaters)
router.get('/fetchMovieDetailTheaters',moviesCtrl.DetailMovieMovieTheaters)
router.get('/searchTheaters',moviesCtrl.SearchMovie)

router.post('/addmovie',auth,authAdmin, moviesCtrl.AddMovie)

router.post('/postrate',auth, moviesCtrl.PostRate)
router.get('/getrate/:id', moviesCtrl.GetRate)

router.post('/updatemovie',auth,authAdmin, moviesCtrl.UpdateMovie)
router.get('/getallmovie', moviesCtrl.GetAllMovie)
router.get('/getmoviebyid/:id',moviesCtrl.GetMovieById)
router.get('/getmovierelate/:id',moviesCtrl.GetMovieRelate)
router.get('/getreviewbymovie/:id',moviesCtrl.GetReviewById)

router.delete('/delete/:id',auth,authAdmin,moviesCtrl.DeleteMovie)
router.delete('/delete_all',auth,authAdmin,moviesCtrl.DeleteAllMovie)

module.exports = router