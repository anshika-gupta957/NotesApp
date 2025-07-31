let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = null;

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

function addNote() {
  const noteInput = document.getElementById('noteInput');
  const text = noteInput.value.trim();
  if (!text) return alert("Note can't be empty!");

  notes.push(text);
  noteInput.value = '';
  saveNotes();
}

function displayNotes() {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'note';
    div.innerHTML = `
      <p>${note}</p>
      <div class="actions">
        <button class="edit-btn" onclick="editNote(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesList.appendChild(div);
  });
}

function deleteNote(index) {
  if (confirm('Are you sure you want to delete this note?')) {
    notes.splice(index, 1);
    saveNotes();
  }
}

function editNote(index) {
  editIndex = index;
  document.getElementById('editNoteText').value = notes[index];
  document.getElementById('editModal').style.display = 'block';
}

function updateNote() {
  const newText = document.getElementById('editNoteText').value.trim();
  if (!newText) return alert("Note can't be empty!");
  notes[editIndex] = newText;
  closeModal();
  saveNotes();
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (event.target === modal) {
    closeModal();
  }
};

displayNotes();
