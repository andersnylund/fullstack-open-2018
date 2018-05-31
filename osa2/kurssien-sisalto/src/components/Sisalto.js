import React from 'react';
import Osa from './Osa'

const Sisalto = ( {osat} ) => {
    
    const selvitaOsat = () => osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)

    return (
        <div>{selvitaOsat()}</div>
    );
}

export default Sisalto