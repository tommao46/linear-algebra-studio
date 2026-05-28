var CalculatorPage = (function() {
    var state = {
        matrixARows: 3,
        matrixACols: 3,
        matrixBRows: 3,
        matrixBCols: 3,
        matrixA: [],
        matrixB: [],
        result: null,
        steps: []
    };

    function render(container) {
        initMatrices();
        
        var options12345 = '';
        for (var n = 1; n <= 5; n++) {
            options12345 += '<option value="' + n + '"' + (n === 3 ? 'selected' : '') + '>' + n + '</option>';
        }
        
        container.innerHTML = '' +
            '<div class="calculator-page page-transition">' +
                '<h2 class="section-title" style="margin-bottom: 2rem;">矩阵 <span>计算器</span></h2>' +
                '<div class="calculator-container">' +
                    '<div class="calculator-section">' +
                        '<h3 class="calculator-title">矩阵 A</h3>' +
                        '<div class="dimension-selector"><span class="dimension-label">行数:</span><select class="dimension-select" id="a-rows">' + options12345 + '</select><span class="dimension-label" style="margin-left: 1rem;">列数:</span><select class="dimension-select" id="a-cols">' + options12345 + '</select></div>' +
                        '<div id="matrix-a-grid" class="matrix-grid responsive-matrix"></div>' +
                    '</div>' +
                    '<div class="calculator-section">' +
                        '<h3 class="calculator-title">矩阵 B</h3>' +
                        '<div class="dimension-selector"><span class="dimension-label">行数:</span><select class="dimension-select" id="b-rows">' + options12345 + '</select><span class="dimension-label" style="margin-left: 1rem;">列数:</span><select class="dimension-select" id="b-cols">' + options12345 + '</select></div>' +
                        '<div id="matrix-b-grid" class="matrix-grid responsive-matrix"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="calculator-section" style="margin-top: 2rem;">' +
                    '<div class="operation-buttons">' +
                        '<button class="operation-btn" data-op="add">A + B</button>' +
                        '<button class="operation-btn" data-op="subtract">A - B</button>' +
                        '<button class="operation-btn" data-op="multiply">A × B</button>' +
                        '<button class="operation-btn" data-op="transposeA">A转置</button>' +
                        '<button class="operation-btn" data-op="transposeB">B转置</button>' +
                        '<button class="operation-btn" data-op="detA">det(A)</button>' +
                        '<button class="operation-btn" data-op="detB">det(B)</button>' +
                        '<button class="operation-btn" data-op="inverseA">A逆</button>' +
                        '<button class="operation-btn" data-op="inverseB">B逆</button>' +
                        '<button class="operation-btn" data-op="rankA">rank(A)</button>' +
                        '<button class="operation-btn" data-op="rankB">rank(B)</button>' +
                    '</div>' +
                '</div>' +
                '<div class="result-section" style="margin-top: 2rem;">' +
                    '<h3 class="result-label">计算结果</h3>' +
                    '<div class="result-display" id="result-display"><span style="color: #666;">点击上方按钮开始计算</span></div>' +
                    '<div class="step-by-step" id="steps-container" style="display: none;"><h4 class="control-label" style="margin-bottom: 1rem;">计算步骤</h4><div id="steps-list"></div></div>' +
                '</div>' +
            '</div>';
        
        initEventListeners();
        renderMatrices();
    }

    function initMatrices() {
        state.matrixA = MatrixOps.createMatrix(state.matrixARows, state.matrixACols, 0);
        state.matrixB = MatrixOps.createMatrix(state.matrixBRows, state.matrixBCols, 0);
        
        for (var i = 0; i < state.matrixARows; i++) {
            for (var j = 0; j < state.matrixACols; j++) {
                state.matrixA[i][j] = i * state.matrixACols + j + 1;
            }
        }
        for (var k = 0; k < state.matrixBRows; k++) {
            for (var l = 0; l < state.matrixBCols; l++) {
                state.matrixB[k][l] = (k * state.matrixBCols + l + 1) * 2;
            }
        }
    }

    function initEventListeners() {
        var aRows = document.getElementById('a-rows');
        var aCols = document.getElementById('a-cols');
        var bRows = document.getElementById('b-rows');
        var bCols = document.getElementById('b-cols');
        
        if (aRows) aRows.addEventListener('change', function(e) {
            state.matrixARows = parseInt(e.target.value);
            initMatrices();
            renderMatrices();
        });
        if (aCols) aCols.addEventListener('change', function(e) {
            state.matrixACols = parseInt(e.target.value);
            initMatrices();
            renderMatrices();
        });
        if (bRows) bRows.addEventListener('change', function(e) {
            state.matrixBRows = parseInt(e.target.value);
            initMatrices();
            renderMatrices();
        });
        if (bCols) bCols.addEventListener('change', function(e) {
            state.matrixBCols = parseInt(e.target.value);
            initMatrices();
            renderMatrices();
        });

        var opBtns = document.querySelectorAll('.operation-btn');
        opBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                updateMatrixValues();
                var op = btn.dataset.op;
                performOperation(op);
            });
        });
    }

    function getCellSize(cols) {
        if (cols <= 3) return { width: '60px', fontSize: '1rem', padding: '0.5rem' };
        if (cols === 4) return { width: '50px', fontSize: '0.9rem', padding: '0.4rem' };
        return { width: '42px', fontSize: '0.8rem', padding: '0.35rem' };
    }

    function renderMatrices() {
        var gridA = document.getElementById('matrix-a-grid');
        var gridB = document.getElementById('matrix-b-grid');
        
        var sizeA = getCellSize(state.matrixACols);
        var sizeB = getCellSize(state.matrixBCols);
        
        if (gridA) {
            gridA.innerHTML = '';
            for (var i = 0; i < state.matrixARows; i++) {
                var row = document.createElement('div');
                row.className = 'matrix-row';
                for (var j = 0; j < state.matrixACols; j++) {
                    var cell = document.createElement('input');
                    cell.type = 'number';
                    cell.className = 'matrix-cell';
                    cell.value = state.matrixA[i][j];
                    cell.dataset.matrix = 'a';
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    cell.style.width = sizeA.width;
                    cell.style.fontSize = sizeA.fontSize;
                    cell.style.padding = sizeA.padding;
                    cell.addEventListener('input', function() {
                        var matrix = this.dataset.matrix;
                        var r = parseInt(this.dataset.row);
                        var c = parseInt(this.dataset.col);
                        var v = parseFloat(this.value) || 0;
                        if (matrix === 'a') {
                            state.matrixA[r][c] = v;
                        } else {
                            state.matrixB[r][c] = v;
                        }
                    });
                    row.appendChild(cell);
                }
                gridA.appendChild(row);
            }
        }
        
        if (gridB) {
            gridB.innerHTML = '';
            for (var k = 0; k < state.matrixBRows; k++) {
                var row2 = document.createElement('div');
                row2.className = 'matrix-row';
                for (var l = 0; l < state.matrixBCols; l++) {
                    var cell2 = document.createElement('input');
                    cell2.type = 'number';
                    cell2.className = 'matrix-cell';
                    cell2.value = state.matrixB[k][l];
                    cell2.dataset.matrix = 'b';
                    cell2.dataset.row = k;
                    cell2.dataset.col = l;
                    cell2.style.width = sizeB.width;
                    cell2.style.fontSize = sizeB.fontSize;
                    cell2.style.padding = sizeB.padding;
                    cell2.addEventListener('input', function() {
                        var matrix = this.dataset.matrix;
                        var r = parseInt(this.dataset.row);
                        var c = parseInt(this.dataset.col);
                        var v = parseFloat(this.value) || 0;
                        if (matrix === 'a') {
                            state.matrixA[r][c] = v;
                        } else {
                            state.matrixB[r][c] = v;
                        }
                    });
                    row2.appendChild(cell2);
                }
                gridB.appendChild(row2);
            }
        }
    }

    function updateMatrixValues() {
        var cells = document.querySelectorAll('.matrix-cell');
        cells.forEach(function(cell) {
            var matrix = cell.dataset.matrix;
            var r = parseInt(cell.dataset.row);
            var c = parseInt(cell.dataset.col);
            var v = parseFloat(cell.value) || 0;
            if (matrix === 'a') {
                state.matrixA[r][c] = v;
            } else {
                state.matrixB[r][c] = v;
            }
        });
    }

    function performOperation(op) {
        var resultDisplay = document.getElementById('result-display');
        var stepsContainer = document.getElementById('steps-container');
        var stepsList = document.getElementById('steps-list');
        
        state.steps = [];
        
        try {
            switch (op) {
                case 'add':
                    state.steps.push('执行矩阵加法：A + B');
                    state.steps.push('要求：两个矩阵维度必须相同');
                    state.result = MatrixOps.matrixAdd(state.matrixA, state.matrixB);
                    break;
                case 'subtract':
                    state.steps.push('执行矩阵减法：A - B');
                    state.steps.push('要求：两个矩阵维度必须相同');
                    state.result = MatrixOps.matrixSubtract(state.matrixA, state.matrixB);
                    break;
                case 'multiply':
                    state.steps.push('执行矩阵乘法：A × B');
                    state.steps.push('要求：A的列数必须等于B的行数');
                    state.result = MatrixOps.matrixMultiply(state.matrixA, state.matrixB);
                    state.steps.push('结果维度：' + state.result.length + ' × ' + state.result[0].length);
                    break;
                case 'transposeA':
                    state.steps.push('执行矩阵转置：A转置');
                    state.steps.push('将矩阵的行和列互换');
                    state.result = MatrixOps.matrixTranspose(state.matrixA);
                    break;
                case 'transposeB':
                    state.steps.push('执行矩阵转置：B转置');
                    state.steps.push('将矩阵的行和列互换');
                    state.result = MatrixOps.matrixTranspose(state.matrixB);
                    break;
                case 'detA':
                    state.steps.push('计算行列式：det(A)');
                    state.steps.push('要求：必须是方阵');
                    state.result = MatrixOps.matrixDeterminant(state.matrixA);
                    state.steps.push('行列式值：' + state.result);
                    break;
                case 'detB':
                    state.steps.push('计算行列式：det(B)');
                    state.steps.push('要求：必须是方阵');
                    state.result = MatrixOps.matrixDeterminant(state.matrixB);
                    state.steps.push('行列式值：' + state.result);
                    break;
                case 'inverseA':
                    state.steps.push('计算逆矩阵：A逆');
                    state.steps.push('要求：必须是方阵且行列式不为0');
                    var detA = MatrixOps.matrixDeterminant(state.matrixA);
                    state.steps.push('det(A) = ' + detA);
                    if (detA !== 0) {
                        state.result = MatrixOps.matrixInverse(state.matrixA);
                        state.steps.push('矩阵可逆，已计算逆矩阵');
                    } else {
                        throw new Error('矩阵不可逆（行列式为0）');
                    }
                    break;
                case 'inverseB':
                    state.steps.push('计算逆矩阵：B逆');
                    state.steps.push('要求：必须是方阵且行列式不为0');
                    var detB = MatrixOps.matrixDeterminant(state.matrixB);
                    state.steps.push('det(B) = ' + detB);
                    if (detB !== 0) {
                        state.result = MatrixOps.matrixInverse(state.matrixB);
                        state.steps.push('矩阵可逆，已计算逆矩阵');
                    } else {
                        throw new Error('矩阵不可逆（行列式为0）');
                    }
                    break;
                case 'rankA':
                    state.steps.push('计算矩阵的秩：rank(A)');
                    state.steps.push('使用高斯消元法化为行最简形');
                    state.result = MatrixOps.matrixRank(state.matrixA);
                    state.steps.push('秩：' + state.result);
                    break;
                case 'rankB':
                    state.steps.push('计算矩阵的秩：rank(B)');
                    state.steps.push('使用高斯消元法化为行最简形');
                    state.result = MatrixOps.matrixRank(state.matrixB);
                    state.steps.push('秩：' + state.result);
                    break;
            }
            
            displayResult(resultDisplay);
            
            if (stepsContainer && stepsList) {
                stepsContainer.style.display = 'block';
                stepsList.innerHTML = state.steps.map(function(step) {
                    return '<div class="step-item">' + step + '</div>';
                }).join('');
            }
            
        } catch (error) {
            resultDisplay.innerHTML = '<span style="color: #ff6b6b;">❌ ' + error.message + '</span>';
            if (stepsContainer) {
                stepsContainer.style.display = 'none';
            }
        }
    }

    function displayResult(container) {
        if (typeof state.result === 'number') {
            container.innerHTML = '<div class="result-matrix" style="font-size: 1.5rem;">' + state.result + '</div>';
        } else if (Array.isArray(state.result)) {
            var rows = state.result.length;
            var cols = state.result[0].length;
            var size = getCellSize(cols);
            var html = '<div class="matrix-wrapper responsive-matrix"><table class="matrix-content">';
            for (var i = 0; i < rows; i++) {
                html += '<tr>';
                for (var j = 0; j < cols; j++) {
                    html += '<td style="font-size: ' + size.fontSize + '; padding: ' + size.padding + ';">' + Number(state.result[i][j]).toFixed(2) + '</td>';
                }
                html += '</tr>';
            }
            html += '</table></div>';
            container.innerHTML = html;
        }
    }

    return {
        render: render
    };
})();
