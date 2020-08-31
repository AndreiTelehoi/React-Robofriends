import React, {Component} from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox"
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            robots: [],
            searchField: '',
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState( {searchField: event.target.value} )
    }

    render () {
        const {searchField, robots} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });
        if (!robots.length) {
            return (
                <h1>Loading</h1>
            )
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>

            );
        }
    }
}

export default App;