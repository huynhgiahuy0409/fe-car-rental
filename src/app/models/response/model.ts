import { JWTDTO, UserDTO } from './../model';
export interface APIResponse<T>{
    data: T,
    message: string,
    statusCode: number
}
export interface SignInReResponse{
    username: string,
    password: string,
}
export interface AuthenticationResponse{
    user: UserDTO,
    accessToken: JWTDTO,
    refreshToken: JWTDTO
}