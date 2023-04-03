import React from "react";
import { Link } from "react-router-dom";

export const WrongPath = () => {
    return (
        <>
            <div>this is wrong path</div>
            <Link to='/'>Home</Link>
        </>
    )
}