import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [values, setVlues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handerSubmit = async (e) => {
    e.preventDefault();
    if (handlerValidation()) {
      const { password, username, email } = values;
      const data = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === 200) {
        localStorage.setItem("chat-app-user", JSON.stringify(data));
        navigate("/login");
      }
    }
  };

  const handleChange = (event) => {
    setVlues({ ...values, [event.target.name]: event.target.value });
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  const handlerValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password is confirm password", toastOptions);
      return false;
    } else if (username.length < 2) {
      toast.error("username should be geater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 3) {
      toast.error("password should be geater than 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email should be geater than 8 characters", toastOptions);
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //   if (localStorage.getItem("chat-app-user")) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <FormContainer>
        <form onSubmit={handerSubmit}>
          <div className="brand">
            <img src="" alt="" />
            <h2>snappy</h2>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">create user</button>
          <span>
            alread have an account ? <Link to="/login">login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  h2 {
    color: white;
    text-transform: uppercase;
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: #0b0914;
    border-radius: 2rem;
    gap: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      width: 100%;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      text-transform: uppercase;
      font-size: 1rem;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

export default Register;
