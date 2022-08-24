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
            <h3>
                HomePage
            </h3>
            <button onClick={getData}>Get Data </button>
        </div>
    )
}

export default Homepage