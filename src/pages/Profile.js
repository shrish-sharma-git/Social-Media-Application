import { FavoriteRounded } from '@mui/icons-material';
import { AppBar, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MenuDrawer from './components/MenuDrawer';
import RightSidebar from './components/RightSidebar';

const Profile = () => {
    return (  
        <Box>
            <MenuDrawer />
            <AppBar
                sx={{width: '100%'}}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'}  }}>

            <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'}  }}>
                <CardHeader
                avatar={
                    <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                    R
                    </Avatar>
                }
                title="Dr. Dre"
                subheader="September 14, 2016"
                />
                <CardMedia
                component="img"
                height="194"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                alt="Post"
                />
                <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteRounded />
                </IconButton>
                <Typography
                    variant="subtitle2"
                    color="gray"
                >
                    1k
                </Typography>
                </CardActions>
            </Card>
            </Box>
        </Box>
    );
}
 
export default Profile;