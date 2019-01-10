import React, { Component } from 'react'
import { connect } from 'react-redux'

import renderHTML from 'react-render-html'



class ViewPost extends Component {
    state = {
        post: this.props.currentPost
    };
    
    componentWillReceiveProps =(nextProps)=>{    
        if(this.props.match.params.id  && !this.props.posts.loaded && nextProps.posts.loaded){
            let currentPost = nextProps.posts.list.find(div => div.id === parseInt(this.props.match.params.id, 10))
            this.setState({post : currentPost})
        }
    }
    
    render() {
        
        const { post } = this.state;    
        if (!this.props.posts.loaded) return null;  
        return (     
            <div>
                <h1>Post</h1>
                <p>{post.title}</p>
                <p>{post.author}</p>
                <div>{renderHTML(post.body)}</div>
                <p>{post.category}</p>
                <p>{post.date.format('DD-MM-YYYY')}</p>

            </div>
        );
    }
}


const putStateToProps = (store, ownprops) => ({
    currentPost: store.posts.loaded && ownprops.match.params.id ? store.posts.list.find(div => div.id === parseInt(ownprops.match.params.id, 10)) : null,
    posts: store.posts,
    categories: store.categories
})


const mapDispatchProps = (dispatch) => ({
    
})


export default connect(putStateToProps, mapDispatchProps)(ViewPost)


