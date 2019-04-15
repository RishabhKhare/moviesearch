import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    /* console.log("This is my initializer")
     const movies = [  
      {id: 0, 
        poster_src:"avenger.png" ,
      title:"Avenger:Infinity War",
       overview:"Rishabh Havent Watched This Movie Yet"},
      {id: 1,
        poster_src:"avenger2.png",
      title:"The Avenger", 
      overview:"This Is My Second Overview"},
    ]
    var movieRows = []
    movies.forEach((movie) => {
    console.log(movie.title)
    const movieRow = <MovieRow movie={movie}/>
    movieRows.push(movieRow)
    })
    this.state = {rows: movieRows}  */
    this.performSearch()
}
performSearch(searchTerm) {
  console.log("Perform Search Using Moviedb")
 const urlString ="https://api.themoviedb.org/3/search/movie?api_key=6ad21dafc52ff17d42e50fd73f016b59&query=" + searchTerm 
$.ajax({
  url: urlString,
  success: (searchResults) => {
    console.log("Fetched Data Successfully")
    //console.log(searchResults)
    const results = searchResults.results
   // console.log(results[0])
   var movieRows = []
    results.forEach((movie) => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
     // console.log(movie.poster_path)
      const movieRow = <MovieRow key={movie.id}  movie={movie}/>
      movieRows.push(movieRow)

    })
    this.setState({rows: movieRows})
  },
    error: (xhr,status,err) => {
      console.error("Failed To Fetch Data")
    }
  })
}

searchChangeHandler(event) {
  console.log(event.target.value)
  const boundObject = this
  const searchTerm = event.target.value
boundObject.performSearch(searchTerm)
}
   
  render() {
    return (
      <div className="App">
        <table className="titleBar">
        <tbody>
        <tr>
        <td>
       <img alt="app icon" width="150" src="bvp.png" />
        </td>
        <td width="8"/>
        <td>
        <h1>MoviesDB search</h1>
        </td>
        </tr>
        </tbody>
        </table>
        <input style={{
          fontSize: 24,
          display: 'block',
          width: "100%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)}  placeholder="Enter Movie For Search"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
