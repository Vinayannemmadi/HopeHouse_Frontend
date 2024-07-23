import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SingleAdminDonate = () => {
    const [application,setApplication]=useState({
        fullname:   "",
        id:               "",
        gender:           "",
        email:            "",
        mobileNumber:     "",
        aadhaar:          "",
        dateOfBirth:      "",
        problem:          "",
        treatmentType:    "",
        estimatedCost:    "",
        houseNumber:      "",
        village:          "",
        mandal:           "",
        district:         "",
        state:            "",
        pincode:          "",
        fatherName:       "",
        parentPhoneNumber:"",
        parentOccupation: "",
        anualIncome:   "",
        landDetails:      "",
        file:             "",
        photo:            "",
        billphoto:        "",
        required_money:   0,
        collected_money:  0,
        requestedBy:      "",
        createdOn:"",
        status:           "",
        story:           "",
        discription:     "",
        supporters:"",
        screenshots:[],
        verified:[]

    });
    const navigate=useNavigate();
    const [donate,setDonate]=useState([]);
    const {id}=useParams();
    const [amount, setAmount] = useState(0);

    useEffect(()=>{
        const getData=async()=>{
            try{
                const {data}=await axios.get(`http://localhost:5001/api/helprequest/${id}`);
                console.log("id: ",id,"single donate data: ",data);
                setApplication(data);
                setDonate(data);
                // console.log(donate);
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
            const {data}=await axios.put(`http://localhost:5001/api/helprequest/${id}`,application);
            console.log(data);
            navigate('/admindonate');
        }
        catch(error){
            console.log(error);
        }
    }

    const handle = (idx) => {
        console.log("idx", idx)
        application.verified[idx] = true;
        
        setApplication((prevApp)=>{
            const v = prevApp.verified
            v[idx] = true
            return {
                ...prevApp,
                verified: v
            }
        })
        console.log(application.verified)
    }

    const handleAddMoney = async (e) => {
        setAmount(e.target.value);   
    }

    const addMoney = async (e) =>{
        e.preventDefault()
        console.log(amount,id);
        setApplication({...application,collected_money: Number(amount)+Number(application.collected_money)})
        try{
            const {data}=await axios.put(`http://localhost:5001/api/helprequest/addmoney/${id}`,{money:application.collected_money});
            console.log(data);
        } catch(er){
        console.log(er);
        }
        setAmount(0)
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
                            <label> Full name: </label>
                            <input type="text" placeholder="Enter full name" value={application.fullname} onChange={(e)=>setApplication({...application,fullname:e.target.value})} />
                        </div>
                        <div className="input">
                            <label> ID: </label>
                            <input type="text" placeholder="If RGUKTian"     
                        value={application.id} onChange={(e)=>setApplication({...application,id:e.target.value})} />
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
                        value={application.required_money} onChange={(e)=>setApplication({...application,estimatedCost:e.target.value})}/>
                    </div>
                    <div className="input">
                    <label>Collected Money:</label>
                    <input type="number" placeholder="ex:10,000" 
                        value={application.collected_money} onChange={(e)=>setApplication({...application,collected_money:e.target.value})}/>
                    </div>

                    <div className="input">
                    <label>Add amount:</label>
                    <input type="number" placeholder="ex:10,000" 
                        value={amount} onChange={handleAddMoney}/>
                    </div>
                    <div className="addAmount">
                    <button onClick={addMoney}>Add</button>
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
                        value={application.anualIncome} onChange={(e)=>setApplication({...application,sourceOfIncome:e.target.value})}/>
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
                onClick={handleSubmit} >Update</button>
            <br></br>
            <div className="ss">
                {application.screenshots.map((m,idx)=>(
                    <div>
                    <img src={m} alt="" style={{height:400,width:260 ,margin:30 ,borderRadius:10}}/>
                    
                    <input checked={application.verified[idx]} type="checkbox" style={{height:30,width:30,color:"green"}} onChange={()=> handle(idx)}/>
                    </div>
                ))}
            </div>
        </div>
    )                       
}



export default SingleAdminDonate;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap:wrap;
  height:100%;
  width:100%;
//   border:1px solid black;
`;

const RegistrationForm = styled.div`
  max-width: 400px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 10px 0px 40px rgba(0, 0, 0, 0.4);
  margin: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Label=styled.label`
    color: green;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;