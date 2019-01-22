import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

//import './posteditor.css'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { addPost, editPost } from '../actions/posts';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';


class PostEditor extends Component {

    state = {
        post: this.props.currentPost !== null ?
            this.props.currentPost :
            {
                Title: '',
                Author: '',
                Date: moment(),
                Text: '',
                Tag: '',
                Priority: '',
                Subtitle: ''
            },
    };

    //Fixing error after update page
  
    componentWillReceiveProps = (nextProps) => {
  //this.props.match.params.id - Error checking when creating a new post 
        if (this.props.match.params.id && !this.props.posts.loaded && nextProps.posts.loaded) {
            let currentPost = nextProps.posts.list.find(div => div.Id === this.props.match.params.id);
            this.setState({ post: currentPost })
        }
    }

    dataHandleChange = (e) => {
        let { post } = this.state;
        post.Date = moment(e)
        this.setState({
            post

        });

    }

    selectHandleChange = (e) => {
        let { post } = this.state;
        let { value } = e.target;
        post.category = value
        this.setState({
            post
        });
    }


    onChangeText = (e) => {
        let { post } = this.state;
        post.Text = e
        this.setState({
            post
        })
    }

    onChangeValue = (e) => {
        let { post } = this.state;
        let { name, value } = e.target;
        post[name] = value;
        this.setState({
            post
        })
    }

    onHandleSubmit = () => {
        let { post } = this.state;
        this.props.currentPost === null?
            this.props.addPost(post) :
            this.props.editPost(post);
        this.props.history.push('/posts');
    }

    render() {
        if (!this.props.posts.loaded) return null;

        const { post } = this.state;
        return (
            <div style={{ width: '50%' }}>
                <h1>Create Post</h1>
                <div>
                    <h4>Title</h4>
                    <input
                        name='Title'
                        type="text"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-default"
                        value={post.Title}
                        maxLength={23}
                        onChange={(e) => this.onChangeValue(e)}
                    />
                    <h4>Subtitle</h4>
                    <input
                        name='Subtitle'
                        type="text"
                        className="form-control"                        
                        aria-describedby="inputGroup-sizing-default"
                        value={(post.Subtitle)?post.Subtitle:''}
                        maxLength={23}
                        onChange={(e) => this.onChangeValue(e)}
                    />
                </div>
                <div>
                    <h4>Author`s name</h4>
                    <input
                        name='Author'
                        type="text"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-default"
                        value={post.Author}
                        maxLength={25}
                        onChange={(e) => this.onChangeValue(e)}
                    />
                </div>
                <div>
                    <h4>Priority</h4>
                    <input
                        name='Priority'
                        type="text"
                        className="form-control"
                        aria-describedby="inputGroup-sizing-default"
                        value={post.Priority}
                        maxLength={25}
                        onChange={(e) => this.onChangeValue(e)}
                    />
                </div>
                <div>
                    <h4>Date of creation</h4>
                    <DatePicker
                        name='Date'
                        onChange={this.dataHandleChange}
                        value={post.Date.format('DD-MM-YYYY')}
                    />
                </div>
                <div>

                    <h4>Post</h4>
                    <ReactQuill
                        style={{
                            background: "#fefcfc"
                        }}
                        theme={'snow'}
                        modules={PostEditor.modules}
                        formats={PostEditor.formats}
                        placeholder='Enter text'
                        value={post.Text}
                        onChange={(e) => this.onChangeText(e)}
                    />
                </div>
                <div>
                    <h4>Tags</h4>
                    <select
                        
                        className="custom-select"
                        value={post.Tags}
                        onChange={(e) => this.selectHandleChange(e)}
                        
                    >
                        {this.props.Tags.loaded && this.props.Tags.list.map(tag => (
                            <option key={tag.id} value={tag.name}
                            >{tag.name}</option>
                        ))}
                    </select>
                    <Select>
                    </Select>
                </div>
                <button
                    onClick={this.onHandleSubmit}
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    style={{ margin: '10px' }}><i className="fa fa-paper-plane-o" aria-hidden="true"></i>  Submit
                    </button>
            </div>
        );
    }
}
PostEditor.modules = {
    
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'lists': 'ordered' }, { 'lists': 'bullet' }],
        ['link', 'image'],
        ['clean'],
        ['code-block']
    ]
}

PostEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'lists', 'bullet',
    'link', 'image',
    'clean',
    'code-block'
]

//check whether it is caught with a click id, which will allow you to understand to create a new post if the id was not detected or edited post
const putStateToProps = (store, ownprops) => ({
    currentPost: store.posts.loaded && ownprops.match.params.id ? store.posts.list.find(div => div.Id === ownprops.match.params.id) : null,
    posts: store.posts,
    Tags: store.Tags
})

//
const mapDispatchProps = (dispatch) => ({
    addPost: (post) => dispatch(addPost(post)),
    editPost: (post) => dispatch(editPost(post))
})

export default connect(putStateToProps, mapDispatchProps)(PostEditor)