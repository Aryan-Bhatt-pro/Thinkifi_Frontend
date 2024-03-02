import React from "react";
import { useState } from "react";
import axios from "axios";
import SplineLine from "../components/Graph_Comps/SplineLine";
import TweetWordCloud from "../components/Graph_Comps/WordCloud";
import { ChromePicker } from "react-color";
const UserAnalysis = () => {
    const [user_name, setUserName] = useState("");
    const [tweet_data, setTweetData] = useState([]);
    const [tweet_hashtag_data, setTweetHashtagData] = useState([]);
    const [width, setWidth] = useState(1);
    const [color2, setColor2] = useState("#5C1B8F");
    const [slider_width, setSlider_width] = useState(1); //
    const handleWidth = (event) => {
      setWidth(Number(event.target.value)); // Convert the value to a number
    }; 
    const handleUsername = (event) => {
        setUserName(event.target.value);
      };
      const handleSliderChange = (event) => {
        setSlider_width(Number(event.target.value)); // Convert the value to a number
      };
      const handleColorChange2 = (newColor2) => {
        setColor2(newColor2.hex);
      };
    const upDateUserData = async () => {
      const encoded_username = encodeURIComponent(user_name);
        const user_url = `http://localhost:5000/api/get_user_tweets?search=${encoded_username}`
        const response = await axios.get(user_url);
        const data = response.data;
        // console.log(data);
        setTweetHashtagData(data);
        const moment = require("moment");
    let tweet_data = new Array(12).fill(0);
    for (let i = 0; i < data.length; i++) {
      const dateString = data[i].creation_date;
      const parsedDate = moment(dateString, "ddd MMM DD HH:mm:ss Z YYYY");
      const month = parsedDate.month();
      tweet_data[month]++;
    }
    setTweetData(tweet_data);

    }


    return(<div>
           <div className="inline-flex" style={{marginTop: '1rem'}}><input
          type="text"
          placeholder="Username Here"
          value={user_name}
          onChange={handleUsername}
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
          onClick={upDateUserData}
        >
          Generate Graphs
        </button></div> 
        {tweet_data.length > 0 ? (<div>
          <div style={{marginLeft: '50rem', marginTop: '1rem'}}>
            <ChromePicker
                style={{}}
                color={color2}
                onChange={handleColorChange2}
              />
          </div>
          <div className="TweetsData"
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
          </div>
        </div>) : null}
        {tweet_hashtag_data.length > 0 ? <TweetWordCloud tweets={tweet_hashtag_data}/> : null}
        
    </div>)
}

export default UserAnalysis;