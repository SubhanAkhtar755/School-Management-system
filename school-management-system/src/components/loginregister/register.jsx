import React , {useEffect, useState} from 'react'
import './loginregister.scss'
import { FaUserLock } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword , auth, doc, setDoc , db,ref,set,database} from '../../config/firebase';
// image import
    import image from "../../assets/images/background.jpg";
const Register = () => {
  
    const { register, handleSubmit, watch, formState: { errors } , reset} = useForm();
    const onSubmit = data => {console.log(data)
      reset();
      createUserWithEmailAndPassword(auth, data.email, data.password)
  .then( async(res) => {
    console.log(res);
    await setDoc(doc(db, "users" , res.user.uid),{...data ,uid: res.user.uid});
    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
    };
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
   <div>
     <div className={`wrapper active`} >
   <div className="form-box register"
   data-aos="fade-left"
   data-aos-anchor="#example-anchor"
   data-aos-offset="500"
   data-aos-duration="500"
   >
      
   <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Registration</h1>
          <div className="input-box">
            <input type="text" placeholder="Username"  {...register("fullname", { required: true })} />
            <FaUserLock className='icon' />
          </div>
          <div className="input-box">
            <input type="email" placeholder="E-mail" {...register("email", { required: true })}  />
            <MdAttachEmail  className='icon' />
          </div>
          <div className="input-box">
            <input type="password" placeholder="password"  {...register("password", { required: true })} />
            <RiLockPasswordFill className='icon' />
          </div>
          <div className="remember-forget">
            <label>
              <input type="checkbox" name="remember" /> I Agree To The Terms And Conditions
            </label>
           
          </div>
            <button type="submit" className='Register'>Register</button>
            <div className="register-link">
             <p>  Already have an account? <a onClick={() => {navigate("/login")
                
             }}>Login Now</a></p>
            </div>
       </form>
    </div>

    
    </div>
   </div>
  )
}

export default Register