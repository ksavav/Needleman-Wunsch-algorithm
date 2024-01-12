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

  sendData(): void {
    const data = { 
      mismatch: '-2',
      match: '2',
      gap: '-1',
      seq1: 'AATCG',
      seq2: 'AACG'
     };

    this.apiService.data(data).subscribe(
      response => {
        this.result = response.result
        console.log(response.matrix)
        console.log(response)
      },
      error => {
        console.error(error.error)
      }
    )
  }
}
