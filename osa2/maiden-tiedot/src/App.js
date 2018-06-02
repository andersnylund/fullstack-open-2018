import React, { Component } from 'react'
import SearchField from './components/SearchField'
import CountryList from './components/CountryList'
import Country from './components/Country'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allCountries: [],
      filteredCountries: [],
      searchKey: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          allCountries: response.data,
          filteredCountries: response.data
        })
      })
  }

  handleSearchKeyChange = (event) => {
    const value = event.target.value.toLowerCase()

    const filtered = this.state.allCountries
      .filter(country => country.name.toLowerCase().includes(value))

    this.setState({
      searchKey: value,
      filteredCountries: filtered
    })
  }

  handleCountryClick = (event, country) => {
    console.log(country)
    this.setState({
      filteredCountries: [country]
    })
  }

  content = () => {
    if (this.state.allCountries.length === 0) {
      return (<p>loading...</p>)
    } else if (this.state.filteredCountries.length > 1) {
      return (<CountryList 
                countries={this.state.filteredCountries}
                onClick={this.handleCountryClick}>
              </CountryList>)
    } else if (this.state.filteredCountries.length === 0) {
      return (<p>no results</p>)
    } else {
      return (<Country country={this.state.filteredCountries[0]}></Country>)
    }
  }

  render() {
    return (
      <div className="App">
        <SearchField onChange={this.handleSearchKeyChange}></SearchField>
        {this.content()}
      </div>
    )
  }
}

export default App
