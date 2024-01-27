import { type SheetsService } from "./index";

class FakeSheetsService implements SheetsService {
  private readonly data: Record<string, string[][]> = {
    spreadsheetOne: [
      ["value1", "value2"],
      ["value3", "value4"]
    ]
  };

  async readSheet<R extends any[][]>(
    spreadsheetId: string,
    range: string
  ): Promise<R> {
    return (this.data[spreadsheetId] as R) || [[]];
  }

  async writeSheet<T extends any[][]>(
    spreadsheetId: string,
    range: string,
    values: T
  ): Promise<void> {
    this.data[spreadsheetId] = values;
  }
}

describe("SheetsService", () => {
  let sheetsService: SheetsService;

  beforeEach(() => {
    sheetsService = new FakeSheetsService();
  });

  it("should read sheet", async () => {
    const spreadsheetId = "spreadsheetOne";

    const result = await sheetsService.readSheet(spreadsheetId, "");
    expect(result).toEqual([
      ["value1", "value2"],
      ["value3", "value4"]
    ]);
  });

  it("should write sheet", async () => {
    const spreadsheetId = "spreadsheetOne";
    const values = [
      ["value5", "value6"],
      ["value7", "value8"]
    ];

    const currentData = await sheetsService.readSheet(spreadsheetId, "");
    expect(currentData).toEqual([
      ["value1", "value2"],
      ["value3", "value4"]
    ]);

    await sheetsService.writeSheet(spreadsheetId, "", values);

    const newData = await sheetsService.readSheet(spreadsheetId, "");

    expect(newData).toEqual(values);
  });
});
