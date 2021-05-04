import React, { useEffect, useState } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import {FaCode} from "react-icons/fa"

function LandingPage() {
    useEffect(()=>{
        
    },[])

    return (
        <div style={{width: '100%', margin:'0'}}>

            {/* Main Image */}
            <div style={{width:'85%',margin:'1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>

                {/*Movie Grid Cards*/}        
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)
