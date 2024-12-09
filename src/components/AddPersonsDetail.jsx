import React from "react";


const AddPersonsDetail = ({newName, phoneNumber,handleChange, handlePhone, addName}) => {
    return(
        <div>
            <form onSubmit={addName}>
                <div>
                name: <input value={newName} onChange={handleChange} /> <br />
                number: <input value={phoneNumber} onChange={handlePhone} />
                </div>
                <div>
                <button type='submit'>Add</button>
                </div>
            </form>
        </div>
        
    )
}

export default AddPersonsDetail;