import React from 'react'
import { useDispatch } from "react-redux";
import { getUsers } from '../redux/actions/UserActions'
import { useSelector } from "react-redux";

const Homepage = () => {
    const dispatch = useDispatch()
    const getData = () => {
        dispatch(getUsers());
    }
    const state = useSelector((state) => state)
    return (
        <div>
            homepage
        </div >
    )
}

export default Homepage