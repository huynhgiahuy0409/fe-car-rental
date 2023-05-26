import { Component } from '@angular/core';
import { I18NextService } from 'angular-i18next';
import { RedirectInfo } from 'src/app/models/model';


@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss']
})
export class CustomerFooterComponent {
  constructor(private i18nextService: I18NextService) {
  }
  policies: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.introduction')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.termsAndConditions')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.operationsRules')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.security')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.disputeResolution')?.toString() || "",
      path: ''
    },
  ]
  infoMores: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.generalManual')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.bookingGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.ownerGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.paymentGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.career')?.toString() || "",
      path: ''
    },
  ]
  partners: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.registerOwner')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.insuranceRegister')?.toString() || "",
      path: ''
    },
  ]

}
