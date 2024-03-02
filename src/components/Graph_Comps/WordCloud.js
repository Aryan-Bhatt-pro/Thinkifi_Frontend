import React, { useEffect, useState } from 'react';
import {TagCloud} from 'react-tagcloud';

const TweetWordCloud = ({ tweets }) => {
  const [wordCloudData, setWordCloudData] = useState([]);

  useEffect(() => {
    const hashtags = [];

    // Iterate through each tweet and extract hashtags
    tweets.forEach((tweet) => {
      const regex = /#\w+/g; // Regular expression to match hashtags
      const matches = tweet.text.match(regex);

      if (matches) {
        hashtags.push(...matches);
      }
    });

    // Count the occurrences of each hashtag
    const hashtagCounts = hashtags.reduce((acc, hashtag) => {
      acc[hashtag] = (acc[hashtag] || 0) + 1;
      return acc;
    }, {});

    // Sort hashtags by count in descending order
    const sortedHashtags = Object.keys(hashtagCounts).sort(
      (a, b) => hashtagCounts[b] - hashtagCounts[a]
    );

    // Take only the top 10 hashtags
    const top15Hashtags = sortedHashtags.slice(0, 15);

    // Convert the top 10 hashtag counts to the format expected by the react-tagcloud component
    const wordCloudData = top15Hashtags.map((hashtag) => ({
      value: hashtag,
      count: hashtagCounts[hashtag],
    }));

    setWordCloudData(wordCloudData);
  }, [tweets]);

  const customStyle = {
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    color: '#000',
    padding: '5px',
    display: 'inline-block',
    cursor: 'pointer',
    width: '500px'
  };

  return (
    <div>
      <h2>Top 15 Hashtag Word Cloud</h2>
      <TagCloud minSize={30} maxSize={35} tags={wordCloudData} style={customStyle}/>
    </div>
  );
};

export default TweetWordCloud;