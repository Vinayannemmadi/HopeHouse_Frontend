import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";

import { FormContainer,FormGroup,Button } from './styledApplication';
const  ApplicationForm=()=> {
  const navigate=useNavigate();
  
  const [application,setApplication]=useState(
    {
        aadhaar:0,
        anualIncome:0,
        billPhoto:"",
        collected_money:0,
        dateOfBirth:"",
        district:"",
        email:"",
        estimatedCost:0,
        fatherName:"" ,
        fullname:"",
        gender:"",
        houseNumber:0,
        hospitalBills:"",
        id:"",
        landDetails:"",
        mandal:"",
        mobileNumber:0,
        parentOccupation:"",
        parentPhoneNumber:0,
        photo:"",
        photoOfPatient:"",
        pincode:0,
        story:"",
        required_money:0,
        requestedBy:"",
        state:"",
        supporters:[],
        treatmentType:"",
        village:""
    }
    )
    const cookie=new Cookies();
    const token=cookie.get('jwtToken');
  useEffect(()=>{
    const getData=async()=>{
      try{
        const {data}=await axios.post(`http://localhost:5001/api/auth/getusername/`,{token});
        console.log(data);
        setApplication({...application,requestedBy:data});
      } catch(error){
        console.log(error);
      }
    }
    getData();
  },[]);
  const handleSubmit=async()=>{
    try{
      if(!token)return ;
      const  userName = await axios.post('http://localhost:5001/api/auth/getusername', 
      { token });
      console.log(userName);
      setApplication({...application,requestedBy:userName.data});
      const {data}=await axios.post('http://localhost:5001/api/application',application);
      alert("submitted successfully");
      navigate("/");
      // return ;
    } catch(error) {
      console.log(error);
    }
  }

  const handleBillPhoto=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setApplication({...application,billPhoto:reader.result});
    }
  };

  const handlePhto=(e)=>{
    const file=e.target.files[0];
    const reader= new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setApplication({...application,photo:reader.result});
    }
  }
  return (
    <div style={{borderRadius:20,padding:20,border:".5px solid black",
      marginBottom:100}}>
        <div className='headText'>
        <h1 style={{textAlign:'center', color:'#9C3551', fontSize:40, fontWeight:'bold' }}>APPLICATION FORM</h1>
        </div>
    
      <form className='formsContainer'  onSubmit={handleSubmit}>

      <div className='applicationForm'>
        <h1 style={{fontSize:30,fontWeight:'bold', marginBottom:15}}>Personal Information</h1>
        <div className='input'>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required={true}
            value={application.fullname}
            onChange={(e) => setApplication({...application, fullname: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            required={true}
            value={application.id}
            onChange={(e) => setApplication({...application, id: e.target.value})}
          />
        </div>
        <div className="input">
          <label>Gender:</label>
          <div className='gender'>
          <div className='radio'>
          <input
            type="radio"
            required={true}
            id="male"
            name="gender"
            value="male"
            checked={application.gender === 'male'}
            onChange={(e) => setApplication({...application, gender: e.target.value})}
          /><label htmlFor="male">Male</label>
          </div>
          
         <div className='radio'>
         <input
            type="radio"
            id="female"
            required={true}
            name="gender"
            value="female"
            checked={application.gender === 'female'}
            onChange={(e) => setApplication({...application, gender: e.target.value})}
          />  
           <label htmlFor="female">Female</label>
         </div>

          
         <div className='radio'>
         <input
            type="radio"
            id="other"
            name="gender"
            required={true}
            value="other"
            checked={application.gender === 'other'}
            onChange={(e) => setApplication({...application, gender: e.target.value})}
            />
            <label htmlFor="other">Other</label>
         </div>
          </div>
          <div>
            </div>
          
        </div>
        <div className="input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required={true}
            value={application.email}
            onChange={(e) => setApplication({...application, email: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="number"
            required={true}
            id="mobileNumber"
            name="mobileNumber"
            value={application.mobileNumber}
            onChange={(e) => setApplication({...application, mobileNumber: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="aadhaar">Aadhaar Number:</label>
          <input
            type="text"
            id="aadhaar"
            name="aadhaar"
            required={true}
            value={application.aadhaar}
            onChange={(e) => setApplication({...application, aadhaar: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            required={true}
            name="dateOfBirth"
            value={application.dateOfBirth}
            onChange={(e) => setApplication({...application, dateOfBirth: e.target.value})}
          />
        </div>
      </div>

      <div className='applicationForm'>
      <h1 style={{fontSize:30,fontWeight:'bold', marginBottom:15}}>Medical Details</h1>
      <div className="input">
        <label htmlFor="problem">Problem:</label>
        <textarea
          type="textfield"
          id="problem"
          required={true}
          name="problem"
          value={application.story}
          style={{height:80,width:300}}
          placeholder='Enter problem in detail'
          onChange={(e) => setApplication({...application, story: e.target.value})}
        />
      </div>
      <div className="input">
        <label htmlFor="hospitalBills">Hospital Bills:</label>
        <input
          type="file"
          id="hospitalBills"
          required={true}
          name="hospitalBills"
          onChange={handleBillPhoto}
        />
      </div>
      <div className="input">
        <label htmlFor="photoOfPatient">Photo of Patient:</label>
        <input
          type="file"
          required={true}
          id="photoOfPatient"
          name="photoOfPatient"
          onChange={handlePhto}
        />
      </div>
      <div className="input">
        <label htmlFor="treatmentType">Type of Treatment:</label>
        <input
          type="text"
          id="treatmentType"
          required={true}
          name="treatmentType"
          value={application.treatmentType}
          onChange={(e) => setApplication({...application, treatmentType: e.target.value})}
        />
      </div>
      <div className="input">
        <label htmlFor="estimatedCost">Estimated Cost:</label>
        <input
          type="number"
          id="estimatedCost"
          required={true}
          name="estimatedCost"
          value={application.required_money}
          onChange={(e) => setApplication({...application, required_money: e.target.value})}
        />
      </div>
      </div>

      <div className='applicationForm'>
        <h1 style={{fontSize:30,fontWeight:'bold', marginBottom:15}}>Address Details</h1>
        <div className="input">
          <label htmlFor="houseNumber">House Number:</label>
          <input
            type="text"
            required={true}
            id="houseNumber"
            name="houseNumber"
            value={application.houseNumber}
            onChange={(e) => setApplication({...application, houseNumber: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="village">Village:</label>
          <input
            type="text"
            id="village"
            required={true}
            name="village"
            value={application.village}
            onChange={(e) => setApplication({...application, village: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="mandal">Mandal:</label>
          <input
            type="text"
            id="mandal"
            required={true}
            name="mandal"
            value={application.mandal}
            onChange={(e) => setApplication({...application, mandal: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            required={true}
            id="district"
            name="district"
            value={application.district}
            onChange={(e) => setApplication({...application, district: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            required={true}
            id="state"
            name="state"
            value={application.state}
            onChange={(e) => setApplication({...application, state: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            required={true}
            value={application.pincode}
            onChange={(e) => setApplication({...application, pincode: e.target.value})}
          />
        </div>
      </div>

      <div className='applicationForm'>
        <h1 style={{fontSize:30,fontWeight:'bold', marginBottom:15}}>Family Information</h1>
        <div className="input">
          <label htmlFor="fatherName">Father Name:</label>
          <input
            type="text"
            required={true}
            id="fatherName"
            name="fatherName"
            value={application.fatherName}
            onChange={(e) => setApplication({...application, fatherName: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="parentPhoneNumber">Parent/Guardian Phone Number:</label>
          <input
            type="tel"
            id="parentPhoneNumber"
            required={true}
            name="parentPhoneNumber"
            value={application.parentPhoneNumber}
            onChange={(e) => setApplication({...application, parentPhoneNumber: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="parentOccupation">Parent's Occupation Details:</label>
          <input
            type="text"
            required={true}
            id="parentOccupation"
            name="parentOccupation"
            value={application.parentOccupation}
            onChange={(e) => setApplication({...application, parentOccupation: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="sourceOfIncome">Annual Income:</label>
          <input
            type="text"
            id="sourceOfIncome"
            required={true}
            name="sourceOfIncome"
            value={application.anualIncome}
            onChange={(e) => setApplication({...application, anualIncome: e.target.value})}
          />
        </div>
        <div className="input">
          <label htmlFor="landDetails">Land Details:</label>
          <input
            type="text"
            id="landDetails"
            name="landDetails"
            required={true}
            value={application.landDetails}
            onChange={(e) => setApplication({...application, landDetails: e.target.value})}
          />
        </div>
      </div>
      <div className='btn'>    <Button >Submit</Button>
</div>
    </form>
  </div>
  )
};

export default ApplicationForm;
