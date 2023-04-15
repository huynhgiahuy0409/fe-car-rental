import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss']
})
export class OtpValidationComponent {
  otpForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.otpForm = this.formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required]
    });
  }

  
  onPaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, i) => {
        input.value = pastedData[i]        
      });
    }
  }
}
