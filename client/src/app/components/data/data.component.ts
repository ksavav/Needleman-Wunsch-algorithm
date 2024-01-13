import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  result: string | undefined

  constructor(private apiService: ApiService) {}

  getDataFromForm(values: any): void {
    var data = { 
      mismatch: values.mismatch,
      match: values.match,
      gap: values.gap,
      seq1: values.seq1,
      seq2: values.seq2
    };

    this.sendData(data)
  }

  sendData(data: any): void {
    this.apiService.data(data).subscribe(
      response => {
        this.result = response.result
        console.log(response)
      },
      error => {
        console.error(error.error)
      }
    )
  }
}
