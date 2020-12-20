import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
    /*
        The purpose of the state is simple. It is responsible for whatever movie is selected at the top.
        Everytime you refresh the page you get a new random movie.
        All of the random movies will be from Netflix Originals, but you can change it to trending, top rated e.t.c
    */
    const [movie, setMovie] = useState([]);

    /*
        A useEffect is a piece of code that runs based on a given condition.
    */
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            /* 
                Randomly select movies 
            */
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []); /* Run once when the banner loads */
    
    // Sanity check
    console.log(movie);
    
    /* 
        Truncate text and add the three dots 
        Truncate the string str after n characters
    */
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        /* 
            Give the header a background image
            Why did we not put the header inside the div?
            Mainly due to separation of concerns when defining styling rules
                - the header is responsible for the background image
                - whereas the div is responsible for the banner's button and text content 
            In react you can add javascript css and insert an object inside the curly brackets
            Given the base url for any picture, go and get the backdrop path. Not the poster image that we've been seeing on Netflix Originals but the trending image
            The question mark is for if the movie is undefined it won't freak out but handle it elegantly
            The question mark is called optional training
            I want a div with banner buttons, I want to have have a button with banner__buttons and make the two of those - div.banner__buttons>button.banner__buttons*2
        */
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        > 
            <div className="banner__contents">

                {/* title - some moviies give you a title, name or original name. Some APIs do not always give you consistent information. It's a matter of finding the edge cases */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                {/* div containing 2 buttons */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                {/* description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            
            {/* 
                Blank div to add a smooth fading effect 
                The only purpose is to make it look nice and fade into the bottom
            */}
            <div className="banner--fadeBottom"/>

        </header>
    ); 
}

export default Banner;