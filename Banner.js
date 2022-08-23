import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "./axios";
import requests from "./request";
import "./banner.css";

function Banner() {
  const [movie, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );

      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    
       fetchData();
    
   
  }, []);
  console.log(movie);

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          {/*background image*/}
          {/*title*/}
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_btn">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          {/*div> 2 buttons*/}

          <div className="banner_description">
            {movie?.overview?.length >= 30 && <p>{movie?.overview}...</p>}
          </div>
        </div>
        <div className="banner-fadeBottom"></div>
      </header>
    </>
  );
}

export default Banner;
