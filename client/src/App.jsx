import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Newreceipt from "./pages/Newreceipt";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";

axios.defaults.baseURL = "https://recepit.onrender.com/";
axios.defaults.withCredentials = true;

function App() {
  const [record, setRecord] = useState(0);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const objectString = queryString.split("=")[1];
      const decodedObject = JSON.parse(decodeURIComponent(objectString));
      console.log(decodedObject);
      setInfo(decodedObject);
    }
  }, []);
  return (
    <div className="w-full h-5/6">
      <BrowserRouter>
        <Navbar record={record} setInfo={setInfo} />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/" element={<Home setRecord={setRecord} />} />
          <Route
            path="/dashboard"
            element={<Dashboard setRecord={setRecord} />}
          />
          <Route
            path="/register"
            element={<Register setRecord={setRecord} />}
          />
          <Route
            path="/login"
            element={
              <Login setRecord={setRecord} info={info} setInfo={setInfo} />
            }
          />
          <Route
            path="/newreceipt"
            element={<Newreceipt setRecord={setRecord} info={info} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
