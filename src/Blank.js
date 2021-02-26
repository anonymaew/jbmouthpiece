import React from 'react'

export default function Blank({mtn}) {

    return (
        <>
        {
            (mtn) ?
            <div style={{marginTop:"120px",textAlign:"center"}}>
                <h1>This page is on a maintenance period.</h1>
                <h3>The page cannot be used for a while.</h3>
                <h3>Sorry for any inconvenience.</h3>
            </div> : <div style={{marginTop:"120px",textAlign:"center"}}>
                <h1>This page is not found.</h1>
                <h3>The page may be deleted or not exist.</h3>
            </div>
        }
        </>
    )
}
