import Axios, { AxiosRequestConfig } from 'axios'
import { User, UserCredentials, UserForCreate } from './types'

export interface ApiError extends Error {}

export class ApiClient {
  private readonly authorization: { Authorization: string }

  constructor(private readonly token: string) {
    this.authorization = { Authorization: `Bearer ${token}` }
  }

  /**
   * Configure base settings for Axios client.
   *
   * @param cfg Additional configuration settings for Axios client.
   * @returns Fully build Axios configuration.
   */
  private static config<D = any>(cfg?: AxiosRequestConfig<D>): AxiosRequestConfig<D> {
    return {
      baseURL: 'http://localhost:8080/',
      ...cfg
    }
  }

  public async fetchSelf(): Promise<User> {
    return Axios.get<User>('/users/me', ApiClient.config({ headers: this.authorization })).then(
      d => d.data
    )
  }

  /**
   * Register new user with the given data.
   *
   * @param data User minial required data for registration.
   * @returns
   */
  public static async register(data: UserForCreate): Promise<User> {
    return Axios.post<User>('/auth/sign-up', data, ApiClient.config()).then(d => d.data)
  }

  /**
   * Perform authentication on API.
   *
   * @param creds User credentials (username & password).
   */
  public static async authenticate(creds: UserCredentials): Promise<ApiClient> {
    return Axios.post<string>('auth/sign-in', creds, ApiClient.config()).then(
      r => new ApiClient(r.data)
    )
  }
}
