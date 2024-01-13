import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  form: FormGroup | any

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      seq1: ['', Validators.required],
      seq2: ['', Validators.required],
      match: [null, Validators.required],
      mismatch: [null, Validators.required],
      gap: [null, Validators.required],
    });
  }

  onSubmit() {  
    console.log(this.form?.value);
  }
}
