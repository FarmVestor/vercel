import { Link, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { NativeSelect } from "@mui/material";



// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import React, { useRef, useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Params } from "react-router-dom";

export default function AddDeal() {
    const request = useRequest()
    const [dealStatus, setDealStatus] = useState()
    const dealFarmIdRef = useRef(null)
    const dealPriceIdRef = useRef(null)
    const dealAgentRef = useRef(null)
    const dealInvestorRef = useRef(null)
    // const {id} =useParams()
    const id = 1 // for certan user.. must be set by token
    const [farms, setFarms] = useState([])
    const [farmId, setFarmId] = useState([])

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            // console.log("current deal data", data?.data)
            setFarms(data?.data)
        })
    }, [])

    const handleFarmIdChange = (event) => {
        setFarmId(event.target.value);
    };

    const saveDeal = () => {
        //    const farmId= dealFarmIdRef.current.querySelector('input[type=text]').value 
        const dealPrice = dealPriceIdRef.current.querySelector('input[type=text]').value
        // const agentId = dealAgentRef.current.querySelector('input[type=text]').value
        const investorId = dealInvestorRef.current.querySelector('input[type=text]').value

        request(`${process.env.REACT_APP_API_URL}deals`, {}, {
            farmId,
            // agentId: agentId ? agentId : null,
            investorId: investorId ? investorId : null,
            dealPrice,
            dealStatus,


        }, {
            auth: true,
            type: 'json',
            snackbar: true,
            redirect: "/My_deals"

        }, 'post').then(data => {
            alert(data.messages)
            console.log(data)
        })
    }



    return (
        <MKBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MKBox
                            mx={2}
                            mt={2}
                            py={3}
                            px={2}
                            variant="gradient"
                            style={{backgroundColor:"#ECFFDC"}}
                            borderRadius="lg"
                            coloredShadow="success"
                        >
                            <MKTypography variant="h6" color="black">
                                Add Deal
                            </MKTypography>
                        </MKBox>
                        <MKBox pt={4} pb={3} px={3}>
                            <MKBox component="form" role="form">


                                <MKBox mb={2}>
                                    {/* <MKInput type="text" label="farmId" variant="standard" fullWidth ref={dealFarmIdRef}

                                        /> */}
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Farm Name
                                            </InputLabel>
                                            <NativeSelect
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                //   value={farms.id}
                                                label="Farm ID"
                                                defaultValue="1"
                                                onChange={handleFarmIdChange}
                                            >
                                                <option></option>
                                                {farms?.map((farm, i) => {
                                                    return (
                                                        <option value={farm.id} key={i}>
                                                            {farm.farmName}
                                                        </option>
                                                    );
                                                })}
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>
                                </MKBox>


                                <MKBox mb={2}>
                                    <MKInput type="text" label="dealPrice $" variant="standard" fullWidth ref={dealPriceIdRef} />
                                </MKBox>


                                <MKBox mb={2}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">dealStatus</FormLabel>
                                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(event) => {
                                            setDealStatus(event.target.value)
                                        }}>
                                            <FormControlLabel value={true} control={<Radio />} label="ِAgreed" />
                                            <FormControlLabel value={false} control={<Radio />} label="Not Agreed yet" />
                                        </RadioGroup>
                                    </FormControl>
                                </MKBox>

                                <MKBox mb={2}>
                                    <MKInput type="text" label="investorId" variant="standard" fullWidth ref={dealInvestorRef} />
                                </MKBox>




                                <MKBox mt={4} mb={1}>
                                    <MKButton variant="gradient" color="success" fullWidth onClick={saveDeal}>
                                        Save Deal
                                    </MKButton>
                                </MKBox>
                            </MKBox>
                        </MKBox>
                    </Card>
                </Grid>

            </Grid>
        </MKBox>


    )

}
