/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "context/AuthContext";
import { NativeSelect } from "@mui/material";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Container } from "@mui/system";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { Alert } from "@mui/material";
// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
// Material Kit 2 React page layout routes
import MyRoutes from "routes";
import { useRequest } from "lib/functions";
// Images
import bgImage from "assets/images/farmbackground4.jpeg";

function SignUp() {
  const myRoutes = MyRoutes()
  const routes = myRoutes[0]
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [cityData, setCityData] = useState([])
  const [city, setCity] = useState("")
  const [userTypeData, setUserTypeData] = useState([])
  const [userType, setUserType] = useState("")
  const ctx = useContext(AuthContext)
  const navigate = useNavigate()
  const request = useRequest()
  const [order, setOrder] = useState('ASC')

  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const password_confirmationRef = useRef()


  const signup = () => {
    const userName = nameRef.current.querySelector('input[type=text]').value
    const userPhone = phoneRef.current.querySelector('input[type=text]').value
    const userEmail = emailRef.current.querySelector('input[type=email]').value
    const userPassword = passwordRef.current.querySelector('input[type=password]').value
    const password_confirmation = password_confirmationRef.current.querySelector('input[type=password]').value

    fetch(`${process.env.REACT_APP_API_URL}users`, {
      method: 'POST',
      body: JSON.stringify({
        userName,
        userPhone,
        userEmail,
        userPassword,
        password_confirmation,
        cityId: city,
        userTypeId: userType
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(loggedIn => {
        console.log(loggedIn, "from signup")
        if (loggedIn.success) {
          alert("sign-up successfully")
          console.log(loggedIn, "looooged")
          ctx.login(loggedIn?.token)
          navigate('/Sign-in')
        }
        else {
          alert("sign-up failed")
        }

      })
    })
      .catch(e => e)
  }



  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}addresses/city?order=${order}`, {}, null, {
      auth: true,
    }, 'get')
      .then((city) => {
        console.log("cityData", city)
        setCityData(city?.data);

      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}users/userType/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((user) => {
        console.log("userData", user)
        setUserTypeData(user?.data);

      });

  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>
      <Card>
        <MKBox component="section" py={6} my={6}>
          <MKBox
            position="absolute"
            top={0}
            left={0}
            py={4}
            zIndex={1}
            width="100%"
            minHeight="114vh"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.6),
                  rgba(gradients.dark.state, 0.6)
                )}, url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
            <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
              <Grid item xs={11} sm={9} md={5} lg={4} xl={5}>
                <Card>
                  <MKBox
                    variant="gradient"
                    style={{backgroundColor:"#ECFFDC"}}
                    borderRadius="lg"
                    coloredShadow="success"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    height={"10vh"}
                    textAlign="center"
                  >
                    <MKTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
                      Sign Up
                    </MKTypography>

                  </MKBox>
                  <MKBox pt={4} pb={3} px={3}>
                    <MKBox component="form" role="form">
                      <MKBox mb={2}>
                        <MKInput type="text" label="name" ref={nameRef} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="text" label="phone" ref={phoneRef} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="email" label="Email" ref={emailRef} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="password" label="Password" ref={passwordRef} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <MKInput type="password" label="Confirm Password" ref={password_confirmationRef} fullWidth />
                      </MKBox>
                      <MKBox mb={2}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              City
                            </InputLabel>
                            <NativeSelect
                              labelid="demo-simple-select-label"
                              id="demo-simple-select"
                              value={city}
                              label="City"
                              onChange={handleCityChange}
                            >
                              <option></option>
                              {cityData?.map((city, i) => {
                                return (
                                  <option value={city.id} key={i}>
                                    {city.cityName}
                                  </option>
                                );
                              })}
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      </MKBox>
                      <MKBox mb={2}>
                        <Box sx={{ minWidth: 120 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              User Type
                            </InputLabel>
                            <NativeSelect
                              labelid="demo-simple-select-label"
                              id="demo-simple-select"
                              value={userType}
                              label="City"
                              onChange={handleUserTypeChange}
                            >
                              <option></option>
                              {userTypeData?.map((user, i) => {
                                return (
                                  <option value={user.id} key={i}>
                                    {user.userType}
                                  </option>
                                );
                              })}
                            </NativeSelect>
                          </FormControl>
                        </Box>
                      </MKBox>
                      <MKBox display="flex" alignItems="center" ml={-1}>
                        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                        <MKTypography
                          variant="button"
                          fontWeight="regular"
                          color="text"
                          onClick={handleSetRememberMe}
                          sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                        >
                          &nbsp;&nbsp;Remember me
                        </MKTypography>
                      </MKBox>
                      <MKBox mt={4} mb={1}>
                        <MKButton variant="gradient" color="success" onClick={signup} fullWidth>
                          sign up
                        </MKButton>
                      </MKBox>

                    </MKBox>
                  </MKBox>
                </Card>
              </Grid>
            </Grid>
          </MKBox>
          <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
            <SimpleFooter light />
          </MKBox>
        </MKBox>
      </Card>
    </>

  );
}

export default SignUp;
