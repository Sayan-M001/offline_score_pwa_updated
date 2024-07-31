import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/Context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider>
      <React.StrictMode>
        <ToastContainer />
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
);

serviceWorkerRegistration.register();
