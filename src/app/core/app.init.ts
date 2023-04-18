import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../customer/services/auth.service';
import { delay, of, tap } from 'rxjs';
import { UserService } from '../customer/services/user.service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';

export function appInitializer(
    authService: AuthService,
    cookieService: CookieService,
    userService: UserService,
    progressSpinnerService: ProgressSpinnerService
) {
    return () => {
        const haveToken: boolean = cookieService.check('refresh-token');
        if (haveToken) {
            progressSpinnerService.next(true);
            const refreshToken = cookieService.get('refresh-token');
            return authService
                .refreshAccessToken(refreshToken)
                .pipe(
                    delay(500),
                    tap((authenticationResponse) => {
                        progressSpinnerService.next(false);
                        const { data, statusCode } = authenticationResponse;
                        if (statusCode === 200) {
                            userService.nextUser(data.user);
                            authService.nexAccessToken(data.accessToken);
                            authService.storeRefreshToken(data.refreshToken);
                        } else {
                            alert('Hết phiên');
                        }
                    })
                )
                .subscribe();
        } else {
            return of(null);
        }
    };
}
