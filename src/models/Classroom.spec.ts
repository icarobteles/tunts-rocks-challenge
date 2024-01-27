import { Classroom } from "./Classroom";
import { StudentSituation, Student } from "./Student";

describe("Classroom", () => {
  let classroom: Classroom;
  let student: Student;

  beforeEach(() => {
    classroom = Classroom.create({
      name: "Math",
      totalLectures: 10
    });

    student = Student.create({
      id: 1,
      name: "John Doe",
      absences: 2,
      grades: [100, 80, 70],
      classroom
    });
  });

  it("should add a student to the class", () => {
    expect(classroom.students).not.toContain(student);
    classroom.addStudent(student);
    expect(classroom.students).toContain(student);
  });

  it("should remove a student from the class", () => {
    classroom.addStudent(student);
    classroom.removeStudent(student.id);
    expect(classroom.students).not.toContain(student);
  });

  it("should get a student by id", () => {
    classroom.addStudent(student);
    const foundStudent = classroom.getStudentById(student.id);
    expect(foundStudent).toEqual(student);
  });

  it("should calculate the average for a student", () => {
    const average = classroom.calculateAverage(student);
    expect(average).toBe(9);
  });

  it("should calculate the absence percentage for a student", () => {
    const absencePercentage = classroom.calculateAbsencePercentage(student);
    expect(absencePercentage).toBe(0.2);
  });

  it("should round the student's average to the next whole number if the average is a decimal value.", () => {
    student.grades = [100, 80, 70]; // avg = 83.33
    const average = classroom.calculateAverage(student);
    expect(average).toBe(9);
  });

  it("should return approved if the student has abscences less or equal than 25% and average is greather than 7", () => {
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.APPROVED);
  });

  it("should return approved if the student has abscences less or equal than 25% and average is equal to 7", () => {
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.APPROVED);
  });

  it("should return final exam if the student has abscences less or equal than 25% and average it's between 5 and 7", () => {
    student.grades = [100, 40, 40];
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.FINAL_EXAM);
  });

  it("should return final exam if the student has abscences less or equal than 25% and average is equal to 5", () => {
    student.grades = [100, 40, 10];
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.FINAL_EXAM);
  });

  it("should return failed by grade if the student has abscences less or equal than 25% and average is less than 5", () => {
    student.grades = [90, 10, 20];
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.FAILED_BY_GRADE);
  });

  it("should return failed by absence if the student has absences greather than 25%", () => {
    student.absences = 3;
    const situation = classroom.calculateSituation(student);
    expect(situation).toBe(StudentSituation.FAILED_BY_ABSENCE);
  });

  it("should return 0 for naf if the student situation is not final exam", () => {
    const naf = classroom.calculateNaf(student);
    expect(naf).toBe(0);
  });

  it("should return a correct value for naf if the student situation is final exam", () => {
    student.grades = [100, 40, 40];
    const naf = classroom.calculateNaf(student);
    expect(naf).toBe(4);
  });
});
