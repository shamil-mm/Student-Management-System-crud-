import express,{json,urlencoded} from 'express';
import { StudentServices } from './Services/StudentServices';
import { StudentController } from './controllers/StudentController';
import cors from 'cors'
const app = express();
app.use(json());
app.use(cors())
app.use(urlencoded({extended:true}))
const studentService = new StudentServices();
const studentController = new StudentController(studentService);

app.get('/api/students', studentController.getAllStudents.bind(studentController));
app.get('/api/students/:id', studentController.getStudentById.bind(studentController));
app.post('/api/students', studentController.createStudent.bind(studentController));
app.put('/api/students/:id', studentController.updateStudent.bind(studentController));
app.delete('/api/students/:id', studentController.deleteStudent.bind(studentController));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});