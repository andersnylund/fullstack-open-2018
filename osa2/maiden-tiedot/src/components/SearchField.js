import React from 'react'

const SearchField = ({ onChange }) => {
    return (
        <div>
            <p>find countries</p>
            <input type="text" onChange={onChange} />
        </div>
    );
}

export default SearchField