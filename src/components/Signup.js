import { React, useState,useEffect } from 'react';
import "../css/Signup.css";
import user from "../Assets/user.png";
import phone from "../Assets/phone.png";
import mail from "../Assets/mail.png";
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';


const Signup = () => {

  const location = useLocation();
  const editData = location.state;
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
  const [formdata, setformdata] = useState(formValues);
  const history = useNavigate();
  
  useEffect(() => {
    if (editData) {
      const updatedFormData = {
        ...formdata,
        firstName: editData.firstName || '',
        lastName: editData.lastName || '',
        email: editData.email || '',
        phoneNo: editData.phoneNo || '',
      };

      setformdata(updatedFormData);
    }
  }, [editData]);
 
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
    if (phone.length < 10 || phone.length > 10) return false
    return true
  }

  //validator and storing function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData&&editData._id) {
      await axios.put(`https://scholarnest-api-service.onrender.com/api/register/update/${editData._id}`, {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        phoneNo: formdata.phoneNo
      }).then(() => history('/table')).catch((error) => alert(JSON.stringify(error)));
      setformdata(formValues)
    }
    else {
      await axios.post("https://scholarnest-api-service.onrender.com/api/register/signUp", {
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        phoneNo: formdata.phoneNo
      }).then(() => history('/table')).catch((error) => alert(JSON.stringify(error)));
      setformdata(formValues)
    }
  }

  return (
    <>
      <Link to='/table' className='view'>View and Edit Users</Link >
       <div><h1>Welcome to Registeration Page</h1></div>
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
          <button className='submit' onClick={(e) => handleSubmit(e)}>{editData && editData._id? 'Update': 'SignUp'}</button>
        </div>
      </div>
    </div>
    </>
  )
}
export default Signup
