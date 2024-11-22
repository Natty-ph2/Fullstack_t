// import Note from "./componets/Note"
// import { useState } from "react"

// const App = (props) => {

//   const[notes,setNotes] = useState(props.notes);
//   const[newNote, setNewNote] = useState('note...');
//   const[showAll, setShowAll] = useState(true);

//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       import: Math.random() < 0.5,
//       id: String(notes.length + 1),      
//     }

//     setNotes(notes.concat(noteObject));
//     setNewNote('');
//   }
  
//   const handleNoteChange = (event) => {
//     event.preventDefault();
//     console.log(event.target.value);
//     setNewNote(event.target.value);
//   }

//   const noteShow = showAll ? notes : notes.filter(note => note.important);
//   return (
//     <div>
//       <h1>Notes</h1>
//       <button onClick={() =>setShowAll(!showAll)}>
//         show {showAll? 'important' : 'all'}
//       </button>
//       <ul>
//         {noteShow.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input 
//           value={newNote} 
//           onChange={handleNoteChange}
//         />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   )
// }

// export default App



import { useState, useEffect } from "react"
import noteService from './services/notes';
import Note from './componets/Note';
import Notification from "./componets/Notification";




const App = () => {
  const[notes, setNotes] = useState([]);
  const[newNote, setNewNote] = useState('');
  const[showAll, setShowAll] = useState(false);
  const[erroMessage, setErrorMessage] = useState("some error happpend");


useEffect(() => {
  noteService
      .getAll()
      .then(intialValues => {
        setNotes(intialValues);
      })

}, [])



 const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: String(notes.length + 1)
    }

    
    noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    
 }

 const handleChange = (event) => {
   
    setNewNote(event.target.value);
 }

 const noteShow = showAll ? notes : notes.filter(note => note.important);
 console.log(noteShow);

 const toggleImportanceOf = (id) => {
  // const url = `http://localhost:3001/notes/${id}`;
  const note = notes.find(n => n.id === id);
  const changedNote = {...note, important: !note.important}

  noteService.update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(n => n.id !== id ? n : returnedNote))
  })
  .catch(error => {
    setErrorMessage(` 
      Note ${note.content} was already removed from the server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);

    setNotes(notes.filter(n => n.id !== id));
  })
  
  console.log('importance of ' + id + ' needs to be toggle')
 }
 
 
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={erroMessage} />
      <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll? 'important' : 'all'}
      </button>
      </div>
      
      <ul>
        {
          noteShow.map(note => 
            <Note 
               key={note.id} 
               note={note} 
               toggleImportance = {() => toggleImportanceOf(note.id)}
            />)
        }
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App

