import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationCard from './notificationCard';
const axios = require("axios");

// Write some function to pull the information from endpoint 
// Mock the data for now

const data = [
    {
    'podcastId': 'somefakeId',
    'podcastTitle': 'The Quickly News Update',
    'subscriptionId': 'this aint useful either',
    'newEpisodes': [
        {
            audio_preview_url:"https://p.scdn.co/mp3-preview/7ed73d60718ee0163646f27d5fab0dd9d3aae303",
            description:"On the road back from Bathurst  One of the great weeks in sports broadcasting  The milk finally went sour  What we remember from Panthers v Souths game  The importance of mateship in winning premierships  Wallabies shock loss to the All Blacks  South Africa calling in sick  Nilso the Queenslander",
            duration_ms:4093492,
            explicit:true,
            external_urls:{
               spotify:"https://open.spotify.com/episode/5dNQU5glT2ic4bUF7Ku3dg"
            },
            href:"https://api.spotify.com/v1/episodes/5dNQU5glT2ic4bUF7Ku3dg",
            id:"5dNQU5glT2ic4bUF7Ku3dg",
            images:[
               {
                  height:640,
                  url:"https://i.scdn.co/image/c51063261e4bca6a5d425572838f41fdebd427fe",
                  width:640
               },
               {
                  height:300,
                  url:"https://i.scdn.co/image/3de0f663a96c5ecfc65a5f604136d3a7cef10406",
                  width:300
               },
               {
                  height:64,
                  url:"https://i.scdn.co/image/64c32cac1f620aede81d20c296b6ca183687bd6d",
                  width:64
               }
            ],
            is_externally_hosted:false,
            is_playable:true,
            language:"en-US",
            languages:[
               "en-US"
            ],
            name:"HSP #236 - Road Trip",
            release_date:"2020-10-19",
            release_date_precision:"day",
            type:"episode",
            uri:"spotify:episode:5dNQU5glT2ic4bUF7Ku3dg"
         },
         {
            audio_preview_url:"https://p.scdn.co/mp3-preview/d1e4875c6ce2c2139dcb379f783960d9810455df",
            description:"Vale Bucks/Return of the Ropes  Rugby Union is BACK!  Dancing on the Roosters grave  Dancing on the Eels grave  Milk still good  Michael Jennings pisses hot  LeBron wins another Ring  Nadal a GOAT - Mens tennis is in hot curry  Tidbits with DYOR Dave  Dribbler Dribbles",
            duration_ms:8416888,
            explicit:true,
            external_urls:{
               spotify:"https://open.spotify.com/episode/4luUpLsfE1zmMUDa1qm6dR"
            },
            href:"https://api.spotify.com/v1/episodes/4luUpLsfE1zmMUDa1qm6dR",
            id:"4luUpLsfE1zmMUDa1qm6dR",
            images:[
               {
                  height:640,
                  url:"https://i.scdn.co/image/0bf754ddfc22959e94b53209fc7ff52c86aa4c9e",
                  width:640
               },
               {
                  height:300,
                  url:"https://i.scdn.co/image/419ba4f6e236d9097a2b03025d2efe86a2fc52a6",
                  width:300
               },
               {
                  height:64,
                  url:"https://i.scdn.co/image/aff4f3441d3acf26bf3dc697d9e2def624732d48",
                  width:64
               }
            ],
            is_externally_hosted:false,
            is_playable:true,
            language:"en-US",
            languages:[
               "en-US"
            ],
            name:"HSP # 235 - Mountain Men",
            release_date:"2020-10-13",
            release_date_precision:"day",
            type:"episode",
            uri:"spotify:episode:4luUpLsfE1zmMUDa1qm6dR"
         },
    ]
    },
    {
      'podcastId': 'somefakeId',
      'podcastTitle': 'The Quickly News Update',
      'subscriptionId': 'this aint useful either',
      'newEpisodes': [
          {
              audio_preview_url:"https://p.scdn.co/mp3-preview/7ed73d60718ee0163646f27d5fab0dd9d3aae303",
              description:"On the road back from Bathurst  One of the great weeks in sports broadcasting  The milk finally went sour  What we remember from Panthers v Souths game  The importance of mateship in winning premierships  Wallabies shock loss to the All Blacks  South Africa calling in sick  Nilso the Queenslander",
              duration_ms:4093492,
              explicit:true,
              external_urls:{
                 spotify:"https://open.spotify.com/episode/5dNQU5glT2ic4bUF7Ku3dg"
              },
              href:"https://api.spotify.com/v1/episodes/5dNQU5glT2ic4bUF7Ku3dg",
              id:"5dNQU5glT2ic4bUF7Ku3dg",
              images:[
                 {
                    height:640,
                    url:"https://i.scdn.co/image/c51063261e4bca6a5d425572838f41fdebd427fe",
                    width:640
                 },
                 {
                    height:300,
                    url:"https://i.scdn.co/image/3de0f663a96c5ecfc65a5f604136d3a7cef10406",
                    width:300
                 },
                 {
                    height:64,
                    url:"https://i.scdn.co/image/64c32cac1f620aede81d20c296b6ca183687bd6d",
                    width:64
                 }
              ],
              is_externally_hosted:false,
              is_playable:true,
              language:"en-US",
              languages:[
                 "en-US"
              ],
              name:"HSP #236 - Road Trip",
              release_date:"2020-10-19",
              release_date_precision:"day",
              type:"episode",
              uri:"spotify:episode:5dNQU5glT2ic4bUF7Ku3dg"
           },
           {
              audio_preview_url:"https://p.scdn.co/mp3-preview/d1e4875c6ce2c2139dcb379f783960d9810455df",
              description:"Vale Bucks/Return of the Ropes  Rugby Union is BACK!  Dancing on the Roosters grave  Dancing on the Eels grave  Milk still good  Michael Jennings pisses hot  LeBron wins another Ring  Nadal a GOAT - Mens tennis is in hot curry  Tidbits with DYOR Dave  Dribbler Dribbles",
              duration_ms:8416888,
              explicit:true,
              external_urls:{
                 spotify:"https://open.spotify.com/episode/4luUpLsfE1zmMUDa1qm6dR"
              },
              href:"https://api.spotify.com/v1/episodes/4luUpLsfE1zmMUDa1qm6dR",
              id:"4luUpLsfE1zmMUDa1qm6dR",
              images:[
                 {
                    height:640,
                    url:"https://i.scdn.co/image/0bf754ddfc22959e94b53209fc7ff52c86aa4c9e",
                    width:640
                 },
                 {
                    height:300,
                    url:"https://i.scdn.co/image/419ba4f6e236d9097a2b03025d2efe86a2fc52a6",
                    width:300
                 },
                 {
                    height:64,
                    url:"https://i.scdn.co/image/aff4f3441d3acf26bf3dc697d9e2def624732d48",
                    width:64
                 }
              ],
              is_externally_hosted:false,
              is_playable:true,
              language:"en-US",
              languages:[
                 "en-US"
              ],
              name:"HSP # 235 - Mountain Men",
              release_date:"2020-10-13",
              release_date_precision:"day",
              type:"episode",
              uri:"spotify:episode:4luUpLsfE1zmMUDa1qm6dR"
           },
      ]
      }
]

const NotificationBox = () => {
   const authstate = useSelector(state => state.authentication)
   const [isLoading, setLoading] = useState(true);
   const [notificationDetails, setNotifications] = useState([]);
   
   console.log(authstate);

   useEffect(() => {
      async function fetchData() {
         const uri =  encodeURI(`/api/notifications/${authstate.user._id}`) 
         const apiResponse = await axios.get(uri);
         console.log(apiResponse)
         setNotifications(apiResponse.data);
         setLoading(false);
      }
   })

    return (
      isLoading == true ? null
      :
        <div>
            {   notificationDetails.length == 0 ? 
                <p>No new notifications</p>
                : notificationDetails.map(notification => <NotificationCard {...notification} />)
            }
        </div>
    );
}

export default NotificationBox;