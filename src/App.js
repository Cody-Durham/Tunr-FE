import React, { useEffect } from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";

function App() {
// URL variable to hold backend url 
const url = "https://tunr-backend-cd.herokuapp.com"


// initial state to hold the list of songs
const [songs, setSongs] = React.useState([])

// create empty song variable 
const emptySong = {
  title: "",
  artist: "",
  time: 0
}

const [selectSong, setSelectSong] = React.useState(emptySong)

// function to get list of songs
const getSongs = () => {
  fetch(url + "/tune/")
  .then((response) => response.json())
  .then((data) => 
  setSongs(data))
}

// useEffect acts as a page onload
React.useEffect(() => {
  getSongs()
},[])

// handleCreate/"POST"/  creates a new song 
const handleCreate = (newSong) => {
  fetch(url + "/tune/", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(newSong)
  })
  .then(() => getSongs())
}

// handleUpdate/"PUT"/updates the song 
const handleUpdate = (updateSong) => {
  fetch(url + "/tune/" + updateSong._id,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    .then(() => getSongs())
  })
}

// function to specifiy which song we are updating the state with
const selectSong = (song) => {
  setSelectSong(song)
}


const deleteSong = (song) => {
  fetch(url + "/tune/" + song._id, {
    method: "delete"
  })
  .then(() => getSongs())
}
  return (
    <div className="App">
      <h1>TUNR.</h1>
      <h3>FOR ALL YOUR PLAYLIST NEEDS</h3>
      <hr />
    </div>
  );
}

export default App;
