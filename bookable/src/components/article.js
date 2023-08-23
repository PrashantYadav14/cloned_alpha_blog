//import React from 'react';
import axios from 'axios';
import { Component } from 'react';
class Articles extends Component {

    state = {
      articles: []
    };
  componentDidMount() {
    let mounted = true;
    const API_URL = "http://localhost:3000/api/v1/articles";
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
      <div >
        <h1> Hello this is the react app for the alpha blog</h1>

        <div>
        <h1>These articles are from api</h1>
        {
       articles.map((article) => {
        return (
        <div key={article.id}>
          <h3 style={{color: 'red'}}>{article.title}</h3>
          <p>{article.description}</p>
          <hr />
        </div>)
        })}
    </div>
      </div>
    );
  }
}
export default Articles;