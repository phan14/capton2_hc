import React from "react";
import ReactDOM from "react-dom/client";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import reportWebVitals from "./reportWebVitals";

import CreateLinkAccountProvider from "./contexts/CreateLinkAccountContext";
import ModalProvider from "./contexts/ModalContext";
import SidebarProvider from "./contexts/SidebarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SidebarProvider>
      <ModalProvider>
        <CreateLinkAccountProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CreateLinkAccountProvider>
      </ModalProvider>
    </SidebarProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
