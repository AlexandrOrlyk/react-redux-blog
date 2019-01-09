import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../actions/posts'
import ShowMore from 'react-show-more';
import '../styles/Post.css'
import 'react-quill/dist/quill.snow.css'
import renderHTML from 'react-render-html'


class Posts extends Component {
    state = {
        search: '',
        sortingType: 'name' //or date
    }


    onChange = e => {
        this.setState({
            search: e.target.value
        })
    }

    changeSorting = (type) => {
        this.setState({
            sortingType: type
        })

    }

    render() {
        const { search, sortingType } = this.state
        const filterByTitle = this.props.posts.list.filter(post => {
            return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })

        let sorteredPosts = [];
        switch (sortingType) {
            case 'name':
                sorteredPosts = filterByTitle.sort((a, b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    return 0;
                })
                break;
            case 'date':
                sorteredPosts = filterByTitle.sort((a, b) => b.date - a.date)
                break;
            default:
                sorteredPosts = filterByTitle
                break;
        }

        return (
            <div>
                <div className="form-group form-inline mx-sm-3 mb-2" >
               <button
                    style={{ padding: '7px 50px' }}
                    onClick={() => this.changeSorting('name')}
                    className="btn btn-sm btn-outline-secondary"
                    
                ><i className="fa fa-sort-alpha-asc">  Ordered by title</i></button>
                <button
                    style={{ margin: '15px', padding: '7px 50px' }}
                    onClick={() => this.changeSorting('date')}
                    className="btn btn-sm btn-outline-dark"
                ><i className="fa fa-sort-amount-asc"></i>  Order by date</button>
                <input
                    style={{ maxWidth: '200px', position: 'relative', right: '-47%' }}
                    className="form-control"
                    type="search"
                    placeholder="Search "
                    onChange={this.onChange}
                    
                />
                </div>
                
                <div className='row'>
                    <div className="col-md-4">
                        <Link to='/post/new'>
                            <button type="button" className="btn btn-sm btn-outline-secondary btnstyle"  >
                            <i className="fa fa-plus fa-3x"></i>
                            </button>
                        </Link>
                    </div>
                    {this.props.posts.loaded && sorteredPosts.map(post => (
                        <div key={post.id} className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h3><p className="title">{post.title}</p></h3>
                                    <h6><p className="author">{post.author}</p></h6>
                                    <hr />

                                    <ShowMore

                                        lines={4}
                                        more='Show more'
                                        less='Show less'
                                        formats={Posts.formats}
                                    >
                                        {renderHTML(post.body)}
                                    </ShowMore>
                                    
                                    <div className="d-flex justify-content-between align-items-center" style={{marginTop: '25px'}} >
                                        <div className="btn-group">
                                            <Link to={`posts/${post.id}`}><button type="button" className="btn btn-sm btn-outline-primary"><i className="fa fa-eye"></i>  View</button></Link>
                                            <Link to={`post/${post.id}`}><button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-ad"></i><i className="fa fa-pencil-square-o" aria-hidden="true"> Edit</i></button></Link>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.props.deletePost(post.id)}><i className="fa fa-trash-o">  Delete</i></button>
                                        </div>
                                        <small className="text-muted">{post.date.fromNow()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}




                </div>
            </div>

        )
    }
}

Posts.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'lists', 'bullet',
    'link', 'image',
    'clean',
    'code-block'
]

const putStateToProps = (store, ownprops) => ({
    posts: store.posts
})


const mapDispatchProps = (dispatch) => ({
    deletePost: (id) => dispatch(deletePost(id))
})

export default connect(putStateToProps, mapDispatchProps)(Posts)