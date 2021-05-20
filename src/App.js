import React, { useEffect } from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display"
import Form from "./Form"

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

const [selectedSong, setSelectedSong] = React.useState(emptySong)

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
    body: JSON.stringify(updateSong)
  })
  .then(() => getSongs())
}

// function to specifiy which song we are updating the state with
const selectSong = (song) => {
  setSelectedSong(song)
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
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display
          {...rp}
          songs={songs}
          selectSong={selectSong}
          deleteSong={deleteSong}
          />} />
          <Route exact path="/create" render={(rp) => <Form 
          {...rp} label="create" song={selectedSong} handleSubmit={handleCreate} />
          }
          />
          <Route exact path="/edit" render={(rp) =>
            <Form {...rp} label="edit" song={selectedSong} handleSubmit={handleUpdate} />
          }
          />
        </Switch>
      </main>    
    </div>
  );
}

export default App;
