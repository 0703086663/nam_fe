import { useState, StrictMode, useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Campaign from "./pages/Campaign";
import Field from "./pages/Field";
import Response from "./pages/Response";
import Survey from "./pages/Survey";
import CreateResponse from "./pages/CreateResponse";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./index.css";
import AuthProvider from "./auth/AuthProvider";
import AuthContext from "./auth/AuthContext";
import AuthGuard from "./auth/Authorize";
import Header from "./components/Header";

export default function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      {currentUser && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route
          path="/survey/:surveyId"
          element={
            <AuthGuard>
              <CreateResponse />
            </AuthGuard>
          }
        />
        <Route
          path="/campaign"
          element={
            <AuthGuard>
              <Campaign />
            </AuthGuard>
          }
        />
        <Route
          path="/field"
          element={
            <AuthGuard>
              <Field />
            </AuthGuard>
          }
        />
        <Route
          path="/response"
          element={
            <AuthGuard>
              <Response />
            </AuthGuard>
          }
        />
        <Route
          path="/survey"
          element={
            <AuthGuard>
              <Survey />
            </AuthGuard>
          }
        />
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
