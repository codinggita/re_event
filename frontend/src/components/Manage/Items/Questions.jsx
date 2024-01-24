import React, { useState } from "react";
import img from "./question.png";
import { FaPlus } from "react-icons/fa";

const Questions = () => {
  const [question, setQuestion] = React.useState("false");

  const handleClick = () => {
    setQuestion("true");
  };
  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <h1 className=" text-xl"> Registration Questions</h1>
        <div className="bg-[#1E1F21] h-[20rem] p-3 w-full flex  flex-col items-center gap-5  rounded-xl ">
          <img
            src={img}
            alt=""
            className=" invert w-[10rem] h-[10rem] opacity-50 mx-auto"
          />
          <h1 className=" w-[70%]   text-center">
            When a guests registers for your event, they will be asked to answer
            the following questions.
          </h1>
          <button
            className="bg-zinc-800 hover:scale-105 text-white/50  hover:bg-zinc-300   flex items-center gap-2 hover:text-black/80   transition-all rounded-lg px-4 py-2"
            onClick={handleClick}
          >
            <FaPlus className="   text-xl" />
            <h1 className=" ">Add Question</h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Questions;
