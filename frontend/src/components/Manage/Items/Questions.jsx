import React, { useState } from "react";
import img from "./question.png";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "text",
    required: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setNewQuestion({ text: "", type: "text", required: false });
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  };

  return (
    <>
      <h1 className="text-xl block pl-10"> Registration Questions</h1>
      <div className="py-5 px-10 items-center flex flex-col gap-8">
        {questions.length > 0 ? (
          <div className="bg-[rgb(30,31,33)] h-full py-3 w-[90%] gap-5 rounded-xl">
            {questions.map((q, index) => (
              <div
                key={index}
                className="px-10 justify-center pt-5 flex flex-col gap-4"
              >
                <input
                  className="w-full h-full bg-zinc-800 outline-none text-white/50 border border-zinc-400/60 rounded-lg px-4 py-2"
                  type={q.type}
                  placeholder={`Question ${index + 1}`}
                />
                <div className="flex justify-between gap-10">
                  <div className="flex gap-5">
                    <select
                      className="outline-none h-full select-none bg-zinc-700 text-zinc-400 border-2 border-zinc-500/60 rounded-xl px-2 py-1.5"
                      name="type"
                      id={`type-${index}`}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <option value="text" className=" text-white">
                        Text
                      </option>
                      <option value="Long text" className=" text-white">
                        Long text
                      </option>
                      <option value="Checkbox" className=" text-white">
                        Checkbox
                      </option>
                      <option value="Single select" className=" text-white">
                        Single select
                      </option>
                      <option value="Multiple select" className=" text-white">
                        Multiple select
                      </option>
                      <option value="Url" className=" text-white">
                        Url
                      </option>
                      <option value="Date" className=" text-white">
                        Date
                      </option>
                    </select>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name={`required-${index}`}
                        id={`required-${index}`}
                        onChange={(e) => handleInputChange(e, index)}
                        className="w-4 h-4 caret-slate-500"
                      />
                      <div className="flex text-zinc-400  flex-col">
                        <label
                          htmlFor={`required-${index}`}
                          className="text-md"
                        >
                          Required
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 hover:scale-105 text-white/80 hover:bg-red-600 flex items-center gap-2 hover:text-white transition-all rounded-lg px-4 py-2"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </div>
                </div>
                <hr className="border-zinc-500/60 " />
              </div>
            ))}
            <div className=" flex justify-between px-5 py-3">
              <button
                className="bg-zinc-800 mx-5 mt-4 hover:scale-105 text-white/50 hover:bg-zinc-300 flex items-center gap-2 hover:text-black/80 transition-all rounded-lg px-4 py-2"
                onClick={handleAddQuestion}
              >
                <FaPlus className="text-xl" />
                <h1>Add Question</h1>
              </button>
              <button
                className="bg-zinc-800 mx-5 mt-4 hover:scale-105 text-white/50 hover:bg-zinc-300 flex items-center gap-2 hover:text-black/80 transition-all rounded-lg px-4 py-2"
                // onClick={handleAddQuestion}
              >
                <FaPlus className="text-xl" />
                <h1>Save Changes</h1>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-[#1E1F21] h-[20rem] p-3 w-[90%] flex flex-col items-center gap-5 rounded-xl">
              <img
                src={img}
                alt=""
                className="invert w-[10rem] h-[10rem] opacity-50 mx-auto"
              />
              <h1 className="w-[70%] text-center">
                When a guest registers for your event, they will be asked to
                answer the following questions.
              </h1>
              <button
                className="bg-zinc-800 hover:scale-105 text-white/50 hover:bg-zinc-300 flex items-center gap-2 hover:text-black/80 transition-all rounded-lg px-4 py-2"
                onClick={handleAddQuestion}
              >
                <FaPlus className="text-xl" />
                <h1>Add Question</h1>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Questions;
