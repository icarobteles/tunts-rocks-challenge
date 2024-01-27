import { Classroom, Student, type StudentSituation } from "./models";
import {
  GoogleAuthService,
  GoogleSheetsService,
  type AuthService,
  type SheetsService
} from "./services";

type SheetRestOfRows = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

type SheetData = [[string], [string], ...SheetRestOfRows[]];

class Main {
  private authService: AuthService | null;
  private sheetsService: SheetsService | null;
  private client: any | null = null;

  private constructor() {
    this.sheetsService = null;
    this.authService = null;
  }

  static create(): Main {
    return new Main();
  }

  async authenticate(): Promise<this> {
    console.log("🔐 Starting authentication...");
    this.authService = GoogleAuthService.create();
    this.client = await this.authService.execute();
    console.log("🔓 Authentication completed successfully.\n");
    return this;
  }

  async init(): Promise<void> {
    if (this.client === null) {
      throw new Error(
        "🚫 You must authenticate before starting the application!"
      );
    }

    console.log("🕒 Initializing the spreadsheet update, wait a moment...");
    this.sheetsService = GoogleSheetsService.create(this.client);

    const spreadsheetId = "18t83PO29mlzGJskpUVcZRN1O-QwCM0ifuGURXhZ0WVA";
    const range = "engenharia_de_software!A1:H27";

    const data = await this.sheetsService.readSheet<SheetData>(
      spreadsheetId,
      range
    );

    const title = data[0][0];
    const totalLectures = Number(data[1][0].split(": ")[1]);

    const classroom = Classroom.create({
      name: title,
      totalLectures
    });

    const classroomData = data.slice(3);

    classroomData.forEach((row) => {
      const student = Student.create({
        id: Number(row[0]),
        name: row[1] ?? "",
        absences: Number(row[2]) ?? 0,
        grades: [Number(row[3]) ?? 0, Number(row[4]) ?? 0, Number(row[5]) ?? 0],
        classroom
      });

      classroom.addStudent(student);
    });

    const situations: StudentSituation[][] = classroom.students.map((s) => [
      s.situation
    ]);
    const nafs: number[][] = classroom.students.map((s) => [s.naf]);

    console.log("💾 Writing students situations in the sheet...");
    await this.sheetsService.writeSheet(
      spreadsheetId,
      "engenharia_de_software!G4:G27",
      situations
    );

    console.log("💾 Writing students nafs in the sheet...");
    await this.sheetsService.writeSheet(
      spreadsheetId,
      "engenharia_de_software!H4:H27",
      nafs
    );

    console.log(
      "✅ Spreadsheet update completed successfully, the application will be close."
    );
  }
}

const main = Main.create();
main
  .authenticate()
  .then(async (m) => await m.init())
  .catch(console.error)
  .finally(() => process.exit(0));
