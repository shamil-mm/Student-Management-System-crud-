import { Request,Response } from "express";
import { StudentServices } from "../Services/StudentServices";


export class StudentController{
    constructor(private studentService:StudentServices){}

    async getAllStudents(req:Request, res:Response):Promise<void>{
        try {
        const students=await this.studentService.getAllStudents()
        res.json(students);    
        } catch (error) { 
            res.status(500).json({ error: 'Internal server error' })
        }  
    }


    async getStudentById(req:Request,res:Response):Promise<void>{
        try {
            const id=parseInt(req.params.id)
            const student =  await this.studentService.getStudentById(id)
            if(student){
                res.json(student);
            }else{
                res.status(404).json({ error: 'Student not found' })  
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' }) 
        }
    }

    async createStudent(req:Request,res:Response):Promise<void>{
        try {
            const newStudent = await this.studentService.createStudent(req.body)
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateStudent(req:Request,res:Response):Promise<void>{
        try {
            const id=parseInt(req.params.id);
            const updatedStudent =  await this.studentService.updateStudent(id,req.body)
            if(updatedStudent){
                res.status(404).json({error:'student not found'})
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' }); 
        }
    }


    async deleteStudent(req:Request,res:Response):Promise<void>{
        try {
            const id=parseInt(req.params.id)
            const success =await this.studentService.deleteStudent(id)
            if(success){
                res.status(204).send()
            }else{
                res.status(404).json({ error: 'Student not found' });
            }
        } catch (error) {
                res.status(500).json({ error: 'Internal server error' });  
        }
    }
}