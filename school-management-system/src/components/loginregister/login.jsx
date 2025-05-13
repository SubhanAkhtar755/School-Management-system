import React, { useEffect, useState } from "react";
import "./loginregister.scss";
import { FaUserLock } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { signInWithEmailAndPassword , auth, doc, setDoc , db} from '../../config/firebase';
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const onSubmit = (data) =>{
      console.log(data)
      reset();  // To reset the form after submission
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then( (user) => console.log(user))
        .catch((error) =>  console.log(error))
  }
   const navigate = useNavigate();
   useEffect(() => {
    // Detect Ctrl + Shift key press
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey) {
        navigate("/"); // Navigate to /login page
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);
  return (
    <div className={`wrapper`}>
      <div className="form-box login"
      data-aos="fade-right"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Email" {...register("email", { required: 'Please enter email' })} />
            <FaUserLock className="icon" />
          </div>
          <div className="input-box">
          <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" name="remember" /> Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className='Register'>Login</button>
          <div className="register-link">
            <p>
              {" "}
              Don't have an account?{" "}
              <a  onClick={() => {navigate("/register")
                document.querySelector('.wrapper').classList.add('active1')
              }}>
                Register Now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
