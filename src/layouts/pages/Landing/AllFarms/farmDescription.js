
// @mui material components
import './map.css'

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FarmLocation } from "context/FarmLocation";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Card from "@mui/material/Card";
import { useRequest } from "lib/functions";

import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { AuthContext } from "context/AuthContext";


function Map({ center, zoom, children }) {
    const mapRef = useRef(null)
    const [map, setMap] = useState()
    useEffect(() => {
        setMap(new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
        }));
    }, []);
    // return (<div ref={mapRef} id='map' />)
    return (
        <>
            <div ref={mapRef} id="map" />
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // set the map prop on the child component
                    return React.cloneElement(child, { map });
                }
            })}
        </>
    );
}

const Marker = (options) => {
    const [marker, setMarker] = useState();
    useEffect(() => {
        if (!marker) {
            setMarker(new window.google.maps.Marker());
        }
        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);
    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);
    return null;
};

export default function FarmDescription() {
    // const ctx = useContext(AuthContext)
    var showMssg=1
    const { pathname } = useLocation();
    const { id } = useParams()
    console.log("pathname",pathname)
    if (pathname == `/myFarms/description/${id}`) {
        showMssg=0
    } else (
        showMssg=1
    )
    const emailRef = useRef(null)
    const mssgRef = useRef(null)

    const farmCtx = useContext(FarmLocation)
    const request = useRequest()
    const [farmsData, setFarmsData] = useState([])


    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}farms/${id}`, {}, null, {
            // auth: true,
        }, 'get')
            .then(farm => {
                setFarmsData(farm.data)
                farmCtx.setPlace(farm.data)
                console.log("farm desc", farm)
                console.log("dddddd", typeof farmCtx?.City?.longitude)


            })
    }, [])

    console.log("farmsData", farmsData)
    const handleSubmit = () => {

        const mssg = mssgRef.current.querySelector('input[type=text]').value
        const email = emailRef.current.querySelector('input[type=email]').value



        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                farmName: farmsData?.farmName,
                mssg,
                email,
                reciever: farmsData?.User?.userEmail,
                recieverName: farmsData?.User?.userName
            }),
        }).then(response => {
            response.json().then(data => {
                alert(data.message)
                console.log("data", data.message)
            })
        });

    }
    return (
        <Card>

            <MKBox component="section" py={8} my={6}>
                <Container>
                    <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>


                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} lg={6}>
                                <Wrapper  >
                                    <Map center={{ lat: 40.9, lng: 28.5 }} zoom={9}>
                                        <Marker position={{ lat: farmCtx.place?.City?.latitude, lng: farmCtx.place?.City?.longitude }} />
                                    </Map>
                                </Wrapper>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <MKBox component="form" p={2} method="post">
                                    {/* <MKBox px={3} py={{ xs: 2, sm: 6 }}> */}
                                    <MKTypography variant="h2" mb={1}>
                                        {farmCtx.place?.farmName}
                                    </MKTypography>
                                    <MKTypography variant="body1" color="text" mb={2}>
                                        {farmCtx.place?.User?.userName}
                                    </MKTypography>
                                    {/* </MKBox> */}
                                    <MKBox pt={0.5} pb={3} px={3}>
                                        <Grid container>
                                            <Grid item xs={12} pr={1} mb={6}>
                                                <TableContainer sx={{ width: "100%" }}>
                                                    <Table aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell></TableCell>
                                                                <TableCell align="right"></TableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>


                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Farm Available:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmAvailable ? <CheckIcon /> : <NotInterestedIcon />}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Farm Area:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmArea}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Current Crop Name:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.Crop?.cropName}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Current Tree Age:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmTreesAge}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Last Crop Name:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.LastCrop?.cropName}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Farm License:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmLicense}
                                                                </TableCell>

                                                            </TableRow>
                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Farm Water Salinity:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmWaterSalinity}
                                                                </TableCell>

                                                            </TableRow>

                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Farm Fertilizer:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmFertilizer}
                                                                </TableCell>

                                                            </TableRow>

                                                            <TableRow key="ds"
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                                                <TableCell component="th" scope="row">
                                                                    Description:
                                                                </TableCell>
                                                                <TableCell component="th" scope="row">
                                                                    {farmCtx.place?.farmDescription}
                                                                </TableCell>

                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>


                                            </Grid>


                                        </Grid>

                                    </MKBox>

                                </MKBox>
                            </Grid>

                        </Grid>
                        <Grid container display={"inline-flex"} justifyContent="space-between" >
                            <Grid item xs={12} sm={6} lg={3}>
                                <MKBox
                                    component="img"
                                    src={farmCtx.place?.farmPicture}
                                    alt={farmCtx.place?.farmName}
                                    borderRadius="lg"
                                    shadow="md"
                                    width="100%"
                                    position="relative"
                                    zIndex={1}
                                />
                            </Grid>
                            {showMssg == 1? <MKBox  p={3} lg={9}>
                                    <MKTypography variant="body2" color="text" mb={3}>
                                        If you are intersted in this farm, please contact me
                                    </MKTypography>
                                    <MKBox width="100%" autocomplete="off">
                                        {/* <form onSubmit={handleSubmit}> */}

                                        <Grid container spacing={3}>
                                            <Grid item xs={12}    >
                                                <MKInput
                                                    ref={emailRef}
                                                    type="email"

                                                    variant="standard"
                                                    label="Sender Email"
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <MKInput
                                                    type='text'
                                                    variant="standard"
                                                    label="Message"

                                                    ref={mssgRef}
                                                    InputLabelProps={{ shrink: true }}
                                                    // multiline
                                                    fullWidth
                                                // rows={6}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                                            <MKButton onClick={handleSubmit} type="submit" variant="gradient" color="success">
                                                Send Message
                                            </MKButton>
                                        </Grid>
                                        {/* </form> */}
                                    </MKBox>
                                </MKBox>
                                : <></>
                            }



                        </Grid>


                    </Grid>
                </Container>
            </MKBox>
        </Card >
    )
}