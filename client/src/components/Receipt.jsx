import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FiShare } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Receipt = ({ item }) => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const layOverlay = () => {
    setOverlay(true);
    console.log(item);
  };
  const closeOverlay = () => {
    setOverlay(false);
    setConfirmation(false);
  };
  const displayConfirm = () => {
    setConfirmation(true);
  };
  const deleteReceipt = async () => {
    const {
      _id,
      amountReceived,
      amountReturned,
      date,
      gst,
      name,
      orderNumber,
      products,
      storeAddress,
      storeName,
      storeWebsite,
      totalNogst,
      totalWithgst,
    } = item;
    try {
      const { data } = await axios.post("/deletereceipt", { _id });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Receipt Deleted");
        setOverlay(false);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={layOverlay}
      className="bg-white relative m-3 w-96 h-[700px] inline-block cursor-pointer min-[680px]:hover:scale-105 ease-in-out duration-300 rounded shadow-2xl max-[480px]:h-[600px]"
    >
      {overlay && (
        <div className="bg-black w-96 h-[700px] max-[480px]:h-[600px] absolute opacity-100 cursor-default">
          <MdDeleteForever
            fontSize={"100px"}
            color={confirmation ? "red" : "white"}
            className={
              confirmation
                ? "absolute top-[300px] left-[150px] cursor-default"
                : "absolute top-[300px] left-[150px] cursor-pointer"
            }
            onClick={displayConfirm}
          />
          {/* <FiShare
            fontSize={"70px"}
            color="white"
            className="absolute top-[310px] left-[250px] cursor-pointer"
          /> */}
          <AiOutlineClose
            fontSize={"40px"}
            color="white"
            className="absolute right-3 top-3 cursor-pointer"
            onClickCapture={closeOverlay}
          />
          {confirmation && (
            <div
              onClick={deleteReceipt}
              className="text-white text-2xl absolute top-[405px] left-[160px] cursor-pointer"
            >
              Delete?
            </div>
          )}
        </div>
      )}
      <div>
        <div className="w-full flex flex-col items-center my-3 max-[480px]:my-0">
          <p>{item.storeName}</p>
          <p>{item.storeAddress}</p>
          <p>{item.storeWebsite}</p>
        </div>
        <div className="ml-4">
          <p>Order Number: {item.orderNumber}</p>
          <p>
            Date:{"  "}
            {`${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}`}
          </p>
        </div>
        <p>----------------------------------------------------</p>
        <div className="flex">
          <p className="mx-4">Qty</p>
          <p className="mx-6">Product</p>
          <p className="mx-40">Total</p>
        </div>
        <p>----------------------------------------------------</p>
        <div>
          {item.products.map((product) => (
            <div key={product._id} className="flex relative">
              <p className="mx-4">{product.quantity}</p>
              <p className="mx-10">{product.product}</p>
              <p className="absolute right-4">{product.total}</p>
            </div>
          ))}
        </div>
        <p>----------------------------------------------------</p>
        <p className="text-center mx-3 my-3 max-[480px]:my-0">
          Some extra information to add to the footer of this docket.
        </p>
        <div>
          <div
            className={
              overlay ? "hidden" : "flex relative my-1 max-[480px]:my-1"
            }
          >
            <p className="mx-4">GST(10%):</p>
            <p className="absolute right-16">USD {item.gst}.00</p>
          </div>
          <div
            className={
              overlay ? "hidden" : "flex relative my-3 max-[480px]:my-1"
            }
          >
            <p className="mx-4">Total amount (excl. GST):</p>
            <p className="absolute right-14">USD {item.totalNogst}.00</p>
          </div>
          <div
            className={
              overlay ? "hidden" : "flex relative my-3 max-[480px]:my-1"
            }
          >
            <p className="mx-4">Total amount (incl.GST) :</p>
            <p className="absolute right-14">USD {item.totalWithgst}.00</p>
          </div>
        </div>
        <div className="mt-5 max-[480px]:mt-1">
          <div className="flex my-3 max-[480px]:my-1">
            <p className="mx-4">Amount Received:</p>
            <p className="mx-12">USD {item.amountReceived}.00</p>
          </div>
          <div className="flex my-3 max-[480px]:my-1">
            <p className="mx-4">Amount Returned:</p>
            <p className="mx-12">USD {item.amountReturned}.00</p>
          </div>
        </div>
        <p className="text-center mx-5 mt-3 max-[480px]:mt-0">
          Final bits of text at the very base of a docket. This text wraps
          around as well!
        </p>
      </div>
    </div>
  );
};

export default Receipt;
