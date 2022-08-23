import React, { useEffect, useState } from "react";
import instance from "./axios.js";
import axios from "axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState([])
  //a snippet of code which runs based on a soecific condition/variable

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        `https://api.themoviedb.org/3${fetchUrl}`
      );
      setMovies(request.data.results);
      return request;
    };
    
    fetchData();
  }, [fetchUrl]);
  console.log(movies);
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters;
        autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    }
    else {
      movieTrailer(movie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl( urlParams.get('v'))
      }).catch(error=>console.log(error))

      }
    }
   
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {/* several row posters*/}
        {movies.map((movie) => (
          <img
            className= {`row_poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`https://image.tmdb.org/t/p/original/${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
          />
        ))}
      </div>
      <div className="trailer">
      {/*container -> posters*/}
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    </div>
);
}


export default Row;
