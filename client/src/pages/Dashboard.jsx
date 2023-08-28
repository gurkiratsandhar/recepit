import React, { useState, useEffect } from "react";
import axios from "axios";
import Receipt from "../components/Receipt";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Dashboard = ({ setRecord }) => {
  const [scrollable, setScrollable] = useState(null);
  const [logger, setLogger] = useState(null);
  const [receipts, setReceipts] = useState([]);

  //useEffect on component mount
  useEffect(() => {
    //get data
    if (!logger) {
      axios.get("/profile").then((data) => {
        setLogger(data.data);
      });
      axios.get("/receipts").then((data) => {
        setReceipts(data.data);
      });
    }
    setRecord(1);
  }, []);

  //useEffect on receipt update
  useEffect(() => {
    //set scrollability
    const totalreceiptLength = receipts.length * 384;
    if (totalreceiptLength >= window.innerWidth) {
      setScrollable(0);
    } else {
      setScrollable(1);
    }
  }, [receipts]);

  console.log(receipts);
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  window.addEventListener("resize", () => {
    var slider = document.getElementById("slider");
    if (slider.scrollWidth > slider.clientWidth) {
      setScrollable(0);
    } else {
      setScrollable(1);
    }
  });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col justify-center items-center bg-white mt-3 rounded-2xl shadow-2xl w-[550px] max-[480px]:w-[410px]">
        <h1 className="text-5xl font-medium my-3">Dashboard</h1>
        {!!logger && (
          <h1 className="text-3xl text-center max-[480px]:text-2xl">
            Hi {logger.name}!{" "}
            {receipts.length > 0
              ? "Here are your receipts."
              : "You have no saved receipts."}
          </h1>
        )}
      </div>

      <div className="relative w-full h-full flex items-center mt-3">
        {receipts.length > 2 ? (
          <MdChevronLeft
            fontSize={"60px"}
            className="max-[680px]:hidden opacity-100 cursor-pointer hover:scale-125 ease-in-out duration-300 bg-white rounded-full shadow-xl"
            onClick={slideLeft}
          />
        ) : (
          ""
        )}

        <div
          id="slider"
          className=" w-full h-full overflow-x-scroll overflow-y-hidden scroll-smooth scrollbar-hide bg-[#ad7bb6] bg-opacity-10"
        >
          <div
            className={
              scrollable == 0
                ? "w-full h-full flex flex-nowrap"
                : "w-full h-full flex flex-nowrap justify-center"
            }
          >
            {receipts.map((receipt) => (
              <Receipt item={receipt} key={receipt._id} />
            ))}
          </div>
        </div>

        {receipts.length > 2 ? (
          <MdChevronRight
            fontSize={"60px"}
            className="max-[680px]:hidden opacity-100 cursor-pointer hover:scale-125 ease-in-out duration-300 bg-white rounded-full shadow-xl"
            onClick={slideRight}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dashboard;
