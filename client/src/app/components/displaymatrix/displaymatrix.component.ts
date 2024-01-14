import { Component, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-displaymatrix',
  templateUrl: './displaymatrix.component.html',
  styleUrls: ['./displaymatrix.component.css']
})
export class DisplaymatrixComponent {
  @Input() changes: any

  valuesArray: object | any
  directionsArray: object | any
  scores: object | any
  sequesnces: object | any
  path: object | any
  seq1: object | any
  seq2: object | any
  bgColor: string[][] = []
  seqColor: string[] = []
  seq_count: number = 0

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.colorTable()
    this.colorSeq()
  }

  colorTable(): void {
    const bg_color = '#212529'
    this.bgColor = []
    this.valuesArray?.forEach((row: any) => {
      var temp_row: string[] = []
      row.forEach((cell: any) => {
        temp_row.push(bg_color)
      })
      this.bgColor.push(temp_row)
    })
  }

  colorSeq(): void {
    const bg_color = '#212529'
    this.seqColor = []
    this.seq_count = 0
    this.sequesnces?.forEach((row: any) => {
      this.seqColor.push(bg_color)
      this.seq_count += 1
    })
  }

  showPath(seq_number: number): void {
    const selected_color = '#0492c2'
    this.colorTable()
    this.colorSeq()
    var selceted_path = this.path[seq_number]
    
    selceted_path.forEach((value: any) => {
      this.bgColor[value[0][0]][value[0][1]] = selected_color
    })

    this.seqColor[seq_number] = selected_color
  }
}
