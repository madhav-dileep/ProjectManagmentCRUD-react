import { Send } from '@mui/icons-material'
import { Fab, TextField } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div className='d-flex flex-wrap justify-content-between align-items-center p-5 bg-dark text-light '>
            
            <div style={{ width: 400 }} className='informations '>
                <div className='d-flex'>
                    <i className="fa-solid fa-diagram-project fs-5 me-2"></i>
                    <h4 className=''>Project Management</h4>
                </div>
                <p>Designed and built with all the love in the world by Madhav.</p>
                <p>Code license, docs CC BY 1.0.</p>
                <p>Currently v1.0.1.</p>
            </div>

            <div style={{ width: 400 }} className='Links'>
                <h4>Links</h4>
                <ul className='list-unstyled ms-1'>
                    <li><a className='text-decoration-none text-white' href="https://react.dev/">React</a></li>
                    <li><a className='text-decoration-none text-white' href="https://mui.com/">Material UI</a></li>
                    <li><a className='text-decoration-none text-white' href="https://www.npmjs.com/package/react-router-dom">React Router Dom</a></li>
                    <li><a className='text-decoration-none text-white' href="https://getbootstrap.com/">Bootstrap</a></li>
                </ul>
            </div>

            <div className='Contact'>
                <h4>Contact Us</h4>
                <div className='d-flex input-group'>
                    <TextField className='bg-light rounded-start-3' id="outlined-basic" type='email' variant="outlined" placeholder='Email' />
                    <Fab color="primary" aria-label="add">
                        <Send />
                    </Fab>
                </div>
            </div>

        </div>
    )
}

export default Footer