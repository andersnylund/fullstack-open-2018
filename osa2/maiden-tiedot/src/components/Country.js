import React from 'react'

const Country = ({ country }) => {
    return (
        <div>
            <h3>{country.name} {country.nativeName}</h3>
            <p>captial: {country.capital}</p>
            <p>population: {country.population}</p>
            <img
                src={country.flag}
                alt="Flag"
                height="40%"
                width="40%"
            />
        </div>
    )
}

export default Country