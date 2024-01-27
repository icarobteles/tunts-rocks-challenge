import type { AuthService } from ".";

class FakeAuthService implements AuthService {
  private async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async execute(): Promise<boolean> {
    try {
      await this.wait(500);
      return true;
    } catch (error) {
      throw new Error("🚫 Authentication failed.");
    }
  }
}

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new FakeAuthService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new instance", () => {
    expect(authService).toBeInstanceOf(FakeAuthService);
  });

  it("should return true if the authentication was successful", async () => {
    const result = await authService.execute();
    expect(result).toBe(true);
  });

  it("should throw an error if the authentication failed", async () => {
    jest
      .spyOn(authService, "execute")
      .mockRejectedValue(new Error("🚫 Authentication failed."));

    await expect(authService.execute()).rejects.toThrow(
      "🚫 Authentication failed."
    );
  });
});
