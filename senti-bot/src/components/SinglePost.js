import axios from 'axios'
import React, { useState } from 'react'
import { Box, Grid } from '@mui/material';
import PieChart from './charts/PieCharts';


const SinglePost = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState("Comments will be loaded here...");
    const [cmnts, setCmnts] = useState([]);
    const [data, setData] = useState([0, 0, 0]);
    const [storeData, setStoreData] = useState([]);

    React.useEffect(() => {
        if (localStorage.getItem("storeData") != null) {
            setStoreData(JSON.parse(localStorage.getItem("storeData")));
        }
    }, [])

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
            const body = { comments: comments.slice(0, 100) }
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
    const fetchYtComments = async () => {
        setLoading("Loading comments please wait...")
        try {
            if (url !== "") {
                const apiKey = 'AIzaSyDksmE5Cf91b4vhpgFRpGa-dIb6Dqp00Ao';

                // Set the URL for the YouTube Data API request
                const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&textFormat=plainText&part=snippet&videoId=${url.slice(32)}&maxResults=200`;
                const response = await axios.get(apiUrl)

                console.log(response);

                const comments = ["",];
                const data = response.data.items;
                data.forEach((item) => {
                    const comment = item.snippet.topLevelComment.snippet.textDisplay;
                    comments.push(comment);
                });
                const body = { comments }
                console.log(body);
                setCmnts(comments);
                const res2 = await axios.post('http://surajr425.pythonanywhere.com/analyze', body);
                console.log(res2.data.predictions);
                const arr = [0, 0, 0];
                res2.data.predictions.forEach(ele => {
                    if (ele == 0) { arr[0]++ }
                    else if (ele == 1) { arr[1]++ }
                    else if (ele == -1) { arr[2]++ }
                });
                setData(arr);

                setLoading("Comments will be loaded here...");
            }
        }
        catch (error) {
            console.error('Error fetching comments:', error);
            setLoading("Error occurred! Enter proper link or check your internet connection ");
            setCmnts([]);
        };
    }
    const handleSaving = () => {
        if (cmnts.length > 0) {
            const storeItem = {
                postLink: url,
                date: new Date().toLocaleDateString(),
                totalcmnts: cmnts.length,
                positive: Math.round((data[1] / cmnts.length) * 100),
                negative: Math.round((data[2] / cmnts.length) * 100)
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
        if (url.includes("youtube")) {
            fetchYtComments();

        } else if (url.includes("reddit")) {
            fetchRedditComments();
        }
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