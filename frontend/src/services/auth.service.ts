import { httpClient } from './api/http.service';
import { API_CONFIG } from '../config/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const tokens = await httpClient.post<AuthTokens>(API_CONFIG.ENDPOINTS.LOGIN, credentials);
    this.storeTokens(tokens);
    return tokens;
  }

  static async refreshToken(refreshToken: string): Promise<string> {
    const { access } = await httpClient.post<{ access: string }>(
      API_CONFIG.ENDPOINTS.REFRESH_TOKEN,
      { refresh: refreshToken }
    );
    this.storeAccessToken(access);
    return access;
  }

  private static storeTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
  }

  private static storeAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  static getStoredTokens(): AuthTokens | null {
    const access = localStorage.getItem('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    
    if (!access || !refresh) return null;
    return { access, refresh };
  }

  static logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}