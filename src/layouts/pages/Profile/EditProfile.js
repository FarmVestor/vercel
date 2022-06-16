/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";
import { FormControl } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { NativeSelect } from "@mui/material";
import MKButton from "components/MKButton";

import team4 from "assets/images/profile.jpeg";
import { useRequest } from "lib/functions";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "context/AuthContext";
import MKInput from "components/MKInput";
import { useParams } from "react-router-dom";


function EditProfile() {
    const request = useRequest()

    const passwordRef = useRef(null)
    const passwordConfirmationRef = useRef(null)


    const { id } = useParams()
    const [userData, setUserData] = useState({
        userName: '',
        userEmail: '',
    })


    const [userTypesData, setuserTypesData] = useState([])
    const [userTypeId, setUserType] = useState(1)



    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}users/profile`, {}, null, {
            auth: true,
        }, 'get').then(currentUser => {
            setUserData(currentUser.data)
            console.log("current userdata", currentUser.data)
        })


    }, [])




    //get countries
    const [countriesData, setCountriesData] = useState([])
    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}addresses/country`, {}, null, {
            auth: true,
        }, 'get').then(countries => {

            setCountriesData(countries?.data)

        })
    }, [])
    //to get governrates
    const [governratesData, setGovernratesData] = useState([])
    const handleCountryIdChange = (e) => {
        const country = countriesData.filter((country) => country.id == e.target.value)
        // console.log("country", country)
        setGovernratesData(country[0]?.Governrates)
    }

    //to get cities
    const [citiesData, setCitiesData] = useState([])
    const [cityId, setCityId] = useState(0)
    const handleGovernratedChange = (e) => {
        const governrate = governratesData.filter((governrate) => governrate.id == e.target.value)
        // console.log("governrate", governrate)
        setCitiesData(governrate[0]?.Cities)

    }
    const editUser = () => {

        const userPassword = passwordRef.current.querySelector('input[type=password]').value
        const password_confirmation = passwordConfirmationRef.current.querySelector('input[type=password]').value

        request(`${process.env.REACT_APP_API_URL}users/profile`, {}, {
            userName: userData.userName,
            userTypeId,
            userPhone: userTypesData.userPhone,
            userEmail: userData.userEmail,
            userPassword,
            password_confirmation,
            cityId,

        }, {
            auth: true,
            type: 'json',
            redirect: "/profile"


        }, 'put').then(data => {
            if (data?.success) {
                setUserData(data.data)
                console.log("edited user data",data)
            }
        })

    }

    return (
        <MKBox
            component="section"
            variant="gradient"
            bgColor="white"
            position="relative"
            py={6}
            px={{ xs: 2, lg: 0 }}
            mx={-2}
        >
            <Container   >

                <Grid height={"15vh"} item xs={12} md={8} sx={{ mb: 6 }}>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <MKBox mb={{ xs: 1, lg: 0 }}>

                            <Card sx={{ mt: 3 }}>
                                <Grid style={{ backgroundColor: "#ECFFDC" }} borderRadius={"100"} height={"auto"} container>
                                    <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }} >
                                        <MKBox width="100%" pt={2} pb={1} px={2}>
                                            <MKBox
                                                component="img"
                                                src={team4}
                                                alt={userData.userName}
                                                width="100%"
                                                borderRadius="md"
                                                shadow="lg"
                                            />
                                        </MKBox>
                                    </Grid>
                                    <Grid container item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
                                        <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
                                            <MKBox mb={2}>
                                                <MKInput value={userData.userName} onChange={(e) => { setUserData({ ...userData, userName: e.target.value }) }} type="text" label="userName" variant="standard" fullWidth />
                                            </MKBox>
                                            <MKBox mb={2}>
                                                <MKInput value={userData.userEmail} onChange={(e) => { setUserData({ ...userData, userEmail: e.target.value }) }} type="email" label="userEmail" variant="standard" fullWidth />
                                            </MKBox>
                                            <MKBox mb={2}>
                                                <MKInput ref={passwordRef} type="password" label="Password" variant="standard" fullWidth />
                                            </MKBox>

                                            <MKBox mb={2}>
                                                <MKInput ref={passwordConfirmationRef} type="password" label="Password Confirmation" variant="standard" fullWidth />
                                            </MKBox>

                                        </MKBox>
                                        <MKBox>
                                            <MKBox component="form" role="form">

                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="countries">
                                                        Country
                                                    </InputLabel>
                                                    <NativeSelect

                                                        defaultValue={1}
                                                        inputProps={{
                                                            name: 'country',
                                                            id: 'countries',
                                                        }}
                                                        onChange={handleCountryIdChange}
                                                    >
                                                        <option > </option>
                                                        {countriesData?.map((country, i) => <option value={country.id} key={country.id}>{country.countryName}</option>)}

                                                    </NativeSelect>
                                                </FormControl>
                                            </MKBox>


                                            <MKBox component="form" role="form">

                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="governrate">
                                                        Governrate
                                                    </InputLabel>
                                                    <NativeSelect


                                                        inputProps={{
                                                            name: 'governrate',
                                                            id: 'governrate',
                                                        }}
                                                        onChange={handleGovernratedChange}

                                                    >

                                                        <option > </option>
                                                        {governratesData?.map((governrate, i) => <option value={governrate.id} key={governrate.id}>{governrate.governrateName}</option>)}

                                                    </NativeSelect>
                                                </FormControl>
                                            </MKBox>


                                            <MKBox component="form" role="form">

                                                <FormControl fullWidth>
                                                    <InputLabel variant="standard" htmlFor="cities">
                                                        Cities
                                                    </InputLabel>
                                                    <NativeSelect

                                                        inputProps={{
                                                            name: 'governrate',
                                                            id: 'cities',
                                                        }}
                                                        onChange={(e) => setCityId(e.target.value)}


                                                    >

                                                        <option > </option>
                                                        {citiesData?.map((city, i) => <option value={city.id} key={city.id}>{city.cityName}</option>)}

                                                    </NativeSelect>
                                                </FormControl>
                                            </MKBox>


                                            <MKBox mt={4} mb={1}>
                                                <MKButton variant="gradient" color="success" fullWidth onClick={editUser}>
                                                    save changes
                                                </MKButton>
                                            </MKBox>

                                        </MKBox>
                                    </Grid>
                                </Grid>
                            </Card>
                            {/* <HorizontalTeamCard
                image={team4}
                name={usersData.userName}
                position={{ color: "info", label: usersData.UserType?.userType }}
                description={usersData.userPhone}
                city={usersData.City?.cityName} 
                email={usersData.userEmail}
              /> */}
                        </MKBox>
                    </Grid>
                </Grid>
            </Container>
        </MKBox>
    );
}

export default EditProfile;
