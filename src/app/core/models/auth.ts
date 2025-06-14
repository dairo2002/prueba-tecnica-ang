export interface LoginRequest {
    id: number;
    email: string;
    password: string;
}

export interface SignupRequest extends LoginRequest {
    name: string;
}
