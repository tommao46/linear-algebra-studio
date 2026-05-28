var MatrixOps = (function() {
    function createMatrix(rows, cols, defaultValue) {
        if (defaultValue === undefined) defaultValue = 0;
        return Array(rows).fill(null).map(function() {
            return Array(cols).fill(defaultValue);
        });
    }

    function matrixAdd(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
            throw new Error('矩阵维度不匹配，无法相加');
        }
        var result = createMatrix(A.length, A[0].length);
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[0].length; j++) {
                result[i][j] = A[i][j] + B[i][j];
            }
        }
        return result;
    }

    function matrixSubtract(A, B) {
        if (A.length !== B.length || A[0].length !== B[0].length) {
            throw new Error('矩阵维度不匹配，无法相减');
        }
        var result = createMatrix(A.length, A[0].length);
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[0].length; j++) {
                result[i][j] = A[i][j] - B[i][j];
            }
        }
        return result;
    }

    function matrixMultiply(A, B) {
        var rowsA = A.length;
        var colsA = A[0].length;
        var rowsB = B.length;
        var colsB = B[0].length;
        if (colsA !== rowsB) {
            throw new Error('矩阵维度不匹配，无法相乘');
        }
        var result = createMatrix(rowsA, colsB);
        for (var i = 0; i < rowsA; i++) {
            for (var j = 0; j < colsB; j++) {
                var sum = 0;
                for (var k = 0; k < colsA; k++) {
                    sum += A[i][k] * B[k][j];
                }
                result[i][j] = parseFloat(sum.toFixed(4));
            }
        }
        return result;
    }

    function matrixTranspose(A) {
        var rows = A.length;
        var cols = A[0].length;
        var result = createMatrix(cols, rows);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                result[j][i] = A[i][j];
            }
        }
        return result;
    }

    function matrixScalarMultiply(A, scalar) {
        var result = createMatrix(A.length, A[0].length);
        for (var i = 0; i < A.length; i++) {
            for (var j = 0; j < A[0].length; j++) {
                result[i][j] = A[i][j] * scalar;
            }
        }
        return result;
    }

    function getMinor(A, row, col) {
        return A.filter(function(_, i) {
            return i !== row;
        }).map(function(row) {
            return row.filter(function(_, j) {
                return j !== col;
            });
        });
    }

    function matrixDeterminant(A) {
        var n = A.length;
        if (n !== A[0].length) {
            throw new Error('必须是方阵才能计算行列式');
        }
        if (n === 1) return A[0][0];
        if (n === 2) {
            return A[0][0] * A[1][1] - A[0][1] * A[1][0];
        }
        var det = 0;
        for (var j = 0; j < n; j++) {
            var sign = j % 2 === 0 ? 1 : -1;
            var minor = getMinor(A, 0, j);
            det += sign * A[0][j] * matrixDeterminant(minor);
        }
        return parseFloat(det.toFixed(4));
    }

    function matrixCofactor(A) {
        var n = A.length;
        var result = createMatrix(n, n);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                var minor = getMinor(A, i, j);
                var sign = (i + j) % 2 === 0 ? 1 : -1;
                result[i][j] = sign * matrixDeterminant(minor);
            }
        }
        return result;
    }

    function matrixAdjugate(A) {
        return matrixTranspose(matrixCofactor(A));
    }

    function matrixInverse(A) {
        var det = matrixDeterminant(A);
        if (Math.abs(det) < 1e-10) {
            throw new Error('矩阵不可逆（行列式为0）');
        }
        var adj = matrixAdjugate(A);
        return matrixScalarMultiply(adj, 1 / det);
    }

    function matrixTrace(A) {
        var n = A.length;
        var trace = 0;
        for (var i = 0; i < n; i++) {
            trace += A[i][i];
        }
        return trace;
    }

    function gaussianElimination(A) {
        var matrix = A.map(function(row) {
            return row.slice();
        });
        var rows = matrix.length;
        var cols = matrix[0].length;
        for (var pivot = 0; pivot < Math.min(rows, cols); pivot++) {
            var maxRow = pivot;
            for (var i = pivot + 1; i < rows; i++) {
                if (Math.abs(matrix[i][pivot]) > Math.abs(matrix[maxRow][pivot])) {
                    maxRow = i;
                }
            }
            if (maxRow !== pivot) {
                var temp = matrix[pivot];
                matrix[pivot] = matrix[maxRow];
                matrix[maxRow] = temp;
            }
            if (Math.abs(matrix[pivot][pivot]) < 1e-10) continue;
            var pivotValue = matrix[pivot][pivot];
            for (var j = pivot; j < cols; j++) {
                matrix[pivot][j] /= pivotValue;
            }
            for (var i2 = 0; i2 < rows; i2++) {
                if (i2 !== pivot && Math.abs(matrix[i2][pivot]) > 1e-10) {
                    var factor = matrix[i2][pivot];
                    for (var j2 = pivot; j2 < cols; j2++) {
                        matrix[i2][j2] -= factor * matrix[pivot][j2];
                    }
                }
            }
        }
        return matrix.map(function(row) {
            return row.map(function(val) {
                return parseFloat(val.toFixed(4));
            });
        });
    }

    function matrixRank(A) {
        var reduced = gaussianElimination(A);
        var rank = 0;
        for (var i = 0; i < reduced.length; i++) {
            var hasNonZero = false;
            for (var j = 0; j < reduced[0].length; j++) {
                if (Math.abs(reduced[i][j]) > 1e-10) {
                    hasNonZero = true;
                    break;
                }
            }
            if (hasNonZero) rank++;
        }
        return rank;
    }

    function apply2DTransform(point, matrix) {
        var x = point[0];
        var y = point[1];
        var m = matrix;
        var newX = m[0][0] * x + m[0][1] * y;
        var newY = m[1][0] * x + m[1][1] * y;
        return [newX, newY];
    }

    function createRotationMatrix(angle) {
        var rad = angle * Math.PI / 180;
        return [
            [Math.cos(rad), -Math.sin(rad)],
            [Math.sin(rad), Math.cos(rad)]
        ];
    }

    function createScaleMatrix(sx, sy) {
        return [
            [sx, 0],
            [0, sy]
        ];
    }

    function createShearMatrix(hx, hy) {
        return [
            [1, hx],
            [hy, 1]
        ];
    }

    return {
        createMatrix: createMatrix,
        matrixAdd: matrixAdd,
        matrixSubtract: matrixSubtract,
        matrixMultiply: matrixMultiply,
        matrixTranspose: matrixTranspose,
        matrixScalarMultiply: matrixScalarMultiply,
        matrixDeterminant: matrixDeterminant,
        matrixCofactor: matrixCofactor,
        matrixAdjugate: matrixAdjugate,
        matrixInverse: matrixInverse,
        matrixTrace: matrixTrace,
        gaussianElimination: gaussianElimination,
        matrixRank: matrixRank,
        apply2DTransform: apply2DTransform,
        createRotationMatrix: createRotationMatrix,
        createScaleMatrix: createScaleMatrix,
        createShearMatrix: createShearMatrix
    };
})();
