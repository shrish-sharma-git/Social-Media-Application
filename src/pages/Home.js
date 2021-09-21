import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, TextField } from '@mui/material';
import RightSidebar from './components/RightSidebar';
import { MoreVertRounded } from '@material-ui/icons';
import { FavoriteRounded, ShareRounded } from '@mui/icons-material';

// Drawer Dimensions
const drawerWidth = 240;
const rightDrawerWidth = 400;

function Home(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Post Posted!');
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Profile'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <HomeRoundedIcon /> : <PersonRoundedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <SettingsRoundedIcon /> : <SettingsRoundedIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px - ${rightDrawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mr: { sm: `${rightDrawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Untitled - Social Media
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
            
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Card sx={{ margin: '20px', padding: '20px'}}>
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
                sx={{ marginLeft: { xs:'76%', sm: '91%' } }}
                variant="contained"
              >
                Post
              </Button>
            </form>
          </Card>
          
          <Divider />
          
          <Card sx={{ margin: '20px', padding: '20px' }}>
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
          <Card sx={{ margin: '20px', padding: '20px' }}>
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
          <Card sx={{ margin: '20px', padding: '20px' }}>
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
