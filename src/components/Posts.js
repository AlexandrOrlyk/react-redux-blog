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
        sortingType: '', //name or date
        Tag: 'all',
        condition: false
    }

    selectHandleChange = (e) => {

        this.setState({
            Tag: e.target.value
        });
    }

    onChange = e => {
        this.setState({
            search: e.target.value
        })
    }

    changeSorting = (type) => {
        this.setState({
            sortingType: type,
            condition: !this.state.condition
        })

    }

    buttons = [
        { sortingType: 'name', label: 'Sort by title' },
        { sortingType: 'Date', label: 'Sort by date' }
    ]

    render() {

        const { search, sortingType, Tag } = this.state

        const buttons = this.buttons.map(({ sortingType, label }) => {
            const isActive = this.state.sortingType === sortingType;
            const clazz = isActive ? "btn-dark " : "btn-outline-dark"
            return (
                <button
                    style={{ padding: '7px 50px', marginLeft: 10 }}
                    onClick={() => this.changeSorting(sortingType)}
                    className={`btn btn-sm ${clazz}`}
                    key={sortingType}
                >{label}</button>
            )
        })
        //sort posts by category
        let sortedPostByTag = this.props.posts.list.filter(post => this.state.Tag === 'all' || post.Tag === this.state.Tag);


        //search by title from a to s with compliance LowerCase
        const filterByTitle = sortedPostByTag.filter(post => {
            return post.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })

        let sorteredPosts = [];
        switch (sortingType) {
            // sort by title from a to s with compliance LowerCase
            case 'name':
                sorteredPosts = filterByTitle.sort((a, b) => {
                    if (a.Title.toLowerCase() < b.Title.toLowerCase()) return -1;
                    if (a.Title.toLowerCase() > b.Title.toLowerCase()) return 1;
                    return 0;
                })
                break;
            case 'Date':
                sorteredPosts = filterByTitle.sort((a, b) => b.Date - a.Date)
                break;
            default:
                sorteredPosts = filterByTitle
                break;
        }

        return (
            <div>
                <div className="form-group form-inline mx-sm-3 mb-2" >
                    <select
                        style={{ margin: '15px 0' }}
                        className="custom-select"
                        value={Tag}
                        onChange={(e) => this.selectHandleChange(e)}
                    >
                        <option key='all' value='all' >All</option>
                        {this.props.Tags.list.map(tag => (
                            <option key={tag.id} value={tag.name}
                            >{tag.name}</option>

                        ))}
                    </select>
                    {buttons}
                    <input
                        style={{ maxWidth: '200px', position: 'relative', right: '-45%' }}
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
                        <div key={post.Id} className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h3 className="Title">{post.Title}</h3>
                                    <h3 className="Sub">{post.Subtitle}</h3>
                                    <h6 className="Author">{post.Author}</h6>
                                   
                                    <small className="Priority text-muted" >{post.Priority}</small>
                                    
                                    <hr />

                                    <ShowMore
                                        lines={4}
                                        more='Show more'
                                        less='Show less'
                                        formats={Posts.formats}
                                    >
                                        {renderHTML(post.Text)}
                                    </ShowMore>

                                    <p className='Tag' style={{ marginTop: '25px', border: '1px solid gray', maxWidth: 120, minHeight: 20, marginLeft: '65%', textAlign: 'center' }}>{post.Tag}</p>
                                    <div className="d-flex justify-content-between align-items-center" style={{ marginTop: '25px' }} >
                                        <div className="btn-group">
                                            <Link to={`posts/${post.Id}`}><button type="button" className="btn btn-sm btn-outline-primary"><i className="fa fa-eye"></i>  View</button></Link>
                                            <Link to={`post/${post.Id}`}><button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-ad"></i><i className="fa fa-pencil-square-o" aria-hidden="true"> Edit</i></button></Link>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => this.props.deletePost(post.Id)}><i className="fa fa-trash-o">  Delete</i></button>
                                        </div>
                                        <small className="text-muted">{post.Date.fromNow()}</small>
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
    Tags: store.Tags
})


const mapDispatchProps = (dispatch) => ({
    deletePost: (Id) => dispatch(deletePost(Id))
})

export default connect(putStateToProps, mapDispatchProps)(Posts)