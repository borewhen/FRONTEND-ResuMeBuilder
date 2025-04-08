export interface UserData {
    email: string;
    password: string;
}

export interface UserLogin {
    email: string,
    password: string,
}

interface UserLoginSucess {
    message: string,
    user: {
        email: string,
        username: string,
        id: number,
        role: string,
    },
    access_token: string,
}

interface UserLoginError {
    detail: string,
    access_token: string | null,
    user: {
        email: string,
        username: string,
        id: number,
        role: string,
    }
}
export type UserLoginResponse = UserLoginSucess | UserLoginError;
export interface UserRegister {
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    role: string
    profile_picture_url: string,
    summary: string,
    password: string,
}

export interface UserRegisterResponse {
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    role: string,
    profile_picture_url: string,
    summary: string,
    user_id: number,
    created_at: string,
}