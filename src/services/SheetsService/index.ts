export interface SheetsService {
  readSheet: <R extends any[][]>(
    spreadsheetId: string,
    range: string
  ) => Promise<R>;
  writeSheet: <T extends any[][]>(
    spreadsheetId: string,
    range: string,
    values: T
  ) => Promise<void>;
}
