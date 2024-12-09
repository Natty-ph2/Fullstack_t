import { useEffect, useState } from 'react'
import SearchPerson from './components/SearchPerson';
import AddPersonsDetail from './components/AddPersonsDetail';
import PersonsList from './components/PersonsList';
import listOfPersons from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  

  useEffect(() => {
    listOfPersons
    .getAll()
    .then(intialValues => {
      setPersons(intialValues);
    })
  }, [])

  console.log('renders', persons.length, 'persons')

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhone = (event) => {
    setPhoneNumber(event.target.value);
  }

  
  

  const addName = (event) => {
    event.preventDefault();

    const exstingPerson = persons.find(p => p.name === newName);

    if(exstingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added into the phonebook, replace the old number with the new one?`)
      if(confirmUpdate){
        const updatedPerson = {...exstingPerson, number: phoneNumber};
        listOfPersons
        .update(exstingPerson.id, updatedPerson)
        .then(returenedPersons => {
          setPersons(persons.map(p => p.id !== exstingPerson.id ? p : returenedPersons));
          setNewName('');
          setPhoneNumber('');
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage('')
          }, 5000);
        })
        .catch(error => {
          setErrorMessage(`information ${newName} has already removed from server`);
          setNewName('');
          setPhoneNumber('');
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
          
        })
      }
    

      
    }  else {

      const newObj = {
        name: newName,
        number: phoneNumber,
        // id: String(persons.length + 1)
      }
      
      listOfPersons
      .create(newObj)
      .then(returenedPersons => {
        setPersons(persons.concat(returenedPersons));
        setNewName('');
        setPhoneNumber('');
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage('')
        }, 2000);
      })
      .catch(error => {

        console.error("Error adding person:", error);
    });

    }
   

   


    // let isDuplicate = false;
    // for (let i = 0; i < persons.length; i++) {
    //   if(JSON.stringify(newObj) === JSON.stringify(persons[i])){
        
    //     alert(`${newName} is already added to phonebook`)
    //     isDuplicate = true;
    //     break;
    //   }
    // }
    // if(!isDuplicate){
    //   setPersons(persons.concat(newObj));
    //   setNewName('');
    //   setPhoneNumber('');
    // }
    


   
    
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value);
  }

  
  


  
  const deletePerson = (id, name) => {  

    if(window.confirm(`delete ${name}`)) {
      listOfPersons
    .remove(id)
    // .then(afteDel => {
    //   setPersons(persons.filter(pe => id !== pe.id ? pe : afteDel))
    // })
    .then(() => {
      setPersons(persons.filter(pe => id !== pe.id))
    })
    }
    
  }
  const filteredPersons = persons.filter(person =>
    person.name && person.name.toLowerCase().includes(searchName.toLowerCase())
    
  );



  console.log(newName)
  return (
    <>
     
     <h2 className='success'>{successMessage}</h2>
     <h2 className='error'>{errorMessage}</h2>
      <h1>Phone Book</h1>
      <SearchPerson searchName={searchName} handleSearch={handleSearch}  />
     
       <h2>Add New</h2>
       <AddPersonsDetail
         newName={newName}
         phoneNumber={phoneNumber}
         handleChange={handleChange}
         handlePhone={handlePhone}
         addName={addName}
        
        
       />
       <h2>Names</h2>
       <PersonsList persons={filteredPersons} deletePerson={deletePerson}  />

    </>
  )
}

export default App






