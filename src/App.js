import React, { Component } from "react";
import Main from "./components/MainComponent";
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';

const store = configureStore()

class App extends Component {
  render() {
    return (<Provider store={store}><BrowserRouter><Main /></BrowserRouter></Provider>);
  }
}

export default App;
