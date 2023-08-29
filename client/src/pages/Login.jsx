import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setRecord, info }) => {
  useEffect(() => {
    setRecord(0);
    //encoded object
  }, []);

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await fetch("https://recepit.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: { email, password },
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("LogIn Successful!");
        if (info) {
          navigate("/newreceipt");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-[500px] h-[500px] rounded-2xl shadow-2xl">
        <form
          onSubmit={loginUser}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div className="my-5 ">
            <label className="text-2xl">Email:</label>
            <input
              type="email"
              className="ml-28 max-[480px]:ml-20 text-center border-4 rounded-xl"
              placeholder="Enter your e-mail"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="my-5 ">
            <label className="text-2xl">Password:</label>
            <input
              type="password"
              className="ml-20 max-[480px]:ml-16 text-center border-4 rounded-xl"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-12 bg-zinc-500 w-28 h-10 rounded-2xl text-white text-xl"
          >
            LogIn
          </button>
          <p className="mt-12">
            Don't have an account with us?
            <Link to="/register">
              <span className="text-blue-700"> Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
