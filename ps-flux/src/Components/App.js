//decide which page to render

import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./Common/Header";
import Courses from "./CoursesPage";
import CoursesPage from "./CoursesPage";

function App() {
  function getPage() {
    const route = window.location.pathname;
    if (route === "/about") return <AboutPage />;
    if (route === "/courses") return <CoursesPage />;

    return <HomePage />;
  }

  return (
    <div class="container-fluid">
      <Header />
      {getPage()}
    </div>
  );
}

export default App;
