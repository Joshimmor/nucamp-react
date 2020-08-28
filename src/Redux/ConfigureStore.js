import {createStore, combineReducers, applyMiddleware} from "redux";
import {createForms} from "react-redux-form";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Comments} from "./Comments";
import {Campsites} from "./Campsites";
import {Partners} from "./Partners";
import {Promotions} from "./Promotions";
import {InitalFeedback} from "./forms";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions,
      ...createForms({
        feedbackForm : InitalFeedback
      })
    }),
    applyMiddleware(thunk ,logger)
    );
    return store;
}