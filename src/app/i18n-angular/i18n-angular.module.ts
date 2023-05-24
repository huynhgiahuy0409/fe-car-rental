import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { I18NEXT_SERVICE, I18NextModule, I18NextTitle, ITranslationService } from 'angular-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use(HttpApi)
      .use(I18nextBrowserLanguageDetector)
      .init({
        // @ts-ignore
        whitelist: ['en', 'vi'],
        fallbackLng: 'vi',
        debug: true,
        returnEmptyString: false,
        ns: [
          '_languages'
        ],
        defaultNS: '_languages',
        interpolation: {
          // format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
          format: (value, format, locale) => {
            // Customize the currency formatting based on the locale and format
            if (format === 'currency') {
              return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'VND'
              }).format(value);
            }
            return value;
          }
        },
        keySeparator: false,
        nsSeparator: false,
        backend: {
          loadPath: '/assets/locales/{{ns}}.{{lng}}.json',
          // loadPath: 'assets/locales/{{lng}}.json',
        },
        // lang detection plugin options
        detection: {
          // order and from where user language should be detected
          order: ['querystring', 'cookie'],
          // keys or params to lookup language from
          lookupCookie: 'lang',
          lookupQuerystring: 'lng',
          // cache user language on
          caches: ['localStorage', 'cookie'],
          // optional expire and domain for set cookie
          cookieMinutes: 10080, // 7 days
        }
      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}
export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: Title,
    useClass: I18NextTitle
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ]
})
export class I18nAngularModule { }
