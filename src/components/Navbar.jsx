import {
  Box,
  Stack,
  useColorModeValue,
  Image,
  Text,
  textDecoration,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router';
import { Link as Linked } from "react-router-dom";
import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {ImCross} from 'react-icons/im';
import {IoMenu} from 'react-icons/io5';

let isSideMenu=false;
export default function Navbar() {
  const cookie=new Cookies();
  const token=cookie.get('jwtToken');
  const location=useLocation();
  const [logname,setLogname]=useState('Login');
  const [username, setUsername] = React.useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    const getData= async()=>{
      if(token){
        setLogname('Logout');
      }
      try{
         if(!token) return ;
            const { data } = await axios.post('http://localhost:5001/api/auth/getusername', 
            { token });
            setUsername(data);
        }
        catch(error){
          console.log(error);
        }
      }
    getData();
  },[location.pathname,token])

   const setLog=()=>{
      if(logname==='Login'){
        console.log(logname);
        setSideMenuOpen(false);
        navigate('/Login');
      }
      else{
        console.log(logname);
        cookie.remove('jwtToken','isAdmin');
        setSideMenuOpen(false);
        setUsername(null)
        setLogname('Login')
        navigate('/Login');
      }
   }
  const [isSideMenuOpen,setSideMenuOpen]=useState(false);
  const routing=(router)=>{
      setSideMenuOpen(false);
      navigate(router);
  }
  const handleSideMenu=()=>{
    setSideMenuOpen(!isSideMenuOpen);
  }
  const isAdmin=cookie.get('isAdmin');
  let mapItems=[];
  if(token && isAdmin ){
    mapItems=ADMIN_ITEMS;
  }
  else{
    mapItems=NAV_ITEMS;
  }
