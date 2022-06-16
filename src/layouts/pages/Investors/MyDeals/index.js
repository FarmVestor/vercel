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


export default function InvestorDeals() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: "farmerName", headerName: "Farmer Name",width: 140, align: "left" },
        { field: "investorName", headerName: "Investor Name",width: 140, align: "left" },
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

                    <MKButton variant="text" color="error" onClick={() => { deleteDeal(params.id) }}>
                        <Icon>delete</Icon>&nbsp;delete
                    </MKButton>
                    { //console.log("params",params.id)
}
                    <Link to={`/deals/edit/${params.id}`}>
                        <MKButton variant="text" color="info">
                            <Icon>edit</Icon>&nbsp;edit
                        </MKButton>
                    </Link>
                </>
            }

        },]
    const request = useRequest()
    const [dealsData, setDealsData] = useState([])
    const [rows, setRows] = useState([])
    const deleteDeal = (dealId) => {
        if (window.confirm('Are you sure')) {
            request(`${process.env.REACT_APP_API_URL}deals/${dealId}?deleted=${1}`, {}, {}, {
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
         request(`${process.env.REACT_APP_API_URL}deals`, {}, null, {
            auth:true
        }, 'get')
            .then(deals => {
                console.log("deal", deals)
                const alldeals = deals?.data?.map((deal) => {
                


                    return {
                        id: deal.id, 
                        farmName: deal.Farm?.farmName,
                        farmerName: deal.Farm?.User?.userName,
                        investorName: deal.investor?.userName,
                        partnerType: deal.agentId ? "Agent" : "Investor",
                        dealPrice: deal.dealPrice,
                        dealStatus: deal.dealStatus
                       
                    }
                })
                setRows(alldeals)

            })
        
        
    }, [])

    return (


        <Card>
            <Grid  height={"2vh"} item xs={12} md={8} sx={{ mb: 6 }}>
          </Grid>
          <Container>
          <Grid item xs={11} xl={12}  alignItems="center" sx={{ mx: "auto" }}>
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
                            coloredShadow="info"
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

                                <Link to='/deals/add'>
                                    <MKButton  color="black" variant="text">
                                        <Icon>add_circle</Icon>&nbsp;Add
                                    </MKButton>
                                </Link>
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
        </Container>
        </Card>
    )
}