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
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "layouts/pages/Home/Information";
import DesignBlocks from "pages/Presentation/sections/DesignBlocks";
import Pages from "pages/Presentation/sections/Pages";
import Testimonials from "pages/Presentation/sections/Testimonials";
import Download from "pages/Presentation/sections/Download";
import {Link} from "react-router-dom"
// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";
// Routes
import MyRoutes from "routes";
// Images
// import bgImage from "assets/images/bg.jpg";
import farmbackground9 from "assets/images/farmbackground9.jpg";
// import farmbackground11 from "assets/images/farmbackground11.jpg";
// import farmbackground from "assets/images/farmbackground.jpeg";
// import farmbackground8 from "assets/images/farmbackground8.png";
// import farmbackground6 from "assets/images/farmbackground6.webp";

function Home () {
  const myRoutes=MyRoutes()
  const routes=myRoutes[0]
  return (
    <>
      {/* <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free sassaa",
          color: "info",
        }}
        sticky
      /> */}
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${farmbackground9})`,
          // backgroundImage: `url(${farmbackground})`,
          // backgroundImage: `url(${farmbackground6})`,
          // backgroundImage: `url(${farmbackground8})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
             Green Hand{" "}
            </MKTypography>
           
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        
        <Information />
       
      </Card>
    
    </>
  );
}

export default Home;
