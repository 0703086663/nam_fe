import { useState } from "React";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Campaign from "./pages/Campaign";
import Field from "./pages/Field";
import Response from "./pages/Response";
import Survey from "./pages/Survey";
import "./index.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* {!loggedIn && <Route path="/" element={<Login />} />} */}

        {loggedIn && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Campaign />} />
            <Route path="field" element={<Field />} />
            <Route path="response" element={<Response />} />
            <Route path="survey" element={<Survey />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
