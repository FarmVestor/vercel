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

import { useEffect } from "react";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Home from "layouts/pages/Home";

// Material Kit 2 React routes
import MyRoutes from "routes";
// import MyRoutes from "routes";

// import { greenhand } from "routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";



export default function App() {
  const nav=MyRoutes()
  const greenhand=nav[1]
  const routes=nav[0]

  // console.log("routessss",routes)
  // console.log("greenhand",greenhand)

  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getGreenHand=(allGreenhand)=>
  allGreenhand.map((route) => {
    if (route.collapse) {
      return getGreenHand(route.collapse);
    }

    if (route.route) {
      return <Route exact path={route.route} element={route.component} key={route.key} />;
    }

    return null;
  });


  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free sassaa",
          color: "info",
        }}
        sticky
        
      />
      <Routes>
        {getRoutes(routes)}
        {getGreenHand(greenhand)}
        <Route path="/presentation" element={<Home />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
     
    </ThemeProvider>
  );
}
