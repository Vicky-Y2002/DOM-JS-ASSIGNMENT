document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const studentsTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    
    // Load stored data from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];
  
    // Function to display students
    function displayStudents() {
      studentsTable.innerHTML = '';
      students.forEach((student, index) => {
        const row = studentsTable.insertRow();
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.studentId}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
          <td>
            <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
          </td>
        `;
      });
    }
  
    // Edit student functionality
    window.editStudent = (index) => {
      const student = students[index];
      document.getElementById('name').value = student.name;
      document.getElementById('student-id').value = student.studentId;
      document.getElementById('email').value = student.email;
      document.getElementById('contact').value = student.contact;
      
      form.onsubmit = (event) => {
        event.preventDefault();
        student.name = document.getElementById('name').value;
        student.studentId = document.getElementById('student-id').value;
        student.email = document.getElementById('email').value;
        student.contact = document.getElementById('contact').value;
  
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        form.reset();
      };
    };
  
    // Delete student functionality
    window.deleteStudent = (index) => {
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      displayStudents();
    };
  
    // Handle form submission
    form.onsubmit = (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const studentId = document.getElementById('student-id').value;
      const email = document.getElementById('email').value;
      const contact = document.getElementById('contact').value;
  
      // Input validation
      if (!name || !studentId || !email || !contact) {
        alert("Please fill in all fields.");
        return;
      }
  
      const newStudent = {
        name,
        studentId,
        email,
        contact,
      };
  
      students.push(newStudent);
      localStorage.setItem('students', JSON.stringify(students));
      displayStudents();
      form.reset();
    };
  
    // Display students when page loads
    displayStudents();
  });
// Add student functionality
form.onsubmit = (event) => {
    event.preventDefault();
    // Getting values from the form
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('student-id').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
  
    // Check if any of the fields are empty
    if (!name || !studentId || !email || !contact) {
      alert("All fields are required!");
      return;
    }
  
    // Create a new student object
    const newStudent = { name, studentId, email, contact };
  
    // Add to the array and save to localStorage
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    
    // Refresh the student list
    displayStudents();
    form.reset();
  };
    