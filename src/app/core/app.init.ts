import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../customer/services/auth.service";
import { of, tap } from "rxjs";
import { UserService } from "../customer/services/user.service";

export function appInitializer(
    authService: AuthService,
    cookieService: CookieService,
    userService: UserService
) {
    return () => {
        const haveToken: boolean = cookieService.check('refresh-token');
        if (haveToken) {
            const refreshToken = cookieService.get('refresh-token')
            return authService.refreshAccessToken(refreshToken).pipe(tap(authenticationResponse => {
                console.log(authenticationResponse);
                const {data, statusCode} = authenticationResponse
                if(statusCode === 200){
                   userService.nextUser(data.user)
                   authService.nexAccessToken(data.accessToken)
                   authService.storeRefreshToken(data.refreshToken)
                }else{
                    alert("Hết phiên")
                }
            })).subscribe()
        } else {
            return of(null);
        }
    };
}
