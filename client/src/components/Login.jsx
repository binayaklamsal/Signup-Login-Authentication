import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6969/login", input)
      .then((res) => {
        console.log(res);
        if (res.data === "Success") {
          navigate("/"); // Navigate to home page on successful login
        } else {
          alert("You are not registered to this service");
          navigate("/register"); // Navigate to registration page
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-500 h-screen w-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="min-w-[400px] mx-auto flex flex-col gap-3 border p-9 pt-7 bg-slate-400 rounded-lg shadow-md"
      >
        <h1 className="text-3xl">Sign In Form</h1>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-light">
              I accept the{" "}
              <a
                className="font-medium text-black-600 hover:underline"
                href="#"
              >
                Terms and Conditions.
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
