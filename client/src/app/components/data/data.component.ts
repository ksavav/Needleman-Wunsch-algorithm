import { Component, Input, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Parser } from "src/app/Accessories/parser"; 
import { DisplaymatrixComponent } from '../displaymatrix/displaymatrix.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  @ViewChild(DisplaymatrixComponent) dataPasser: DisplaymatrixComponent | any
  
  result: string | undefined
  passAllData: object | undefined

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
        //this.result = response.result
        console.log(response)
        var parsedResponse = this.readResponse(response.matrix, response.results)
        this.passData(parsedResponse)
      },
      error => {
        console.error(error.error)
      }
    )
  }

  readResponse(matrix: object, results: object): object {
    var parser = new Parser(matrix, results)
    var [valuesArray, directionsArray] = parser.parseMatrixResponse()
    var [scores, sequesnces] = parser.parseResultsResponse()

    console.log(valuesArray)
    console.log(directionsArray)
    console.log(scores)
    console.log(sequesnces)

    return [valuesArray, directionsArray, scores, sequesnces]
  }

  passData(parsedResponse: object): void {
    if(this.dataPasser) {
      this.dataPasser.allData = parsedResponse
    }
  }
}
