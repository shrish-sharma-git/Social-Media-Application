import { Card, CardHeader, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MenuDrawer from './components/MenuDrawer';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const Settings = () => {
    return (  
        <Box>
            <MenuDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'} }}>

                {/* Name Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                        subheader="Edit Name"
                        action={
                            <IconButton aria-label="edit">
                                <EditRoundedIcon/>
                            </IconButton>
                        }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">ABC XYZ</Typography>
                        </Grid>
                    </Grid>
                </Card>
                
                {/* Username Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Username"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon/>
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Username:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">@slim_shady</Typography>
                        </Grid>
                    </Grid>
                </Card>
                
                {/* Bio Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Bio"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon/>
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Bio:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                Lorem ipsum dolor sit amet.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

                <Divider sx={{ m: '25px 0 25px 0' }}/>
                
                {/* Email & Password Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Privacy & Security Settings"
                            action={
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon/>
                                </IconButton>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Email:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                abc@xyz.com
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Password:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                *******
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

            </Box>
        </Box>
    );
}
 
export default Settings;
