import './style.css'
import { getAllStudents,createStudent,updateStudent,deleteStudent } from './Services/api';
import { Students } from './models/Students';

class StudentManager {
  private studentList: HTMLUListElement;
  private form: HTMLFormElement;

  constructor() {
    this.studentList = document.getElementById('studentList') as HTMLUListElement;
    this.form = document.getElementById('studentForm') as HTMLFormElement;

    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.loadStudents();
  }

  async loadStudents(): Promise<void> {
    try {
      const students = await getAllStudents();
      this.renderStudents(students);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  renderStudents(students: Students[]): void {
    this.studentList.innerHTML = '';
    students.forEach(student => {
      const li = document.createElement('li');
      li.textContent = `${student.name} (${student.email}) - Grade: ${student.grade}`;
      
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => this.handleUpdate(student));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => this.handleDelete(student.id));

      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      this.studentList.appendChild(li);
    });
  }

  async handleFormSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const formData = new FormData(this.form);
    const student = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      grade: Number(formData.get('grade')),
    };

    try {
      await createStudent(student);
      this.form.reset();
      await this.loadStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  }

  async handleUpdate(student: Students): Promise<void> {
    const name = prompt('Enter new name', student.name);
    const email = prompt('Enter new email', student.email);
    const grade = prompt('Enter new grade', student.grade.toString());

    if (name && email && grade) {
      try {
        await updateStudent(student.id, { name, email, grade: Number(grade) });
        await this.loadStudents();
      } catch (error) {
        console.error('Error updating student:', error);
      }
    }
  }

  async handleDelete(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        await this.loadStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  }
}

new StudentManager();