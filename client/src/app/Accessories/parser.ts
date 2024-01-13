export class Parser {
    jsonResponseMatrix: object | any
    jsonResponseResult: object | any

    constructor(matrix: object, result: object) {
        this.jsonResponseMatrix = matrix
        this.jsonResponseResult = result
    }
    
    parseMatrixResponse() {
        var valuesArray: number[][] = []
        var directionsArray: string[][] = []

        Object.keys(this.jsonResponseMatrix).forEach((rowName) => {
            var row = this.jsonResponseMatrix[rowName]
            var rowValues: number[] = []
            var rowDirections: string[] = []

            Object.keys(row).forEach((cellName) => {
                var cell = row[cellName]
                rowValues.push(cell.value)
                rowDirections.push(cell.direction)
            });

            valuesArray.push(rowValues)
            directionsArray.push(rowDirections)
        })

        return [valuesArray, directionsArray]
    }

    parseResultsResponse() {
        var scores: number[] = []
        var sequencesArrays: string[][][] = [];

        
        Object.keys(this.jsonResponseResult).forEach((resultName) => {
            var result = this.jsonResponseResult[resultName];
            scores.push(result.score);
            sequencesArrays.push([[...result.seq1], [...result.seq2]]);
        });

        return [scores, sequencesArrays]
    }
}