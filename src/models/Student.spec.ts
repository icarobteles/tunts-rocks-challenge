import { Student, StudentSituation, type ICreateStudent } from "./Student";
import { Classroom } from "./Classroom";

describe("Student", () => {
  let classroom: Classroom;
  let studentData: ICreateStudent;

  beforeEach(() => {
    classroom = Classroom.create({
      name: "Math",
      totalLectures: 10
    });

    studentData = {
      id: 1,
      name: "John Doe",
      absences: 2,
      grades: [80, 100, 90],
      classroom
    };
  });

  it("should have correct properties", () => {
    const student = Student.create(studentData);
    expect(student).toBeInstanceOf(Student);
    expect(student.id).toBe(studentData.id);
    expect(student.name).toBe(studentData.name);
    expect(student.absences).toBe(studentData.absences);
    expect(student.grades).toEqual(studentData.grades);
    expect(student.classroom).toBe(studentData.classroom);
    expect(student.average).toBe(9);
    expect(student.naf).toBe(0);
    expect(student.situation).toBe(StudentSituation.APPROVED);
  });
});
