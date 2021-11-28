import React, { useState } from 'react';
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
import { useAuth } from '../context/AuthContext';
import { firestore, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { styled } from '@mui/system';

function Home(props) {

  // Fetching Firestore User Data
  const { currentUser } = useAuth();
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
      try {
          const data = firestore.collection('users').doc(currentUser.uid)
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

// Fetching Firestore Users Document IDs
  const [userDocs, setUserDocs] = React.useState([]);

  React.useEffect(() => {
    try {
      const data = firestore.collection('users')
        .onSnapshot(snap => {
          let docIDs = [];
          snap.forEach(doc => {
            docIDs.push({id: doc.id});
          });
          setUserDocs(docIDs);
        })
    }
    catch(err) {
        console.log(err);
    }
  }, [])

  console.log(userDocs);

  // Fetching Firestore Posts Data
  const [posts, setPosts] = useState([]);
  React.useEffect(() => {
      try {
        // var postsQuery = firestore.collectionGroup('posts');
        // postsQuery.onSnapshot((snap) => {
        //   let documents = [];
        //   snap.forEach((doc) => {
        //     documents.push({...doc.data(), id: doc.id});
        //     console.log(doc.id, '=>', doc.data())
        //     console.log(documents)
        //   })
        //   setPosts(documents)
        // })
        
        firestore.collection('users')
        .get()
        .then((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({...doc.data(), id: doc.id});
            console.log(doc.id, '=>', doc.data())
            console.log(documents)
          })
          firestore.collectionGroup('posts')
          .get()
          .then((snap) => {
            let documents_1 = [];
            snap.forEach((doc) => {
            documents_1.push({...doc.data(), id: doc.id});
            console.log(doc.id, '=>', doc.data())
            console.log(documents_1)
          })

          // Array.prototype.push.apply(documents, documents_1)
          // const merge = documents_1.map(t1 => ({...t1, ...documents.find(t2 => t2.id === t1.id)}))
          const finalPosts = merger(documents, documents_1);
          console.log(finalPosts)
          setPosts(finalPosts)
          })
        })
        
        
      }  
      catch(err) {
          console.log(err);
      }
    }, [])

    console.log(posts, typeof(posts))

    function merger(d, d1) {
      console.log(d, d1)
      let res = [];
      
      res = d1.map((item, i) => Object.assign({}, item, d[i]))   
      return res;     
    }



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
            .collection('posts').doc()
            .set({
              imageURL: downloadURL,
              caption: postTextRef.current.value,
              postedAt: new Date(),
              likes: 0
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

            {/* <form onSubmit={postSubmitHandler}>
                <input type="text" ref={postTextRef}/>
                <input type="file"/>
                <button type="submit">Upload</button>
            </form> */}
          </Card>
          
          <Divider />
          
          {posts && posts.map((doc) => (
            <Card sx={{ margin: {xs: '15px 0px 15px'}, padding: {xs: '15px'} }} key={doc.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ backgroundColor: 'red' }} aria-label="recipe" 
                  src={doc.profileImageURL}
                />
              }
              title={doc.firstName + " " + doc.lastName}
              // subheader={moment(doc.postedAt.toDate()).startOf('hour').fromNow()}
            />
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image={doc.imageURL}
              alt="Post"
            />
            <CardContent>
              <Typography variant="subtitle2" fontSize="large" color="text.secondary">
                {doc.caption}
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
                {doc.likes}
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
