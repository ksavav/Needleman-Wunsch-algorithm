import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  
  form: FormGroup | any

  constructor(private fb: FormBuilder) { }

  @Output() sendDataToDataComponent = new EventEmitter()

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
    if (this.form?.valid) {
      this.sendDataToDataComponent.emit(this.form?.value)
    }
  }
}
