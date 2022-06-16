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

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { Link } from 'react-router-dom'
import Icon from "@mui/material/Icon";
import { green } from '@mui/material/colors';
import MKButton from "components/MKButton";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
// import team1 from "assets/images/team-5.jpg";
// import team2 from "assets/images/bruce-mars.jpg";
// import team3 from "assets/images/ivana-squares.jpg";
import team4 from "assets/images/profile.jpeg";
import { useRequest } from "lib/functions";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "context/AuthContext";


function Profile() {
  const request = useRequest()
  const [usersData, setUsersData] = useState([])
  const ctx = useContext(AuthContext)
  console.log("ctx", ctx)

  useEffect(() => {
    console.log("profile mounted")
    let fetchUser = async () => {
      await request(`${process.env.REACT_APP_API_URL}users/profile`, {}, null, {
        auth: true,
      }, 'get')
        .then(investor => {
          console.log("investor desc", investor)
          setUsersData(investor?.data)

          return investor?.data

        })
    }
    fetchUser()
    console.log(usersData, "fgdfgdrgdfg")
  }, [])


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
        <Link to={`/profile/edit`}>
              <MKButton variant="text" color="success">
                <Icon>edit</Icon>&nbsp;edit
              </MKButton>
            </Link>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name={usersData.userName}
                position={{ color: "info", label: usersData.UserType?.userType }}
                description={usersData.userPhone}
                city={usersData.City?.cityName}
                email={usersData.userEmail}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
