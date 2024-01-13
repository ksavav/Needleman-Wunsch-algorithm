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
      seq1: ['AATCG', Validators.required],
      seq2: ['AACG', Validators.required],
      match: [2, Validators.required],
      mismatch: [-2, Validators.required],
      gap: [-1, Validators.required],
    });
  }

  onSubmit() {  
    this.sendDataToDataComponent.emit(this.form?.value)
  }
}
