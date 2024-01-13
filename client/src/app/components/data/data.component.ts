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
  seq1: object | any
  seq2: object | any

  constructor(private apiService: ApiService) {}

  getDataFromForm(values: any): void {
    var data = { 
      mismatch: values.mismatch,
      match: values.match,
      gap: values.gap,
      seq1: values.seq1,
      seq2: values.seq2
    };

    this.seq1 = [...values.seq1]
    this.seq2 = [...values.seq2]

    this.sendData(data)
  }

  sendData(data: any): void {
    this.apiService.data(data).subscribe(
      response => {
        this.readResponse(response.matrix, response.results)
      },
      error => {
        console.error(error.error)
      }
    )
  }

  readResponse(matrix: object, results: object): void {
    var parser = new Parser(matrix, results)
    var [valuesArray, directionsArray] = parser.parseMatrixResponse()
    var [scores, sequesnces] = parser.parseResultsResponse()
    console.log(sequesnces)
    this.passData(valuesArray, directionsArray, scores, sequesnces)
    // return [valuesArray, directionsArray, scores, sequesnces]
  }

  passData(valuesArray: object, directionsArray: object, scores: object, sequesnces: object): void {
    if(this.dataPasser) {
      this.dataPasser.valuesArray = valuesArray
      this.dataPasser.directionsArray = directionsArray
      this.dataPasser.scores = scores
      this.dataPasser.sequesnces = sequesnces
      this.dataPasser.seq1 = this.seq1
      this.dataPasser.seq2 = this.seq2
    }
  }
}
