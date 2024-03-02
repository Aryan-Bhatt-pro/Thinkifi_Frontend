import React, { useState } from "react";
import { ChromePicker } from "react-color";
import BarGraph from "../components/Graph_Comps/BarGraph";
import SplineLine from "../components/Graph_Comps/SplineLine";
import PieChart from "../components/Graph_Comps/PieChart";
import SunburstChart from "../components/Graph_Comps/Sunburst";
import HeatMap from "../components/Graph_Comps/HeatMap";
import MultiSpline from "../components/Graph_Comps/MultiSpline";
import axios from "axios";
import { Input } from "@mui/material";
import Table from "../components/Graph_Comps/Table";
// import WordCloudComponent from "../components/Graph_Comps/WordCloud";
import TweetWordCloud from "../components/Graph_Comps/WordCloud"

const Graph = (props) => {
  const [color, setColor] = useState("#ff7");
  const [color2, setColor2] = useState("#5C1B8F");
  const [tweet_data, setTweetData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [hashtag_tweet_data, setHashtagData] = useState([])
  const [accounts_data, setAccountsData] = useState([]);
  const [top5UserJson, setTop5UserJson] = useState([]);
  const [top10ActiveJson, setTop10ActiveJson] = useState([]);
  const [slider_width, setSlider_width] = useState(1); // Initial value changed to 50
  const [lineColor, setLineColor] = useState("#007bff");
  const [width, setWidth] = useState(1);
  const [topRTJson, setTopRTJson] = useState([]);

  const handleSliderChange = (event) => {
    setSlider_width(Number(event.target.value)); // Convert the value to a number
  };
  const handleWidth = (event) => {
    setWidth(Number(event.target.value)); // Convert the value to a number
  };

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const handleColorChange2 = (newColor2) => {
    setColor2(newColor2.hex);
  };

  const upDateTweetData = async () => {
    const encoded_keyword = encodeURIComponent(keyword);
    const tweet_url = `http://localhost:5000/api/get_tweets?search=${encoded_keyword}`;
    // const tweet_url = 'http://localhost:5000/api/get_followings';
    const response = await axios.get(tweet_url);
    const data = response.data;
    setHashtagData(data);
    console.log(data);
    const moment = require("moment");
    let tweet_data = new Array(12).fill(0);
    for (let i = 0; i < data.length; i++) {
      const dateString = data[i].creation_date;
      const parsedDate = moment(dateString, "ddd MMM DD HH:mm:ss Z YYYY");
      const month = parsedDate.month();
      tweet_data[month]++;
    }


    let accounts_data = new Array(12).fill(0);

    for (let i = 0; i < data.length; i++) {
      const dateString = data[i].user.creation_date;
      const parsedDate = moment(dateString, "ddd MMM DD HH:mm:ss Z YYYY");
      const month = parsedDate.month();
      accounts_data[month]++;
    }

    // 5 most influential users
    let most_info_users = [...data];
    const sortedUsers = most_info_users.sort((a, b) => b.user.follower_count - a.user.follower_count)
    const topUsers = new Array(sortedUsers.length).fill("");

    for(let i = 0; i < sortedUsers.length; i++){
      topUsers[i] = sortedUsers[i].user.username
    }

    const uniqTopUsers = new Set(topUsers);
    const uniqTopUserArr = Array.from(uniqTopUsers);
    uniqTopUserArr.reverse();
    const top5Users = uniqTopUserArr.slice(0, 5);
    const top5UsersJSON = top5Users.map(username => ({ 'username': username }));
    // console.log(top5Users);
    setTop5UserJson(top5UsersJSON);


    setAccountsData(accounts_data);
    setTweetData(tweet_data);

    // top 10 active
    const mp = new Map();
    for(let i = 0; i < data.length; i++){
      if(mp.has(data[i].user.username)){
        mp.set(data[i].user.username, mp.get(data[i].user.username) + 1);
      }
      else{
        mp.set(data[i].user.username, 1);
      }
    }

    // sort the map
    const mapEntries = Array.from(mp.entries());
    mapEntries.sort((a, b) => a[1] - b[1]);
    mapEntries.reverse();
    console.log("Top Active");
    const top10Active = new Array(10).fill("");
    for(let i = 0; i < 10; i++){
      top10Active[i] = mapEntries[i][0];
    }
    console.log(top10Active);
    const top10ActiveJSON = top10Active.map(username => ({ 'username': username }));
    setTop10ActiveJson(top10ActiveJSON);

    // top 5 tweets on basis of RT count
    const sortedRT = most_info_users.sort((a, b) => b.retweet_count - a.retweet_count);
    const topRT = new Array(sortedRT.length).fill("");

    for(let i = 0; i < sortedRT.length; i++){
      topRT[i] = sortedUsers[i].text;
    }

    topRT.reverse();
    const topRT_final = topRT.slice(0, 5);
    const topRTJSON = topRT_final.map(username => ({ 'username': username }));
    // console.log(top5Users);
    setTopRTJson(topRTJSON);

  };

  const handleKeyWord = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <div>
      <div style={{ display: "inline-flex" }}>
        {/* <BarGraph color={color} /> */}
        {/* <ChromePicker color={color} onChange={handleColorChange} /> */}
      </div>
      <div style={{ display: "flex-inline" }}>
        <input
          type="text"
          placeholder="KeyWord/Hashtag Here"
          value={keyword}
          onChange={handleKeyWord}
        />
        <button
          style={{
            backgroundColor: "#007BFF", // Blue color
            color: "white", // Text color
            padding: "10px 20px", // Padding
            borderRadius: "5px", // Rounded corners
            cursor: "pointer", // Cursor on hover
            border: "none", // No border
            fontSize: "16px",
            marginLeft: "10px", // Font size
          }}
          onClick={upDateTweetData}
        >
          Generate Graphs
        </button>

        
        
        {tweet_data.length > 0 ? <div>
          <TweetWordCloud tweets={hashtag_tweet_data}/>
          {tweet_data.length > 0 ? (<div className="TweetsData"
            style={{ display: "flex", marginLeft: "32rem", marginTop: "1rem" }}
            >
            <SplineLine
              width={width}
              color={color2}
              max_len={slider_width}
              tweet_data={tweet_data}
              title = "Tweets"
            />
            <input
              type="range"
              min={1} // Set the minimum value
              max={60} // Set the maximum value
              step={1} // Set the step value
              value={slider_width}
              onChange={handleSliderChange}
            />
            <input
              type="range"
              min={1} // Set the minimum value
              max={10} // Set the maximum value
              step={1} // Set the step value
              value={width}
              onChange={handleWidth}
            />
          </div>) : null}
          
          <Table data={top5UserJson} title = {'Top 5 Influential Accounts'}/>
          <Table data={topRTJson} title = {'Top 5 Most Retweeted Tweets'}/>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ChromePicker
              style={{}}
              color={color2}
              onChange={handleColorChange2}
            />
          </div>
          <div className="AccountsData"
            style={{ display: "flex", marginLeft: "32rem", marginTop: "1rem" }}
          >
            <SplineLine
              width={width}
              color={color2}
              max_len={slider_width}
              tweet_data={accounts_data}
              title = "# of Accounts"
            />
            <input
              type="range"
              min={1} // Set the minimum value
              max={60} // Set the maximum value
              step={1} // Set the step value
              value={slider_width}
              onChange={handleSliderChange}
            />
            <input
              type="range"
              min={1} // Set the minimum value
              max={10} // Set the maximum value
              step={1} // Set the step value
              value={width}
              onChange={handleWidth}
            />
          </div>
          <Table data={top10ActiveJson} title={'Top 10 Active Accounts'}/>
        </div>: null}
        

      </div>

      {/* <PieChart />
      <SunburstChart />
      <HeatMap />
      <MultiSpline /> */}
    </div>
  );
};

export default Graph;
