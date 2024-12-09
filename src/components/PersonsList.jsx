import React from "react";
import SinglePerson from "./SinglePerson";


const PersonsList = ({persons, deletePerson }) => {

  
    return(
        <ul>
            {persons.map(person =>
                <SinglePerson key={person.id} person={person} deletePerson={deletePerson} /> 
                
            )}
           
        </ul>
    )
}

export default PersonsList;