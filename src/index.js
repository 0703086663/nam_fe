import { useState, StrictMode, useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Campaign from "./pages/Campaign";
import Field from "./pages/Field";
import Response from "./pages/Response";
import Survey from "./pages/Survey";
import Login from "./pages/Login";
import "./index.css";
import AuthProvider from "./auth/AuthProvider";
import AuthContext from "./auth/AuthContext";

export default function App() {
  const { currentUser, isAuthenticated } = useContext(AuthContext);
  console.log(currentUser, isAuthenticated);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {!isAuthenticated && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
      {/* <RouterProvider router={router} fallbackElement={<Campaign />} /> */}
      <Routes>
        <Route path="/" element={<Campaign />} />
        <Route path="/field" element={<Field />} />
        <Route path="/response" element={<Response />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </StrictMode>
);
