import React, { useEffect } from 'react'
import { fetchAsyncMovies, fetchAsyncSeries, getAllStatus } from '../../features/movies/movieSlice';
import MovieListing from '../MovieListing/MovieListing'
import { store } from '../../features/store'
import { STATUS } from '../../features/movies/movieSlice';
import { useSelector } from 'react-redux';
import "./Home.scss"
/* import MovieApi from '../../common/API/MovieApi'
import { MovieApiKey } from '../../common/API/MovieApiKey'
import { addMovies } from '../../features/movies/movieSlice' */
const Home = () => {
  const status= useSelector(getAllStatus)
  const dispatch = store.dispatch;
  const movieText = "Heaven";
  const seriesText = "Hollywood";
  useEffect(() => {
    /* const fetchMovies = async () => {
      const response = await MovieApi.get(`?apiKey=${MovieApiKey}&s=${movieText}&type=movie`).catch((err) => {
        console.log("Error: ", err)
      })
      // console.log(response.data)
      dispatch(addMovies(response.data))
    }
    fetchMovies() */
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncSeries(seriesText))
  }, [dispatch])

  if (status === STATUS.LOADING) {
    return <h2 className='status-loading'>Loading...</h2>
  }
  if (status === STATUS.ERROR) {
    return <h2 className='status-err'>Something went wrong!</h2>
  }

  return (
    <div>
      <div className="banner-image"></div>
      <MovieListing />
    </div>
  )
}

export default Home
