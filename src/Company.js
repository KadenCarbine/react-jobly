import React from "react";
import { useParams } from "react-router-dom";

const Company = () => {
    const params = useParams()
    return(
        <h1>{params.name}</h1>
    )
}

export default Company