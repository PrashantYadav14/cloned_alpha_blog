// import './App.css';
// import axios from 'axios';
// import Articles from "./components/article";
// import { Component } from 'react';
// import{ useEffect } from "react";
// import { useState} from "react";
// import { BrowserRouter, Route } from "react-router-dom";
// const API_URL = "http://localhost:3000/api/v1/articles";


// function getAPIData()
// {
//   return axios.get(API_URL).then((response) => {
//     // console.log("inside get api")
//     // console.log(response)
//     return response.data
//   });
// }
// function App () {
//    const [articles, setArticles] = useState([]);
//    useEffect(() => {
//     let mounted = true;
//     getAPIData().then((items) => {
//       if (mounted){

//         setArticles(items);
//       }
//     });
//    return () => (mounted=false);
//   }, []);
//   return (
//     <div className="App">
//       <h1> Hello this is the react app for the alpha blog</h1>

//       <Articles articles={articles} />
//     </div>
//   );
// }
// export default App;

import './App.css';
import axios from 'axios';
import { Component } from 'react';
import{ useEffect } from "react";
import { useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Articles from "./components/article";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/articles"  Component={Articles} />
        </Routes>
      </BrowserRouter>
    );
  }
}

// class Articles extends Component {

//     state = {
//       articles: []
//     };
//   componentDidMount() {
//     let mounted = true;
//     const API_URL = "http://localhost:3000/api/v1/articles";
//     axios.get(API_URL).then((response) => {
//       if (mounted){
//         this.setState({
//           articles: response.data
//         });
//       }
//     });
//   }

//   render() {
//     const { articles } = this.state;
//     return (
//       <div >
//         <h1> Hello this is the react app for the alpha blog</h1>

//         <div>
//         <h1>These articles are from api</h1>
//         {
//        articles.map((article) => {
//         return (
//         <div key={article.id}>
//           <h3 style={{color: 'red'}}>{article.title}</h3>
//           <p>{article.description}</p>
//           <hr />
//         </div>)
//         })}
//     </div>
//       </div>
//     );
//   }
// }

export default App;