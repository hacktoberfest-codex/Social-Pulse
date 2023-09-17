import { Box, Button, Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios'
import PieChart from './charts/PieCharts';


const TopPost = () => {
    const [postData, setPostData] = useState([]);
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Posts will be loaded here...");
    const [data, setData] = useState([0, 0, 0]);
    const [cmnts, setCmnts] = useState([]);
    const fetchPosts = async () => {
        setLoading("Loading Posts please wait...")
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
        }


        catch (error) {
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setPostData([]);
        };
    }
    const fetchComments = async (link) => {
        setLoading("Loading Posts please wait...")
        try {
            if (url !== "") {
                const response = await axios.get(link + ".json")
                console.log(response);
                const comments = ["",];
                const data = response.data[1].data.children;

                data.forEach((child) => {
                    const comment = child.data.body;
                    comments.push(comment);

                });
                const body = { comments: comments.slice(0, 100) }
                console.log(body);
                setCmnts(comments);
                const res2 = await axios.post('http://surajr425.pythonanywhere.com/analyze', body
                )
                console.log(res2.data.predictions);
                const arr = [0, 0, 0];
                res2.data.predictions.forEach(ele => {
                    if (ele == 0) { arr[0]++ }
                    else if (ele == 1) { arr[1]++ }
                    else if (ele == -1) { arr[2]++ }
                });
                setData(arr);

                console.log('Comments saved to Top Comments.json');
                setLoading("Comments will be loaded here...");
                return { "+ve": arr[1], "-ve": arr[2], "Total": res2.data.predictions.length };

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
            <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="glow-on-hover" style={{ width: "40%", height: 50, marginBlock: "1%" }}>
                    <input type='text' style={{ width: "98%", height: "90%", borderRadius: "8px", color: "white", backgroundColor: "black", paddingLeft: "8px" }} value={url} onChange={(event) => { setUrl(event.target.value) }} />
                </div>

                <button className='stylebg' style={{ width: "150px", height: "40px", borderRadius: "10px", fontWeight: "bold", fontFamily: 'sans-serif', marginTop: "8px" }} onClick={handleAction}>FETCH</button>

                <Grid container spacing={0} sx={{ marginBlock: "3%", width: "100%" }}>
                    <Grid item md={8} sx={12}>
                        <Box sx={{ backgroundColor: "#00A8CC", height: "50px", borderRadius: "8px 8px 0 0" }}>
                            <h2 style={{ margin: "0px", paddingTop: "15px" }}>Top Post Links</h2>
                        </Box>
                        <Grid container className="cmnts-box" gap={0} sx={{ width: "100%" }} >
                            {postData.length == 0 ? loading :
                                postData.map((ele, key) => {
                                    return (
                                        <Grid sx={{ width: "50%" }} item xs={12} md={6}>
                                            <Card sx={{
                                                marginBlock: "8px", border: "1px solid #000000",
                                                '& .MuiPaper-root ,& .MuiCardContent-root ,& .MuiTypography-root': {
                                                    backgroundColor: "#3282B8",
                                                    color: "#ffffff",
                                                }, '& .MuiPaper-root ,& .MuiCardContent-root': {
                                                    height: "70px",

                                                },
                                                '& .MuiTypography-root,& .MuiLink-root': {
                                                    display: "block",
                                                    width: "95%",
                                                    height: "19px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"

                                                }
                                            }}>
                                                <CardContent>
                                                    <Typography component={Link} href={`https://www.reddit.com${ele.PostURL}`} target='_blank' gutterBottom>
                                                        {ele.Title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {/* Total Comments: {cmnts.length} */}
                                                        Post ID:{ele.ID}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {/* Total Comments: {cmnts.length} */}
                                                        Score:{ele.Score}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button sx={{ width: "15%" }} onClick={() => fetchComments(`https://www.reddit.com${ele.PostURL}`)}>Analyze</Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>

                                    )
                                })
                            }
                        </Grid></Grid>
                    <Grid item xs={12} md={4}>
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