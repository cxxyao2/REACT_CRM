import React, { useState } from "react";
import * as yup from "yup";
import Radiogroup from "../components/Radiogroup";

function Frame1(props) {
  const [flag1, setFlag1] = useState("");
  const [flag2, setFlag2] = useState("");

  const schema1 = yup.object().shape({
    name: yup.string().min(3),
  });
  const handleChange = (e) => {
    console.log("validate begin..");
    setFlag1("");
    setFlag2("");
    // TODO var myObj = { [a]: b };
    schema1
      .validate({ [e.target.name]: e.target.value })
      .then((result) => {
        setFlag1(JSON.stringify(result));
        console.log("result is", JSON.stringify(result));
      })
      .catch((err) => {
        setFlag2(JSON.stringify(err.errors[0]));
        console.log("error is", JSON.stringify(err.errors[0]));
      });
    console.log("validate end..");
  };
  const StartAsync = () => {
    const pA = new Promise((resolve) => {
      console.log("Execute A begin:");
      resolve("A");
      console.log("Execute A end:");
    });
    const pB = new Promise((resolve) => {
      console.log("Execute B begin:");
      resolve("B");
      console.log("Execute B end:");
    });
    // async await
    const getPromiseAsynchronous = async () => {
      console.log("getPromiseAsync");

      let resultA = undefined;
      resultA = await pA;
      if (resultA === 'A') console.log("pA is finished");
      console.log("promiseAsync A");

      let resultB = undefined;
      resultB = await pB;
      console.log("promiseAsync B");
      console.log("Async: promise resolved: ", resultA, resultB);
      console.log("hi, ok1");
      if (resultA && resultB) {
        console.log("hi, ok2");
      }
    };

    getPromiseAsynchronous();
  };

  return (
    <div className="row justify-content-center">
      <label htmlFor="input1">Enter your name:</label>
      <input type="text" name="name" id="name" onChange={handleChange} />
      <button
        type="button"
        name="startAsync"
        id="startAsync"
        onClick={StartAsync}
        title="StartAsync"
      >
        StartAsync
      </button>
      <div class="alert alert-info">
        {flag1}
        {" separate  flag2 is "}
        {flag2}
      </div>
    </div>
  );
}

export default Frame1;
