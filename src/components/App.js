import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import Header from './Header'
import Main from './main'



class App extends Component {


    getPosts = () => {

    }
    render() {

        return (
            <div>

                <Header />
               <Main />

                {/* <ul> 
                    {
                        this.props.posts.loaded && this.props.posts.list.map((p)=> (
                              <li>{p.title}</li>
                        )) 
                    }
                  
                </ul>
                <button onClick={this.props.getPosts}>get all posts</button> */}
            </div>
        );
    }
}
const putStateToProps = (store, ownprops) => ({
    posts: store.posts,
    categories: store.categories
})

const mapDispatchProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts()),
})


export default connect(putStateToProps, mapDispatchProps)(App)