import { useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import { Container } from "@mui/system";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import React, { useRef, useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";

export default function EditRequest() {
    const request = useRequest()
    const [farmKindData, setFarmKindData] = useState([])
    const [farmKind, setfarmKind] = useState()
    const [cropData, setCropData] = useState([])
    const [crop, setCrop] = useState()
    const [users, setUsers] = useState([0])
    const [userId, setUserId] = useState()
    const [requestData, setRequestData] = useState({
        farmArea: 0,
        budget: 0,
        farmkind: [],
        cropId: [],
        userId: [],
    })
    const requestFarmAreaRef = useRef(null)
    const requestFarmBudgetRef = useRef(null)

    const {id} =useParams()


    const saveRequest = () => {
       const farmArea = requestFarmAreaRef.current.querySelector('input[type=text]').value
       const budget = requestFarmBudgetRef.current.querySelector('input[type=text]').value


        request(`${process.env.REACT_APP_API_URL}requests/${id}`, {}, {      
            farmArea:requestData.farmArea,
            budget: requestData.budget,
            farmKindId: farmKind,
            cropId: crop,
           
        }, {
             auth: true,
            type: 'json',
            redirect:"/my-requests"

        }, 'put').then(data => {
            console.log("from put data",data)
        })



    }

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {},null, {
          auth: true,
        }, 'get')
          .then((farmkinds) => {
            //console.log("farmkinds", farmkinds)
    
            setFarmKindData(farmkinds?.data);
          });
    
      }, []);

      useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
          auth: true,
        }, 'get')
          .then((crop) => {
           // console.log("cropsData",crop)
            setCropData(crop?.data);
            
            
          });
    
      }, []);

      useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users`, {}, null, {
            auth: true,
        }, 'get').then(users => {
            setUsers(users.data)
        })

    }, [])

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}requests`, {}, null, {
            auth: true,
        }, 'get').then(requests => {
              
              
              requests.data.map((req,i)=>{
                console.log(",data data",req)
                setRequestData(req)

              })
        })

    }, [])
   
      const handleFarmKindChange = (event) => {
        setfarmKind(event.target.value);
       // console.log("farmkind click",farmKind)
      };

      const handleCropChange = (event) => {
        setCrop(event.target.value);
        //console.log("crop clikc",crop)
      };

      const handleusersRefChange = (event) => {
        setUserId(event.target.value)
       // console.log("user clikc",userId)

    }

    return (
     
            <MKBox pt={6} pb={3}>
                 <Grid  height={"5vh"} item xs={12} md={8} sx={{ mb: 6 }}>
                 </Grid>
                 <Container>
                 <Grid  item xs={11} xl={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MKBox
                                mx={2}
                                mt={2}
                                py={3}
                                px={2}
                                variant="gradient"
                                style={{backgroundColor:"#ECFFDC"}}                                borderRadius="lg"
                                coloredShadow="success"
                            >
                                <MKTypography variant="h6" color="white">
                                    Edit Request
                                </MKTypography>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox component="form" role="form">
                                    <MKBox mb={2}>
                                        <MKInput type="text" label="farm Area" variant="standard" fullWidth ref={requestFarmAreaRef}  value={requestData?.farmArea}
                                         onChange={(e) => { setRequestData({ ...requestData, farmArea: e.target.value }) }}
                                        />
                                    </MKBox> 

                                    <MKBox mb={2}>
                                        <MKInput type="text" label="budget" variant="standard" fullWidth ref={requestFarmBudgetRef} value={requestData?.budget}
                                         onChange={(e) => { setRequestData({ ...requestData, budget: e.target.value }) }} />
                                    </MKBox>
                                 
                                   
                                     <FormControl fullWidth>
                                     <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Farm Kind
                                     </InputLabel>
                                     <NativeSelect
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={requestData.FarmKind?.id}
                                      label="FarmKind"
                                      defaultValue="1"
                                      onChange={handleFarmKindChange}
                                       >
                                      <option></option>
                                     {farmKindData?.map((farmkind, i) => {
                                     return (
                                    <option value={farmkind.id} key={i}>
                                     {farmkind.farmKind}
                                     </option>
                                     );
                                    })}
                                    </NativeSelect>
                                     </FormControl>

                                       <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Crop
                                        </InputLabel>
                                        <NativeSelect
                                         labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={requestData.Crop?.id}
                                         label="Crops"
                                         defaultValue="1"
                                          onChange={handleCropChange}
                                           >
                                        <option></option>
                                        {cropData?.map((crop, i) => {
                                         return (
                                          <option value={crop.id} key={i}>
                                           {crop.cropName}
                                         </option>
                                           );
                                          })}
                                         </NativeSelect>
                                        </FormControl>
                    
                                        
                                    <MKBox mt={4} mb={1}>
                                        <MKButton variant="gradient" color="success" fullWidth onClick={saveRequest}>
                                            Save Request
                                        </MKButton>
                                    </MKBox>
                                </MKBox>
                            </MKBox>
                        </Card>
                    </Grid>

                </Grid>
                </Grid>
         </Container>
            </MKBox>


    )

}