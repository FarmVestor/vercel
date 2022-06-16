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


export default function Trash() {
    const [requestRows, setRequestRows] = useState([])
    const request = useRequest()
    const [rows, setRows] = useState([])
    const ctx=useContext(AuthContext)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'farmName', headerName: 'Farm Name', width: 140, align: "left" },
        { field: "farmerName", headerName: "Farmer Name",width: 140, align: "left" },
        { field: "partnerName", headerName: "Partner Name",width: 140, align: "left" },
        { field: "partnerType", headerName: "Partner Type", width: 140,align: "left" },
        { field: "dealPrice", headerName: "Deal Price", width: 140,align: "left" },
        { field: "dealStatus", headerName: "Deal Status", width: 120,align: "left",renderCell: (params) => {
            return <>
                 {(params.value )? <CheckIcon /> : <NotInterestedIcon />}
                
            </>
        } },
        
        {
            field: "actions", headerName: "actions", width: 220, align: "center", renderCell: (params) => {
                return <>
                 {/* {console.log("params actttttion",params)} */}

                    <MKButton variant="text" color="error" onClick={() => { deleteDeal(params.id) }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MKButton>
  
                </>
            }

        },]
    
    const deleteDeal = (dealId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}deals/${dealId}?deleted=${0}`, {}, {}, {
                auth: true,
                snackbar: true

            }, 'delete').then(data => {
                const updatedRows=rows.filter((row)=>row.id != dealId)
                setRows(updatedRows)
                console.log(data.messages)
            })
        }

    }

    useEffect(() => {
        request(`${process.env.REACT_APP_API_URL}deals?id=${ctx.userId}&deleted=${1}`, {}, null, {
            auth:true
        }, 'get')
            .then(deals => {
                // setDealsData(deals?.data)
                // console.log("dddddd", deals)
                const alldeals = deals?.data?.map((deal) => {
              

                    return {
                        id: deal.id, 
                        farmName: deal.Farm?.farmName,
                        farmerName: deal.Farm?.User?.userName,
                        partnerName:deal.agentId ? deal.agent?.userName : deal.investor?.userName,
                        partnerType: deal.agentId ? "Agent" : "Investor",
                        dealPrice: deal.dealPrice,
                        dealStatus: deal.dealStatus
                       
                    }
                })
                setRows(alldeals)

            })
    }, [])

    
    const requestscolumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "farmKind", headerName: "Farm Kind",width: 120, align: "left" },
        { field: "farmArea", headerName: "Farm Area", width: 120,align: "left" },
        { field: "budget", headerName: "Budget",width: 120, align: "left" },
        { field: "crop", headerName: "Crop", width: 120,align: "left" },
        
        
        {
            field: "actions", headerName: "actions", width: 220, align: "center", renderCell: (params) => {
                return <>
                 {/* {console.log("params actttttion",params)} */}

                    <MKButton variant="text" color="error" onClick={() => { deleteRequest(params.id) }}>
                        <Icon>undo</Icon>&nbsp;undo
                    </MKButton>
  
                </>
            }

        },]
    const deleteRequest = (requestId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}requests/${requestId}?deleted=${0}`, {}, {}, {
                auth: true,
                snackbar: true,

            }, 'delete')
            .then(deleted=>{
                const updatedRows=requestRows.filter((requestRows)=>requestRows.id != requestId)
                setRequestRows(updatedRows)
                console.log("rrrrrrr",deleted)
            })
        }
    }
    useEffect(() => {
      request(`${process.env.REACT_APP_API_URL}requests?userId=${ctx.userId}&deleted=${1}`, {}, null, {
        auth: true,
      }, 'get')
        .then(requests => {

        //   setFarmsData(requests?.data)
        //   console.log("dddddd", requests?.data?.deleted)
        const allrequests = requests?.data?.map((request) => {
            return {
                id: request.id,
                farmKind: request?.FarmKind?.farmKind,
                farmArea: request?.farmArea,
                budget:request?.budget,
                crop: request?.Crop?.cropName 
               
            }
        })
        setRequestRows(allrequests)
  
        })
    }, [])

    return (

        <Card>
            <Grid  height={"2vh"} item xs={12} md={8} sx={{ mb: 6 }}>
          </Grid>
          <Container>
          <Grid  item xs={11} xl={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
            <MKBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <MKBox
                            mx={2}
                            mt={2}
                            py={3}
                            px={2}
                            variant="gradient"
                            style={{backgroundColor:"#ECFFDC"}}                               
                            borderRadius="lg"
                            coloredShadow="success"
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MKTypography variant="h6" color="black">
                                    My Deals
                                </MKTypography>

                            </Grid>
                        </MKBox >


                        <MKBox height="70vh" pt={3}>
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

            <Grid  item xs={11} xl={12} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
            <MKBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <MKBox
                            mx={2}
                            mt={2}
                            py={3}
                            px={2}
                            variant="gradient"
                            style={{backgroundColor:"#ECFFDC"}}                               
                            borderRadius="lg"
                            coloredShadow="success"
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MKTypography variant="h6" color="black">
                                    My Requests
                                </MKTypography>


                            </Grid>
                        </MKBox >


                        <MKBox height="70vh" pt={3}>
                            <DataGrid
                                rows={requestRows}
                                columns={requestscolumns}
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