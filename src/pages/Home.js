import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Input, TextField } from '@mui/material';
import RightSidebar from './components/RightSidebar';
import { FavoriteRounded, PhotoCamera } from '@mui/icons-material';
import MenuDrawer from './components/MenuDrawer';

function Home(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Posted!');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MenuDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Card sx={{ margin: {xs: '0px 0px 15px'}, padding: {xs: '15px'} }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Avatar sx={{ backgroundColor: '#1976D2', marginBottom: '10px' }}>
                SS
              </Avatar>
              <TextField
                sx={{ marginBottom:'15px'}}
                placeholder="Share Something..."
                multiline
                fullWidth
                variant="filled"
              />
              <Button
                type="submit"
                sx={{ marginLeft: { xs:'79%', sm: '91%' } }}
                variant="contained"
              >
                Post
              </Button>
            </form>
          </Card>
          
          <Divider />
          
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
              image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d"
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

          <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'}  }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                  A
                </Avatar>
              }
              title="Abigail Roberts"
              subheader="September 19, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62"
              alt="Post"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Tlorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, delectus.
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
                1000
              </Typography>
            </CardActions>
          </Card>

          <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'}   }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                  J
                </Avatar>
              }
              title="Jason Smith"
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://images.unsplash.com/photo-1567306301408-9b74779a11af"
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
                145
              </Typography>
            </CardActions>
          </Card>

          <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'}   }}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe">
                  C
                </Avatar>
              }
              title="Chloe Mac"
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://images.unsplash.com/photo-1533827432537-70133748f5c8"
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
                2400
              </Typography>
            </CardActions>
          </Card>

      </Box>
      <RightSidebar />    
    </Box>
  );
}

export default Home;