return (
      
      <div style={
        {display:'flex',justifyContent:'space-between',
        alignItems:'center',marginTop:'0px',position:'fixed'
        ,zIndex:'10',top:0,right:0,left:0,boxShadow:' 10px 10px 10px rgba(0, 0, 0, 0.7)',
        backgroundColor:'white'}}>
         <Linked to="/">
             <Image
              height="90px"
              src="pavan.png"
              marginLeft='20px'
            />
          </Linked>            
        <DesktopNav/>
        <div style={{margin:'2rem', display:"flex", flexDirection:"row"}}>
        {username && <h1 style={{fontSize:"20px",color:'black'}}>{username}</h1>}
          <button style={{color:"white",fontSize:"20px",
                  margin:"0 10px",backgroundColor:" #9C3551",
                  padding:"2px 16px",borderRadius:"6px"}}
                   onClick={()=>setLog()}>
                {logname}
          </button>
          <MenuButton onClick={()=>setSideMenuOpen(true)}>
            <IoMenu style={{color:"black",fontSize:"34px"}} />
          </MenuButton>
        </div>
        <SideMenu open={isSideMenuOpen}>
        <ImCross style={{display:'flex',justifyContent:'flex-start',marginBottom:20,
             marginTop:20,marginLeft:'auto',marginRight:20,cursor:'pointer',
               alignItems:'flex-end'}} onClick={()=>setSideMenuOpen(false)}/>
        {
          mapItems.map((navItem)=>{
            return(
              <SideMenuItemContainer key={navItem.label}>
                <SideMenuItem onClick={() => routing(navItem.href)}>{navItem.label}</SideMenuItem>
              </SideMenuItemContainer>
            )
          })
        }
        <SideMenuItemContainer>
            <SideMenuItem onClick={()=>setLog()}>
                {logname}
            </SideMenuItem>
        </SideMenuItemContainer>
    </SideMenu>
        {/* <SideMenu open={isSideMenuOpen}>
         <SideMenuItems>
             <ImCross style={{display:'flex',justifyContent:'flex-start',marginBottom:20,
             marginTop:20,marginLeft:'auto',marginRight:20,cursor:'pointer',
               alignItems:'flex-end'}} onClick={()=>setSideMenuOpen(false)}/>
             <SideMenuItemContainer>
               <SideMenuItem onClick={() => routing('')}> Home</SideMenuItem>
             </SideMenuItemContainer>
           <SideMenuItemContainer>
               <SideMenuItem onClick={() => routing('/donate')}> Donate</SideMenuItem>
           </SideMenuItemContainer>
           <SideMenuItemContainer>
               <SideMenuItem onClick={() => routing('/apply')}> Ask Help</SideMenuItem>
           </SideMenuItemContainer>
           <SideMenuItemContainer>
               <SideMenuItem onClick={() => routing('/notices')}> Notifications</SideMenuItem>
          </SideMenuItemContainer>
           <SideMenuItemContainer>
               <SideMenuItem onClick={() => routing('/contactUs')}> Contact us</SideMenuItem>
           </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('/support')}>About</SideMenuItem>
           </SideMenuItemContainer>            
          <SideMenuItemContainer>
            <SideMenuItem onClick={()=>setLog()}>
                {logname}</SideMenuItem>
            </SideMenuItemContainer>
         </SideMenuItems>
        </SideMenu> */}
      </div>

  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const cookie = new Cookies();
  const token = cookie.get("jwtToken");
  const isAdmin = cookie.get('isAdmin');
  let mapitems=[];
  if(token !== null && isAdmin !== null && isAdmin )
  {
    mapitems=ADMIN_ITEMS;
  }
  else {
    mapitems=NAV_ITEMS;
  }

  return (
    <NavElements >
      <Stack direction={"row"} spacing={7} align={"center"} height={"70px"}>
        {mapitems.map((navItem) => (
          <Linked to={navItem.href} style={{textDecoration: "none"}}>
          <Box
            bg={"white"}
            height={"70px"}
            align={"center"}
            color={linkColor}
            cursor="pointer"
            padding={"20px 5px 0px 5px"}
            _hover={{
              textDecoration: "none",
              height: "70px",
              align: "center",
              color: "white",
              bg: "#9c3353",
              borderRadius:"4px",
            }}
            key={navItem.label}
          >
            
            <Box
              p={2}
              fontSize={"16px"}
              fontWeight={400}
              _hover={{
                textDecoration: "none",
                color: "white"
              }}
            >
              {navItem.label}
            </Box>
          </Box>
          </Linked>
        ))}
      </Stack>
    </NavElements>

  );
};
const Sidemenu=({open,routing})=>{
  // const navigate=useNavigate();
  const [isSideMenuOpen,setSideMenuOpen]=useState(false);
  // const routing=(router)=>{
  //     setSideMenuOpen(false);
  //     navigate(router);
  // }
  const cookie=new Cookies();
  const token=cookie.get('jwtToken');
  const isAdmin=cookie.get('isAdmin');
  let mapItems=[];
  if(token && isAdmin ){
    mapItems=ADMIN_ITEMS;
  }
  else{
    mapItems=NAV_ITEMS;
  }
  return (
    <SideMenu open={isSideMenuOpen}>
        <ImCross style={{display:'flex',justifyContent:'flex-start',marginBottom:20,
             marginTop:20,marginLeft:'auto',marginRight:20,cursor:'pointer',
               alignItems:'flex-end'}} onClick={()=>setSideMenuOpen(false)}/>
        {
          mapItems.map((navItem)=>{
            return(
              <SideMenuItemContainer key={navItem.label}>
                <SideMenuItem onClick={() => routing(navItem.href)}>{navItem.label}</SideMenuItem>
              </SideMenuItemContainer>
            )
          })
        }
    </SideMenu>
  )
}
const ADMIN_ITEMS = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Donating",
      href: "/admindonate",
    },
    
    {
      label: "Requests",
      href: "/adminapplications",
    },
    {
      label: "Recruitement List",
      href: "/guidelines",
    },
    {
      label: "Notices",
      href: "/notices",
    }
  ]
const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Donate",
    href: "/donate",
  },
  
  {
    label: "Ask Help",
    href: "/apply",
  },
  {
    label: "Contact Us",
    href: "/support",
  },
  {
    label: "Notices",
    href: "/notices",
  }
];

export const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open===true ? '0' : '-100%')}; /* Adjusted to slide in from right */
  width: 250px;
  height: 100%;
  background-color:white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 1);
  transition: right 0.5s ease-in-out; /* Adjusted transition */
`;
export const SideMenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position:relative;
`;
export const SideMenuItem = styled.li`
  padding: 1rem;
  color: black;
  cursor: pointer;
  font-size:18px;
  align-items:start;
  text-align:start;
  margin-left:16px;
  
  &:hover {
    color:white;
  }
`;
export const SideMenuItemContainer=styled.div`
 
  &:hover{
    background-color:#9C3551;
  
  }
`;

export const NavElements=styled.div`
  @media (max-width:999px){
    display:none;
  }
`;
const MenuButton = styled.button`
  display: none;
  @media(max-width:999px){
    display:flex;
  }
`