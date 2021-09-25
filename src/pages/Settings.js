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
                <Card>
                    <CardHeader
                        subheader="Edit Information"
                        action={
                            <IconButton aria-label="edit">
                                <EditRoundedIcon/>
                            </IconButton>
                        }
                    />
                    <Grid container sx={{m: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Marshall Mathers</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Username:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>@slim_shady</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2">Bio:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                noWrap
                            >
                                Who dress like me, walk talk and act like me
                                And just might be, the next best thing, but not quite me
                            </Typography>
                        </Grid>

                    </Grid>
                </Card>
            </Box>
        </Box>
    );
}
 
export default Settings;
