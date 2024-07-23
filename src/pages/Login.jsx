import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
}from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
// import * as types from "./../store/AuthReducer/actionTypes";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// import { login } from "../store/AuthReducer/actions";
import axios from "axios";
import Cookies from 'universal-cookie';
import {auth,provider} from '../config';
import { signInWithPopup } from "firebase/auth";
import image from '../public/hopehouse.png';
const Login = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [data, setData] = useState({
    email: "",password: ""});
  const navigate = useNavigate();
  const cookies=new Cookies();
  const token=cookies.get('jwtToken');
  const [error,setError]=useState("")
  const googleHandler = () => {
    signInWithPopup(auth,provider).then((d)=>{
      setData({password:d.user.password,email:d.user.email});
      localStorage.setItem("email",data.user.email)
    })
      console.log(data);
  };

  const formsubmit = async (e) => {
    e.preventDefault();
    try{
      const userData= await axios.post("http://localhost:5001/api/auth/signin",
        {email:data.email,password:data.password})
      console.log(userData.data);
      cookies.set('jwtToken',userData.data.token);
      cookies.set('isAdmin',userData.data.isAdmin);
      navigate('/')
    }
    catch(error){
      console.log(error.response.data);
      setError(error.response.data);
      // toast.error(error.response.data);
    }
    // dispatch(login(data)).then((d) => {
    //   if (d.type == types.LOGIN_SUCCESS) {
    //     toast({
    //       title: "login suceess",
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     navigate("/");
    //   } else {
    //     toast({
    //       title: "user datail does not match",
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   }
    // });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      style={{ backgroundColor: "#9C3353" }}
    >
      <Box
        w="1070px"
        h="660px"
        style={{ marginLeft: "10px" }}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={10}
      >
        <HStack spacing="34px">
          <Stack w="110px" h="110px" marginLeft={8}>
            <Box             
              style={{
                // backgroundColor: "#9C3353",
                // borderRadius: "50%",
                padding: "15px",
                marginLeft: "10px",
                height:"240px",
                width:"240px"
              }}
            >
              <img
                alt="img"
                src={image}
              />
            </Box>
            <Stack w="190px" h="110px" style={{ marginLeft: "50px",marginBottom:"50px" }}>
              <h1 style={{ fontSize: "19px" }}>Welcome to HopeHouse,<br />
              Please take a step to change one's life</h1>
              <h6 style={{ fontSize: "13px", color: "grey", marginTop: "1px" }}>
                
              </h6>
            </Stack>
          </Stack>

          <Stack
            style={{ marginLeft: "300px", marginTop: "50px" }}
            spacing="34px"
          >
            <Box
              style={{
                height: "30px",
                width: "310px",
                marginLeft: "40px",
                marginTop: "-10px",
              }}
            >
              <h1
                style={{
                  color: "grey",
                  size: "20px",
                  margin: "-45px auto 20px",
                }}
              >
                Quickly login using
              </h1>

              <Button onClick={()=>googleHandler()} leftIcon={<FcGoogle />}>
                Google
              </Button>
            </Box>

            <form onSubmit={formsubmit}>
              {error && <div style={{color:"red"}}>{error}!!</div>}
              <Stack pt={8}>
                <FormControl id="email">
                  <InputGroup>
                    <Input
                      type="email"
                      variant="flushed"
                      placeholder="
                    Mobile number / Email ID"
                      name="email"
                      value={data.email}
                      onChange={(e) => {
                        setError("");
                        setData({ ...data, email: e.target.value });
                      }}
                    />
                  </InputGroup>
                  <Text style={{ marginLeft: "-270px", color: "red" }}>
                    {emailError}
                  </Text>
                </FormControl>
              </Stack>
              <Stack pt={7}>
                <FormControl id="password" isRequired>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      variant="flushed"
                      placeholder="Password / OTP"
                      name="password"
                      value={data.password}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              <Stack spacing={10} pt={10}>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#9C3353" }}
                  borderRadius="33px"
                  loadingText="Submitting"
                  size="lg"
                  bg={"pink.700"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
            <Stack pt={2}>
              <Text align={"center"} style={{ color: "#9C3353" }}>
                Forgot Password?
              </Text>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                New to HopeHouse? Sign up now, it’s quick & free{" "}
                <Link to="/Signup">
                  <Button
                    size="md"
                    borderRadius="33px"
                    style={{ backgroundColor: "#9C3353" }}
                    color="white"
                  >
                    Signup
                  </Button>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Login;
