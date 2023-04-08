import React, { useEffect } from 'react'
import './MovieDetail.scss'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAsyncDetail, getAllDetailSelectedMovieOrSeries, removeSelectedMovieOrSeries } from '../../features/movies/movieSlice';
import { store } from '../../features/store';

const MovieDetail = () => {
  const { imbdID } = useParams();
  // console.log(imbdID)
  const dispatch = store.dispatch;
  const data = useSelector(getAllDetailSelectedMovieOrSeries)
  // console.log(data)

  useEffect(() => {
    dispatch(fetchAsyncDetail(imbdID));
    return () => {
      dispatch(removeSelectedMovieOrSeries())
    }

  }, [dispatch, imbdID])
  return (

    <div className="movie-section">
      {Object.keys(data).length === 0 ?
        (
          <div > <h2 className='loading-bar'> Loading...</h2></div>
        )
        : (
          <>
        <div className="section-left">
        <div className="movie-title">{data.Title}</div>
        <div className="movie-rating">
          <span>IMBD Rating <i className='fa fa-star'></i> {data.imdbRating}</span>
          <span>IMBD Votes <i className='fa fa-thumbs-up'></i> {data.imdbVotes}</span>
          <span>Runtime <i className='fa fa-film'></i> {data.Runtime}</span>
          <span>Year <i className='fa fa-calendar'></i> {data.Year}</span>
        </div>
        <div className="movie-plot">{data.Plot}</div>
        <div className="movie-info">
          <div>
            <span>Director</span>
            <span>{data.Director}</span>
          </div>
          <div>
            <span>Actors</span>
            <span>{data.Actors}</span>
          </div>
          <div>
            <span>Genres</span>
            <span>{data.Genre}</span>
          </div>
          <div>
            <span>Languages</span>
            <span>{data.Language}</span>
          </div>
          <div>
            <span>Awards</span>
            <span>{data.Awards}</span>
          </div>
        </div>
      </div>
      <div className="section-right">
        <img src={data.Poster} alt={data.Title} />
      </div>
      </>
        )
      }
    </div>

  )
}

export default MovieDetail
