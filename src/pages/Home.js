import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, TextField } from '@mui/material';
import RightSidebar from './components/RightSidebar';
import { FavoriteRounded } from '@mui/icons-material';
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
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuWt32PApTxprgg4KjRpo28jGXcTtAi-hDhbzo2AB68Iva1NrMT5BCL2GCTfBHBVGHnpw&usqp=CAU"
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
          <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'}   }}>
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
      <RightSidebar />    
    </Box>
  );
}

export default Home;
