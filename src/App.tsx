import React from "react";
import logo from "./logo.svg";
import "./App.css";
import store, { RootState, AppDispatch } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">fdsfsd</div>
    </Provider>
  );
}

export default App;
