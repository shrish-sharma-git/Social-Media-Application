import { Avatar, Button, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import MenuDrawer from './components/MenuDrawer';
import PostModal from './components/PostModal';

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <Box>
            {console.log(currentUser.uid)}
        </Box>
    );
}
 
export default Profile;