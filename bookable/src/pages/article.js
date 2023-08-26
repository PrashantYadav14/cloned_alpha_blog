//import React from 'react';
import axios from 'axios';
import { Component } from 'react';
class Articles extends Component {

    state = {
      articles: []
    };
  componentDidMount() {
    let mounted = true;
    const API_URL = "http://localhost:3000/articles.json";
    axios.get(API_URL).then((response) => {
      if (mounted){
        this.setState({
          articles: response.data
        });
      }
    });
  }

  render() {
    const { articles } = this.state;
    return (
      // <div >
        // <h1> Hello this is the react app for the alpha blog</h1>
          <div className='container'>
            <h1 style={{ textAlign: "center" }}>Listing all Articles</h1>
              {
                articles.map((article) => {
                  return (
                  <ul>
                  <div key={article.id}>
                     <li> <h3 style={{color: 'green'}}>{article.title}</h3> </li>
                      <p>{article.description}</p>
                      <hr />
                  </div>
                  </ul>);
                  })
              }
          </div>
      // </div>
    );
  }
}
export default Articles;