import React, { Component } from 'react';
import axios from 'axios';

class Categories extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    axios.get('http://localhost:3000/categories.json').then((response) => {
      this.setState({
        categories: response.data
      });
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className='container'>
        <h1 style={{ textAlign: "center" }}>Listing all Categories</h1>
            {
              categories.map((category) => {
                return (
                  <ul>
                    <div key={category.id}>
                        <li> <h3 style={{color: 'green' }}>{category.name}</h3> </li>
                        <hr />
                    </div>
                  </ul>);
              })
            }
      </div>
    );
  }
}
export default Categories;
