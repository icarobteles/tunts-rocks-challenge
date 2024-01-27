import type { OAuth2Client, JWTInput } from "google-auth-library";
import type { JSONClient } from "node_modules/google-auth-library/build/src/auth/googleauth.d.ts";
import type { ImpersonatedJWTInput } from "node_modules/google-auth-library/build/src/auth/credentials.d.ts";
import type { AuthService } from ".";

import { cwd } from "node:process";
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

type GoogleAuthCredentials = JWTInput | ImpersonatedJWTInput;
type GoogleAuthClient = OAuth2Client | JSONClient;

interface GoogleAuthWebKeys {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
}

export class GoogleAuthService implements AuthService {
  private readonly SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  private readonly PATH = cwd();
  private readonly TOKEN_PATH = join(this.PATH, "token.json");
  private readonly CREDENTIALS_PATH = join(this.PATH, "credentials.json");

  private client: GoogleAuthClient | null = null;

  private constructor() {}

  static create(): AuthService {
    return new GoogleAuthService();
  }

  private loadSavedCredentials(): GoogleAuthClient | null {
    try {
      const content = readFileSync(this.TOKEN_PATH, "utf8");
      const credentials = JSON.parse(content) as GoogleAuthCredentials;
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  private saveCredentials(client: GoogleAuthClient): void {
    const content = readFileSync(this.CREDENTIALS_PATH, "utf8");
    const keys = JSON.parse(content);
    const key = keys.web as GoogleAuthWebKeys;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token
    });

    writeFileSync(this.TOKEN_PATH, payload, "utf8");
  }

  async execute(): Promise<GoogleAuthClient> {
    try {
      this.client = this.loadSavedCredentials();

      if (this.client !== null) return this.client;

      this.client = await authenticate({
        keyfilePath: this.CREDENTIALS_PATH,
        scopes: this.SCOPES
      });

      if (this.client.credentials) {
        this.saveCredentials(this.client);
      }

      return this.client;
    } catch (error) {
      throw new Error("🚫 Authentication failed.");
    }
  }
}
