import React from 'react';

const Yhteensa = ({ osat }) => {
    
    console.log(osat);

    const countAll = () => {
        return osat
            .map(osa => osa.tehtavia)
            .reduce((prev, curr) => prev + curr);
    }
    
    return (
        <div>
            <p>yhteensä {countAll()} tehtävää</p>
        </div>
    );
}

export default Yhteensa