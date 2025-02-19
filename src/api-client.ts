import Axios, { AxiosRequestConfig } from 'axios'
import {
  AccessToken,
  AIExchangeIn,
  AIExchangeOut,
  Prompt,
  PromptForUpdate,
  User,
  UserCredentials,
  UserForCreate
} from './types'

export interface ApiError extends Error {}

export class ApiClient {
  public static readonly COOKIE_KEY = 'AC_AUTH_7k2SRJ4gsR'

  // Authorization (Bearer) to put in request headers.
  private readonly authorization: { Authorization: string }

  private constructor(private readonly token: string, public readonly user: User) {
    this.authorization = { Authorization: `Bearer ${token}` }
  }

  /**
   * Save cookie to browser current session.
   *
   * [Security]: Security flags was omitted due to ongoing development.
   */
  public writeCookie() {
    document.cookie = `${ApiClient.COOKIE_KEY}=${this.token}`
  }

  /**
   * Configure base settings for Axios client.
   *
   * @param cfg Additional configuration settings for Axios client.
   * @returns Fully build Axios configuration.
   */
  private static config<D = any>(cfg?: AxiosRequestConfig<D>): AxiosRequestConfig<D> {
    return {
      baseURL: '/api',
      ...cfg
    }
  }

  private static async fetchSelf(token: string): Promise<User> {
    return Axios.get<User>(
      '/user/me',
      ApiClient.config({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    ).then(d => d.data)
  }

  public async fetchUserExchange(data: AIExchangeIn): Promise<AIExchangeOut> {
    return Axios.post<AIExchangeOut>(
      '/user/exchanges',
      data,
      ApiClient.config({ headers: this.authorization })
    ).then(d => d.data)
  }

  public async fetchUserHistory(): Promise<AIExchangeOut[]> {
    return Axios.get<AIExchangeOut[]>(
      '/user/exchanges',
      ApiClient.config({ headers: this.authorization })
    ).then(d => d.data)
  }

  public async updatePrompt(prompt: PromptForUpdate): Promise<Prompt> {
    return Axios.post<Prompt>(
      '/private/prompt/1',
      prompt,
      ApiClient.config({ headers: this.authorization })
    ).then(r => r.data)
  }

  public async fetchPrompt(): Promise<Prompt> {
    return Axios.get<Prompt>(
      '/private/prompt/1',
      ApiClient.config({ headers: this.authorization })
    ).then(r => r.data)
  }

  /**
   * Register new user with the given data.
   *
   * @param data User minial required data for registration.
   * @returns
   */
  public static async register(data: UserForCreate): Promise<User> {
    return Axios.post<User>('/public/users', data, ApiClient.config()).then(d => d.data)
  }

  /**
   * Perform authentication on API.
   *
   * @param creds User credentials (username & password).
   */
  public static async authenticate(creds: UserCredentials): Promise<ApiClient> {
    const token = await Axios.post<AccessToken>('public/sign-in', creds, ApiClient.config()).then(
      r => r.data.accessToken
    )
    return ApiClient.fetchSelf(token).then(user => new ApiClient(token, user))
  }

  /**
   * Try to initialize using cookie.
   */
  public static async tryFromCookie(): Promise<ApiClient> {
    // Find matching cookie in current sessions (document).
    const result = document.cookie.split(';').filter(s => s.includes(`${ApiClient.COOKIE_KEY}=`))

    if (result.length >= 1) {
      const value = result[0].split('=')[1]
      return ApiClient.fetchSelf(value).then(user => new ApiClient(value, user))
    }

    return Promise.reject()
  }
}
