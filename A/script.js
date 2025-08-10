// DOM Elements
const addNoteBtn = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closePopup = document.querySelector('.popup header i');
const noteForm = document.querySelector('.popup form');
const titleInput = document.querySelector('.popup form input');
const contentInput = document.querySelector('.popup form textarea');
const notesContainer = document.getElementById('wrapped');

let notes = []; // Array to store notes
let editIndex = null; // To track the index of the note being edited

// Open Popup
addNoteBtn.addEventListener('click', () => {
    titleInput.value = '';
    contentInput.value = '';
    editIndex = null; // Reset edit mode
    popupBox.style.display = 'flex'; // Show popup
});

// Close Popup
closePopup.addEventListener('click', () => {
    popupBox.style.display = 'none'; // Hide popup
});

// Handle Form Submission
noteForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        if (editIndex !== null) {
            // Edit existing note
            notes[editIndex] = { title, content };
        } else {
            // Add a new note
            notes.push({ title, content });
        }
        renderNotes(); // Update the notes display
        popupBox.style.display = 'none'; // Hide popup
    } else {
        alert('Please fill in both fields!');
    }
});

// Render Notes on the Page
function renderNotes() {
    // Clear the notes container
    notesContainer.innerHTML = `
        <div class="add-box">
            <div class="icon">+</div>
            <p>Add New Note</p>
        </div>
    `;

    // Display each note
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'notes';
        noteElement.innerHTML = `
            <div class="title">${note.title}</div>
            <div class="content">${note.content}</div>
            <div class="bottom">
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });

    // Reattach event listener for adding new notes
    document.querySelector('.add-box').addEventListener('click', () => {
        titleInput.value = '';
        contentInput.value = '';
        editIndex = null;
        popupBox.style.display = 'flex';
    });
}

// Edit a Note
function editNote(index) {
    titleInput.value = notes[index].title;
    contentInput.value = notes[index].content;
    editIndex = index; // Store index of the note being edited
    popupBox.style.display = 'flex'; // Show popup
}

// Delete a Note
function deleteNote(index) {
    notes.splice(index, 1); // Remove the note from the array
    renderNotes(); // Update the notes display
}

// Initial Render
renderNotes();
