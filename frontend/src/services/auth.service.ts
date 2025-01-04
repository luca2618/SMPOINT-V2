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
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const tokens = await response.json();
    this.storeTokens(tokens);
    return tokens;
  }

  static async refreshToken(refreshToken: string): Promise<string> {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const { access } = await response.json();
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