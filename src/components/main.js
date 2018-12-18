import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Cats from './Categories'
import Posts from './Posts'



const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/categories' component={Cats} />
            <Route path='/posts' component={Posts} />
        </Switch>
    </main>
)

export default Main