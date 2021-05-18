import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";

//storage for course data
let _courses = [];

class CourseStore extends EventEmitter {
  //every store has 3 distinct functions
  addChangeListener(callback) {
    //this "on" method comes from EventEmitter
    this.on(CHANGE_EVENT, callback);
  }

  //then implement removeChange
  removeChangeListener(callback) {
    //this allows react functions to unsubscribe from this store
    this.removeListener(CHANGE_EVENT, callback);
  }

  //then add the emitChange
  emitChange() {
    //emit comes from EventEmitter
    this.emit(CHANGE_EVENT);
  }

  //expose stores data
  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find((course) => course.slug === slug);
  }
}

//dont forget to instantiate since this is a class...
const store = new CourseStore();

//every store registered with the dispatcher gets notified
Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      //this is the payload that got dispatched from courseActions in dispatcher.Dispatch()
      _courses.push(action.course);
      //then emit change
      store.emitChange();
      break;

    case actionTypes.UPDATE_COURSE:
      //so this iterates over all the courses, and if the id in the action is the same is the id of the course we're looking at
      //so if it exists, then update it, if not, create it (do nothing)
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      break;

    case actionTypes.LOAD_COURSES:
      _courses = action.course;
      store.emitChange();
      break;

    case actionTypes.DELETE_COURSE:
      //step 3 - store
      debugger;
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;

    default:
    //nothing to do here, because if there was a different store listening in on emitChange, then it would matter there, not here
    //since all stores listen to the dispatcher
  }
});
export default store;
