import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';

//using the {} syntax is basically instantiating a constructor for the render() from the react-dom library
import {render} from 'react-dom';
import HomePage from './Components/HomePage';
import AboutPage from './Components/AboutPage';

//this "root" div in index.html is given to us by create-react-app, and is essentially the React counterpart of "@RenderBody".
//the index.js file however, is our true "entry point", the div with the Id of "root" in index.html is just where it's getting plopped in. 
render(<AboutPage/>, document.getElementById("root"));