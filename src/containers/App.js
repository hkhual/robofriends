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

import Footer from '../components/Footer';

import { connect } from 'react-redux';

import { setSearchField, requestRobots } from '../actions';



const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  onRequestRobots: () => dispatch(requestRobots())


  }
}


class App extends Component{


  componentDidMount(){
    this.props.onRequestRobots();
  }


  render(){
    const { searchField, robots, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes( searchField.toLowerCase());
    })

    return isPending ?
      <h1>Loading</h1> :

      (
          <div className="tc">
            <h1 className="f2">Robofriends</h1>
            <SearchBox searchChange={onSearchChange}/>
              <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>
              </Scroll>
              <Footer />
          </div>
        );

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
