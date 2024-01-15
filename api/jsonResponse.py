from flask import jsonify

class JsonResponse:
    def __init__(self, matrix, results, path):
        self.matrix = matrix
        self.results = results
        self.path = path

    def parse_matrix_to_json(self):
        ltd = {}
        row_counter = 0
        for row in self.matrix:
            cell_counter = 0
            ltd[f'row-{row_counter}'] = {}

            for cell in row:
                ltd[f'row-{row_counter}'][f'cell{cell_counter}'] = {
                    "direction": cell[0],
                    "value": cell[1]
                }
                if cell_counter == 9:
                    cell_counter += 81
                cell_counter += 1
            if row_counter == 9:
                row_counter += 81
            row_counter += 1
        
        return ltd


    def parse_results_to_json(self):
        ltd = {}
        row_counter = 0
        for row in self.results:
            ltd[f'result{row_counter}'] = {
                'score': row[0],
                'seq1': row[1][0],
                'seq2': row[1][1],
                'path': self.path[row_counter]
            }
            row_counter += 1

        return ltd


    def result_list_to_dict(self, row):
        ls = []

        

    def workflow(self):
        response = {
            'matrix': self.parse_matrix_to_json(),
            'results': self.parse_results_to_json()
        }
        
        return response