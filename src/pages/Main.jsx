import React from 'react';
import { useEffect,useState } from 'react';
import './home.css'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FormContainer,FormGroup,Label } from './styledApplication';
// const notices = [
//   "Interview schedule for P1 volunteers",
//   "Selected list of core team from E2",
//   "Events Sceduled for tommorrow",
//   "Auroshi event on Tuesday",
//   "Fund Raising event on Sunday",
//   "Certificate Distribution"
// ]

const Main=()=> {

  // const [search,setSearch]=useState("");
  const [notices,setNotices]=useState([]);
  const [popup,setPopup]=useState(false);
  const [noticeData,setNoticeData]=useState({
    title:'',content:"",link:""
  });
  const cookie=new Cookies();
  const isAdmin=cookie.get('isAdmin');
  useEffect(()=>{
    const getData=async ()=>{
      try{
        const {data}=await axios.get('http://localhost:5001/api/notice');
          setNotices(data);
          console.log(data);
      } catch(error){
          console.log(error);
      }
    }
    getData();
  },[]);
  const handleSumbit=async()=>{
      try{
          const {data}=await axios
            .post("http://localhost:5001/api/notice",noticeData);
            console.log(data);
            setNotices([...notices,data]);
            setPopup(false);
      } catch(error){
        console.log(error);
      }
  }
  const handleDelete=async(id)=>{
    console.log(id);
      try{
          const {data}=await axios.delete(
              `http://localhost:5001/api/notice/${id}`);
          const filter=notices.filter((n)=> n._id!==id);
          console.log(filter);
          setNotices(filter);
          console.log(data);
      } catch(error){
          console.log(error);
      }
  }
  // let searchlist=notices;
  if(notices && notices.length>0){
      // searchlist = notices.filter(eachitem => eachitem.toLowerCase().includes(search));
  }
  return (
    
    <center>
      {/* <input type='text' onChange={(e)=>setSearch(e.target.value)} 
        value={search} placeholder="Search notices here..." 
        style={{}}
          className="inputfield" /> */}
      {Array.isArray(notices) && notices.map((eachitem) => 
        <div key={eachitem._id} style={{marginTop:"50px",borderRadius:"10px",padding:"10px",
          boxShadow:"2px 4px 10px  rgba(0,0,0,0.6)",position:"relative"}}>
          <h1 style={{color:"#9C3353",fontSize:20,marginBottom:10}}>{eachitem.title}</h1>
          {isAdmin && <button onClick={()=>handleDelete(eachitem._id)}><MdDelete style={{position:'absolute',right:20,
            top:20,fontSize:26,color:'red'}} 
            /></button>}
          {<p>{eachitem.content}</p>}
          <Link to="#" style={{color:'blue'}}>{eachitem.link}</Link>
        </div>
        )} 
        {popup && (
        <div className="popup-container">
          <div className="popup">
          <button style={{position:"absolute",right:20,top:10,fontSize:18}} 
            onClick={()=>setPopup(!popup)}>X</button>
        <FormContainer style={{position:'relative'}}>  
        <h1 style={{color:"#9C3353",fontSize:20,marginBottom:10}}>New Notice</h1>
          <FormGroup>
            <Label htmlFor="fullname">Title:</Label>
            <textarea
              type="text"
              id="fullname"
              name="fullname"
              value={noticeData.title}
              onChange={(e)=>setNoticeData({...noticeData,title:e.target.value})}
              required={true}
              style={{width:"100%",height:50,border:"1px solid black",
              borderRadius:4,marginTop:10}}
              />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="id">Content:</Label>
            <textarea
              type="text"
              id="fullname"
              name="fullname"
              value={noticeData.content}
              onChange={(e)=>setNoticeData({...noticeData,content:e.target.value})}
              required={true}
              style={{width:"100%",height:50,border:"1px solid black",
              borderRadius:4,marginTop:10}}
              />
          </FormGroup>         
          <FormGroup>
            <Label >Link:</Label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={noticeData.link}
              onChange={(e)=>setNoticeData({...noticeData,link:e.target.value})}
              required={true}
              style={{width:"100%",height:40,border:"1px solid black",
              borderRadius:4,marginTop:10}}
              />
          </FormGroup> 
          <button style={{marginTop:30,padding:"6px 30px",
            backgroundColor:"#9C3353",color:"white", borderRadius:6}}
            onClick={handleSumbit}
            >
              Submit</button>
        </FormContainer>
        </div>
      </div>
        )}
        {isAdmin && <button style={{marginTop:30,padding:"6px 30px",
          backgroundColor:"#9C3353",color:"white", borderRadius:6}}
          onClick={()=>setPopup(!popup)}
          >
            Add Notice</button>}
    </center>
  
  );
  }

 
export default Main;
