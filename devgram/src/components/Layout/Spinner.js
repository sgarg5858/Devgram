import React from 'react'

const Spinner = () => {
    console.log("Spinner");
    return (
        <div style={{marginTop:'40vh',marginLeft:'40vh'}}>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

export default Spinner;
