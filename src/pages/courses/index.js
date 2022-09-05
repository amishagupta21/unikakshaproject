import React from 'react'
import Header from '../header'
import SideBar from '../sidebar'

const index = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="main-wrapper">
                    <Header />
                    <div>
                        Courses
                    </div>
                </div>
            </div>
        </div >
    )
}

export default index