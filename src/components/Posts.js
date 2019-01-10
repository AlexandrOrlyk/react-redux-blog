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
        sortingType: 'name', //or date
        category: 'all'
    }

    selectHandleChange = (e) => {
        let { category } = this.state;
        let { value } = e.target;
        category = value
        this.setState({
            category
        });
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
        //sort posts by category
        let sortedPostByCategory = this.props.posts.list.filter(post => this.state.category === 'all' || post.category === this.state.category);
        //de-structuring
        const { search, sortingType, category } = this.state
        //search by title from a to s with compliance LowerCase
        const filterByTitle = sortedPostByCategory.filter(post => {
            return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })

        let sorteredPosts = [];
        switch (sortingType) {
            // sort by title from a to s with compliance LowerCase
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
                    <select
                        style={{ margin: '15px', padding: '7px 50px' }}
                        className="custom-select"
                        value={category}
                        onChange={(e) => this.selectHandleChange(e)}
                    >
                        <option key='all' value='all' >All</option>
                        {this.props.categories.list.map(category => (
                            <option key={category.id} value={category.name}
                            >{category.name}</option>
                        ))}
                    </select>
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
                        style={{ maxWidth: '200px', position: 'relative', right: '-30%' }}
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

                                    <p className='category' style={{ marginTop: '25px', border: '1px solid gray', maxWidth: 100, minHeight: 20, marginLeft: 280, textAlign: 'center' }}>{post.category}</p>
                                    <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '25px' }} >
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



const putStateToProps = (store, ownprops) => ({
    posts: store.posts,
    categories: store.categories
})


const mapDispatchProps = (dispatch) => ({
    deletePost: (id) => dispatch(deletePost(id))
})

export default connect(putStateToProps, mapDispatchProps)(Posts)