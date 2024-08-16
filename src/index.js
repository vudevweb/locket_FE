import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <GlobalStyles>
            <App />  
            {/* <Footer /> */}
        </GlobalStyles>
    </AuthProvider>,
);

reportWebVitals();
