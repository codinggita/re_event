import React from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./style.css";
const DateTime = () => {
  const [dateVisisble, setDateVisisble] = React.useState(false);
  const [dateVisisble2, setDateVisisble2] = React.useState(false);
  const [selected1, setSelected1] = React.useState();
  const [selected2, setSelected2] = React.useState();
  const [selectedDays, setSelectedDays] = React.useState([]);

  const timehours = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];
  const [selectedTime, setSelectedTime] = React.useState();

  const handleDateClick = () => {
    setDateVisisble(!dateVisisble);
    setDateVisisble2(false);
  };
  const handleDateClick2 = () => {
    setDateVisisble2(!dateVisisble2);
    setDateVisisble(false);
  };
  const handleDateSelect1 = (date) => {
    setSelected1(date);
    setDateVisisble(false); // Close the date picker after selecting a date
  };

  const handleDateSelect2 = (date) => {
    setSelected2(date);
    setDateVisisble2(false); // Close the date picker after selecting a date
  };
  // const css = `
  //     .my-selected:not([disabled]) {
  //       font-weight: bold;
  //       border: 2px solid currentColor;
  //     }
  //     .my-selected:hover:not([disabled]) {
  //       border-color: blue;
  //       color: blue;
  //     }
  //     .my-today {
  //       font-weight: bold;
  //       font-size: 140%;
  //       color: red;
  //     }

  // `;

  // let footer = <p>Please pick a day.</p>;
  // if (selected1) {
  //   footer = <p>You picked {format(selected1, "PPP")}.</p>;
  // }
  return (
    <>
      {/* <style>{css}</style> */}
      <div className=" pl-3">
        <h1 className=" text-xl"> When will it happen?</h1>
        <div className="flex  items-center p-3 ">
          <div className=" flex flex-col rounded-xl mt-4  bg-[#323436] ">
            <div className="p-3">
              <div className=" items-center flex gap-5 ">
                <h1>starts</h1>
                <h1
                  // type="text"
                  // placeholder={format(new Date(), "PPpp")}
                  className=" bg-[#424446]  w-[100%] justify-center  h-[2.5rem] cursor-pointer items-center flex border-none outline-none   border-gray-500 rounded-md p-3 mt-2"
                  onClick={handleDateClick}
                >
                  {selected1
                    ? format(selected1, "PPP")
                    : format(new Date(), "PPP")}
                </h1>

                <div>
                  {
                    <select
                      className=" z-[100]  h-[2.5rem]  cursor-pointer items-center   border-none outline-none  bg-[#424446] border-gray-500 rounded-md p-3 mt-2"
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {timehours.map((time) => (
                        <option key={time} className="p-2" value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  }
                </div>
              </div>
            </div>
            <div className="p-3 -mt-5">
              <div className=" items-center flex gap-5 ">
                <h1>Starts</h1>
                <h1
                  // type="text"
                  // placeholder={format(new Date(), "PPpp")}
                  className="  w-[100%] justify-center bg-[#424446]  h-[2.5rem] cursor-pointer items-center flex border-none outline-none  border-gray-500 rounded-md p-3 mt-2"
                  onClick={handleDateClick2}
                >
                  {selected2
                    ? format(selected2, "PPP")
                    : format(new Date(), "PPP")}
                </h1>

                <div>
                  {
                    <select
                      className=" z-[100]   h-[2.5rem] cursor-pointer items-center flex border-none outline-none  bg-[#424446] border-gray-500 rounded-md p-3 mt-2"
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {timehours.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {dateVisisble && (
          <div className="  absolute  top-[80rem] left-[45%] z-10">
            <DayPicker
              mode="single"
              selected={selected1}
              onSelect={handleDateSelect1}
              // onSelect={handleDateSelectRemove1}
              // footer={footer}
              defaultMonth={new Date(2023, 0)}
              fromYear={2023}
              required
              // modifiersClassNames={{
              //   selected: "my-selected",
              //   today: "my-today",
              // }}
              // modifiersStyles={{
              //   disabled: { fontSize: "75%" },
              // }}
              // Remove the duplicate onSelect attribute
              // onSelect={handleDateSelect2}
            />
          </div>
        )}
        {dateVisisble2 && (
          <div className="  absolute   top-[80rem] left-[45%] z-10">
            <DayPicker
              mode="single"
              selected={selected2}
              onSelect={handleDateSelect2}
              // footer={footer}
              defaultMonth={new Date(2023, 0)}
              fromYear={2023}
              required
              // modifiersClassNames={{
              //   selected: "my-selected",
              //   today: "my-today",
              // }}
              // modifiersStyles={{
              //   disabled: { fontSize: "75%" },
              // }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DateTime;
