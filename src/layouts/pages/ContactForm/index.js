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
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { FormControl } from "@mui/material";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import MyRoutes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function ContactForm() {
    const myRoutes = MyRoutes()
    const routes = myRoutes[0]

    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        console.log("name.value", name.value)

        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        console.log("name.value", name.value)
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        let response = await fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
    };
    return (
        <>

            <Grid container lg={6} spacing={3} alignItems="center" py={5}>



                <MKBox p={3}>
                    <MKTypography variant="body2" color="text" mb={3}>
                        If you are intersted in any of the requests, you can contact the investor
                    </MKTypography>
                    <MKBox width="100%" autocomplete="off">
                       <form  onSubmit={handleSubmit}>
                            {/* <div>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" required />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" required />
                            </div>
                            <div>
                                <label htmlFor="message">Message:</label>
                                <textarea id="message" required />
                            </div>
                            <button type="submit">{status}</button>  */}
                            <Grid container spacing={3}>
                                <Grid item xs={12}    >
                                    <MKInput
                                        type="email"
                                        id='email'
                                        variant="standard"
                                        label="Sender Email"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} >

                                    <MKInput
                                        variant="standard"
                                        label="Title"
                                        id='title'
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MKInput
                                        variant="standard"
                                        label="Message"
                                        id='message'
                                        InputLabelProps={{ shrink: true }}
                                        multiline
                                        fullWidth
                                        rows={6}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                                <MKButton type="submit" variant="gradient" color="success">
                                    Send Message
                                </MKButton>
                            </Grid>
                        </form>
                    </MKBox>
                </MKBox>

            </Grid>

        </>
    );
}

export default ContactForm;
