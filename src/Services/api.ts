import { Students } from '../models/Students';

const API_URL = 'http://localhost:3000/api';

export async function getAllStudents(): Promise<Students[]> {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) {
    throw new Error('Failed to fetch students shamil');
  }
  return response.json();
}


export async function getStudentById(id: number): Promise<Students> {
  // const response = await fetch(`${API_URL}/students/${id}`);
  console.log("helloooooooooooooooooooooo")
  const response = await fetch(`${API_URL}/students/${id}`);

  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }
  return response.json();
}

export async function createStudent(student: Omit<Students, 'id'>): Promise<Students> {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return response.json();
}

export async function updateStudent(id: number, student: Partial<Students>): Promise<Students> {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
}

export async function deleteStudent(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
}