import React from 'react'
import { useDispatch } from "react-redux";
import { getUsers } from '../redux/actions/UserActions'
import { useSelector } from "react-redux";
import SideBar from './sidebar';
import Header from './header';

const Homepage = () => {
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(getUsers());
    }
    const state = useSelector((state) => state)
    return (
        <div>
            <div className="wrapper">
                <div className="sidebar">
                    <SideBar />
                </div>
                <div className="main-wrapper">
                    <Header />
                    <div>
                        homepage
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Homepage