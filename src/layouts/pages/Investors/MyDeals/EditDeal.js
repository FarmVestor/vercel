import { Link, useParams } from "react-router-dom";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Container } from "@mui/system";
// Material Dashboard 2 React components
import MKButton from "components/MKButton";


import MKInput from "components/MKInput";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
// import Footer from "examples/Footer";

import { useState, useEffect, useContext } from "react";

import { useRequest } from "lib/functions";

import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { AuthContext } from "context/AuthContext";

export default function InvestorEditDeal() {
    const ctx = useContext(AuthContext)
    const request = useRequest()

    const { id } = useParams()
    console.log(typeof id,id)
    const [dealData, setDealData] = useState({
        farmId: null,
       
        dealPrice: 0,
        dealStatus: 0,
    })
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, null, {
            auth: true,
        }, 'get').then(data => {
             console.log("current deal data from edit", data)
            setDealData(data?.data)
        })
    }, [])


    const editDeal = () => {
        request(`${process.env.REACT_APP_API_URL}deals/${id}`, {}, {
            farmId: dealData?.farmId,
            dealPrice: dealData?.dealPrice,
            dealStatus: dealData?.dealStatus,
            investorId:ctx.userId


        }, {
             auth: true,
            type: 'json',
           
            redirect:"/my-deals"

        }, 'put').then(data => {
            alert(data.messages)
            console.log(data)
        })



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
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                style={{backgroundColor:"#ECFFDC"}}                               
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MKTypography variant="h6" color="white">
                                    Edit a Deal
                                </MKTypography>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox component="form" role="form">



                                    <MKBox mb={2}>
                                        <MKInput type="number" label="farmId" variant="standard" fullWidth value={dealData?.farmId} onChange={(e) => { setDealData({ ...dealData, farmId: e.target.value }) }} />
                                    </MKBox>

                                    <MKBox mb={2}>
                                        <MKInput type="text" label="dealPrice" variant="standard" fullWidth value={dealData?.dealPrice} onChange={(e) => { setDealData({ ...dealData, dealPrice: e.target.value }) }} />
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
                </Grid>
         </Container>
            </MKBox>


    )

}