/*
    In react you constantly have to create components and export them
*/

import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios'; // Renaming default export from axios.js. Changed from instance to axios. You can only have one default export ina file
import './Row.css';

const base_url  = "https://image.tmdb.org/t/p/original/"; // This is where you get TMDB images

/*
    Every single row is a component
    React is a component based  design
    Write one component and reuse it by passing in different props. Props standing in for properties
   
    Pass in title and fetchUrl Prop using destruction
*/

function Row({title, fetchUrl, isLargeRow}) {

    /*
        Use state to keep track of movies
        State is similar to short term memory. 
        When we refresh it disappears
        It's a very good place to store some information
        State is a way to write variables in React

        We use React Hooks. Hooks are little functional pieces of code that make our lives easier in React e.g. useState
        Inside the brackets you give an initial value in this instance we pass an empty array   
    */
    const [movies, setMovies] = useState([]); // Inside the brackets you give an initial value in this instance we pass an empty array

    const [trailerUrl, setTrailerUrl] = useState("");

    /*
       A snippet of code which runs based on a specific condition or variable

       The first argument is a function
       The second argument is an empty array
       If we leave the second argument blank (empty array) we are saying run once when the row loads, and don't run it again - Only on page load
       Else of we pass in a variable movies e.g. [movies], run once when the row loads and run every single time when movies changes - On page load and when the variable movies changes

    */
    useEffect(() => {
        // Make an asynchronus call inside useEffect. However, you have to do it in a special way
        //Write a little internal function and call it
        // That's how you do it inside a useEffect
        async function fetchData() {
            //await - When you make the request wait for the promise or answer to come back then do something
            const request = await axios.get(fetchUrl); // Similar to append https://api.themoviedb.org/3/trending/all/week?api_key=f969f8853cfd7c8afab42fa245dd5a85&language=en-US
            console.log(request); // Finding out the data structure
            setMovies(request.data.results);
            return request;
        } 
        fetchData();
    // Whenever any variable is pulled from outside of the useEffect block and used inside the useEffect you have to pass it in the second argument
    // The reason being that useEffect is dependent on that variable (fetchUrl in this instance)
    }, [fetchUrl]);

    // Sanity check
    console.log(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtubw/player_parameters
            autoplay: 1, // Autoplay when it loads in
        }
    };
    

    // When the user clicks on the picture we pass in the movie
    const handleClick = (movie) => {
        //If the video was already open and you click on that picture, set the trailer url to be empty. In that way it closes it (the video pop up trailer) clear it and hide the video
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            /*
                movieTrailer is an npm module and someone else created this
                If we pass in a name it is going to try and find a youtube traile for it
                Sometimes the name is undefined
            */
            movieTrailer(movie?.name || "")
                /*
                    Then that's going to give us a url
                    This is a promise
                    And we are goign to do something about it
                */
                .then((url) => {
                    /*
                        This gives us the full url e.g. https://www.youtube.com/watch?v=E0WASUD9veY
                        But we only want E0WASUD9veY, that we get using new URL(url).search
                        And wrap everything inside  a URL search parameter new URLSearchParams
                        The urlSearchParameter allows us to do a get
                    */
                   const urlParams = new URLSearchParams(new URL(url).search);
                   setTrailerUrl(urlParams.get('v')); // urlParams.get('v') is going to give us the value linke dot v (E0WASUD9veY)
                })
                /*
                    Or it's going to catch an error and we are going to log it to see what the specific error
                */
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            
            {/* Scroll through posters - Container with posters inside */}
            <div className="row__posters">
                {/* Several row_poster(s) */}
                {movies.map(movie => (
                    <img 
                        /* 
                            Optimisation
                            In react, whenever we render a big list we should be rendering it in the most efficient way 
                            We have something called a key which is unique to that element
                            Pass specific information which is unique to that element (in our case we have pictures). 
                            We need to give each and every one of those pictues an identity such that if anything changes in that Row, React simply doesn't re-render the entire row but it just re-renders what it needs to render
                        */
                        key={movie.id}
                        
                        /*
                            The movie that you click on is going to be passed on into this function
                        */
                        onClick={() => handleClick(movie)}

                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} /* Everything that is in a poster class, but if it's a large row then l'm going ooing to give it an extra class called row__posterLarge. You have the bigger styles if you have the largerRow */
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} /* If you are using a large row then use the postal path else use the movie.backdrop_path path but the size differs. We apply a class based on the isLargeRow */ 
                        alt={movie.name}
                    />
                ))}
            </div>
            {/*
                Take a video id and some options: we basically need to give it a video id
                If l go to youtube and grab a video id e.g. E0WASUD9veY -  <YouTube videoId="E0WASUD9veY" opts={opts} /> 
                We need a piece of state that's going to get the trailer url
                When we have a trailerUrl then get a Youtube video
            */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;