import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, Button, Card, TextField } from '@mui/material';
import RightSidebar from './components/RightSidebar';
import { PhotoCamera } from '@mui/icons-material';
import MenuDrawer from './components/MenuDrawer';
import { useAuth } from '../context/AuthContext';
import { firestore, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { styled } from '@mui/system';
import Post from './components/Post';
import ProgressBar from './components/ProgressBar';

function Home() {

  // Fetching Firestore User Data
  const { currentUser } = useAuth();
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
      try {
          firestore.collection('users').doc(currentUser.uid)
          .get()
          .then((snap) => {
             setUserData(snap.data())
          })
      }
      catch(err) {
          console.log(err);
      }
  }, [])

  console.log(userData);

  // Firestore Fetch Posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
        // firestore.collection('posts')
        // .get()
        // .then((snap) => {
        //   let documents_1 = [];
        //   snap.forEach((doc) => {
        //   documents_1.push({...doc.data(), id: doc.id});
        //   console.log(doc.id, '=>', doc.data())
        //   console.log(documents_1)
        //   setPosts(documents_1)

        firestore.collection('posts')
        .onSnapshot((snap) => {
          let documents_1 = [];
          snap.forEach((doc) => {
            documents_1.push({...doc.data(), id: doc.id});
            setPosts(documents_1);
          })
      })      
  }, [])

  console.log(posts);

  // Post Uploading
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [progress, setProgress] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [url, setUrl] = useState(null); 

  const postTextRef = React.useRef();

  function postSubmitHandler(e) {
    e.preventDefault();

    const input = e.target.querySelector("input[type='file']");
    const file = input.files[0];

    setFile(file);

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
            setUrl(downloadURL);
            firestore.collection('posts').doc()
            .set({
              imageURL: downloadURL,
              caption: postTextRef.current.value,
              postedAt: new Date(),
              userId: currentUser.uid,
              likes: 0,
              postFirstName: userData.firstName,
              postLastName: userData.lastName,
              postProfilePicture: userData.profileImageURL
            })
        });
       }
    );
  }

  // Upload Image Button
  const Input = styled('input')({
    display: 'none',
  });
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <MenuDrawer />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Card sx={{ margin: {xs: '0px 0px 15px'}, padding: {xs: '15px'} }}>
            <form onSubmit={postSubmitHandler}>
              <Avatar sx={{ backgroundColor: '#1976D2', marginBottom: '10px'}} src={userData.profileImageURL} />                
              <TextField
                sx={{ marginBottom:'15px'}}
                placeholder="Share Something..."
                multiline
                fullWidth
                inputRef={postTextRef}
                variant="filled"
              />
              <label htmlFor="icon-button-file">
                <Input type="file" id="icon-button-file"/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera fontSize="large"/>
                </IconButton>
              </label>
              <Button variant="contained" sx={{ marginLeft: { xs:'70%', sm: '89%' }  }} type="submit">Post</Button>
            </form> 

            {file && <ProgressBar progress={progress} url={url} file={file} setFile={setFile}/>}

          </Card>
          
          <Divider />
          
          {posts.map(doc => (
            <div key={doc.id}>
              <Post doc={doc}/>
            </div>
          ))}

      </Box>
      <RightSidebar/>    
    </Box>
  );
}

export default Home;
