import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Campaign from "./pages/Campaign";
import Field from "./pages/Field";
import Response from "./pages/Response";
import Survey from "./pages/Survey";
import Login from "./pages/Login";
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
