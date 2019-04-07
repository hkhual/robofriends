import React, { Component } from 'react';

import './App.css';
import Scroll from '../components/Scroll';

import CardList from '../components/CardList';
/*If file is export default then
you can import by its file name*/
/*If file only has export syntax
  then the file can have mutipulte export
  then it must wrap inside curely bracket
  or desctructure it {robots }
*/

import SearchBox from '../components/SearchBox'

import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component{
  constructor(){
    super();
    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( response => response.json())
      .then(users => this.setState({ robots: users}));
  }

onSearchChange = (event) =>{
  this.setState({searchfield: event.target.value})
}

  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes( searchfield.toLowerCase());
    })

    if(!robots.length){
      return <h1>Loading</h1>
    } else{
        return(
          <div className="tc">
            <h1 className="f2">Robofriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
              <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
              </Scroll>
          </div>
        );
    }

  }
}

export default App;
