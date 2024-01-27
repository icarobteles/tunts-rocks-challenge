import { type Classroom } from "./Classroom";

export enum StudentSituation {
  FAILED_BY_ABSENCE = "Reprovado por Falta",
  FAILED_BY_GRADE = "Reprovado por Nota",
  APPROVED = "Aprovado",
  FINAL_EXAM = "Exame Final"
}

export interface IStudent {
  readonly id: number;
  name: string;
  absences: number;
  grades: [number, number, number];
  classroom: Classroom;
  average: number;
  naf: number;
  situation: StudentSituation;
}

export interface ICreateStudent {
  id: number;
  name: string;
  absences: number;
  grades: [number, number, number];
  classroom: Classroom;
}

export class Student implements IStudent {
  readonly id: number;
  name: string;
  absences: number;
  grades: [number, number, number];
  classroom: Classroom;
  average: number;
  naf: number;
  situation: StudentSituation;

  private constructor({
    id,
    absences,
    grades,
    name,
    classroom
  }: ICreateStudent) {
    this.id = id;
    this.absences = absences;
    this.grades = grades;
    this.name = name;
    this.classroom = classroom;
    this.average = this.classroom.calculateAverage(this);
    this.naf = this.classroom.calculateNaf(this);
    this.situation = this.classroom.calculateSituation(this);
  }

  static create(data: ICreateStudent): Student {
    return new Student(data);
  }
}
