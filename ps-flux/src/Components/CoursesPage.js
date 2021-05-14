import React from "react";
import { getCourses } from "../api/courseApi";

class CoursesPage extends React.Component {
  state = {
    courses: [],
  };

  //this is the proper method for making api calls
  componentDidMount() {
    getCourses().then((courses) => this.setState({ courses: courses }));
  }

  render() {
    return (
      <>
        <h2>Courses</h2>;
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author Id</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course) => {
              return (
                <tr>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default CoursesPage;
