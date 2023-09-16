
import React, { useState } from 'react'
const SinglePost = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Comments will be loaded here...");


    const fetchRedditComments = async () => {
        setLoading("Loading comments please wait...")

    }

    const handleAction = () => {
        fetchRedditComments();
    }
    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "40%", height: 50 }}>
                <input type='text' style={{ width: "99%", height: "50%", borderRadius: "8px", margin: "50px" }} value={url} onChange={(event) => { setUrl(event.target.value) }} />
                <button onClick={handleAction} >FETCH</button>
            </div>


        </div>
    )

}

export default SinglePost