import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../Img/R.png";

const Navbar = ({ record, setInfo }) => {
  const [, updateSate] = useState();
  const forceUpdate = () => {
    useCallback(() => updateSate({}), []);
  };
  const [logger, setLogger] = useState(null);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setInfo(null);
    await axios.get("/logout");
    toast.success("Log Out Successful!");
    navigate("/login");
  };
  useEffect(() => {
    axios.get("/profile").then((data) => {
      setLogger(data.data);
    });
  }, [record]);

  return (
    <nav className="w-full h-20 flex items-center justify-between bg-gradient-to-r from-[#6f5cab] to-[#ad7bb6]">
      <div className="ml-20 min-[480px]:w-4/6 max-[480px]:ml-5">
        <Link to="/">
          <img src={logo} className="w-[70px] rounded-full" />
        </Link>
      </div>
      <div className="flex items-center justify-around w-full mr-10 max-[480px]:mr-5">
        <Link to="/">
          <p className="text-2xl max-[480px]:text-xl font-medium hover:text-blue-800 ">
            Home
          </p>
        </Link>
        {logger ? (
          <Link to="/dashboard">
            <p className="text-2xl max-[480px]:text-xl font-medium hover:text-blue-800 ">
              Dashboard
            </p>
          </Link>
        ) : (
          <Link to="/register">
            <p className="text-2xl max-[480px]:text-xl font-medium hover:text-blue-800 ">
              Register
            </p>
          </Link>
        )}
        {logger ? (
          <Link onClick={handleLogout}>
            <p className="text-2xl max-[480px]:text-xl font-medium hover:text-blue-800 ">
              Log Out
            </p>
          </Link>
        ) : (
          <Link to="/login">
            <p className="text-2xl max-[480px]:text-xl font-medium hover:text-blue-800 ">
              LogIn
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
