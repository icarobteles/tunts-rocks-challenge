import { StudentSituation, type Student } from "./Student";

export interface IClassroom {
  name: string;
  totalLectures: number;
  students: Student[];
}

export interface ICreateClassroom {
  name: string;
  totalLectures: number;
}

export class Classroom implements IClassroom {
  name: string;
  totalLectures: number;
  students: Student[];

  private constructor({ name, totalLectures }: ICreateClassroom) {
    this.name = name;
    this.totalLectures = totalLectures;
    this.students = [];
  }

  static create(data: ICreateClassroom): Classroom {
    return new Classroom(data);
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  removeStudent(studentId: number): void {
    this.students = this.students.filter((s) => s.id !== studentId);
  }

  getStudentById(studentId: number): Student | null {
    const student = this.students.find((s) => s.id === studentId);
    return student ?? null;
  }

  calculateAverage(student: Student): number {
    const sum = student.grades.reduce((acc, curr) => acc + curr, 0);
    return sum / (student.grades.length * 10);
  }

  calculateAbsencePercentage(student: Student): number {
    return student.absences / this.totalLectures;
  }

  calculateSituation(student: Student): StudentSituation {
    const absencePercentage = this.calculateAbsencePercentage(student);
    const average = this.calculateAverage(student);

    if (absencePercentage > 0.25) {
      return StudentSituation.FAILED_BY_ABSENCE;
    }

    if (average < 5) {
      return StudentSituation.FAILED_BY_GRADE;
    }

    if (average < 7) {
      return StudentSituation.FINAL_EXAM;
    }

    return StudentSituation.APPROVED;
  }

  calculateNaf(student: Student): number {
    const situation = this.calculateSituation(student);
    const average = this.calculateAverage(student);

    if (situation === StudentSituation.FINAL_EXAM) {
      return Math.ceil(100 - average * 10);
    }

    return 0;
  }
}
