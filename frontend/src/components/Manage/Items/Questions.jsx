import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from "./question.png";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState(null);
  const [eventcode, setEventcode] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    field: "text",
    required: false,
  });
  const { id } = useParams();

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[index];

      // Update question properties based on the input type
      if (type === "checkbox") {
        currentQuestion['required'] = checked;
      } else if (name === "field") {
        currentQuestion['field'] = value;
      } else {
        currentQuestion['question'] = value;
      }

      // console.log('Question:', currentQuestion.question, 'Field:', currentQuestion.field, 'Required:', currentQuestion.required, name);

      return updatedQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setNewQuestion({ question: "", field: "text" });
    console.log('New question added');
  };

  const handleDeleteQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
    console.log('Deleted question');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/events/addquestionstoevent`,
        {
          eventcode: id,
          questions,
        }
      );
      setResponse(res.data);
      console.log(res.data);
      toast.success("Questions added successfully");
    } catch (err) {
      console.log(err);
    }
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
                  className="w-full h-full bg-black/10 outline-none text-white/50 border border-zinc-500/60 rounded-lg px-4 py-2"
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div className="flex justify-between gap-10">
                  <div className="flex gap-5">
                    <select
                      className="outline-none h-full select-none bg-[#2c2e30]/30 text-zinc-400 border-2 border-zinc-500/30 rounded-xl px-2 py-1.5"
                      name="field"
                      id={`field-${index}`}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <option value="text" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Text
                      </option>
                      <option value="Long text" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Long text
                      </option>
                      <option value="Checkbox" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Checkbox
                      </option>
                      <option value="Single select" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Single select
                      </option>
                      <option value="Multiple select" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Multiple select
                      </option>
                      <option value="Url" className="bg-[#2c2e30]/90 text-zinc-400">
                        Url
                      </option>
                      <option value="Date" className=" bg-[#2c2e30]/90 text-zinc-400">
                        Date
                      </option>
                    </select>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name={`required`}
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
                onClick={handleSubmit}
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
