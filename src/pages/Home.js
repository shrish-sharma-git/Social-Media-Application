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
import { useAuth } from '../context/AuthContext';
import { firestore, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import moment from 'moment';

function Home(props) {

  // Fetching Firestore User Data
  const { currentUser } = useAuth();
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
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

  // Fetching Firestore Posts Data
  const [postData, setPostData] = React.useState([]);

  React.useEffect(() => {
    try {
      const data = firestore.collection('users')
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

  // Post Uploading
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [progress, setProgress] = React.useState(0);
  // const [file, setFile] = React.useState(null);

  const postTextRef = React.useRef();

  function postSubmitHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector("input[type='file']");
    const file = input.files[0];

    console.log(file)

    if (!file) return;
    const sotrageRef = ref(storage, `posts/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
        const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        },
        (error) => console.log(error),
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            firestore.collection('users').doc(currentUser.uid)
            .update({
              posts: {
                  imageURL: downloadURL,
                  caption: postTextRef.current.value,
                  postedAt: new Date(),
                  likes: 0
              }
            })
        });
       }
    ); 
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MenuDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Card sx={{ margin: {xs: '0px 0px 15px'}, padding: {xs: '15px'} }}>
            {/* <form onSubmit={postSubmitHandler}>
              <Avatar sx={{ backgroundColor: '#1976D2', marginBottom: '10px'}} src={userData.profileImageURL} />                
              <TextField
                sx={{ marginBottom:'15px'}}
                placeholder="Share Something..."
                multiline
                fullWidth
                inputRef={postTextRef}
                variant="filled"
              />
              <input type="file"/>
              <button type="submit">Upload</button>
            </form> */}

            <form onSubmit={postSubmitHandler}>
                <input type="text" ref={postTextRef}/>
                <input type="file"/>
                <button type="submit">Upload</button>
            </form>
          </Card>
          
          <Divider />
          
          {postData && postData.map(doc => (
            <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'} }} key={doc.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe" 
                  src={doc.profileImageURL}
                />
              }
              title={doc.firstName + " " + doc.lastName}
              subheader={moment(doc.postedAt).startOf('hour').fromNow()}
            />
            <CardMedia
              component="img"
              height="194"
              image={doc.posts.imageURL}
              alt="Post"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {doc.posts.caption}
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
                {doc.posts.likes}
              </Typography>
            </CardActions>
            </Card>
          ))}

      </Box>
      <RightSidebar/>    
    </Box>
  );
}

export default Home;
