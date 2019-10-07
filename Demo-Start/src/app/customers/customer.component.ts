import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';


// Factory function with a custom validator.
function ratingRange(min: number, max: number): ValidatorFn {
  return ( c: AbstractControl): { [ key: string ]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return  { range : true };
    }
    return null;
  };
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  // Defines the form modal.
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }

  populateTestData(): void {
    // this.customerForm.setValue({
    //   firstName: 'rishi',
    //   lastName: 'abee',
    //   email: 'rishi@ab.ee',
    //   sendCatalog: false
    // });

    this.customerForm.patchValue({
      firstName: 'rishi',
      lastName: 'abee',
      email: 'toto@toto.com',
      sendCatalog: false
    });
  }

  setNotification(type: string) {
    const phoneControl = this.customerForm.get('phone');
    if (type === 'text') {
      phoneControl.setValidators([Validators.required]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
