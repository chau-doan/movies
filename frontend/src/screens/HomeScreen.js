import React, { useReducer, useEffect } from "react";
import {Row, Col } from 'react-bootstrap';
import Movie from "../components/Movie";
import axios from "axios";
import logger from "use-reducer-logger";


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, movies: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state,loading:false, error: action.payload};
    default:
      return state;
  }
}

export default function HomeScreen(props){
  const  [{ loading, error, movies}, dispatch] = useReducer(logger(reducer), {
    movies: [],
    loading : true, 
    error: '',
  });
//  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get('/api/movies');
        dispatch({type: 'FETCH_SUCCESS', payload: result.data});
      } catch(err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
      
      //setMovies(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>List Of Movies</h1>
      <div className='movies'>
        <Row>
          {
            loading ? (
              <div>...Loading</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
            movies.map((movie) => (
            <Col key={movie.slug} sm={6} md={4} lg={3} className='mb-3'>
              <Movie movie={movie}></Movie>
            </Col>
          )))}
        </Row>
      </div>
    </div>
  )
}