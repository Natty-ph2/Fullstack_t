import React from "react";

const SearchPerson = ({searchName, handleSearch}) => {
    return(
        
         <div>
             search by name: <input value={searchName} onChange={handleSearch} />
       </div>
        
    )
}

export default SearchPerson;