import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from '../../common/API/MovieApi'
import { MovieApiKey } from '../../common/API/MovieApiKey'



export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    // const movieText = "Heaven";
    const response = await MovieApi.get(`?apiKey=${MovieApiKey}&s=${term}&type=movie`);
    return response.data
})

export const fetchAsyncSeries = createAsyncThunk('movies/fetchAsyncSeries', async (term) => {
    // const seriesText = "Hollywood";
    const response = await MovieApi.get(`?apiKey=${MovieApiKey}&s=${term}&type=series`);
    return response.data
})

export const fetchAsyncDetail = createAsyncThunk('movies/fetchAsyncDetail', async (id) => {
    const response = await MovieApi.get(`?apiKey=${MovieApiKey}&i=${id}&plot=full`);
    return response.data
})

export const STATUS = Object.freeze({
    SUCCESS: 'succes',
    ERROR: 'error',
    LOADING: 'loading',
})


const initialState = {
    movies: {},
    series: {},
    selectedMovieOrSeries: {},
    status: STATUS.SUCCESS
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        // addMovies: (state, { payload }) => {
        //     state.movies = payload
        //     // console.log(payload)
        // }
        removeSelectedMovieOrSeries: (state) => {
            state.selectedMovieOrSeries = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                console.log("Pending");
                state.status = STATUS.LOADING
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                console.log("Fetched Movies");
                state.movies = payload
                state.status = STATUS.SUCCESS
            })
            .addCase(fetchAsyncMovies.rejected, (state) => {
                console.log("rejected");
                state.status = STATUS.ERROR
            })
            .addCase(fetchAsyncSeries.fulfilled, (state, { payload }) => {
                console.log("Fetched Series");
                state.series = payload
                state.status = STATUS.SUCCESS
            })
               
            .addCase(fetchAsyncDetail.fulfilled, (state, { payload }) => {
                console.log("Fetched Selected Movie or Series");
                state.selectedMovieOrSeries = payload
                state.status = STATUS.SUCCESS
            })
    }

})

// export const { addMovies } = movieSlice.actions;
export const { removeSelectedMovieOrSeries } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllSeries = (state) => state.movies.series;
export const getAllStatus = (state) => state.movies.status;
export const getAllDetailSelectedMovieOrSeries = (state) => state.movies.selectedMovieOrSeries;
export default movieSlice.reducer;