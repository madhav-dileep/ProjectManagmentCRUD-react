import { Add, BorderAllRounded, Close, Delete, Description } from '@mui/icons-material'
import { Autocomplete, Avatar, Backdrop, Box, Button, Chip, Divider, Fab, Fade, FormControl, FormHelperText, Grow, IconButton, Input, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Modal, Select, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextareaAutosize } from '@mui/base'
import { addMemberAPI, getMemberAPI, getProjectAPI, removeMemberAPI, removeProjectAPI, saveProjectAPI, updateCompletionStatusAPI } from '../services/allAPIs'
import noProject from '../assets/noProject.png'
import noMember from '../assets/contact.png'
import MarkAsCompletedIcon from '@mui/icons-material/DownloadDone';
import { TransitionGroup } from 'react-transition-group';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Header from '../components/Header'

// avatar Members
import user1 from '../assets/avatarMembers/users-1.svg'
import user2 from '../assets/avatarMembers/users-2.svg';
import user3 from '../assets/avatarMembers/users-3.svg';
import user4 from '../assets/avatarMembers/users-4.svg';
import user5 from '../assets/avatarMembers/users-5.svg';
import user6 from '../assets/avatarMembers/users-6.svg';
import user7 from '../assets/avatarMembers/users-7.svg';
import user8 from '../assets/avatarMembers/users-8.svg';
import user9 from '../assets/avatarMembers/users-9.svg';
import user10 from '../assets/avatarMembers/users-10.svg';
import user11 from '../assets/avatarMembers/users-11.svg';
import user12 from '../assets/avatarMembers/users-12.svg';
import user13 from '../assets/avatarMembers/users-13.svg';
import user14 from '../assets/avatarMembers/users-14.svg';
import user15 from '../assets/avatarMembers/users-15.svg';
import user16 from '../assets/avatarMembers/users-16.svg';

// avatar Project
import avatar1 from '../assets/avatarProjects/avatarProject.svg'
import avatar2 from '../assets/avatarProjects/avatarProject1.svg'
import avatar3 from '../assets/avatarProjects/avatarProject2.svg';
import avatar4 from '../assets/avatarProjects/avatarProject3.svg';
import avatar5 from '../assets/avatarProjects/avatarProject4.svg';
import avatar6 from '../assets/avatarProjects/avatarProject5.svg';
import avatar7 from '../assets/avatarProjects/avatarProject6.svg';
import avatar8 from '../assets/avatarProjects/avatarProject7.svg';
import avatar9 from '../assets/avatarProjects/avatarProject8.svg';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    height: '90%',
    maxHeight: '600px',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll'
};
const styleForMemberModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '25px',
    height: 'auto',
    boxShadow: 24,
    p: 4,
};
const styleForViewModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    bgcolor: 'rgba(0,0,0,1)',
    borderRadius: 7,
    height: '90%',
    boxShadow: 12,
    overflowY: 'hidden'
};
const styleForViewMemberModal = {
    position: 'absolute',
    bottom: '25%',
    right: '25%',
    transform: 'translate(25%, 25%)',
    width: '90%',
    maxWidth: '300px',
    bgcolor: 'none',
    borderRadius: 7,
    height: '80%',
    maxHeight:'400px',
    boxShadow: 24,
    p: 1,
    overflowY: 'hidden'
};

const programmingSkills = [
    { id: 1, label: "Python" },
    { id: 2, label: "JavaScript" },
    { id: 3, label: "Java" },
    { id: 4, label: "C++" },
    { id: 5, label: "C#" },
    { id: 6, label: "Ruby" },
    { id: 7, label: "PHP" },
    { id: 8, label: "Swift" },
    { id: 9, label: "Go" },
    { id: 10, label: "Kotlin" },
    { id: 11, label: "R" },
    { id: 12, label: "SQL" },
    { id: 13, label: "HTML/CSS" },
    { id: 14, label: "TypeScript" },
    { id: 15, label: "Shell scripting (Bash, PowerShell)" },
    { id: 16, label: "Perl" },
    { id: 17, label: "MATLAB" },
    { id: 18, label: "Dart" },
    { id: 19, label: "Rust" },
    { id: 20, label: "Scala" },
    { id: 21, label: "Groovy" },
    { id: 22, label: "Lua" },
    { id: 23, label: "Haskell" },
    { id: 24, label: "Assembly Language" },
    { id: 25, label: "Objective-C" },
    { id: 26, label: "AngularJS" },
    { id: 27, label: "ReactJS" },
    { id: 28, label: "MongoDB" },
    { id: 27, label: "Carbon" }

];

