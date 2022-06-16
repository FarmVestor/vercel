
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import { Link } from 'react-router-dom'

import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import MKTypography from "components/MKTypography";

import Card from "@mui/material/Card";
import { useRequest } from "../../../../lib/functions";

import { useEffect, useState} from "react";

import { FormControl, NativeSelect } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

export default function Farms() {
  const request = useRequest()
  const [farmsData, setFarmsData] = useState([])

  const [filter, setFilter] = useState({
    cityId: null,
    farmKindId: null,
    cropId: null,
    lastCropId: null,
    farmAvailable: null
  })
  const [farmKindData, setFarmKindData] = useState([])
  const [cityData, setCityData] = useState([])
  const [cropData, setCropData] = useState([])
  const [lastCropData, setLastCropData] = useState([])




  // get farmkinds
  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, null, {
      // auth: true,
    }, 'get')
      .then((farmkinds) => {
        console.log("farmkinds", farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);

  //get cities
  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, null, {
      // auth: true,
    }, 'get')
      .then((city) => {
        console.log("cityData", city)
        setCityData(city?.data);

      });

  }, []);

  //get crops and last crops
  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
      // auth: true,
    }, 'get')
      .then((crop) => {
        console.log("cropsData", crop)
        setCropData(crop?.data);
        setLastCropData(crop?.data);

      });

  }, []);

  //get farms
  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/all?filter=${JSON.stringify(filter)}`, {}, null, {
      // auth: true,
    }, 'get')
      .then(farms => {
        setFarmsData(farms?.data)
        // console.log("dddddd", farms)

      })
  }, [filter])


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
          <Grid  item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
            <MKBox bgColor="white">

              <Grid py={5} display={"inline-flex"} width='100%'  spacing={5} >

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    City
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.cityId}
                    label="City"
                    onChange={(e) => { updateFilter({ cityId: e.target.value }) }}
                  >
                    <option value='' ></option>
                    <option value='' >all</option>
                    {cityData?.map((city, i) => {
                      return (
                        <option value={city.id} key={i}>
                          {city.cityName}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>


                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Last Crops
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.lastCropId}
                    label="Crops"
                    onChange={(e) => { updateFilter({ lastCropId: e.target.value }) }}
                  >
                    <option value='' ></option>
                    <option value= '' >all</option>
                    {lastCropData?.map((crop, i) => {
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

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Availablility
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.farmAvailable}
                    label="FarmKind"
                    
                    onChange={(e) => { updateFilter({ farmAvailable: e.target.value }) }}
                  >
                    <option value='' ></option>
                    <option value='' >all</option>
                    <option value={1} >Available</option>
                    <option value={0} >Not Available</option>

                    
                    
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
                  {(farmsData?.length == 0) ? (<MKTypography>No results</MKTypography>) : (farmsData?.map((farm, i) => {
                    return (
                      <Grid item xs={12} sm={6} lg={3}>
                        <Link to={`/farms/description/${farm.id}`}>
                          <TransparentBlogCard
                            image={farm.farmPicture}
                            description={farm.farmName}
                            title={farm.FarmKind?.farmKind}
                            action={{
                              type: "internal",
                              route: `/farms/description/${farm.id}`,
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