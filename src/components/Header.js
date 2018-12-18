import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/categories'>All categories</Link></li>
        <li><Link to='/posts'>All posts</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
