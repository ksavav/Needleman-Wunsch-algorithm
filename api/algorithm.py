import copy

# const values
GAP_S = '-'

# global variables 

class Algorithm:
    def __init__(self, match, mismatch, gap, seq1, seq2):
        self.match = match
        self.mismatch = mismatch
        self.gap = gap
        self.seq1 = seq1 #= 'AATCG' # column
        self.seq2 = seq2 #= 'AACG' # row
        self.options = [0]
        self.x = [[0]]

    # initialize matrix
    def init_matrix(self, row_length, column_length):
        matrix = [ [0] * column_length for i in range(row_length)]
        for i in range(row_length):
            if i == 0:
                for j in range(column_length):
                    if j == 0:
                         matrix[i][j] = ['null', 0]
                    else:
                        matrix[i][j] = ['left', matrix[i][j - 1][1] + self.gap]
            else:
                matrix[i][0] = ['top', matrix[i - 1][0][1] + self.gap]
        return matrix

    # fill matrix according to the algorithm
    def fill_matrix(self, matrix, row_length, column_length):
        for i in range(1, row_length):
            for j in range(1, column_length):
                all_options = []

                # T(i-1, j-1)
                all_options.append(self.check_top_left(i, j, matrix))
                # T(i-1, j)
                all_options.append(self.check_top(i, j, matrix))
                # T(i, j-1)
                all_options.append(self.check_left(i, j, matrix))

                max_val = max(all_options, key=lambda x: x[1])

                # check if there is more than 1 max value
                k = [item[1] for item in all_options if isinstance(item[1], int)]
                max_id = [i for i, j in enumerate(k) if j == max_val[1]]

                if len(max_id) > 1:
                    direction = ''
                    for z in range(len(max_id)):
                        if z == 0:
                            direction += all_options[max_id[z]][0]
                        else:
                            direction += '+' + all_options[max_id[z]][0]
                    matrix[i][j] = [direction, max_val[1]]
                else:
                    matrix[i][j] = max_val
        return matrix

    # find all possible paths 
    def find_path(self, matrix, row_pos, col_pos, x, option=0):
        if row_pos != 0 or col_pos != 0:
            if row_pos == len(self.seq1) and col_pos == len(self.seq2):
                x[option][0] = [[row_pos, col_pos], matrix[row_pos][col_pos][1]]
            if '+' in matrix[row_pos][col_pos][0]:
                direction = matrix[row_pos][col_pos][0].split('+')
                for i in range(1, len(direction)):
                    x.append(copy.deepcopy(x[option]))
                    temp_matrix = copy.deepcopy(matrix)
                    temp_matrix[row_pos][col_pos][0] = direction[i]

                    temp_option = option + i
                    while temp_option in self.options:
                        temp_option += 1

                    self.options.append(temp_option)
                    self.find_path(temp_matrix, row_pos, col_pos, x, temp_option)

                matrix[row_pos][col_pos][0] = direction[0]
                self.find_path(matrix, row_pos, col_pos, x, option)
            else:
                direction = matrix[row_pos][col_pos][0]
                row_pos, col_pos = self.make_move(direction, row_pos, col_pos)
                x[option].append([[row_pos, col_pos], matrix[row_pos][col_pos][1]])
                self.find_path(matrix, row_pos, col_pos, x, option)


    def make_move(self, direction, row_pos, col_pos):
        match direction:
            case 'top_left':
                row_pos -= 1
                col_pos -= 1
            case 'top':
                row_pos -= 1
            case 'left':
                col_pos -= 1
        return row_pos, col_pos


    def check_top_left(self, i, j, matrix):
        if self.seq1[i - 1] == self.seq2[j - 1]:
            return ['top_left', matrix[i - 1][j - 1][1] + self.match]
        else:
            return ['top_left', matrix[i - 1][j - 1][1] + self.mismatch]


    def check_top(self, i, j, matrix):
        return ['top', matrix[i - 1][j][1] + self.gap]


    def check_left(self, i, j, matrix):
        return ['left', matrix[i][j - 1][1] + self.gap]

    # create sequence based on the paths 
    def find_seq(self, x):
        reverse_matrix = copy.deepcopy(x)

        final_seq1 = []
        final_seq2 = []

        reverse_matrix = [item[0] for item in reverse_matrix if item[0]]
        reverse_matrix.reverse()

        previous_cell = []
        for i in reverse_matrix:
            if i == [0, 0]:
                previous_cell = i
                continue

            diff = [previous_cell[0] - i[0], previous_cell[1] - i[1]]
            if (diff[0] == -1 and diff[1] == 0) or i[0] - 1 == -1:
                final_seq1.append(self.seq1[i[0] - 1])
                final_seq2.append(GAP_S)
                previous_cell = i
            elif (diff[0] == 0 and diff[1] == -1) or i[1] - 1 == -1:
                final_seq1.append(GAP_S)
                final_seq2.append(self.seq2[i[1] - 1])
                previous_cell = i
            else:
                final_seq1.append(self.seq1[i[0] - 1])
                final_seq2.append(self.seq2[i[1] - 1])
                previous_cell = i

        return final_seq1, final_seq2

    # calculate score of each path
    def calculate_score(self, s1, s2):
        score = 0
        for i in range(len(s1)):
            if s1[i] == s2[i]:
                score += self.match
            elif s1[i] == GAP_S or s2[i] == GAP_S:
                score += self.gap
            else:
                score += self.mismatch
        return score


if __name__ == '__main__':
    needle = Algorithm(2, -2, -1, 'AAsdfTCsdfG', 'sdfAAsfCG')
    row_length = len(needle.seq1) + 1
    column_length = len(needle.seq2) + 1
  
    m = needle.init_matrix(row_length, column_length)
    result = needle.fill_matrix(m, row_length, column_length)
    print('Filled matrix: ')
    for i in result:
        print(i)
    needle.find_path(result, row_length - 1, column_length - 1, needle.x)
    final_results = []
    for i in range(len(needle.x)):
        print(f'\noption {i}:')
        seq1_final, seq2_final = needle.find_seq(needle.x[i])
        score = needle.calculate_score(seq1_final, seq2_final)
        final_results.append([score, [seq1_final, seq2_final]])
        print(seq1_final, seq2_final)
        print(f'Score = {score}')
    best_pick = max(final_results, key=lambda x: x[0])
    print('One of the best paths: \n')
    print(f'{best_pick[1][0]}\n{best_pick[1][1]}\nScore = {best_pick[0]}')
    print(final_results)