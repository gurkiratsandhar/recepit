import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setRecord }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmpassword } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        confirmpassword,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setRecord(0);
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white w-[500px] h-[500px] rounded-2xl shadow-2xl">
        <form
          className="w-full h-full flex flex-col items-center "
          onSubmit={registerUser}
        >
          <div className="my-5 ">
            <label className="text-2xl">Name:</label>
            <input
              className="ml-40 max-[480px]:ml-20 text-center border-4 rounded-xl"
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
          </div>
          <div className="my-5">
            <label className="text-2xl">Email:</label>
            <input
              className="ml-44 max-[480px]:ml-20 text-center border-4 rounded-xl"
              type="email"
              placeholder="Enter your e-mail"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />
          </div>
          <div className="my-5">
            <label className="text-2xl">Password:</label>
            <input
              className="ml-32 max-[480px]:ml-20 text-center border-4 rounded-xl"
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <div className="my-5">
            <label className="text-2xl">Confirm Password:</label>
            <input
              className="ml-10 max-[480px]:ml-0 max-[480px]:w-48 text-center border-4 rounded-xl"
              type="password"
              placeholder="Confirm your password"
              value={data.confirmpassword}
              onChange={(e) => {
                setData({ ...data, confirmpassword: e.target.value });
              }}
            />
          </div>

          <button
            className="mt-10 bg-zinc-500 w-28 h-10 rounded-2xl text-white text-xl"
            type="submit"
          >
            Submit
          </button>
          <p className="mt-10">
            Already a User?{" "}
            <Link to="/login">
              <span className="text-blue-700">Sign In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
