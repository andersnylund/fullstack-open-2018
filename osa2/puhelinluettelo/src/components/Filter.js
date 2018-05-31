import React from 'react'

const Filter = (props) => {
    return (
        <div>
            rajaa näytettäviä: <input value={props.filter} onChange={props.onFilterChange} />
        </div>
    )
} 

export default Filter