const Home = () => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [view, setView] = useState(false)
    const [mem, setMem] = useState(false)
    const [projectDetails, setProjectDetails] = useState({
        avatar: '',
        name: '',
        description: '',
        link:'',
        technologies: [],
        projectMembers: [],
        projectCompleted: false
    })
    const [allProjects, setAllProjects] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [projMember, setProjMember] = useState({
        avatar: '',
        name: '',
        designation: ''
    })
    const [projectForView, setProjectForView] = useState({})
    const [memberForView, setMemberForView] = useState({})

    // For modals
    const handleShow = () => {
        setShow(show => !show)
    }
    const handleOpen = () => {
        setOpen(open => !open)
    }
    const handleView = () => {
        setView((view) => !view)
    }
    const handleMem = () => {
        setMem(mem => !mem)
    }

    // for saving projects to server
    const handleSave = async () => {

        // console.log(projectDetails);
        const { avatar, name, description, technologies, projectMembers, projectCompleted } = projectDetails
        if (avatar && name && description && technologies && projectMembers) {
            // console.log(projectDetails);
            try {
                const response = await saveProjectAPI(projectDetails)
                if (response.status >= 200 && response.status < 300) {
                    alert("\tProject Details Added!")
                    handleOpen()
                }
            } catch (e) {
                console.error(e)
            }
            setProjectDetails({
                avatar: '',
                name: '',
                description: '',
                link:'',
                technologies: [],
                projectMembers: [],
                projectCompleted: false
            })
        } else {
            alert("Fill all fields!")
        }
    }
    // for adding a new member
    const handleAddMember = async () => {
        const { avatar, name, designation } = projMember
        if (avatar && name && designation) {
            try {
                const response = await addMemberAPI(projMember)
                if (response.status >= 200 && response.status < 300) {
                    console.log(response.data);
                    setAllMembers(response.data)
                    setProjMember({
                        avatar: '',
                        name: '',
                        designation: ''
                    })
                    handleShow()
                } else {
                    console.log("API CALL FAILED");
                }
            } catch (e) { console.error(e) }
        } else {
            alert("Fill all Fields!")
        }
    }

    // getting projects and members from server
    const getProjects = async () => {
        try {
            const response = await getProjectAPI();
            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                setAllProjects(response.data)
                // setCompletedProjects(allProjects?.filter(project => { project?.projectCompleted == true }))
                // console.log(allProjects);
            } else {
                console.log("API call failed");
            }
        } catch (e) { console.error(e) }
    }
    const getMembers = async () => {
        try {
            const response = await getMemberAPI();
            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                setAllMembers(response.data)
                // console.log(allMembers);
            } else {
                console.log("API call failed");
            }
        } catch (e) { console.error(e) }
    }

    // delete Projects
    const deleteProject = async (id) => {
        try {
            const response = await removeProjectAPI(id)
        } catch (e) { console.error(e) }
    }
    // delete Memebr
    const deleteMember = async (id) => {
        try {
            const response = await removeMemberAPI(id)
        } catch (e) { console.error(e) }
    }

    // setting speicfic project
    const handleProjectForView = (ProjId) => {
        setProjectForView(allProjects.find(project => project.id == ProjId))
        // console.log(projectForView);
        handleView()
    }

    const updateAllProjects = async () => {
        console.log("inside updateALlprojects");
        console.log(projectForView);

        try {
            const response = await updateCompletionStatusAPI(projectForView)
            if (response.status >= 200 && response.status < 300) {
                getProjects()
            } else {
                console.log("API call FAILED");
            }
        } catch (e) { console.error(e) }
        handleView()
    }

    const toggleProjectCompletion = () => {
        if (projectForView?.projectCompleted) {
            setProjectForView({ ...projectForView, projectCompleted: false })
            // console.log(projectForView?.projectCompleted);
        }
        else {
            setProjectForView({ ...projectForView, projectCompleted: true })
            // console.log(projectForView?.projectCompleted);
        }
        console.log(projectForView?.projectCompleted);
        // updateAllProjects()
        // setProjectForView({...projectForView,projectCompleted:false})
    }

    const handleMemberForView = (memID) => {
        setMemberForView(allMembers.find(member => member.id == memID))
        handleMem()
    }

    // resetFields
    const handleReset = () => {
        setProjectDetails({
            avatar: '',
            name: '',
            description: '',
            technologies: [],
            projectMembers: [],
            projectCompleted: false
        })
        setProjMember({
            avatar: '',
            name: '',
            designation: ''
        })
    }

    useEffect(() => {
        getProjects()
        getMembers()
    }, [allProjects, allMembers])

    // console.log(completedProjects);
    // console.log(allMembers);
    // console.log(image,imageUrl);
    // console.log(projectForView?.projectCompleted);
    // console.log(completedProjects);
    // console.log(memberForView?.name?.charAt(0));
    


    return (
        < >
            <Header />
            <div style={{ minHeight: '80vh', width: '100%' }} className='row'>
                {/* left side*/}
                <div className='col-lg-8'>
                    <div style={{ backgroundColor: "rgba(103, 16, 157, 0.25)", height: 'auto' }} className='col-lg-10 container col-sm-12 mt-3 mb-5 rounded-3 border shadow'>
                        <div className='container mt-4 d-flex justify-content-between px-4'>
                            <h4 style={{ fontSize: '2em' }} className='fw-semibold'>My Projects</h4>
                            <Tooltip title='Add new Project Details' placement='left'>
                                <Fab onClick={handleOpen} color='secondary' size='medium'>
                                    <Add />
                                </Fab>
                            </Tooltip>
                        </div>
                        <hr className='mx-5' />
                        <Box sx={{ display: 'flex', width: '100%' }} className='container'>
                            <List sx={{ width: '100%', maxHeight: '800px' }} className=''>

                                {
                                    allProjects?.length > 0 ?
                                        allProjects?.map((project) => (

                                            <ListItem key={project?.id} sx={{ textDecoration: 'none', width: '100%', backdropFilter: 'blur(25px)', backgroundColor: project?.projectCompleted ? 'rgba(66, 230, 110, 0.62)' : 'rgba(4, 40, 160, 0.25)' }} alignItems="flex-start" className='listItem d-flex flex-row justify-content-between shadow my-4 rounded ' secondaryAction={
                                                <IconButton sx={{ zIndex: 50 }} onClick={() => deleteProject(project.id)} edge="end" aria-label="delete">
                                                    <Delete className='text-danger' />
                                                </IconButton>}>
                                                <ListItemAvatar onClick={() => handleProjectForView(project?.id)}>
                                                    <Avatar alt="Remy Sharp" src={project?.avatar} />
                                                    {/* <img src={()=>{handleSetImageUrl(project?.picture)}} alt="" /> */}
                                                </ListItemAvatar>
                                                <ListItemText
                                                    onClick={() => handleProjectForView(project?.id)}
                                                    sx={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                                                    primary={
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'text.primary', display: 'block', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: "20px" }}
                                                        >
                                                            {project?.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'text.primary', display: 'block', color: 'white', textDecoration: 'none', overflowY: 'hidden', maxHeight: 30 }}
                                                        >
                                                            {project?.description}
                                                        </Typography>
                                                    }
                                                >
                                                </ListItemText>
                                            </ListItem>

                                        ))

                                        :
                                        <div className='text-danger fw-bold fs-1 text-center'>
                                            {/* No Projects to Display  */}
                                            <img className='img-fluid' src={noProject} alt="" />
                                        </div>
                                }

                            </List>
                        </Box>
                    </div>
                </div>
                {/* right side */}
                <div className='col-lg-4'>
                    <div style={{ height: 'auto', backdropFilter: 'blur(100px)' }} className='col-lg-4 col-sm-12 mt-3 mb-5 d-sm-flex flex-wrap flex-lg-column'>
                        {/* Project Summary */}
                        <div style={{ backgroundColor: 'rgba(79, 159, 70, 0.43)', backdropFilter: 'blur(100px)', minWidth: '400px', width: '100%' }} className='mt-4 px-4 p-4 text-center shadow border rounded container' >
                            <h4 className='text-capitalize fw-bold'> Project Summary</h4>
                            <hr />
                            <div className='text-start '>
                                <h5 className='my-4'>Total Projects: <span className='float-end fw-normal'>{allProjects?.length}</span></h5>
                                <h5 className='my-4'>Completed Projects: <span className='float-end fw-normal'>{allProjects?.filter(projects => (projects?.projectCompleted == true)).length}</span></h5>
                                <h5 className='my-4'>Pending Projects: <span className='float-end fw-normal'>{allProjects?.length - allProjects?.filter(projects => (projects?.projectCompleted == true)).length}</span></h5>
                            </div>
                        </div>
                        {/* Members */}
                        <div style={{ backgroundColor: 'rgba(4, 36, 119, 0.69)', backdropFilter: 'blur(100px)', minWidth: '400px', width: '100%' }} className='mt-4 px-4 p-4 text-center shadow border rounded container'>
                            <h4 className='text-capitalize text-light fw-bold'> Members ({allMembers?.length}) <Tooltip title="Add a New Member" placement='top-end'><Fab size='small' className='float-end'><Add onClick={handleShow} /></Fab></Tooltip></h4>
                            <hr className='text-light' />
                            <List sx={{ width: '100%', maxWidth: 360, maxHeight: 265, overflowY: 'scroll' }} className='px-3'>

                                {
                                    allMembers?.length > 0 ?
                                        allMembers?.map((member) => (
                                            <ListItem key={member?.id} alignItems="flex-start" sx={{ width: '100%', alignItems: 'center' }} className='border my-2 rounded-4 bg-light'
                                            // secondaryAction={
                                            //     <IconButton sx={{ zIndex: 50 }} onClick={() => deleteMember(member?.id)} edge="end" aria-label="delete">
                                            //         <Delete className='text-danger' />
                                            //     </IconButton>}
                                            >
                                                <ListItemAvatar onClick={() => handleMemberForView(member?.id)} sx={{ cursor: 'pointer' }}>
                                                    <Avatar alt="Remy Sharp" src={member?.avatar} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    onClick={() => handleMemberForView(member?.id)}
                                                    sx={{ cursor: 'pointer' }}
                                                    primary={
                                                        <Typography
                                                            component="span"
                                                            variant="body1"
                                                            sx={{ color: 'text.primary', display: 'inline' }}
                                                        >
                                                            {member?.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            sx={{ color: 'text.primary', display: 'block' }}
                                                        >
                                                            {member?.designation}
                                                        </Typography>
                                                    }
                                                />
                                            </ListItem>

                                        ))
                                        :
                                        <div className='fw-semibold text-center mt-2'>
                                            <img className='img-fluid' width="200px" style={{ color: "red" }} src={noMember} alt="" />
                                        </div>
                                }

                            </List>
                        </div>
                    </div>
                </div>
            </div>

            {/* For Projects */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                sx={{ overflowY: 'scroll', height: 'auto' }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}
                        fullScreen={fullScreen}
                        className='modal-content'>
                            <Typography sx={{ fontSize: '2em', fontWeight: 600, textAlign: 'center' }} id="transition-modal-title" variant="h6" component="h2">
                                Add New Project <Close style={{ cursor: 'pointer' }} onClick={handleOpen} className='float-end'></Close>
                            </Typography>
    
                            <Divider />
                            <Box className='d-flex flex-column mt-4'>
                                {/* Avatar */}
                                <FormControl sx={{ width: "100%" }} className='mt-2'>
                                    <InputLabel id="demo-simple-select-autowidth-label">Avatar</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        autoWidth
                                        label="Age"
                                        value={projectDetails.avatar}
                                        placeholder="Avatar"
                                        onChange={(e) => { setProjectDetails({ ...projectDetails, avatar: e.target.value }) }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value={avatar1}><Avatar src={avatar1} /></MenuItem>
                                        <MenuItem value={avatar2}><Avatar src={avatar2} /></MenuItem>
                                        <MenuItem value={avatar3}><Avatar src={avatar3} /></MenuItem>
                                        <MenuItem value={avatar4}><Avatar src={avatar4} /></MenuItem>
                                        <MenuItem value={avatar5}><Avatar src={avatar5} /></MenuItem>
                                        <MenuItem value={avatar6}><Avatar src={avatar6} /></MenuItem>
                                        <MenuItem value={avatar7}><Avatar src={avatar7} /></MenuItem>
                                        <MenuItem value={avatar8}><Avatar src={avatar8} /></MenuItem>
                                        <MenuItem value={avatar9}><Avatar src={avatar9} /></MenuItem>
                                    </Select>
                                    <FormHelperText id="my-helper-text">Pick An avatar</FormHelperText>
                                </FormControl>
    
                                {/* Name */}
                                <FormControl style={{ width: '100%' }} className='mt-2'>
                                    <TextField onChange={(e) => { setProjectDetails({ ...projectDetails, name: e.target.value }) }} id="my-input" label='Project Name' value={projectDetails?.name} aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Type the Name for Project</FormHelperText>
                                </FormControl>
    
                                {/* Description */}
                                <FormControl style={{ width: '100%' }} className='mt-2'>
                                    <TextareaAutosize onChange={(e) => { setProjectDetails({ ...projectDetails, description: e.target.value }) }} placeholder="Description" value={projectDetails?.description} className='pt-2 ps-2' minRows={3}></TextareaAutosize>
                                    <FormHelperText id="my-helper-text">Type in Project Details</FormHelperText>
                                </FormControl>
    
                                {/* Link(if any) */}
                                <FormControl style={{ width: '100%' }} className='mt-2'>
                                    <TextField onChange={(e) => { setProjectDetails({ ...projectDetails, link: e.target.value }) }} id="my-input" label='Project Link(if Any)' value={projectDetails?.link} aria-describedby="my-helper-text" />
                                    <FormHelperText id="my-helper-text">Paste the Link of your Project</FormHelperText>
                                </FormControl>
    
                                {/* Project Technologies */}
                                <FormControl style={{ width: '100%' }} className='mt-2'>
                                    {/* <InputLabel id="demo-simple-select-autowidth-label">Technologies Used</InputLabel> */}
                                    <Autocomplete
                                        multiple
                                        limitTags={5}
                                        disablePortal
                                        value={projectDetails?.technologies}
                                        options={programmingSkills}
                                        onChange={(e, value) => { setProjectDetails({ ...projectDetails, technologies: value }) }}
                                        sx={{ width: "100%" }}
                                        renderInput={(params) => <TextField  {...params} placeholder='Technologies Used' label="" />} />
                                    <FormHelperText id="my-helper-text">Select Technologies used in the Project</FormHelperText>
                                </FormControl>
    
                                {/* Project Members */}
                                <FormControl style={{ width: '100%' }} className='mt-2'>
                                    {/* <InputLabel id="demo-simple-select-autowidth-label">Technologies Used</InputLabel> */}
                                    <Autocomplete
                                        multiple
                                        limitTags={5}
                                        disablePortal
                                        value={projectDetails?.projectMembers}
                                        options={allMembers}
                                        onChange={(e, value) => { setProjectDetails({ ...projectDetails, projectMembers: value }) }}
                                        getOptionLabel={(options => `${options.name} (${options.designation})`)}
                                        sx={{ width: "100%" }}
                                        renderInput={(params) => <TextField {...params} placeholder='Team Members' label="" />} />
                                    <FormHelperText id="my-helper-text">Select your Team Member in the Project</FormHelperText>
                                </FormControl>

                                </Box>
                        <Stack spacing={2} className='mt-4'>
                            <Button onClick={handleSave} type='submit' className='bg-primary text-white' variant='outlined'>Save</Button>
                            <Button onClick={handleReset} type='reset' variant='outlined'>Reset</Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

            {/* For Members */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={show}
                fullScreen={fullScreen}
                sx={{ overflowY: 'scroll' }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={show}>
                    <Box sx={styleForMemberModal}
                        fullScreen={fullScreen}>
                        <Typography sx={{ fontSize: '2em', fontWeight: 600, textAlign: 'center' }} id="transition-modal-title" variant="h6" component="h2">
                            Add a New Member <Close style={{ cursor: 'pointer' }} onClick={handleShow} className='float-end'></Close>
                        </Typography>

                        <Divider />
                        <Box className='d-flex flex-column mt-4'>
                            {/* Avatar */}
                            <FormControl size='small' sx={{ width: "100%" }} className='mt-2'>
                                <InputLabel id="demo-simple-select-autowidth-label">Avatar</InputLabel>
                                <Select
                                    autoWidth
                                    label="Age"
                                    value={projMember?.avatar}
                                    placeholder="Avatar"
                                    onChange={(e) => { setProjMember({ ...projMember, avatar: e.target.value }) }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={user1}><Avatar src={user1} /></MenuItem>
                                    <MenuItem value={user2}><Avatar src={user2} /></MenuItem>
                                    <MenuItem value={user3}><Avatar src={user3} /></MenuItem>
                                    <MenuItem value={user4}><Avatar src={user4} /></MenuItem>
                                    <MenuItem value={user5}><Avatar src={user5} /></MenuItem>
                                    <MenuItem value={user6}><Avatar src={user6} /></MenuItem>
                                    <MenuItem value={user7}><Avatar src={user7} /></MenuItem>
                                    <MenuItem value={user8}><Avatar src={user8} /></MenuItem>
                                    <MenuItem value={user9}><Avatar src={user9} /></MenuItem>
                                    <MenuItem value={user10}><Avatar src={user10} /></MenuItem>
                                    <MenuItem value={user11}><Avatar src={user11} /></MenuItem>
                                    <MenuItem value={user12}><Avatar src={user12} /></MenuItem>
                                    <MenuItem value={user13}><Avatar src={user13} /></MenuItem>
                                    <MenuItem value={user14}><Avatar src={user14} /></MenuItem>
                                    <MenuItem value={user15}><Avatar src={user15} /></MenuItem>
                                    <MenuItem value={user16}><Avatar src={user16} /></MenuItem>
                                </Select>
                                <FormHelperText id="my-helper-text">Pick An avatar for your Member</FormHelperText>
                            </FormControl>

                            {/* Name */}
                            <FormControl style={{ width: '100%' }} className='mt-2'>
                                <TextField onChange={(e) => { setProjMember({ ...projMember, name: e.target.value }) }} id="my-input" label='Member Name' value={projMember?.name} aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">Type in Member Name</FormHelperText>
                            </FormControl>

                            {/* Designation */}
                            <FormControl style={{ width: '100%' }} className='mt-2'>
                                <TextField onChange={(e) => { setProjMember({ ...projMember, designation: e.target.value }) }} id="my-input" label='Member Designation' value={projMember?.designation} aria-describedby="my-helper-text" />
                                <FormHelperText id="my-helper-text">Type in Member Designation</FormHelperText>
                            </FormControl>


                        </Box>
                        <Stack spacing={2} className='mt-4'>
                            <Button onClick={handleAddMember} type='submit' className='bg-dark text-white' variant='outlined'>Add</Button>
                            <Button onClick={handleReset} type='reset' className='border-dark text-dark' variant='outlined'>Reset</Button>
                        </Stack>
                    </Box>
                </Fade>
            </Modal>

            {/* for View Project*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={view}
                sx={{ overflowY: 'scroll' }}
                closeAfterTransition
                onClose={updateAllProjects}
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={view}>
                    <Box sx={styleForViewModal}>
                        <Box sx={{ backgroundColor: '#4B4E6D', width: '100%', height: '100%', overflowY: 'auto', borderRadius: 7 }}>
                            <div style={{ fontSize: '3em' }} className='conatiner p-3 mt-3 fw-bold d-flex justify-content-center align-items-center text-white'> 
                                <Avatar sx={{ width: 85, height: 85 }} alt={projectForView?.name?.charAt(0)} src={projectForView?.avatar} className='mx-2 me-4'></Avatar> 
                                {projectForView?.name}
                                {/* link */}
                                <div className='ms-2'>
                                    <a href={projectForView?.link} target='_blank' hidden={!projectForView?.link} className='fs-5 rounded-circle p-2 bg-dark-subtle'><i className='fa-solid fa-link text-dark'></i></a>
                                </div>
                            </div>
                            <div style={{ height: 'auto' }} className='mt-2 p-2 px-4 text-light'>
                                {/* description */}
                                <div style={{ maxHeight: '400px' }} className=''>
                                    <h6 className='fw-bold fst-italic'>Description:</h6>
                                    <textarea style={{ border: 'none', background: 'transparent', height: '300px' }} readOnly disabled value={projectForView?.description} className='w-100 p-3 text-light'></textarea>
                                </div>

                                {/* TechUsed */}
                                <div className='mt-2 p-2 '>
                                    <h6 className='fw-bold fst-italic'>Technologies Used:</h6>
                                    {/* <input style={{border:'none',background:'transparent'}} value={"C++"} readOnly disabled className='w-100 p-3 fs-4 text-light' type="text" /> */}
                                    <div className='w-100 p-3 fs-4 text-light'>
                                        {
                                            projectForView?.technologies?.length > 0 &&
                                            projectForView?.technologies?.map(tech => (
                                                <Chip key={tech?.id} className='mx-2 my-1 bg-dark-subtle border-2' label={
                                                    <Typography
                                                        sx={{}}
                                                        className='p-2 text-dark '
                                                    >
                                                        {tech?.label}
                                                    </Typography>
                                                } variant="outlined" />
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* Members */}
                                <div className=' mt-2 p-2'>
                                    <h6 className='fw-bold fst-italic'>Team Members:</h6>
                                    {
                                        projectForView?.projectMembers?.length > 0 &&
                                        projectForView?.projectMembers?.map(member => (
                                            <Chip key={member?.id} sx={{ minHeight: '50px', width: 'auto', height: 'auto', fontSize: '1.2em', backgroundColor: '#222222', padding: 2 }} className='mx-2 my-2' avatar={<Avatar alt={member?.name?.charAt(0)} src={member?.avatar} sx={{width:56,height:56,border:'2px solid white'}}></Avatar>} label={
                                                <Typography sx={{ color: 'white' }}
                                                >
                                                    {member?.name}
                                                </Typography>
                                            } />
                                        ))


                                    }
                                </div>
                            </div>
                            {/* Mark completion */}
                            <div className='p-4 m-1 d-flex justify-content-center align-item-center'>

                                <Button variant='outlined' hidden={projectForView?.projectCompleted} onClick={toggleProjectCompletion} className='bg-success border-success text-light'><MarkAsCompletedIcon className='me-2 ms-0' />Mark as Completed</Button>
                                <Button onClick={toggleProjectCompletion} variant='outlined' hidden={!projectForView?.projectCompleted} className='bg-danger border-danger text-light'><Close className='me-2 ms-0' />Mark Not Completed</Button>

                            </div>
                        </Box>

                    </Box>
                </Fade>
            </Modal>

            {/* for view Member */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={mem}
                sx={{ overflowY: 'scroll', opacity: 1, backgroundColor: 'rgba(255, 255, 255, 0)' }}
                closeAfterTransition
                onClose={handleMem}
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Grow in={mem}>
                    <Box sx={styleForViewMemberModal}>
                        <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', opacity: 2, borderRadius: 7, border: '8px solid rgb(95, 133, 204)' }}>
                            <div className=' p-3 pt-4 d-flex justify-content-center align-items-center'>
                                <Avatar alt={memberForView?.name?.charAt(0)} src={memberForView?.avatar} sx={{ width: 90, height: 90, border: '2px solid' }}></Avatar>
                            </div>
                            <div className=' text-center fs-3 mt-5 fw-bold'>
                                {memberForView?.name}
                            </div>
                            <div className=' text-center fs-5 mt-2'>
                                {memberForView?.designation}
                            </div>
                            <div className='text-center mt-4'>
                                <Tooltip title="Remove Member">
                                    <IconButton sx={{ zIndex: 50 }} onClick={() =>{ deleteMember(memberForView?.id),handleMem()}} edge="end" aria-label="delete">
                                        <Delete className='fs-2 text-danger' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Box>
                    </Box>
                </Grow>

            </Modal>
        </>
    )
}

export default Home