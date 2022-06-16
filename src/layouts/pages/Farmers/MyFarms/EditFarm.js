// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { AuthContext } from "context/AuthContext";
import { useContext, useRef, useState, useEffect } from "react";
// import MDSnackbar from "components/MDSnackbar";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MKInput from "components/MKInput";
import { NativeSelect } from "@mui/material";

import { RadioGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRequest } from "lib/functions";
// import { NativeSelect } from "@mui/material";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useNavigate } from "react-router-dom";



function Map({ center, zoom, prevState, updateFarm }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState()
  useEffect(() => {
    setMap(new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    }));
  }, []);
  useEffect(() => {
    if (map) {
      map.addListener("click", (mapsMouseEvent) => {
        const coordinates = mapsMouseEvent.latLng.toJSON()
        updateFarm({
          ...prevState,
          farmLatitude: coordinates.lat,
          farmLongitude: coordinates.lng
        })
      });
    }
  }, [map])
  return (<div ref={mapRef} style={{ height: '400px' }} />)
}
export default function EditFarm() {
  const navigat=useNavigate()
  const request = useRequest()
  const ctx = useContext(AuthContext);
  const { id } = useParams()
  const [openSnakBar, setOpenSnakBar] = useState(false)
  const [serverResponce, setServerResponce] = useState('')
  const [snakBarColor, setSnakBarColor] = useState('success')
  const [farmKindData, setFarmKindData] = useState([])
  const [cropData, setCropData] = useState([])
  const [lastCropData, setLastCropData] = useState([])
  console.log("ctx",ctx.userId)

  const [farmData, setFarmData] = useState({ userId: null, farmName: '', cityId: null, farmArea: 0, cropId: null, farmLicense: '', farmAvailable: 1, farmKindId: null, farmVisibiltiy: 1, farmWaterSalinity: 0, farmLastCropsId: 0, farmFertilizer: '', farmTreesAge: 0, farmDescription: '', farmLongitude: 40.5, farmLatitude: 28.5 })
  const closeSnakBar = () => setOpenSnakBar(false)

  const farmPictureRef = useRef();

  const editFarm = () => {
    // console.log("farmData?.farmLongitude",farmData?.farmLongitude)
    const farmPicture = farmPictureRef.current.querySelector("input[type=file").files;

    const formdata = new FormData();
    formdata.append("userId", ctx.userId);
    formdata.append("farmName", farmData?.farmName);
    formdata.append("cityId", farmData?.cityId);
    formdata.append("farmArea", farmData?.farmArea);
    formdata.append("cropId", farmData?.cropId);
    formdata.append("farmLicense", farmData?.farmLicense);
    formdata.append("farmAvailable", farmData?.farmAvailable);
    formdata.append("farmKindId", farmData?.farmKindId);
    formdata.append("farmVisibiltiy", farmData?.farmVisibiltiy);
    formdata.append("farmWaterSalinity", farmData?.farmWaterSalinity);
    formdata.append("farmLastCropsId", farmData?.farmLastCropsId);
    formdata.append("farmFertilizer", farmData?.farmFertilizer);
    formdata.append("farmTreesAge", farmData?.farmTreesAge);
    formdata.append("farmDescription", farmData?.farmDescription);
    formdata.append("farmPicture", farmPicture[0]);
    formdata.append("farmLatitude", farmData?.farmLatitude);
    formdata.append("farmLongitude", farmData?.farmLongitude);
    // request(`${process.env.REACT_APP_API_URL}farms/${id}`,{},{
    //   body:formdata
    // },{
    //   auth: true,
    //   snackbar: true,
    // },"put")
    fetch(`${process.env.REACT_APP_API_URL}farms/${id}`, {
      method: "put",
      body: formdata,
      headers: {
        Authorization: "bearer " + ctx.token,
      },
    }).then(responce => {
      responce.json().then(farmedited => {
        console.log("farmedited",farmedited)
        alert(farmedited.messages)
      })
    }).catch(e => e)
    navigat("/My_Farms")


  };



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
  const handleCitiesChange = (e) => {
    const city = citiesData.filter((city) => city.id == e.target.value)
    //  setLongitude(city.longitude)
    //  setLatitude(city.latitude)
    // updateFarmData({ farmLongitude: city.longitude })
    // updateFarmData({ farmLatitude: city.latitude })
    updateFarmData({ cityId: e.target.value })
  }

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/farmKinds/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((farmkinds) => {
        // console.log("farmkindsData",farmkinds)

        setFarmKindData(farmkinds?.data);
      });

  }, []);
  // useEffect(() => {
  //   request(`${process.env.REACT_APP_API_URL}addresses/city`, {}, null, {
  //     auth: true,
  //   }, 'get')
  //     .then((city) => {
  //       console.log("cityData",city )
  //       setCityData(city?.data);

  //     });

  // }, []);


  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/crops/all`, {}, null, {
      auth: true,
    }, 'get')
      .then((crop) => {
        setCropData(crop?.data);
        setLastCropData(crop?.data);
        // console.log(crop )
      });

  }, []);

  useEffect(() => {
    request(`${process.env.REACT_APP_API_URL}farms/${id}`, {}, null, {
      auth: true,
    }, 'get')

      .then(farms => {
        setFarmData(farms?.data)
        // console.log(farms.data+"---------from farm------------")
      })

  }, [])
  console.log(farmData,"---------from farm------------")
  const updateFarmData = (obj) => {
    setFarmData({
      ...farmData,
      ...obj
    })
  }


  return (
   
      <MKBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">

                  
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      value={farmData?.farmName}
                      onChange={(e) => { updateFarmData({ farmName: e.target.value }) }}
                      label="farm Name"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>

                  <MKBox mb={2}>
                    <MKInput
                      value={farmData?.farmArea}
                      onChange={(e) => { updateFarmData({ farmArea: e.target.value }) }}
                      type="text"
                      label="farm Area"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>

                  <MKBox mb={2}>
                    <MKInput
                      value={farmData?.farmLicense}
                      onChange={(e) => { updateFarmData({ farmLicense: e.target.value }) }}
                      type="text"
                      label="farm License"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>

                  <MKBox mb={2}>
                    <MKInput
                      value={farmData?.farmWaterSalinity}
                      onChange={(e) => { updateFarmData({ farmWaterSalinity: e.target.value }) }}
                      type="text"
                      label="WaterSalinity"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>

                  <MKBox mb={2}>
                    <MKInput
                      value={farmData?.farmFertilizer}
                      onChange={(e) => { updateFarmData({ farmFertilizer: e.target.value }) }}
                      type="text"
                      label="farm Fertilizer"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      value={farmData?.farmTreesAge}
                      onChange={(e) => { updateFarmData({ farmTreesAge: e.target.value }) }}
                      label="farm TreesAge"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      value={farmData?.farmDescription}
                      onChange={(e) => { updateFarmData({ farmDescription: e.target.value }) }}
                      label="farm Description"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <FormControl>
                      <FormLabel id="farm-available">farm Availablility</FormLabel>
                      <RadioGroup value={farmData?.farmAvailable} row aria-labelledby="farm-available" name="row-radio-buttons-group" onChange={(e) => { updateFarmData({ farmAvailable: e.target.value }) }} >
                        <FormControlLabel value={1} control={<Radio />} label="Available" />
                        <FormControlLabel value={0} control={<Radio />} label="Not Available" />
                      </RadioGroup>
                    </FormControl>
                  </MKBox>
                  <MKBox mb={2}>
                    <FormControl>
                      <FormLabel id="farm-visibility">farm Visiable</FormLabel>
                      <RadioGroup value={farmData?.farmVisibiltiy} row aria-labelledby="farm-visibility" name="row-radio-buttons-group" onChange={(e) => { updateFarmData({ farmVisibiltiy: e.target.value }) }} >
                        <FormControlLabel value={1} control={<Radio />} label="Visiable" />
                        <FormControlLabel value={0} control={<Radio />} label="Not Visiable" />
                      </RadioGroup>
                    </FormControl>
                  </MKBox>

                  <MKBox mb={2}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="crops">
                          Crops
                        </InputLabel>
                        <NativeSelect
                          labelid="crops"
                          id="crop"
                          value={farmData?.cropId}
                          label="Crops"
                          onChange={(e) => { updateFarmData({ cropId: e.target.value }) }}
                        >
                          {cropData?.map((crop, i) => {
                            return (
                              <option value={crop.id} key={i}>
                                {crop.cropName}
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
                        <InputLabel id="lastCrop">
                          Farm Last Crops
                        </InputLabel>
                        <NativeSelect
                          labelid="lastCrop"
                          id="lastcrop"
                          value={farmData?.farmLastCropsId}
                          label="Crops"
                          onChange={(e) => { updateFarmData({ farmLastCropsId: e.target.value }) }}
                        >
                          {lastCropData?.map((crop, i) => {
                            return (
                              <option value={crop.id} key={i}>
                                {crop.cropName}
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
                        <InputLabel id="farmkinds">
                          Farm Kind
                        </InputLabel>
                        <NativeSelect
                          labelid="farmkinds"
                          id="farmkind"
                          value={farmData?.farmKindId}
                          label="FarmKind"
                          onChange={(e) => { updateFarmData({ farmKindId: e.target.value }) }}
                        >
                          {farmKindData?.map((farmkind, i) => {
                            return (
                              <option value={farmkind.id} key={i}>
                                {farmkind.farmKind}
                              </option>
                            );
                          })}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  </MKBox>
                  {farmData?.farmPicture && <img src={farmData?.farmPicture} width={80} />}
                  <MKBox mb={2}>
                    <MKInput
                      ref={farmPictureRef}
                      type="file"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox component="form" role="form">

                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="country">
                        Country
                      </InputLabel>
                      <NativeSelect
                        value=""
                        
                        inputProps={{
                          name: 'country',
                          id: 'country',
                        }}
                        onChange={handleCountryIdChange}
                      >
                        <option > </option>
                        {countriesData?.map((country, i) => <option value={country.id} key={i}>{country.countryName}</option>)}

                      </NativeSelect>
                    </FormControl>
                  </MKBox>


                  <MKBox component="form" role="form">

                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="gov">
                        Governrate
                      </InputLabel>
                      <NativeSelect

                        value=""
                        inputProps={{
                          name: 'governrate',
                          id: 'gov',
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
                      <InputLabel variant="standard" htmlFor="city">
                        Cities
                      </InputLabel>
                      <NativeSelect
                        value=""
                        inputProps={{
                          name: 'governrate',
                          id: 'city',
                        }}
                        onChange={handleCitiesChange}


                      >

                        <option > </option>
                        {citiesData?.map((city, i) => <option value={city.id} key={city.id}>{city.cityName}</option>)}

                      </NativeSelect>
                    </FormControl>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="number"
                      value={farmData?.farmLatitude}
                      onChange={(e) => { updateFarmData({ farmLatitude: e.target.value }) }}
                      label="farm Latitude"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="number"
                      value={farmData?.farmLongitude}
                      onChange={(e) => { updateFarmData({ farmLongitude: e.target.value }) }}
                      label="farm Longitude"
                      variant="standard"
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <Wrapper apiKey={''} >
                      <Map center={{ lat: farmData.farmLatitude, lng: farmData.farmLongitude }} updateFarm={setFarmData} prevState={farmData} zoom={8} />
                    </Wrapper>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="success"
                      fullWidth
                      onClick={editFarm}
                    >
                      Save Farm
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
     
  );
}
