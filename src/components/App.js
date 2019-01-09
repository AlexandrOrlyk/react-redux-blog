import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/posts'
import { getCategories } from '../actions/categories'
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'
import Sidebar from './Sidebar'
import Routing from './routing'
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {

    componentDidMount=()=>{
        this.props.getPosts()
        this.props.getCategories()
    }

    render() {

        return (
            <React.Fragment>
                <BrowserRouter>
                    <div>
                        <Header />
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-2' style={{margin:'5px 0 0 0', padding: 0, backgroundColor: '#cccccc'}}>
                                    <Sidebar />
                                </div>
                                <div className='col-md-10' style={{margin:'5px 0 0 0', padding: 0, backgroundColor: '#f2f2f2', borderLeft: '10px solid white'}}>
                                   <Routing />
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
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