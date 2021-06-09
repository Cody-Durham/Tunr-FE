import React, { useEffect } from "react";
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display"
import Form from "./Form"

function App() {
// URL variable to hold backend url 
// const url = "https://tunr-backend-cd.herokuapp.com"
const url = "https://dceypowiga.execute-api.us-west-1.amazonaws.com/dev/tunr"


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
  fetch(url)
  .then((response) => response.json())
  .then((data) => 
  setSongs(data.body))
}

// useEffect acts as a page onload
React.useEffect(() => {
  getSongs()
},[])

// handleCreate/"POST"/  creates a new song 
const handleCreate = (newSong) => {
  fetch(url + "/", {
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
  fetch(url + "/" + updateSong._id,{
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
  console.log('delete song', song)
  fetch(url + "/" + song.projectId, {
    method: "delete"
  })
  .then(() => getSongs())
  console.log('item deleted')
}


  return (
    <div className="App">
      <h1>TUNR.</h1>
      <h3>FOR ALL YOUR PLAYLIST NEEDS</h3>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(routerProps) => <Display
          {...routerProps}
          songs={songs}
          selectSong={selectSong}
          deleteSong={deleteSong}
          />} />
          <Route exact path="/create" render={(routerProps) => <Form 
          {...routerProps} 
          label="create" 
          song={selectedSong} 
          handleSubmit={handleCreate} />
          }
          />
          <Route exact path="/edit" render={(routerProps) =>
            <Form {...routerProps} 
            label="Submit" 
            song={selectedSong} 
            handleSubmit={handleUpdate} />
          }
          />
        </Switch>
      </main>    
    </div>
  );
}

export default App;
