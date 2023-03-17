import { CarFeatureElement, City } from "./model";
export const COMPLETE_STATUS = "Hoàn thành"
export const COMPLETE_MESSAGE = "Chuyến xe đã kết thúc"
export const SD_MODE = "SELF_DRIVING"
export const WD_MODE = "WITH_DRIVER"
export const ADDRESS_API = "/";
export const GET_DISTRICTS_BY_CITY = `${ADDRESS_API}districts-by-city`;
export const GET_WARDS_BY_DISTRICT = `${ADDRESS_API}wards-by-district`;
export const SEARCH_ADDRESS = "/search-address";

export const CAR_FEATURES: CarFeatureElement[] = [
    {
        id: "map",
        iconUrl: 'https://n1-cstg.mioto.vn/v4/p/m/icons/features/map.png',
        title: "Bản đồ"
    },
    {
        id: "bluetooth",
        iconUrl: 'https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth.png',
        title: "Bluetooth"
    },
    {
        id: "camera360",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera.png",
        title: "Camera 360"
    },
    {
        id: "parking-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera.png",
        title: "Camera cập lề"
    },
    {
        id: "dash-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera.png",
        title: "Camera hành trình"
    },
    {
        id: "reverse-camera",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera.png",
        title: "Camera lùi"
    },
    {
        id: "tpms",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/tpms.png",
        title: "Cảm biến áp suất lốp"
    },
    {
        id: "impact-sensor",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/impact_sensor.png",
        title: "Cảm biến va chạm"
    },
    {
        id: "head-up",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/head_up.png",
        title: "Cảnh báo tốc độ"
    },
    {
        id: "sunroof",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof.png",
        title: "Cửa sổ trời"
    },
    {
        id: "gps",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps.png",
        title: "Định vị GPS"
    },
    {
        id: "babyseat",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat.png",
        title: "Ghế trẻ em"
    },
    {
        id: "usb",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/usb.png",
        title: "Khe cắm USB"
    },
    {
        id: "spare-tire",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire.png",
        title: "Lốp dự phòng"
    },
    {
        id: "dvd",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd.png",
        title: "Màn hình DVD"
    },
    {
        id: "bonnet",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/bonnet.png",
        title: "Nắp thùng xe bán tải"
    },
    {
        id: "etc",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/etc.png",
        title: "Thu phí không dừng"
    },
    {
        id: "airbags",
        iconUrl: "https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags.png",
        title: "Túi khí an toàn"
    },
]

export const CITIES: City[] = [
    { areaCode: 89, name: "An Giang" },
    { areaCode: 77, name: "Bà Rịa - Vũng Tàu" },
    { areaCode: 24, name: "Bắc Giang" },
    { areaCode: 6, name: "Bắc Kạn" },
    { areaCode: 95, name: "Bạc Liêu" },
    { areaCode: 27, name: "Bắc Ninh" },
    { areaCode: 83, name: "Bến Tre" },
    { areaCode: 52, name: "Bình Định" },
    { areaCode: 74, name: "Bình Dương" },
    { areaCode: 70, name: "Bình Phước" },
    { areaCode: 60, name: "Bình Thuận" },
    { areaCode: 96, name: "Cà Mau" },
    { areaCode: 92, name: "Cần Thơ" },
    { areaCode: 4, name: "Cao Bằng" },
    { areaCode: 48, name: "Đà Nẵng" },
    { areaCode: 66, name: "Đắk Lắk" },
    { areaCode: 67, name: "Đắk Nông" },
    { areaCode: 11, name: "Điện Biên" },
    { areaCode: 75, name: "Đồng Nai" },
    { areaCode: 87, name: "Đồng Tháp" },
    { areaCode: 64, name: "Gia Lai" },
    { areaCode: 2, name: "Hà Giang" },
    { areaCode: 35, name: "Hà Nam" },
    { areaCode: 1, name: "Hà Nội" },
    { areaCode: 42, name: "Hà Tĩnh" },
    { areaCode: 30, name: "Hải Dương" },
    { areaCode: 31, name: "Hải Phòng" },
    { areaCode: 93, name: "Hậu Giang" },
    { areaCode: 79, name: "Hồ Chí Minh" },
    { areaCode: 17, name: "Hoà Bình" },
    { areaCode: 33, name: "Hưng Yên" },
    { areaCode: 56, name: "Khánh Hòa" },
    { areaCode: 91, name: "Kiên Giang" },
    { areaCode: 62, name: "Kon Tum" },
    { areaCode: 12, name: "Lai Châu" },
    { areaCode: 68, name: "Lâm Đồng" },
    { areaCode: 20, name: "Lạng Sơn" },
    { areaCode: 10, name: "Lào Cai" },
    { areaCode: 80, name: "Long An" },
    { areaCode: 36, name: "Nam Định" },
    { areaCode: 40, name: "Nghệ An" },
    { areaCode: 37, name: "Ninh Bình" },
    { areaCode: 58, name: "Ninh Thuận" },
    { areaCode: 25, name: "Phú Thọ" },
    { areaCode: 54, name: "Phú Yên" },
    { areaCode: 44, name: "Quảng Bình" },
    { areaCode: 49, name: "Quảng Nam" },
    { areaCode: 51, name: "Quảng Ngãi" },
    { areaCode: 22, name: "Quảng Ninh" },
    { areaCode: 45, name: "Quảng Trị" },
    { areaCode: 94, name: "Sóc Trăng" },
    { areaCode: 14, name: "Sơn La" },
    { areaCode: 72, name: "Tây Ninh" },
    { areaCode: 34, name: "Thái Bình" },
    { areaCode: 19, name: "Thái Nguyên" },
    { areaCode: 38, name: "Thanh Hóa" },
    { areaCode: 46, name: "Thừa Thiên Huế" },
    { areaCode: 82, name: "Tiền Giang" },
    { areaCode: 84, name: "Trà Vinh" },
    { areaCode: 8, name: "Tuyên Quang" },
    { areaCode: 86, name: "Vĩnh Long" },
    { areaCode: 26, name: "Vĩnh Phúc" },
    { areaCode: 15, name: "Yên Bái" }
];
