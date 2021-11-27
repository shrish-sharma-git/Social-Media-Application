import { Avatar, Button, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';
import MenuDrawer from './components/MenuDrawer';
import PostModal from './components/PostModal';

const Profile = () => {
    // Post Modal State Handling
    const [selectedImg, setSelectedImage] = useState(null);

    // Fetching Firestore Data
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        try {
            const data = firestore.collection('users').doc(currentUser.uid)
            .get()
            .then((snap) => {
               console.log(snap.data());
               setUserData(snap.data())
            })
        }
        catch(err) {
            console.log(err);
        }
    }, [])

    console.log(userData);


    const [postData, setPostData] = useState([]);
    // Fetching postsData
    React.useEffect(() => {
        try {
          const data = firestore.collection('users/'+currentUser.uid+'/posts')
          .onSnapshot(snap => {
            let documents = [];
            snap.forEach(doc => {
              documents.push({...doc.data(), id: doc.id});
            });
            setPostData(documents);
          })
        }
        catch(err) {
            console.log(err);
        }
      }, [])
    
    console.log(postData)

    return (  
        <Box>
            <MenuDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'} }}>
                
                    <Grid container>    
                        <Grid item xs={6}> 
                            <Avatar
                                src={userData.profileImageURL}
                                sx={{ height: 110, width: 110 }}
                            />
                            <Typography
                                variant="h6"
                            >
                                {userData.firstName} {userData.lastName}
                            </Typography>
                            <Typography
                                variant='caption'
                                sx={{fontSize: 16}}
                            >
                                @{userData.username}
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
                                1  
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container sx={{mt: '10px'}}>
                        <Grid item xs={12}>
                            {userData.bio}
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

                    <Divider sx={{m: '10px 0 10px 0'}} />

                    {/* Image List of Posts Dummy UI*/}
                    <ImageList sx={{ width: '100%'}}>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader sx={{ textAlign: 'center', fontSize:'inherit' }} component="div">My Posts</ListSubheader>
                        </ImageListItem>
                        {postData.map((item) => (
                            <ImageListItem key={item.id}>
                            <img
                                onClick={() => setSelectedImage(item.imageURL)}
                                // src={`${item.imageURL}?w=248&fit=crop&auto=format`}
                                // srcSet={`${item.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={item.imageURL}
                                alt={item.caption}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                // title={item.title}
                                subtitle={item.caption}
                                // actionIcon={
                                // <IconButton
                                //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                //     aria-label={`info about ${item.title}`}
                                // >
                                //     <InfoRounded />
                                // </IconButton>
                                // }
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    { selectedImg && <PostModal selectedImg={selectedImg} setSelectedImage={setSelectedImage}/>}
            </Box>
        </Box>
    );
}
 
export default Profile;