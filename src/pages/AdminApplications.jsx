import React, { useEffect, useState } from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminApplication = () => {
    const [posts, setPosts] = useState([]);
    const navigate =useNavigate();
    useEffect(()=>{
        const getData = async() =>{
            const {data}=await axios.get('http://localhost:5001/api/application');
            if(!data)
                return ;
            // console.log(data);
            setPosts(data);
        }
        getData();
    },[]);
    const handleDelete =async(id)=>{
        console.log(id);
        try{
            await axios.delete(`http://localhost:5001/api/application/${id}`);
            const newPosts = posts.filter((post) => post._id !== id);
            console.log(newPosts);
            setPosts(newPosts);
        } catch (error) {
            console.log(error);
        }
    }
    const handleView = async (id) =>{
         try{
            console.log(id);
            if(  id )
                navigate(`/adminapplications/${id}`);
         } catch (error) {

         }
    };
    return (
    <>
        <MainContainer>
            <h1 style={{textAlign:'center',fontSize:30,marginTop:'30px',
                marginBottom:'30px',textDecoration:'underline'
                ,color:"#7C1D46"}}>Applications</h1>
            <table className='table'>
            <thead className='table-head ml-2'>
                <tr>
                    <th>Application Id</th>
                    <th>Requested By</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            {posts && posts.map(p=>
            <tbody id={p.id} key={p._id}><tr key={p._id}>
                <td id={p.id}>{p._id}</td>
                <td>{p.requestedBy}</td>
                <td id={p.id}><button className='btn btn-primary'
                onClick={()=>handleView(p._id)}>View</button></td>
                <td id={p.id}><button className='btn btn-danger'
                    onClick={()=>handleDelete(p._id)}>Delete</button></td>
            </tr>
            </tbody>
            )}
        </table>
        </MainContainer>    

    </>
    )
}

export default AdminApplication;


export const MainContainer = styled.div`
    justify-content: center;
    align-itmes:center;
    min-height:100vh;

    backgroundColor:gray;
`;
