import React, { useEffect } from "react";

const Home = ({ setRecord }) => {
  useEffect(() => {
    setRecord(0);
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-5xl max-[720px]:text-3xl">
      <div className="font-semibold bg-white w-[800px] h-60 flex flex-col items-center justify-center rounded-2xl shadow-xl max-[720px]:w-[600px] max-[500px]:w-[400px]">
        <p className="w-full text-center">Welcome to Recpeits.com</p>
        <p className="mt-7 font-normal w-full text-center">
          Keep track of your spendings.
        </p>
      </div>
    </div>
  );
};

export default Home;
