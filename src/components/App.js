import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import { getCategories } from '../actions/categories'
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import Routing from './Routing'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class App extends Component {

    componentDidMount=()=>{
        this.props.getPosts()
        this.props.getCategories()
    }

    render() {

        return (
            
                <BrowserRouter>
                
                    <div>
                        <Header />
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-2' style={{margin:'5px 0 0 0', padding: 0, backgroundColor: '#cccccc', minHeight: '100%'}}>
                                    <Sidebar />
                                </div>
                                <div className='col-md-10' style={{margin:'5px 0 0 0', padding: '0 10px 0 0', backgroundColor: '#f2f2f2', minHeight: 1000, borderLeft: '10px solid white'}}>
                                   <Routing />
                                   <ToastContainer autoClose={800} />
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
        );
    }
}
const putStateToProps = (store, ownprops) => ({
    posts: store.posts,
    categories: store.categories
})

const mapDispatchProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts()),
    getCategories: () => dispatch(getCategories())
})


export default connect(putStateToProps, mapDispatchProps)(App)