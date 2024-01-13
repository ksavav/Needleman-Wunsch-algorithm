export class Parser {
    jsonResponse: object | any

    constructor(response: object) {
        this.jsonResponse = response;
    }
    
    parseMatrixResponse() {
        var valuesArray: number[][] = [];
        var directionsArray: string[][] = [];

        Object.keys(this.jsonResponse).forEach((rowName) => {
            var row = this.jsonResponse[rowName]
            var rowValues: number[] = []
            var rowDirections: string[] = []

            Object.keys(row).forEach((cellName) => {
                var cell = row[cellName];
                rowValues.push(cell.value);
                rowDirections.push(cell.direction);
            });

            valuesArray.push(rowValues);
            directionsArray.push(rowDirections);
        })

        return [valuesArray, directionsArray];
    }

    parseResultsResponse() {

        // parse result response
    }
}