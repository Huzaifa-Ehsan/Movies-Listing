import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Header.scss'
import { store } from '../../features/store'
import { fetchAsyncMovies, fetchAsyncSeries } from '../../features/movies/movieSlice'

const Header = () => {
  const dispatch = store.dispatch;
  const [term, setTerm] = useState("")
  const sumbitHandler = (e) => {
    e.preventDefault()
    if(term === "") return alert("Please Enter Search Term!")
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncSeries(term))
    setTerm("")
    // console.log(term)
  }
  const changeHandler = (e) => { setTerm(e.target.value) }
  return (
    <div className="header">
      <div className='logo'><Link to="/" >Movie App</Link></div>
      <div className="search-bar">
        <form onSubmit={sumbitHandler}>
          <input type="text" value={term} placeholder='serach movies or series' onChange={changeHandler} />
          <button type='submit'><i className='fa fa-search'></i> </button>
        </form>
      </div>
      <div className="user-image">
        <img src={logo} alt="user" />
      </div>
    </div>
  )
}

export default Header
