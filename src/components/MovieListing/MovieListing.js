import React from 'react'
import Slider from "react-slick";
import { useSelector } from 'react-redux'
import { settings } from '../../common/settings';
import {
  getAllMovies,
  getAllSeries
} from '../../features/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import './MovieListing.scss'

const MovieListing = () => {
  
  const movies = useSelector(getAllMovies)
  const series = useSelector(getAllSeries)
  // console.log(movies)
  // console.log(series)
  let renderMovies, renderSeries = "";
  // renderMovies
  renderMovies = movies.Response === "True"
    ?
    (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    )
    :
    (<div className="movies-err"><h3>{movies.Error}</h3></div>)
  // renderSeries
  renderSeries = series.Response === "True"
    ?
    (
      series.Search.map((series, index) => (
        <MovieCard key={index} data={series} />
      ))
    )
    :
    (<div className="series-err"><h3>{series.Error}</h3></div>)
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
        <Slider {...settings}> {renderMovies}</Slider>
        </div>
      </div>
      <div className="series-list">
        <h2>Series</h2>
        <div className="series-container">
        <Slider {...settings}> {renderSeries}</Slider>
        </div>
      </div>
    </div>
  )
}

export default MovieListing
