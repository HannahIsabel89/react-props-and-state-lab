import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (event) => {
    this.setState({
      ...this.state,
      filters: { type: event.target.value },
    });
  };

  onFindPetsClick = () => {
    fetch (`/api/pets?type=${this.state.filters.type}`)
    .then (res => res.json)
    .then (pets => {
      this.setState({
        ...this.state,   // copy the state
        pets // update pets
      })
    })
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map(p => {
      if(p.id === id) 
      p.isAdopted = true
      return p})
      this.setState({
        ...this.state,   // copy the state
        pets
  })
}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
