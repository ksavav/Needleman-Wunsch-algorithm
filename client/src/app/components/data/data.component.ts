import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Parser } from "src/app/Accessories/parser"; 

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
        this.readResponse(response.matrix)
      },
      error => {
        console.error(error.error)
      }
    )
  }

  readResponse(response: object): void {
    var parser = new Parser(response)
    var [valuesArray, directionsArray] = parser.parseMatrixResponse()
    // var [scores, results] = parser.parseResultsResponse()

    console.log(valuesArray)
    console.log(directionsArray)
  }
}
