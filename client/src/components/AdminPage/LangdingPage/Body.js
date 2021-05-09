import React from 'react'
import '../AdminPage.css'
import { Route, Switch } from "react-router-dom";
import Account from '../Body/Account'
import Movie from '../Body/Movie'
import News from '../Body/News'
import Review from '../Body/Review'
import ChangePassword from '../Body/ChangePassword'

function Body() {
    return (
        <div>
                <Switch>
                    {/* must login first */}
                    <Route exact path="/adm/account" component={Account}/>
                    <Route exact path="/adm/movies" component={Movie}/>
                    <Route exact path="/adm/news" component={News}/>
                    <Route exact path="/adm/review" component={Review}/>
                    <Route exact path="/adm/changepw" component={ChangePassword}/>
                    <Route exact path="/" component={Account}/>
                </Switch>
        </div>
    )
}

export default Body
