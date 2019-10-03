import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  // Defines the form modal.
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: '',
      lastName: {value: 'n/a', disabled: false},
      email: '',
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
      sendCatalog: false
    });
  }

}
