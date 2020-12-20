import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    /*
        Add a scroll listener to the window to say that when you scroll down do something
        Use useEffect to run a piece of code based on a certain condition
    */
    useEffect(() => {
        window.addEventListener("scroll", () => { /* It's istening to a scroll*/
            if (window.scrollY > 100) { /* If the scroll along the y-axis is greater that 100 pixels */
                handleShow(true); /* Set a piece of state handleShow to be true */
            } else handleShow(false); /* Otherwise, if you are not 100 pixels downs the y-axis set it to false  */
        });
        return () => {
            window.removeEventListener("scroll"); /* Everytime a useEffect gets fired up for whatever reason, before you fire it off gain, remove the listener. That way you do not get a lot of listeners */
        };

    }, []); // We need to run the code once when the Nav bar component loads

    return  (
        <div className={`nav ${show && "nav__black"}`}> {/* Is show if true l also want to include the class nav__black */}
            {/* 
                Get Netflix Logo on Wikipedia
                alt should be context specifc 
            */}
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            {/* 
                A good exercise on how to use flexbox combined with fixed poaitioning
                Use Flexbox to take the display from a column and put it in a row
                Use object fit contain to deal with image resizing and make the sizes smaller
                Whenever dealing with images, if you want to keep the aspect ratio and make sure that the image doesn't stretch you have to use object fit contain
                Set the width and height to make it smaller and allow flexbox to determine the width between the images
                Get Netflix avatar or smiling face
                alt should be context specifc 
            */}
            <img
                className="nav__avatar"
                src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
                alt="Netflix Avatar"
            />            
        </div>
    );
}

export default Nav;