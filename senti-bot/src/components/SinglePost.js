import axios from 'axios'
import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import PieChart from './charts/PieCharts';


const SinglePost = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Comments will be loaded here...");
    const [cmnts, setCmnts] = useState([]);
    const [data, setData] = useState([0, 1, 3]);
    const [storeData, setStoreData] = useState([]);

    const fetchRedditComments = async () => {
        try {
            setLoading("Loading comments please wait...")
            const response = await axios.get(url + ".json")
            console.log(response);
            const comments = ["",];
            const data = response.data[1].data.children;
            let counter = 1;
            data.forEach((child) => {
                const comment = child.data.body;
                comments.push(comment);
                counter++;
            });
            const body = { comments }
            console.log(body);
            setCmnts(comments.slice(1));
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
        }
        catch (error) {
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setCmnts([]);

        }
    }
    const handleSaving = () => {
        if (cmnts.length > 0) {
            const storeItem = {
                postLink: url,
                date: new Date().toLocaleDateString(),
                totalcmnts: 50,
                positive: 5 / 50 * 100,
                negative: 20 / 50 * 100
            }
            const arr = storeData;
            arr.push(storeItem);
            localStorage.setItem("storeData", JSON.stringify(arr));
            setStoreData(arr);
            console.log(arr)
            console.log(JSON.parse(localStorage.getItem("storeData")))
        }
    }
    const handleAction = () => {
        fetchRedditComments();
    }
    return (
        <div style={{ width: "100%", display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className="glow-on-hover" style={{ width: "40%", height: 50, marginBlock: "1%" }}>
                <input type='text' style={{ width: "98%", height: "90%", borderRadius: "8px", color: "white", backgroundColor: "black", paddingLeft: "8px" }} value={url} onChange={(event) => { setUrl(event.target.value) }} />
            </div>
            <div>
                <button className='stylebg' style={{ width: "150px", height: "40px", borderRadius: "10px", fontWeight: "bold", fontFamily: 'sans-serif', marginTop: "8px", marginRight: "6px" }} onClick={handleAction}>ANALYZE</button>
                <button className='stylebg' style={{ width: "150px", height: "40px", borderRadius: "10px", fontWeight: "bold", fontFamily: 'sans-serif', marginTop: "8px", marginLeft: "6px" }} onClick={handleSaving}>SAVE</button>
            </div>

            <Grid container spacing={0} sx={{ marginBlock: "3%" }}>
                <Grid item xs={7}>
                    <Box sx={{ backgroundColor: "#00A8CC", height: "50px", borderRadius: "8px 8px 0 0" }}>
                        <h2 style={{ margin: "0px", paddingTop: "15px" }}>Comments Fetched={cmnts.length}</h2>
                    </Box>
                    <Box className="cmnts-box"  >
                        {cmnts.length == 0 ? loading :
                            cmnts.map((ele, key) => {
                                return (
                                    <Box sx={{ padding: "5px", borderRadius: "8px", border: "2px solid #00A8CC", marginBlock: "8px" }}>
                                        <p className='para'>{ele}</p>
                                    </Box>

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
    )

}

export default SinglePost