import { Box, Button, Grid } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios'
import PieChart from './charts/PieCharts';

const TopPost = () => {
    const [postData, setPostData] = useState([]);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Comments will be loaded here...");
    const [data, setData] = useState([1, 0, 1]);
    const [cmnts, setCmnts] = useState([]);
    const fetchPosts = async () => {
        setLoading("Loading comments please wait...")
        try {
            // Axios request to fetch top posts
            const response = await axios.get(url + "top.json");

            console.log(response);
            const posts = response.data.data.children;

            // Create an array to store post data
            const postsArray = posts.map((post) => ({
                Title: post.data.title,
                PostText: post.data.selftext,
                ID: post.data.id,
                Score: post.data.score,
                TotalComments: post.data.num_comments,
                PostURL: post.data.permalink,
            }));
            setPostData(postsArray);

            console.log(postsArray);

            console.log('Data saved to top_posts.json');
        }


        catch (error) {
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setPostData([]);
        };
    }
    const fetchComments = async (link) => {
        setLoading("Loading comments please wait...")
        try {
            if (url !== "") {
                const response = await axios.get(link + ".json")
                console.log(response);
                const comments = [];
                const data = response.data[1].data.children;

                data.forEach((child) => {
                    const comment = child.data.body;
                    comments.push(comment);

                });
                setCmnts(comments);

                setLoading("Comments will be loaded here...");
            }
        }
        catch (error) {
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setCmnts([]);
        };
    }
    const handleAction = () => {
        fetchPosts();
    }
    return (
        <div>
            <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginBlock: "5%" }}>
                <div style={{ width: "40%", height: 50 }}>

                    <input type='text' style={{ width: "99%", height: "90%", borderRadius: "8px" }} value={url} onChange={(event) => { setUrl(event.target.value) }} />
                </div>

                <button onClick={handleAction}>FETCH</button>

                <Grid container spacing={0} sx={{}}>
                    <Grid item xs={7}>
                        <h1>Top Post Links</h1>

                        <Box className="cmnts-box"  >
                            {postData.length == 0 ? loading :
                                postData.map((ele, key) => {
                                    return (
                                        <>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <a style={{ textDecoration: 'none', color: "black" }} href={`https://www.reddit.com${ele.PostURL}`} target='_blank' className='para'>{`${ele.Title}`}</a>
                                                <p> (Total cmnts={ele.TotalComments}) </p> <Button sx={{ width: "15%" }} onClick={() => fetchComments(`https://www.reddit.com${ele.PostURL}`)}>Analyze</Button>
                                            </Box>
                                            <hr style={{ width: "95%" }} />
                                        </>

                                    )
                                })
                            }
                        </Box></Grid>
                    <Grid item xs={5}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                            <PieChart data={data} />
                        </Box>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}

export default TopPost