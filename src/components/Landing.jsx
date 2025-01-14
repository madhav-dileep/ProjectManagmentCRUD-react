import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import landingIMG from '../assets/landingBG.png'
import landingbg from '../assets/landingim.png'



const Landing = () => {
  return (
    <div style={{height:'100vh',background:'linear-gradient(90deg, rgba(36,36,36,1) 0%, rgba(32,42,55,1) 30%, rgba(224,224,224,1) 100%)'}} className=''>
        <div style={{height:'100%'}} className='row'>
          <div className="col-lg-6 text-light d-flex flex-column justify-content-center align-items-center">
              <div className='text-lg-end text-xs-end text-md-center mx-5'>
                <h1 style={{fontSize:'3em'}} className='mb-4 text-center fw-bold'><i className="fa-solid fa-diagram-project me-4"></i>Project Managament</h1>
                <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora quod autem eum labore, aliquam eaque expedita, voluptatibus deleniti consequatur tenetur, id minima laudantium amet ea reprehenderit architecto nemo. Perferendis, labore?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo optio provident tenetur delectus necessitatibus vel id, reiciendis accusamus odit expedita ea sunt, natus exercitationem aut nobis aliquid corporis dolores numquam.</p>
                <Link to={'/home'}><Button className='btn btn-light rounded-5 py-3 px-5 mt-3 text-black border-dark' variant='outlined'>Get Started</Button></Link>
              </div>
          </div>
          <div style={{height:'100%'}} className="col-lg-6 d-sm-none d-lg-block">
            <img width="100%" src={landingbg} alt="" />
          </div>
        </div>
        {/* <Link to={'/home'}>Check</Link> */}
    </div>
  )
}

export default Landing