import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  Image,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import axios from "axios";
import DonateCard from "../components/donate/DonateCard";

const HomePageFund = () => {
  const [donates,setDonates]=useState([]);
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
    <Box mt="50px">
      <Box mt={"12%"} mb={"4%"}>
        <Text as={"b"} fontSize={"22px"}>
          Thousands of people donate their money to HOPEHOUSE
        </Text>
      </Box>
      <Center>
        <Tabs variant="unstyled" align="center">
          <TabList gap="50px">
            <Tab
              h={"150px"}
              w={"190px"}
              _selected={{ color: "white", bg: "#691a47" }}
              shadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            >
              <Box>
                <Image
                  m={"auto"}
                  src="https://cimages.milaap.org/milaap/image/upload/v1656419855/Black_flood_1_gvivow.png"
                  mt={"8%"}
                />
                <br />
                <Text as={"b"}>Education</Text>
              </Box>
            </Tab>
            <Tab
              h={"150px"}
              w={"190px"}
              _selected={{ color: "white", bg: "#691a47" }}
              shadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            >
              <Box>
                <Image
                  m={"auto"}
                  src="https://assets.milaap.org/assets/home/medical-icon-22eba5bcdf629bb6e4244cdaab2d40c12e2e5fa63b83d27654423737ef4319ca.png"
                  mt={"8%"}
                />
                <br />
                <Text as={"b"}>Medical</Text>
              </Box>
            </Tab>
            <Tab
              h={"150px"}
              w={"190px"}
              _selected={{ color: "white", bg: "#691a47" }}
              shadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            >
              <Box>
                <Image
                  m={"auto"}
                  src="https://assets.milaap.org/assets/home/memorial-icon-d649fd768074bb5124e32420e406bb00b1524ee5d277747db46964e82ad914bb.png"
                  mt={"8%"}
                />
                <br />
                <Text as={"b"}>Memorials</Text>
              </Box>
            </Tab>
            <Tab
              h={"150px"}
              w={"180px"}
              _selected={{ color: "white", bg: "#691a47" }}
              shadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
              >
              <Menu isLazy>
                <MenuButton as={Box}>
                  <Image
                    m={"auto"}
                    src="https://assets.milaap.org/assets/home/all-icon-c540de74d815e7275a4bbebda41374b9fc528ba1a5791d71cd28c73ab27fdcd7.png"
                    mt={"8%"}
                  />
                  <br />
                  <Text as={"b"}>Others</Text>
                </MenuButton>
                <MenuList color={"black"}>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem>Emergencies</MenuItem>
                  <MenuItem>Fund Raise Events</MenuItem>
                </MenuList>
              </Menu>
            </Tab>
          </TabList>
            <Box m="20px" width="100%" display="flex" flexDirection="row" margin="auto"
              justifyContent="center" alignItems="center" flexWrap="wrap" >
              {donates && donates.map(donate => 
                  <DonateCard donate={donate} key={donate._id}/>
              )}
            </Box>
        </Tabs>
      </Center>
    </Box>
  );
};

export default HomePageFund;



// <TabPanels>
//             <TabPanel>
//               <HomeDonate s="1" e="6" />
//             </TabPanel>
//             <TabPanel>
//               <HomeDonate s="2" e="12" />
//             </TabPanel>
//             <TabPanel>
//               <HomeDonate s="13" e="18" />
//             </TabPanel>
//             <TabPanel>
//               <HomeDonate s="19" e="24" />
//             </TabPanel>
//           </TabPanels>