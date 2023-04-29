import { GENDER, OAuthProvider, StandardStatus } from "./enum"

export interface RedirectInfo {
    label: string,
    path: string
}

export interface TimeFormat {
    hour: number,
    minute: number
}

export interface CarFeatureElement {
    id: string,
    iconUrl: string,
    title: string
}

export interface City {
    areaCode: number,
    name: string
}

export interface Color {
    value: string;
    name: string;
}

export interface AddressField {
    id: number,
    name: string
}
export interface DistrictAddressResponse {
    data: { districts: AddressField[] }
    error: number,
    errorMessage: string;
}

export interface WardsAddressResponse {
    data: { wards: AddressField[] }
    error: number,
    errorMessage: string;
}

export interface Location {
    id: number,
    address: string,
    lat: number,
    lon: number,
    name: string,
    subId: string,
    type: number
}

export interface LocationResponse {
    data: { locations: Location[] },
    error: number,
    errorMessage: string
}
// DTO

export interface UserDTO {
    id: number,
    username: string,
    email: string,
    dob: Date,
    gender: string,
    fullName: string,
    phone: string,
    provider: OAuthProvider,
    createdDate: string
}
export interface JWTDTO {
    token: string,
    tokenExpirationDate: Date
}
export interface PromoDTO {
    id: number,
    title: string,
    contents: string[],
    quantity: number,
    status: StandardStatus,
    discountPercent: number,
    maxPrice: number,
    startDate: Date,
    endDate: Date
}
export interface CarDTO{
    name: string
    plate: string,
    description: string,
    yearOfManufacture: number,
    seats: number,
    color: string,
    engine: string,
    fuelConsumption: number,
    transmission: string,
    rentalStatus: string,
    policies: string,
    isFastRent: string,
    brand: string,
    model: string,
    owner: UserDTO,
    features: FeatureDTO[],
    carImages: CarImageDTO[]
}
export interface FeatureDTO{
    name: string,
    iconFilename: string
}
export interface CarModelDTO{
    name: string,
    type: string
}
export interface CarImageDTO{
    imageUrl: string,
    status: string
    isThumbnail: boolean
}