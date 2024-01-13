import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-displaymatrix',
  templateUrl: './displaymatrix.component.html',
  styleUrls: ['./displaymatrix.component.css']
})
export class DisplaymatrixComponent {
  allData: object | any

  constructor() {}

  xd () {
    console.log(this.allData)
  }
}
