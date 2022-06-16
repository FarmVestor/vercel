// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { green } from '@mui/material/colors';

// Material Kit 2 React components
import { Link, useParams } from 'react-router-dom';
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Card from "@mui/material/Card";
import { useRequest } from "lib/functions";

import { useEffect, useState, useContext } from "react";

import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { AuthContext } from "context/AuthContext";


 function Requests() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "farmKind", headerName: "Farm Kind",width: 120, align: "left" },
        { field: "farmArea", headerName: "Farm Area", width: 120,align: "left" },
        { field: "budget", headerName: "Budget",width: 120, align: "left" },
        { field: "crop", headerName: "Crop", width: 120,align: "left" },
        
        {
            field: "actions", headerName: "actions", width: 260, align: "center", renderCell: (params) => {
                return <>
                    <MKButton variant="text" color="error" onClick={() => { deleteRequest(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MKButton>
                    <Link to={`/requests/edit/${params.id}`}>
                        <MKButton variant="text" color="info">
                            <Icon>edit</Icon>&nbsp;edit
                        </MKButton>
                    </Link>
                </>
            }
        },]
    const request = useRequest()
    const ctx=useContext(AuthContext)
    console.log("ctx",ctx)
    const [rows, setRows] = useState([])

    const deleteRequest = (requestId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}requests/${requestId}?deleted=${1}`, {}, {}, {
                auth: true,
                snackbar: true

            }, 'delete').then(data => {
                const updatedRows=rows.filter((row)=>row.id != requestId)
                setRows(updatedRows)
                console.log(data.messages)
            })
        }

    }

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}requests`, {}, null, {
          auth:true
        }, 'get')
            .then(requests => {
                console.log("request data", requests)
                const allrequests = requests?.data?.map((request) => {
                    
                    return {
                        id: request.id,
                        farmKind: request?.FarmKind?.farmKind,
                        farmArea: request?.farmArea,
                        budget:request?.budget,
                        crop: request?.Crop?.cropName 
                      
                    }
                })
                setRows(allrequests)

            })
    }, [])

    return (


        <Card>
          <Grid  height={"5vh"} item xs={12} md={8} sx={{ mb: 6 }}>
          </Grid>
          <Container>
           <Grid  item xs={11} xl={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
            <MKBox  pt={6} pb={3}>
                <Grid  container spacing={6}>
                    <Grid item xs={12}>
                        <MKBox
                        
                            mx={2}
                            mt={-3}
                            py={3}
                            px={2}
                            variant="gradient"
                            style={{backgroundColor:"#ECFFDC"}}
                            borderRadius="lg"
                            coloredShadow="success"
                            
                        >
                            <Grid
                                style={{backgroundColor:"#ECFFDC"}}
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                
                            >
                                <MKTypography variant="h6" color="black">
                                    My Request Table
                                </MKTypography>


                                <Link to='/requests/add/:id'>
                                    <MKButton variant="text" color="black">
                                        <Icon>add_circle</Icon>&nbsp;Add
                                    </MKButton>
                                </Link>
                            </Grid>

                        </MKBox >


                        <MKBox height="90vh" pt={3}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </MKBox>
                    </Grid>
                </Grid>
            </MKBox>
            </Grid>
         </Container>
        </Card>
    )
}

export default Requests