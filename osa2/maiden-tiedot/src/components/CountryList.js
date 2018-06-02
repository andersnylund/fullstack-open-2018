import React from 'react'

const CountryList = ({ countries, onClick }) => {
    
    if (countries.length > 10) {
        return (
            <p>too many results, specify another filter</p>
        )
    }

    const mapped = countries.map(country => {
        return (
            <tr key={country.alpha3Code} country={country} onClick={(e) => onClick(e, country)}>
                <td>{country.name}</td>
            </tr>
        )
    })
    
    return (
        <div>
            <table>
                <tbody>
                    {mapped}
                </tbody>
            </table>
        </div>
    )
}

export default CountryList