import axios from 'axios'
import { Button } from '@mui/material';
import React, { useState } from 'react'
import zIndex from '@mui/material/styles/zIndex';
import { Box, Grid } from '@mui/material';
const SinglePost = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Comments will be loaded here...");
    const [cmnts, setCmnts] = useState([]);
   


    const fetchRedditComments = async () => {
        try{
        setLoading("Loading comments please wait...")
        const response = await axios.get(url + ".json")
        console.log(response);
        const comments = [];
        const data = response.data[1].data.children;
        let counter = 1;
        data.forEach((child) => {
            const comment = child.data.body;
            comments.push(comment);
            counter++;
            });
            const body = { comments }
            console.log(body);
            setCmnts(comments);
            setLoading("Comments will be loaded here...");
        }
        catch(error){
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setCmnts([]);

        }
    }

    const handleAction = () => {
        fetchRedditComments();
    }
    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "50%"}}>
                <input type='text' style={{ width: "99%", height: "90%", borderRadius: "8px", margin: "50px" }} value={url} onChange={(event) => { setUrl(event.target.value) }} />
                
            </div>
            <Button onClick={handleAction} style={{width: "220px",height:"50px",color: "#fff",background:"#111",cursor: "pointer",position:"relative"}}>Analyze</Button>

            <Grid container spacing={0} sx={{}}>
                <Grid item xs={7}>
                    <h1>Comments Fetched={cmnts.length}</h1>
                    <Box className="cmnts-box"  >
                        {cmnts.length == 0 ? loading :
                            cmnts.map((ele, key) => {
                                return (
                                    <>
                                        <p className='para'>{ele}</p>
                                        <hr />
                                    </>

                                )
                            })
                        }
                    </Box></Grid>
            </Grid>    
        </div>
    )

}

export default SinglePost