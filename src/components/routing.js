import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Tags from './Tags'
import Posts from './Posts'
import PostEditor from './Posteditor';
import ViewPost from './Viewpost'


const Routing = () => (
    <main style={{ padding: '5px 10px 0 50px' }}>
        <Switch>
            <Route exact path='/' component={Posts} />
            <Route path='/tags' component={Tags} />
            <Route exact path='/posts' component={Posts} />
            <Route path='/post/new' component={PostEditor} />
            <Route path='/post/:id' component={PostEditor} />
            <Route path='/posts/:id/' component={ViewPost} />
        </Switch>
    </main>
)

export default Routing