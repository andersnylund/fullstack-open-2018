import React from 'react';
import Otsikko from './Otsikko'
import Sisalto from './Sisalto'
import Yhteensa from './Yhteensa'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi}></Otsikko>
            <Sisalto osat={kurssi.osat}></Sisalto>
            <Yhteensa osat={kurssi.osat}></Yhteensa>
        </div>
    );
}

export default Kurssi