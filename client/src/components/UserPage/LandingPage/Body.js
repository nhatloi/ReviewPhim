import React from 'react'
import { Route, Switch } from "react-router-dom";
import {useSelector} from 'react-redux'

// pages for this product
import Register from '../../auth/Register';
import ActiveEmail from '../../auth/ActiveEmail';
import ForgotPw from '../../auth/ForgotPw';
import ResetPassword from '../../auth/ResetPassword'
import Notfound from '../../utils/Notfound'
import Profile from '../View/Profile'
import Successfully from '../../utils/Successfully'
import News from '../View/News/NewsPage'
import Home from '../View/Home'
import Header from './Header'
// import Footer from './Footer'
import Footer from '../../Footers/Footer'
import MovieDetail from '../View/Movie/MovieDetail'
import Totalmovie from '../View/Movie/Totalmovie'


function Body() {
    //const
    const auth = useSelector(state => state.auth)
    const {isLogged} = auth

    //render
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className="body">
                <section>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {/* must login first */}
                        <Route exact path="/register" component={isLogged? Notfound: Register}/>
                        <Route exact path="/forgot" component={isLogged? Notfound:ForgotPw}/>
                        <Route exact path="/user/reset/:token" component={isLogged? Notfound:ResetPassword}/>
                        <Route exact path="/profile" component={isLogged? Profile : Notfound}/>
                        <Route exact path="/favorite" component={isLogged? Profile : Notfound}/>

                        {/* notification */}
                        <Route exact path="/success/:title/:subTitle" component={Successfully}/>

                        {/* no need to login */}
                        <Route exact path="/user/activation/:activation_token" component={ActiveEmail}/>
                        {/* News */}
                        <Route exact path="/news" component={News}/>
                        {/* Movie */}
                        <Route exact path="/movie/:id" component={MovieDetail}/>

                        <Route exact path="/movie" component={Totalmovie}/>


                        
                    </Switch>
                </section>
            </div>
            <div>
                <Footer/>
            </div>
      </div>
    )
}

export default Body
