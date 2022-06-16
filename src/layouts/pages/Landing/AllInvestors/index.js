
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { Link, useParams } from 'react-router-dom'

import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import MKTypography from "components/MKTypography";


import { FormControl, NativeSelect } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

// Images
import bgBack from "assets/images/investors1.jpeg";

import Card from "@mui/material/Card";
import { useRequest } from "lib/functions";

import { useEffect, useRef, useState } from "react";
import MKInput from "components/MKInput";


export default function Investors() {

  const request = useRequest()
  const [invisitorsData, setInvisitorsData] = useState([])
  const searchRef = useRef(null)

  const [filter, setFilter] = useState({
    farmKindId: null,
    cropId: null,
    invName: ''
  })

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}users/all?type=${3}&filter=${JSON.stringify(filter)}`, {}, null, {
    }, 'get')
      .then(invisitors => {
        setInvisitorsData(invisitors?.data)
        console.log("dddddd", invisitors)

      })
  }, [filter])


  const [farmKindData, setFarmKindData] = useState([])
  const [cropData, setCropData] = useState([])

  // get farmkinds
  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((farmkinds) => {
        console.log("farmkinds", farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((crop) => {
        console.log("cropsData", crop)
        setCropData(crop?.data);

      });

  }, []);

  const updateFilter = (obj) => {
    setFilter({
      ...filter,
      ...obj
    })
  }
  console.log("filter", filter)

  return (
    <Card>
      <MKBox component="section" py={6} my={6}>
        <Container>
          <Grid item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
            <MKBox bgColor="white">

              <Grid py={5} display={"inline-flex"} width='100%' justify-content={"center"} spacing={3} >

                <MKBox mb={2} width='100%'>
                  <MKInput
                    type="text"
                    value={filter.invName}
                    label="Search"
                    variant="standard"
                    onChange={(e) => { updateFilter({ invName: e.target.value }) }}
                    fullWidth
                  />
                </MKBox>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Crops
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.cropId}
                    label="Crops"

                    onChange={(e) => { updateFilter({ cropId: e.target.value }) }}
                  >
                    <option value='' ></option>
                    <option value='' >all</option>
                    {cropData?.map((crop, i) => {
                      return (
                        <option value={crop.id} key={i}>
                          {crop.cropName}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Farm Kind
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.farmKindId}
                    label="FarmKind"

                    onChange={(e) => { updateFilter({ farmKindId: e.target.value }) }}
                  >
                    <option value='' ></option>
                    <option value='' >all</option>
                    {farmKindData?.map((farmkind, i) => {
                      return (
                        <option value={farmkind.id} key={i}>
                          {farmkind.farmKind}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>




              </Grid>

              {/* <Card
                sx={{
                  p: 2,
                  mx: { xs: 2, lg: 3 },
                  mt: 5,
                  mb: 4,
                  backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
                  backdropFilter: "saturate(200%) blur(30px)",
                  boxShadow: ({ boxShadows: { xxl } }) => xxl,
                }}
              > */}
              <Grid container spacing={3}>
                {/* <Grid><MKTypography>No results</MKTypography></Grid> */}

                {(invisitorsData?.length == 0) ? (<MKTypography>No results</MKTypography>) : (invisitorsData?.map((invisitor, i) => {
                  return (
                    <Grid item xs={12} sm={6} lg={3}>
                      <Link to={`/investor/description/${invisitor.id}`}>
                        <TransparentBlogCard
                          image={bgBack}
                          description={invisitor?.userEmail}
                          title={invisitor?.userName}
                          action={{
                            type: "internal",
                            route: `/investor/description/${invisitor.id}`,
                            color: "info",
                            label: "read more",
                          }}
                        />

                      </Link>
                    </Grid>
                  )
                }))}

              </Grid>
              {/* </Card> */}

            </MKBox>
          </Grid>
        </Container>
      </MKBox>
    </Card>
  )
}