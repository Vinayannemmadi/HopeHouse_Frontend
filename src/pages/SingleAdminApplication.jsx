import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const SingleAdminApplication = () => {
    const navigate=useNavigate();
    const cookie=new Cookies();
    const token=cookie.get('jwtToken');
    const [requestedBy,setRequestedBy]=useState([]);
    const [application,setApplication]=useState({
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
        required_money:0,
        requestedBy:'',
        story:"",
        state:"",
        supporters:[],
        treatmentType:"",
        village:"",

    });
    useEffect(()=>{
        const getData=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:5001/api/auth/getusername/`,{token});
                console.log(data);
                setRequestedBy(data);
                // setApplication(...application,requestedBy:data);
            } catch (error){
                console.log(error);
            }
        }
    })
    const {id}=useParams();
    useEffect(()=>{
        const getData=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:5001/api/application/${id}`);
                console.log(data);
                setApplication(data);
            } catch(error){
                console.log(error);
            }
        }
        getData();
    },[]);
    const handleSubmit=async()=>{
      // e.preventDefault();
      console.log('handleSubmit..')
      try{

          const {data}=await axios.put(`http://localhost:5001/api/application/${id}`,application);
          const help=await axios.post(`http://localhost:5001/api/helprequest`,application)
          console.log(data);
          console.log(help);
          navigate('/adminapplications');
      }
      catch(error){
          console.log(error);
      }
  }
    return (
      <div className="App">
      {/* <h1>Donate Form</h1> */}
      <div className="container">
          {/* personal Info */}
          <div className="regForm">
              <div className="title">Personal Information</div>
              <form>
                <div className="input">
              <label>Full Name:</label>
              <input type="text" placeholder="enter full name"
                   value={application.fullname} onChange={(e)=>setApplication({...application,fullname:e.target.value})}/>
                   </div>
            <div className="input">
              <label>ID:</label>
              <input type="text" placeholder="If RGUKTian"     
                  value={application.id} onChange={(e)=>setApplication({...application,id:e.target.value})}/>
                  </div>

<div className="input">
              <label>Gender:</label>
              <input type="text" placeholder="male/female"   
                  value={application.gender} onChange={(e)=>setApplication({...application,gender:e.target.value})}/>
                  </div>

<div className="input">
              <label>Email:</label>
              <input type="email" placeholder="example@gmail.com" 
                  value={application.email} onChange={(e)=>setApplication({...application,email:e.target.value})}/>
                  </div>

<div className="input">
              <label>Mobile Number:</label>
              <input type="numer" placeholder="ex:9192939495" 
                  value={application.mobileNumber} onChange={(e)=>setApplication({...application,mobileNumber:e.target.value})}/>
                  </div>

<div className="input">
              <label>Aadhaar:</label>
              <input type="number" placeholder="ex:8778 6645 3212" 
                  value={application.aadhaar} onChange={(e)=>setApplication({...application,aadhaar:e.target.value})}/>
                  </div>

<div className="input">
              <label>DOB:</label>
              <input type="date" placeholder=""
                   value={application.dateOfBirth} onChange={(e)=>setApplication({...application,dateOfBirth:e.target.value})}/>
                   </div>

              </form>
          </div>
          {/* medial info */}
          <div className="regForm">
              <div className="title">Medical Details</div>
              <form>
              <div className="input">
              <label>Problem:</label>
              <input type="text" placeholder="Problem" 
                  value={application.story} onChange={(e)=>setApplication({...application,problem:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Type of Treatment:</label>
              <input type="text" placeholder="ex: surgery, opeation etc" 
                  value={application.treatmentType} onChange={(e)=>setApplication({...application,treatmentType:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Estimated Cost:</label>
              <input type="number" placeholder="ex:10,000" 
                  value={application.required_money} onChange={(e)=>setApplication({...application,required_money:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Requested By:</label>
              <input type="text" placeholder="ex: Ganesh" 
                  value={application.requestedBy} onChange={(e)=>setApplication({...application,requestedBy:e.target.value})}/>
                  </div>
              </form>
          </div>
          {/* address info */}
          <div className="regForm">
              <div className="title">Address Details</div>
              <form>
              <div className="input">
              <label>House Number:</label>
              <input type="text" placeholder="ex:5-52" 
                  value={application.houseNumber} onChange={(e)=>setApplication({...application,houseNumber:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Village:</label>
              <input type="text" placeholder="ex:Surya Nagar" 
                  value={application.village} onChange={(e)=>setApplication({...application,village:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Mandal:</label>
              <input type="text" placeholder="ex:Kothapet" 
              
                  value={application.mandal} onChange={(e)=>setApplication({...application,mandal:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>District:</label>
              <input type="text" placeholder="ex:Nirmal" 
                  value={application.district} onChange={(e)=>setApplication({...application,district:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>State:</label>
              <input type="text" placeholder="ex:Telangna" 
                  value={application.state} onChange={(e)=>setApplication({...application,state:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Pincode:</label>
              <input type="number" placeholder="ex:600001" 
                  value={application.pincode} onChange={(e)=>setApplication({...application,pincode:e.target.value})}/>
                  </div>
              </form>
          </div>
          {/* family info */}
          <div className="regForm">
              <div className="title">Family Information</div>
              <form>
              <div className="input">
              <label>Father Name:</label>
              <input type="text" placeholder="ex:Sathya Narayana" 
                  value={application.fatherName} onChange={(e)=>setApplication({...application,fatherName:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Parent Mobile Number:</label>
              <input type="number" placeholder="ex:9192939495" 
                  value={application.parentPhoneNumber} onChange={(e)=>setApplication({...application,parentPhoneNumber:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Parent Occupation:</label>
              <input type="text" placeholder="ex:Govt emp/Labour" 
                  value={application.parentOccupation} onChange={(e)=>setApplication({...application,parentOccupation:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Anual Income:</label>
              <input type="number" placeholder="ex:200000/year" 
                  value={application.anualIncome} onChange={(e)=>setApplication({...application,anualIncome:e.target.value})}/>
                  </div>
                  <div className="input">
              <label>Land Details:</label>
              <input type="text" placeholder="own/rent mention if any" 
                  value={application.landDetails} onChange={(e)=>setApplication({...application,landDetails:e.target.value})}/>
                  </div>
              </form>
          </div>
      </div>  
      <button className="btn btn-primary" 
          style={{width:400, marginTop:30,marginBottom:50}}
          onClick={handleSubmit} >Update & Upload</button>
  </div>
    )                       
}
export default SingleAdminApplication;
