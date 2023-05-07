import { RentalStatus } from '../enum';
import { CarStatus, OAuthProvider } from '../enum';
import { JWTDTO, UserDTO } from './../model';
export interface APIResponse<T> {
    data: T,
    message: string,
    statusCode: number
}

export interface BrandResponse {
    id: number;
    name: string;
}

export interface CarModelResponse {
    id: number;
    name: string;
    type: string;
}

export interface FeatureResponse {
    id: number;
    name: string;
    iconFilename: string;
}

export interface ProvinceResponse {
    id: number;
    code: number;
    domain: string;
    name: string;
}

export interface DistrictResponse {
    id: number;
    name: string;
    prefix: string;
}

export interface WardResponse {
    id: number;
    name: string;
    prefix: string;
}

export interface SignInReResponse {
    username: string,
    password: string,
}
export interface AuthenticationResponse {
    user: UserDTO,
    accessToken: JWTDTO,
    refreshToken: JWTDTO
}

export interface SocialUserResponse {
    email: string,
    firstName: string,
    lastName: string,
    name: string,
    photoUrl: string,
    provider: string
    id: string
}

export interface RegisteredCarResponse {
    id: number;
    name: string;
    defaultPrice: number;
    status: CarStatus;
    totalRental: number;
    avgRating: number;
    imageUrl: string;
}

export interface CarAdminResponse {
    id: number;
    created_date: string;
    color: string;
    plate: string;
    price: number;
    brand: IdNameResponse;
    model: IdNameResponse;
    service_type: IdNameResponse;
    status: CarStatus;
}

export interface IdNameResponse {
    id: number;
    name: string;
}

export interface RegisteredCarDto {
    id: number;
    createdDate: string;
    color: string;
    plate: string;
    price: number;
    brand: IdNameResponse;
    model: IdNameResponse;
    serviceType: IdNameResponse;
    status: CarStatus;
}

export interface RentalListingResponse {
    id: number;
    bannerUrl: string;
    model: string;
    yearOfManufacture: number;
    plate: string;
    customerName: string;
    avgRating: number;
    price: number;
    startDate: number;
    endDate: number;
}

export interface RentalDetailsResponse {
    id: number;
    model: string;
    startDate: number;
    endDate: number;
    avgRating: number;
    customerName: string;
    customerPhone: string;
    status: RentalStatus;
    distanceLimit: number;
    price: number;
    bannerUrl: string;
    createdDate: number;
}