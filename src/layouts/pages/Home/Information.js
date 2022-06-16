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

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

import farmcard from "assets/images/farmcard.jpeg";
// import investors from "assets/images/investors1.jpeg";
import investors from "assets/images/investors.webp";
import agensts from "assets/images/agensts.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                title=''
                image={farmcard}
                icon="touch_app"
                color="success"
                description="See All Farms"
              />
              <RotatingCardBack

                title="Farms"
                color="success"
                description="click to see all Farms"
                action={{
                  type: "internal",
                  route: "/farms",
                  label: "show",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={investors}
                title=''
                icon="touch_app"
                color="success"
                description="See all Investors"
              />
              <RotatingCardBack
                // image={bgBack}
                title="Investors"
                color="success"
                description="click to see all Investors"
                action={{
                  type: "internal",
                  route: "/investors",
                  label: "show",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={agensts}
                icon="touch_app"
                color="success"
                description="See All Agents"
              />
              <RotatingCardBack
                // image={bgBack}
                title="Agents"
                color="success"
                description="click to see all Agents"
                action={{
                  type: "internal",
                  route: "/presentation",
                  label: "show",
                }}
              />
            </RotatingCard>
          </Grid>
          {/* <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Full Documentation"
                  description="Built by developers for developers. Check the foundation and you will find
                    everything inside our documentation."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="MUI Ready"
                  description="The world's most popular react components library for building user interfaces."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Save Time & Money"
                  description="Creating your design from scratch with dedicated designers can be very expensive. Start with our Design System."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Fully Responsive"
                  description="Regardless of the screen size, the website content will naturally fit the given resolution."
                />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
