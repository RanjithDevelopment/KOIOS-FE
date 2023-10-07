import { React, useState } from 'react';
import "../css/Signup.css";
import user from "../Assets/user.png";
import phone from "../Assets/phone.png";
import mail from "../Assets/mail.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const history = useNavigate();
  const formValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    error: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
    }
  }
  const [formdata, setformdata] = useState(formValues)

  //to handle the Data of the controlled Form
  const commonchange = (e) => {
    let error = { ...formdata.error }
    if (e.target.value === '') {
      error[e.target.name] = `${e.target.name} is Required`
    } else {
      error[e.target.name] = ""
    }
     // Adding email and phone number validation
     if (e.target.name === 'email') {
      if (!validateEmail(e.target.value)) {
        error[e.target.name] = 'Invalid email address'
      }
    }

    if (e.target.name === 'phoneNo') {
      // Assuming you have a validatePhone function
      if (!validatePhone(e.target.value)) {
        error[e.target.name] = 'Invalid phone number'
      }
    }
    setformdata({ ...formdata, [e.target.name]: e.target.value, error });
    
  }
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function validatePhone(phone) {
   if(phone.length < 10 || phone.length > 10 ) return false
   return true
}

  //validator and storing function
  const handleSubmit = async(e) =>{
    e.preventDefault();
   await axios.post("https://scholarnest-api-service.onrender.com/api/register/signUp",{
    firstName:formdata.firstName,
    lastName :formdata.lastName,
    email: formdata.email,
    phoneNo: formdata.phoneNo 
   }).then(()=>history('/')).catch((error) => alert(JSON.stringify(error)));
   setformdata(formValues)
  } 

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user} alt='' />
          <input
            type='text'
            placeholder='First Name'
            value={formdata.firstName}
            name="firstName"
            onChange={(e) => commonchange(e)} />
        </div>

        <span style={{ color: "red" }}>{formdata.error.firstName}</span>

        <div className='input'>
          <img src={user} alt='' />
          <input
            type='text'
            placeholder='Last Name'
            value={formdata.lastName}
            name="lastName"
            onChange={(e) => commonchange(e)} />
        </div>

        <span style={{ color: "red" }}>{formdata.error.lastName}</span>

        <div className='input'>
          <img src={mail} alt='' />
          <input
            type='mail'
            placeholder='Email'
            value={formdata.email}
            name="email"
            onChange={(e) => commonchange(e)} />
        </div>

        <span style={{ color: "red" }}>{formdata.error.email}</span>

        <div className='input'>
          <img src={phone} alt='' />
          <input
            type='number'
            placeholder='Phone No'
            value={formdata.phoneNo}
            name="phoneNo"
            onChange={(e) => commonchange(e)} />
        </div>

        <span style={{ color: "red" }}>{formdata.error.phoneNo}</span>

      </div>
      <div className='submit-container'>
        <div >
          <button className='submit' onClick={(e)=>handleSubmit(e)}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Signup
