//decide which page to render

import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./Common/Header";
import CoursesPage from "./CoursesPage";

import { Route } from "react-router-dom";

function App() {
  // function getPage() {
  //   const route = window.location.pathname;
  //   if (route === "/about") return <AboutPage />;
  //   if (route === "/courses") return <CoursesPage />;

  //   return <HomePage />;
  // }

  return (
    <div className="container-fluid">
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/about" component={AboutPage} />
    </div>
  );
}

export default App;
