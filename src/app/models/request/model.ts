export interface SignUpRequest{
    username: string,
    password: string,
    fullName: string,
    phone: string
}
export interface SignInRequest{
    username: string,
    password: string,
}
export interface ForgetPasswordRequest{
    username: string,
    newPassword: string,
} 