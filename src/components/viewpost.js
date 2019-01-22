import React, { Component } from 'react'
import { connect } from 'react-redux'

import renderHTML from 'react-render-html'




class ViewPost extends Component {
    state = {
        post: this.props.currentPost
    };
    
    componentWillReceiveProps = (nextProps) => {
        //this.props.match.params.id - Error checking when creating a new post 
              if (this.props.match.params.id && !this.props.posts.loaded && nextProps.posts.loaded) {
                  let currentPost = nextProps.posts.list.find(div => div.Id === this.props.match.params.id);
                  this.setState({ post: currentPost })
              }
          }
      
    render() {
        console.log('render');
        const { post } = this.state;
       
        if (!this.props.posts.loaded) return null;
        return (
            <div>
                <h1>Post</h1>
                <h5>Title</h5>
                <p>{post.Title}</p>
                <h5>Subtitle</h5>
                <p>{post.Subtitle}</p>
                <h5>Author</h5>
                <p>{post.Author}</p>
                <p>{post.Priority}</p>
                <hr />
                <div>{renderHTML(post.Text)}</div>
                <hr />
                <h5>Tags</h5>
                <p>{post.Tag}</p>
                <div>
                    <h5>Date</h5>
                    <p>{post.Date.format('DD-MM-YYYY')}</p>
                </div>

            </div>
        );
    }
}


//check whether it is caught with a click id, which will allow you to understand to create a new post if the id was not detected or edited post
const putStateToProps = (store, ownprops) => ({
    currentPost: store.posts.loaded && ownprops.match.params.id ? store.posts.list.find(div => div.Id === ownprops.match.params.id) : null,
    posts: store.posts,
    Tags: store.Tags
})


export default connect(putStateToProps, null)(ViewPost)


