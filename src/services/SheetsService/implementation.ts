import { google, type sheets_v4 } from "googleapis";
import type { SheetsService } from ".";

export class GoogleSheetsService implements SheetsService {
  private readonly sheets: sheets_v4.Sheets;

  private constructor(client: any) {
    this.sheets = google.sheets({ version: "v4", auth: client });
  }

  static create(client: any): SheetsService {
    return new GoogleSheetsService(client);
  }

  async readSheet<R extends any[][]>(
    spreadsheetId: string,
    range: string
  ): Promise<R> {
    const sheet = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    if (
      sheet.data.values === null ||
      sheet.data.values === undefined ||
      sheet.data.values.length === 0
    ) {
      throw new Error("The sheet is empty or invalid.");
    }

    return sheet.data.values as R;
  }

  async writeSheet<T extends any[][]>(
    spreadsheetId: string,
    range: string,
    values: T
  ): Promise<void> {
    await this.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values }
    });
  }
}
