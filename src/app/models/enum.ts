export enum OTPType {
  REGISTER = 'REGISTER',
  FORGET_PASSWORD = 'FORGET_PASSWORD',
}
export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  APPLICATION = 'APPLICATION',
}
export enum GENDER {
  MALE,
  FEMALE,
}
export enum StandardStatus {
  ACTIVATED,
  UNACTIVATED,
}

export enum ServiceType {
  SELF_DRIVING = 1,
  WITH_DRIVER_DOMESTIC,
  WITH_DRIVER_INTERSTATE
}

export enum RentalStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  BUSY = 'BUSY',
  RENTED = 'RENTED',
}