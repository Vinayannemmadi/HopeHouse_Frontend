import React from "react";
import { Link } from "react-router-dom";
import { Image,Flex,Box,
CircularProgress,Stack,
 CircularProgressLabel,Text } from "@chakra-ui/react";
const DonateCard = ({ donate }) => {
  let number = donate.collected_money*100/donate.required_money;
  let percent = parseFloat(number.toFixed(1));

  return (
    <Link to={`/donate/${donate._id}`} key={donate._id}>
      <div key={donate._id} style={{margin:20,boxShadow:"2px 1px 4px 1px",
                  borderRadius:"5px",width:"280px",
                    display:'flex', justifyContent:"center",padding:"10px",
                    flex:"wrap",alignItems:'center',flexDirection:"column"}}>
                    <div >
                      <Image style={{width:'200px', height:'200px'}} alt="photo"
                        // src="https://th.bing.com/th/id/R.5dda88978b2f6cafd45e710c4ac79126?rik=BDVCpHsmn6nKnA&riu=http%3a%2f%2fnode01.flagstat.net%2fmedia%2fimage%2f2836r.jpg&ehk=viCT090GtKsU2nuIWzK3ByIDbU0ONa116ip2WCOa1Ks%3d&risl=&pid=ImgRaw&r=0"
                        src={donate.photo ? donate.photo:""} 
                      />
                    </div>
                    <div style={{padding:"10px"}}>
                      <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.Nesciunt repudiandae nisi.</h4>
                    </div>
                    <div>
                      <Flex m="20px 10px 10px 10px">
                        <CircularProgress
                          value={percent}
                          color="green.300"
                          size="50px"
                        >
                        <CircularProgressLabel>
                          {percent}%
                        </CircularProgressLabel>
                        </CircularProgress>
                        <Stack textAlign="left" ml="10px">
                          <Text fontSize="xs">Need</Text>
                          <Text fontSize="md" fontWeight="500">
                            {donate.required_money}
                          </Text>
                        </Stack>
                        <Stack
                          ml="10px"
                          textAlign="left"
                          borderLeft={"3px solid #ecedee"}
                          paddingLeft="10px"
                        >
                        <Text fontSize="xs">Requested by</Text>
                        <Text fontSize="sm">{donate.requestedBy}</Text>
                      </Stack>
                    </Flex>
                  </div>
                  <Box
                  bg={"#ecedee"} p="15px 10px 25px 10px"
                  borderLeft="3px solid black"
                  textAlign="left"
                >
              <Text fontSize="13px" fontWeight="300" ml="10px">
                  For every 100  you donate,
                  hopehouse will contribute{" "}
              </Text>
            </Box>
        </div>
    </Link>
  );
};

export default DonateCard;
