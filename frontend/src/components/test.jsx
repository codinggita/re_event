import React from "react";
import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    
    console.log("Test component mounted");
  }, []);
  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default Test;
