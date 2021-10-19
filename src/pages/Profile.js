import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MenuDrawer from './components/MenuDrawer';

const Profile = () => {
    return (  
        <Box>
            <MenuDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'} }}>
                
                    <Grid container>    
                        <Grid item xs={6}> 
                            <Avatar
                                src="https://i.ibb.co/bBWdJJb/452ea912ad7d9a12e707b9aab4deba3e.jpg"
                                sx={{ height: 110, width: 110 }}
                            />
                            <Typography
                                variant="h6"
                            >
                                ABC XYZ
                            </Typography>
                            <Typography
                                variant='caption'
                                sx={{fontSize: 16}}
                            >
                                @slim_shady
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'center', mt: '25px' }}>
                            <Typography
                                variant="subtitle2"
                            >
                                Followers  
                            </Typography>
                            <Typography
                                variant="h6"
                            >
                                10m  
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ textAlign: 'center', mt: '25px'  }}>
                            <Typography
                                variant="subtitle2"
                            >
                                Following  
                            </Typography>
                            <Typography
                                variant="h6"
                            >
                                69   
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container sx={{mt: '10px'}}>
                        <Grid item xs={12}>
                            Lorem ipsum dolor sit amet.
                        </Grid>    
                    </Grid>

                    <Divider sx={{m: '10px 0 10px 0'}} />
                    <Grid container>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                            >
                                Follow
                            </Button>
                        </Grid>    
                    </Grid>

                    <Grid container>
                        <Grid item xs={6}>
                            
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>
            </Box>
        </Box>
    );
}
 
export default Profile;