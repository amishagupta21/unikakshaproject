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
                        Live classes
                    </div>
                </div>
            </div>
        </div >
    )
}

export default index