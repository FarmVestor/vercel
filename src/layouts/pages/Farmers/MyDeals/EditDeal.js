import { Link, useParams } from "react-router-dom";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MKButton from "components/MKButton";


import MKInput from "components/MKInput";
import Checkbox from "@mui/material/Checkbox";


// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Material Dashboard 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// import Footer from "examples/Footer";

import { useRef, useState, useEffect } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";

export default function EditDeal() {
    const request = useRequest()

    const { id } = useParams()
    console.log(typeof id,id)
    const [dealData, setDealData] = useState({
        farmId: id,
        agentId: null,
        investorId: null,
        dealPrice: 0,
        dealStatus: 0,
    })
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, null, {
            auth: true,
        }, 'get').then(data => {
            // console.log("current deal data", data?.data)
            setDealData(data?.data)
        })
    }, [])


    const editDeal = () => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, {
            farmId: dealData?.farmId,
            agentId: dealData?.agentId ? dealData?.agentId : null,
            investorId: dealData?.investorId ? dealData?.investorId : null,
            dealPrice: dealData?.dealPrice,
            dealStatus: dealData?.dealStatus,


        }, {
            // auth: true,
            type: 'json',
            snackbar: true,
            redirect:"/My_deals"

        }, 'put').then(data => {
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
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                style={{backgroundColor:"#ECFFDC"}}
                                borderRadius="lg"
                                coloredShadow="success"
                            >
                                <MKTypography vaariant="h6" color="black">
                                    Edit a Deal
                                </MKTypography>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox component="form" role="form">



                                    <MKBox mb={2}>
                                        <MKInput type="number" label="farmId" variant="standard" fullWidth value={dealData?.farmId} onChange={(e) => { setDealData({ ...dealData, farmId: e.target.value }) }} />
                                    </MKBox>

                                    <MKBox mb={2}>
                                        <MKInput type="text" label="dealPrice $" variant="standard" fullWidth value={dealData?.dealPrice} onChange={(e) => { setDealData({ ...dealData, dealPrice: e.target.value }) }} />
                                    </MKBox>


                                    <MKBox mb={2}>
                                        <FormControl>
                                            <FormLabel id="demo-row-radio-buttons-group-label">dealStatus</FormLabel>
                                            <RadioGroup value={dealData?.dealStatus} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => {
                                                setDealData({ ...dealData, dealStatus: e.target.value })
                                            }}>
                                                <FormControlLabel value={true} control={<Radio />} label="ِAgreed" />
                                                <FormControlLabel value={false} control={<Radio />} label="Not Agreed yet" />
                                            </RadioGroup>
                                        </FormControl>
                                    </MKBox>
                                    {/* <MKTypography variant="h6" color="info">
                                        Add Either an Agent or an Investor
                                    </MKTypography>
                                    <MKBox mb={2}>
                                        <MKInput type="text" label="agentId" variant="standard" fullWidth value={dealData?.agentId} onChange={(e) => { setDealData({ ...dealData, agentId: e.target.value }) }} />
                                    </MKBox> */}
                                    <MKBox mb={2}>
                                        <MKInput type="text" label="investorId" variant="standard" fullWidth value={dealData?.investorId} onChange={(e) => { setDealData({ ...dealData, investorId: e.target.value }) }} />
                                    </MKBox>




                                    <MKBox mt={4} mb={1}>
                                        <MKButton variant="gradient" color="success" fullWidth onClick={editDeal}>
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
 