import { Avatar, Backdrop, Button, Card, CardHeader, Divider, Fade, Grid, IconButton, Input, Modal, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import MenuDrawer from './components/MenuDrawer';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useHistory } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { firestore, storage } from '../firebase';
import { PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/system';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

const Settings = () => {
    const [error, setError] = useState('');
    const { currentUser, logout, updateEmail, updatePassword, deleteAccount } = useAuth();

    // Fetching Firestore Data
    const [userData, setUserData] = useState({});

    useEffect(() => {
        try {
            firestore.collection('users').doc(currentUser.uid)
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

    // Storing FName and LName
    const userFirstName = userData.firstName;
    const userLastName = userData.lastName;

    // Modal (Email & Password Change)
    function handleEmailPasswordChangeSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
        promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    // Modal (Email & Password Change)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Modal (Bio Change)
    function handleBioChangeSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            firestore.collection('users').doc(currentUser.uid).update({
                bio: bioRef.current.value
            })
            setLoading(false);
            handleCloseBio();
            history.push('/');
        } catch(err) {
            setError("Failed to update bio")
        }
    }

    // Modal (Bio Change)
    const [openBio, setOpenBio] = useState(false);
    const handleOpenBio = () => setOpenBio(true);
    const handleCloseBio = () => setOpenBio(false);

    // Modal (Username Change)
    function handleUsernameChangeSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");   
        
        try {
            firestore.collection('users').doc(currentUser.uid).update({
                username: usernameRef.current.value
            })
            setLoading(false);
            handleCloseUsername();
            history.push('/');
        } catch(err) {
            setError("Failed to update username")
        }
    }

    // Modal (Username Change)
    const [openUsername, setOpenUsername] = useState(false);
    const handleOpenUsername = () => setOpenUsername(true);
    const handleCloseUsername = () => setOpenUsername(false);
    
    // Modal (Name Change)
    function handleNameChangeSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");   

        try {
            firestore.collection('users').doc(currentUser.uid).update({
                firstName: fnameRef.current.value,
                lastName: lnameRef.current.value
            })
            setLoading(false);
            handleCloseName();
            history.push('/');
        } catch(err) {
            setError("Failed to update Name")
        }
    }
    
    // Modal (Name Change)
    const [openName, setOpenName] = useState(false);
    const handleOpenName = () => setOpenName(true);
    const handleCloseName = () => setOpenName(false);

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const bioRef = useRef()

    const usernameRef = useRef()

    const fnameRef = useRef();
    const lnameRef = useRef();

    const [loading, setLoading] = useState(false)

    const history = useHistory();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        color: 'black',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push('/login')
        } catch {
            setError('Failed to Logout');
        }
    }

    async function handleDeleteAccount() {
        setError('');

        // delete all info of deleted user
        firestore.collection('users')
        .doc(currentUser.uid).delete();

        try {
            await deleteAccount();
            history.push('/signup');
        } catch {
            setError('Failed to delete Account');
        }
    }

    // State
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    // Upload Profile Picture
    function profileImageChangeHandler(e) {
        e.preventDefault();

        const file = e.target[0].files[0];
        uploadImage(file);
        setFile(file);
        history.push('/');
    }

    const uploadImage = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `profileImages/${file.name}`);
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
                firestore.collection('users').doc(currentUser.uid).update({
                    profileImageURL: downloadURL
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
        <Box sx={{ backgroundColor: '#EEEEEE' }}>
            <MenuDrawer userFirstName={userFirstName} userLastName={userLastName}/>
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: {xs: '50px 0px'}, marginLeft: {sm: '240px'}, marginRight: {sm: '400px'} }}>

                {/* Profile Picture Change */}
                <Grid container sx={{m: '10px'}}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={12}>
                    <Avatar
                        src={userData.profileImageURL}
                        sx={{ height: 200, width: 200 }}
                    />
                    </Grid>
                    <Grid item xs={12} sx={{ m: '10px 0 10px 0' }}>
                            <form onSubmit={profileImageChangeHandler}>
                            <label htmlFor="icon-button-file">
                                <Input type="file" id="icon-button-file" />
                                <Tooltip title="Upload Image/GIF" arrow>
                                    <IconButton  color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera sx={{color: '#393E46'}} fontSize="large"/>
                                    </IconButton>
                                </Tooltip>    
                            </label>
                            <Button sx={{backgroundColor: '#393E46' }} type="submit" variant="contained">
                                Upload
                            </Button>
                            </form>
                            { error && <Typography variant="caption" color="red">{error}</Typography> }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{textAlign: 'center'}}>Edit Profile Picture</Typography>
                    </Grid>
                </Grid>

                {/* Name Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                        subheader="Edit Name"
                        action={
                            <Tooltip title="Edit Name" arrow>
                                <IconButton aria-label="edit">
                                    <EditRoundedIcon
                                        onClick={handleOpenName}
                                    />
                                </IconButton>
                            </Tooltip>
                        }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Name:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">{userData.firstName} {userData.lastName}</Typography>
                        </Grid>
                    </Grid>
                </Card>
                {/* MODAL Name Change MODAL */}
                <Modal
                    open={openName}
                    onClose={handleCloseName}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <Fade in={openName}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Name
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleNameChangeSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={fnameRef}
                                id="fname"
                                label="First Name"
                                name="fname"
                                autoComplete="fname"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={lnameRef}
                                id="lname"
                                label="Last Name"
                                name="lname"
                                autoComplete="lname"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

                {/* Username Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Username"
                            action={
                                <Tooltip title="Edit Username" arrow>
                                    <IconButton aria-label="edit">
                                        <EditRoundedIcon
                                            onClick={handleOpenUsername}
                                        />
                                    </IconButton>
                                </Tooltip>    
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Username:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5">@{userData.username}</Typography>
                        </Grid>
                    </Grid>
                </Card>
                {/* MODAL Username Change MODAL */}
                <Modal
                    open={openUsername}
                    onClose={handleCloseUsername}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <Fade in={openUsername}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Username
                        </Typography>

                        {error && 
                            <Typography
                                variant="caption"
                                color="red"
                            >
                                {error}
                            </Typography>
                        }

                        <Box component="form" noValidate onSubmit={handleUsernameChangeSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={usernameRef}
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

                {/* Bio Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Edit Bio"
                            action={
                                <Tooltip title="Edit Bio" arrow>
                                    <IconButton aria-label="edit">
                                        <EditRoundedIcon
                                            onClick={handleOpenBio}
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Bio:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                            >
                                {userData.bio}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

                <Divider sx={{ m: '25px 0 25px 0' }}/>
                {/* MODAL Bio Change MODAL */}
                <Modal
                    open={openBio}
                    onClose={handleCloseBio}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <Fade in={openBio}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Bio
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleBioChangeSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={bioRef}
                                id="bio"
                                label="Bio"
                                name="bio"
                                autoComplete="bio"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

                {/* Email & Password Change */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Privacy & Security Settings"
                            action={
                                <Tooltip title="Change Email/Password">
                                    <IconButton aria-label="edit">
                                        <EditRoundedIcon
                                            onClick={handleOpen}
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={6}>
                            <Typography variant="h5">Email:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                noWrap
                            >
                                {currentUser && currentUser.email}
                            </Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h5">Password:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                noWrap
                            >
                                change password
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
                {/* MODAL Email & Password Change MODAL */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit Email and Pass
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleEmailPasswordChangeSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={emailRef}
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                inputRef={passwordRef}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <TextField
                            required
                            inputRef={passwordConfirmRef}
                            fullWidth
                            name="confirm password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="new-password"
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>

                <Divider sx={{ m: '25px 0 25px 0' }}/>

                {/* Sign Out */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Log Out"
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

                {/* Delete Account */}
                <Card sx={{m: '10px'}}>
                    <CardHeader
                            subheader="Delete Your Account"
                    />
                    <Grid container sx={{m: '10px', p: '10px'}}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

            </Box>
        </Box>
    );
}

export default Settings;
