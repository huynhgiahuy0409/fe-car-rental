
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