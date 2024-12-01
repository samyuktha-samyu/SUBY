import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <section className='topBarSection'>
        <div className='companyTitle'>
            <Link to='/' className='link'><h2>SUBY</h2></Link>            
        </div>
        <div className='searchBar'>
            <input type='text' placeholder='Search....' />
        </div>
        <div className='userAuth'>
            <button>Login</button>
            <button>Sign Up</button>
        </div>
    </section>
  )
}

export default TopBar