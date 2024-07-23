import {
  Box,
  Flex,
  InputGroup,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import React, { useEffect,useState } from "react";
import axios from 'axios';
import Footer from "../components/Footer";
import DonateCard from "../components/donate/DonateCard";
const Donate = () => {

  const [donates,setDonates]=useState([]);
  const [searchData,setSearchData]=useState([]);
  useEffect(()=>{
    const  getDonates=async ()=>{
        try{
          const {data}= await axios.get("http://localhost:5001/api/helprequest")
            console.log(data);
            setDonates(data);
        } catch(error) {
            console.log(error);
        }
    }
    getDonates();
  },[]);

  return (
    <Box>
      <Box w="70%" margin="auto">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            focusBorderColor="#9c3353"
            placeholder="Search by fundraiser name, title, location, cause or other keywords"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Search2Icon color="#9c3353" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box m="20px" width="100%" display="flex" flexDirection="row" margin="auto"
              justifyContent="center" alignItems="center" flexWrap="wrap" >
              {donates && donates.map(donate => 
                  <DonateCard donate={donate} key={donate._id}/>
              )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Donate;
