// Info message
console.log("Welcome to notes📃 app !");


// Star Button
function colorChange(element) {
    element.style.color = "yellow";
};

// Add Button
const addNote = document.querySelector(".add_sign");
const plus = document.querySelector(".fa-plus");
const container = document.querySelector(".container");
const form_cont = document.querySelector(".form_cont");
const note = document.getElementById("note");

// Delete Variables
const deleteForm = document.querySelector(".delete_cont");
const delete_button = document.querySelector("#deleteBtn");
const deleteNote_title = document.querySelector("#delete_note_title");


//After Every Load the stored notes should appear as they should!
window.addEventListener("load",()=>{
    let notes = localStorage.getItem("notes");

    // Convert it into type - object
    const notesArray = JSON.parse(notes);

    if(notesArray === null) return;

    notesArray.forEach((note) => {
        container.innerHTML += `<div class="note-1 note">
                                <div class="icon star">
                                    <div class="edit_icon">
                                        <div class="circle"></div>
                                        <i class="fa fa-star" onclick="colorChange(this)" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="notetitle">
                                    <h2>${note.title}</h2>
                                </div>
                                <div class="text">
                                    <p>${note.note}</p>
                                </div>
                                <div class="date">
                                    <p>${note.date}</p>
                                </div>
                                <div class="icon">
                                    <div class="edit_icon">
                                        <div class="circle"></div>
                                        <i class="fa fa-times" onclick="deleteNote(this)" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>`
    });

});

// For CSS AND FORM POP UP
addNote.addEventListener("click", () => {
    container.classList.toggle("active");
    form_cont.classList.toggle("active");
    plus.classList.toggle("active");

    form_cont.style.visibilty = "visible";
    form_cont.style.opacity = "1";
});


//Collect Data
const button = document.querySelector("#submitBtn");
const data = document.querySelector("#note");
const data_title = document.querySelector("#notetitle");

button.addEventListener("click",()=>{
    let note_value = data.value;
    let note_title = data_title.value;

    //Store value in localstorage
    const noteDetails = {
        title : note_title,
        note : note_value,
        date : new Date().toLocaleDateString()
    };

    //Get all notes stored in localstorage !
    let notes = localStorage.getItem("notes");
    if(notes ===  null)
        notesArray = [];
    else
        notesArray = JSON.parse(notes);

    //Push data to array
    notesArray.push(noteDetails);
    printNote(notesArray);
    
    //First convert array into string using JSON.stringify(), then stores data into localStorage
    localStorage.setItem("notes",JSON.stringify(notesArray));


    //Reset all values
    data.value = "";
});


// Print Data
function printNote(notes){
    notes.forEach((note) => {
        container.innerHTML += `<div class="note-1 note">
                                <div class="icon star">
                                    <div class="edit_icon">
                                        <div class="circle"></div>
                                        <i class="fa fa-star" onclick="colorChange(this)" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div class="notetitle">
                                    <h2>${note.title}</h2>
                                </div>
                                <div class="text">
                                    <p>${note.note}</p>
                                </div>
                                <div class="date">
                                    <p>${note.date}</p> 
                                </div>
                                <div class="icon">
                                    <div class="edit_icon">
                                        <div class="circle"></div>
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>`
    });

    window.location.reload();
};


// Delete Note
function deleteNote(element) {
    //CSS Toggling !
    deleteForm.classList.toggle("active");
    container.classList.toggle("active");

    //Disable add symbol while delete form is visible !
    document.querySelector(".add").style.opacity = "0";
    document.querySelector(".add").style.visibility = "hidden";
};

delete_button.addEventListener("click", () => {
    //Just CSS Classlist toggling
    deleteForm.classList.toggle("active");
    container.classList.toggle("active");

    // Parse all data in locaolstorage !
    const notes = localStorage.getItem("notes");

    //Convert stringified notes into proper object form !
    let parsed_notes = JSON.parse(notes);
    console.log(parsed_notes);

    //Check existence !
    const notesIndex = parsed_notes.findIndex((note) => note.title === deleteNote_title.value);

    //Execute condition for note exists or not !
    if (notesIndex < 0){ 
        window.location.reload();
        return alert("Title doesn't exists !❌");
    }

    //Remove note
    parsed_notes.splice(notesIndex, 1);

    //Store remaining notes as stringified form !
    localStorage.setItem("notes", JSON.stringify(parsed_notes));


    //Reset title value !
    deleteNote_title.value = "";
    window.location.reload();
});

// Share
const share = document.querySelector(".share");

    if (!navigator.share) {
        share.style.display = "none";
    };


    share.addEventListener("click", function () {
        const title = prompt("Enter your title");

        if (title === null) return;

        // Parse all data in locaolstorage !
        const notes = localStorage.getItem("notes");

        //Convert stringified notes into proper object form !
        let parsed_notes = JSON.parse(notes);
        console.log(parsed_notes);

        //Check existence !
        const notesIndex = parsed_notes.findIndex((note) => note.title === title);

        if (notesIndex >= 0) {
            navigator.share({
                title: 'Note',
                text: `Note : ${parsed_notes[notesIndex].note}`,
                url: ``,
            })
                .then(() => {
                    alert("Shared successfully !✔");
                })
                .catch(err => console.log(err));
        } else {
            alert("Note doesn't exists !❌");
        }


    })