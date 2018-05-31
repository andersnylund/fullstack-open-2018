import React from 'react'

const PersonFrom = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    nimi: <input value={props.newName} onChange={props.onNameChange} />
                </div>
                <div>
                    numero: <input value={props.newNumber} onChange={props.onNumberChange} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default PersonFrom