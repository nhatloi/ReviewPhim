import React from 'react'
import '../AdminPage.css'
import { Route, Switch } from "react-router-dom";
import Account from '../Body/Account'
import Movie from '../Body/Movie'
import News from '../Body/News'

function Body() {
    return (
        <div>
            <section>
                <Switch>
                    {/* must login first */}
                    <Route exact path="/account" component={Account}/>
                    <Route exact path="/movies" component={Movie}/>
                    <Route exact path="/news" component={News}/>
                    <Route exact path="/" component={Account}/>
                </Switch>
            </section>
        </div>
    )
}

export default Body
