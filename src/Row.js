/*
    In react you constantly have to create components and export them
*/

import React, { useEffect, useState } from 'react';
import axios from './axios'; // Renaming default export from axios.js. Changed from instance to axios. You can only have one default export ina file
import './Row.css';

const base_url  = "https://image.tmdb.org/t/p/original/"; // This is where you get TMDB images

/*
    Every single row is a component
    React is a component based  design
    Write one component and reuse it by passing in different props. Props standing in for properties
   
    Pass in title and fetchUrl Prop using destruction
*/

function Row({title, fetchUrl}) {

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

    return (
        <div className="row">
            <h2>{title}</h2>
            
            {/* Scroll through posters - Container with posters inside */}
            <div className="row__posters">
                {/* Several row_poster(s) */}
                {movies.map(movie => (
                    <img 
                        className="row__poster"
                        src={`${base_url}${movie.poster_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row;