import React from 'react'

const Header = () => {
    return (
        <div className='d-flex justify-content-between align-items-center text-light p-4 bg-secondary rounded-bottom-3'>
            <div className='d-flex'>
                <i className="fa-solid fa-diagram-project fs-3 me-3"></i>
                <h3 className=''>Project Management</h3>
            </div>
        </div>
    )
}

export default Header