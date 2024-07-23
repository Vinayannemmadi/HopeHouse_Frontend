import {
  Center,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Select,
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
const DonateModal = ({ isOpen, onOpen, onClose }) => {
  const [amount,setAmount]=useState(0);
  const [sponsor,setSponsor]=useState('');
  const [screenshot,setScreenshot]=useState('');
  const navigate = useNavigate();
  const {id}=useParams();
  const cookie=new Cookies();
  const token=cookie.get('jwtToken');
  
    useEffect(()=>{
      const getData= async()=>{
        try{
          if(!token) return ;
              const { data } = await axios.post('http://localhost:5001/api/auth/getusername', 
              { token });
              setSponsor(data);
          }
          catch(error){
            console.log(error);
          }
        }
    getData();
  } ,[])
  const clickHandler = async () => {
    try{
        const {data}=await axios.put("http://localhost:5001/api/helprequest/updateAmount",
          {id:id,amount:amount,sponsor:sponsor,screenshot:screenshot});
        console.log("sda",data);
    } catch (error) {

    }
    navigate("/successPayment");
  };
  // const handleBillPhoto=(e)=>{
  //   const file=e.target.files[0];
  //   const reader=new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend=()=>{
  //     setApplication({...application,billPhoto:reader.result});
  //   }
  // };
  const handleScreenshot=(e)=>{
      const file=e.target.files[0];
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setScreenshot(reader.result);
      }
      console.log("screenshot",screenshot);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading mt={"12%"} mb={"8%"} fontSize={"20px"}>
            Make a secure donation
          </Heading>
          <hr />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box h={"100px"} color={"white"} m={"auto"} bgColor={"#9c3353"}>
            <Flex gap={"2%"}>
              <Box ml={"3%"} mt={"2%"}>
                <label>Current</label>
                <Select mt={"8%"} fontSize="12px">
                  <option>₹ INR</option>
                  <option>$ USD</option>
                </Select>
              </Box>
              <Box m={"2% 10px"}>
                <label>Amount</label>
                <Input type="number" mt={"3%"}onChange={(e)=>setAmount(e.target.value)}/>
              </Box>
            </Flex>
          </Box>
          <Text fontSize={"xs"} mt={"2%"} bgColor={"#ffffd5"}>
            For this contribution, you will be eligible for tax exemption
            benefit
          </Text>
          <Box textAlign={"justify"} bgColor={"#f5f5f5"}>
            <br />
            <Text fontSize={"14px"}>
              HopeHouse charges NO fees. We rely on donors like you to cover for
              our expenses. Kindly consider a tip. Thank you 🙏
            </Text>
            <Flex
              mt={"6%"}
              mb={"4%"}
              gap={"10%"}
              justifyContent={"space-beetween"}
            >
             <label>Add Screen shot</label>
             <input type="file" onChange={handleScreenshot}/>
            </Flex>
          </Box>
          <Box display="flex" alignItems="center">
            <Text mb="0" mr={"4%"}>
              Donate anonymously
            </Text>
            <Switch mt={"3%"} colorScheme={"pink"} onChange={()=>setSponsor('Anonymous')} />
          </Box>
          <Center>
            <Box mt={"8%"}>
              <Button
                mb={"6%"}
                bgColor={"#9c3353"}
                fontSize={"18px"}
                color={"white"}
                onClick={clickHandler}
              >
                Continue to pay ₹{amount}{" "}
              </Button>
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DonateModal;
