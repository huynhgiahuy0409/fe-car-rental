import { OAuthProvider } from "../enum"

export interface SignUpRequest {
    username: string,
    password: string,
    fullName: string,
    phone: string
}
export interface SignInRequest {
    username: string,
    password: string,
}
export interface ForgetPasswordRequest {
    username: string,
    newPassword: string,
}
export interface SocialUserRequest {
    email: string,
    firstName?: string,
    lastName?: string,
    name: string,
    photoUrl: string,
    provider: OAuthProvider,
    id: string
}
export interface UpdatedUserRequest {
    fullName: string,
    gender: string,
    dob: Date,
    phone: string,
}
export interface NewPromoRequest {
    title: string,
    content: string,
    quantity: number,
    discountPercent: number,
    maxPrice: number,
    startDate: Date,
    endDate: Date
}

export interface ExtraFeeRequest {
    name: string;
    limit: number;
    unit: string;
    fee: number;
}

export interface CarRegisterRequest {
    username: string;
    plate: string;
    modelId: number;
    brandId: number;
    seats: number;
    color: string;
    fuel: string;
    fuelConsumption: number;
    transmission: string;
    rentalStatus: string;
    description: string;
    yearOfManufacture: number;
    featureList: number[];
    defaultPrice: number; //unit_price
    discountByWeek: number;
    discountByMonth: number;
    isFastRent: boolean;
    addressName: string;//
    extraFees: ExtraFeeRequest[]; //over distance limit fee,delivery fee,....
    serviceTypeId: number;//wd;self-drive
    policies: string;
    imagesList: string[];
}