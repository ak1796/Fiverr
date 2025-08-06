import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/AppContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { MessageContextProvider } from "./context/MessageContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MessageContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </MessageContextProvider>
  </BrowserRouter>
);
