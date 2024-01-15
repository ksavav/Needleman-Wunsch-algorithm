from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
from algorithm import Algorithm
from jsonResponse import JsonResponse
import copy

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/data": {"origins": "http://localhost:5000"}})

CORS(app)

@app.route('/data', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def data():
    MAX_LENGTH = 20

    data = request.json

    mismatch = int(data['mismatch'])
    match = int(data['match'])
    gap = int(data['gap'])
    seq1 = str(data['seq1']).upper()
    seq2 = str(data['seq2']).upper()

    needle = Algorithm(match, mismatch, gap, seq1, seq2)

    if len(needle.seq1) > MAX_LENGTH or len(needle.seq2) > MAX_LENGTH:
        return Response(
            "Maximum length of a sequence is 20",
            status=400
        )
    
    row_length = len(needle.seq1) + 1
    column_length = len(needle.seq2) + 1
    
    m = needle.init_matrix(row_length, column_length)
    matrix = needle.fill_matrix(m, row_length, column_length)

    needle.find_path(matrix, row_length - 1, column_length - 1, needle.x)
    directions = copy.deepcopy(needle.x)
    final_results = []

    for i in range(len(needle.x)):
        seq1_final, seq2_final = needle.find_seq(needle.x[i])
        score = needle.calculate_score(seq1_final, seq2_final)
        final_results.append([score, [seq1_final, seq2_final]])

    # best_pick = max(final_results, key=lambda x: x[0])

    to_json = JsonResponse(matrix, final_results, directions)
    response = to_json.workflow()
    response = jsonify(response)

    return response

if __name__ == '__main__':
    app.run(debug=True)