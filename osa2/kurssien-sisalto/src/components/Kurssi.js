import React from 'react';
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'

const Kurssi = ({ kurssi }) => {
    console.log(kurssi)
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi}></Otsikko>
            <Sisalto osat={kurssi.osat}></Sisalto>
        </div>
    );
}

export default Kurssi