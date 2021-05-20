import React from "react"

// title 
// artist
// time

const Display = (props) => {

    const {songs} = props
    // const songs = props.songs

    const loaded = () => (
        <div className="container">
            <h1>Playlist 1</h1>
            {songs.map( (item, index) => (
                <article
                    key={item._id}>
                    <h3>Title: {item.title}</h3>
                    <h3>Artist: {item.artist}</h3>
                    <h3>Song Length: {item.time}</h3>
                    
                    <button
                        onClick={ () => {
                            props.selectSong(item)
                            props.history.push('/edit')
                        }}
                    >Add new song
                    </button>
                    <button
                        onClick={ () => {
                            props.deleteSong(item)
                        }}>
                        Delete
                    </button>



                </article>
            ))}
        </div>    
    )

    const loading = () => {
        return <h1>Loading..!</h1>
    }





    return songs.length > 0 ? loaded() : loading()
    // return (
    //     // <h1>this is the display page</h1>
    // )
}
 
export default Display 