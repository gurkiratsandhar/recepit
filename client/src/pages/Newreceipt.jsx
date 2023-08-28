import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Newreceipt = ({ setRecord, info }) => {
  const navigate = useNavigate();
  const [item, setitem] = useState(info);
  useEffect(() => {
    if (info) {
      localStorage.setItem("item", JSON.stringify(item));
    } else {
      setitem(JSON.parse(localStorage.getItem("item")));
    }
    setRecord(1);
  }, []);
  console.log(item);
  const saveReceipt = async () => {
    try {
      const { data } = await axios.post("/savereceipt", item);
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.removeItem("item");
        toast.success("New receipt saved.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const discardReceipt = () => {
    localStorage.removeItem("item");
    navigate("/dashboard");
  };
  return (
    <div className="w-full flex justify-center">
      {item ? (
        <div className="flex w-full flex-col items-center">
          <div className="bg-white m-3 w-96 h-[700px] rounded shadow-2xl">
            <div className="w-full flex flex-col items-center my-3">
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
                <div key={product[3] + product[1]} className="flex relative">
                  <p className="mx-4">{product[3]}</p>
                  <p className="mx-10">{product[1]}</p>
                  <p className="absolute right-4">{product[2]}</p>
                </div>
              ))}
            </div>
            <p>----------------------------------------------------</p>
            <p className="text-center mx-3 my-7">
              Some extra information to add to the footer of this docket.
            </p>
            <div>
              <div className="flex relative my-3">
                <p className="mx-4">GST(10%):</p>
                <p className="absolute right-16">{`USD ${(
                  (10 / 100) *
                  item.subtotal
                ).toFixed(2)}`}</p>
              </div>
              <div className="flex relative my-3">
                <p className="mx-4">Total amount (excl. GST):</p>
                <p className="absolute right-14">
                  {"USD " + item.subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex relative my-3">
                <p className="mx-4">Total amount (incl.GST) :</p>
                <p className="absolute right-14">
                  {"USD " + (0.1 * item.subtotal + item.subtotal).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-7">
              <div className="flex my-3">
                <p className="mx-4">Amount Received:</p>
                <p className="mx-12">
                  {"USD " + (0.1 * item.subtotal + item.subtotal).toFixed(2)}
                </p>
              </div>
              <div className="flex my-3">
                <p className="mx-4">Amount Returned:</p>
                <p className="mx-12">USD 00.00</p>
              </div>
            </div>
            <p className="text-center mx-5 mt-7">
              Final bits of text at the very base of a docket. This text wraps
              around as well!
            </p>
          </div>
          <div>
            <button
              onClick={saveReceipt}
              className="mt-5 bg-blue-600 w-48 h-10 rounded-2xl shadow-2xl text-white text-lg font-medium"
            >
              Save receipt
            </button>
            <button
              onClick={discardReceipt}
              className="mt-5 ml-3 bg-blue-600 w-48 h-10 rounded-2xl shadow-2xl text-white text-lg font-medium"
            >
              Discard receipt
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Newreceipt;
