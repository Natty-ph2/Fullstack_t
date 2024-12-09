import React from "react";

const SinglePerson = ({person, deletePerson }) => {
    return(
        <div>
           
          <li>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)} >Delete</button>
          </li>
         
        </div>
        
    )
}

export default SinglePerson;