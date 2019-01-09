import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => (
    <div
        // className="nav flex-column nav-pills"
        // id="v-pills-tab" role="tablist"
        // aria-orientation="vertical"
        // style={{
        //     margin: '5px 0',
        //     padding: '0',
        // }} 
        >
        <table className="table table-hover">
  <tbody>
    <tr>
      <th >
      <Link
            to='/categories'
            className="nav-link "
            data-toggle="pill"
            role="tab"
            style={{ color: 'black', fontSize: '14pt' }}
        > <i className="fa fa-th-list">  All categories</i>
        </Link>
      </th>
    </tr>
    <tr>
      <th >
      <Link
            to='/posts'
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            role="tab"
            style={{ color: 'black', fontSize: '14pt' }}
        ><i className="fa fa-comments-o">  All posts</i></Link>
      </th>
    </tr>
   
  </tbody>
</table>
        
        
    </div>
)

export default Sidebar
