import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import { Provider } from "react-redux";
import { store } from "./store";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)