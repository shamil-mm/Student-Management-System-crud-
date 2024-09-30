import { Students } from "../models/Students";

export class StudentServices{
    private students:Students[]=[];
    async getAllStudents():Promise<Students[]>{
        await new Promise (resolve=>setTimeout(resolve,500));
        return this.students;
    }

    async getStudentById(id:number):Promise<Students |undefined>{
        await new Promise(resolve=> setTimeout(resolve,500))
        return this.students.find(student=>student.id===id);
    }

    async createStudent(student:Omit<Students,'id'>):Promise<Students>{
        await new Promise(resolve=> setTimeout(resolve,500))
        const newStudent = {...student,id:this.students.length+1};
        this.students.push(newStudent)
        return newStudent
    }


    async updateStudent(id:number ,updateStudent: Partial<Students>):Promise<Students | undefined> {
        await new Promise(resolve=>setTimeout(resolve,500));
        const student =this.students.find(s => s.id===id);
        if(student){
            Object.assign(student,updateStudent);
            return student;
        }
        return undefined
    }

    async deleteStudent(id:number):Promise<boolean>{
        await new Promise(resolve=>setTimeout(resolve,500));
        const index=this.students.findIndex(s=>s.id===id)
        if(index !==-1){
            this.students.splice(index,1);
            return true
        }
        return false
    }
}
