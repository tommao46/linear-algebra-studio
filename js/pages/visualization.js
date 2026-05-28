var VisualizationPage = (function() {
    var canvas = null;
    var ctx = null;
    var animationId = null;
    
    var params = {
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        shearX: 0,
        shearY: 0,
        matrix: [[1, 0], [0, 1]]
    };

    function render(container) {
        container.innerHTML = '' +
            '<div class="visualization-page page-transition">' +
                '<h2 class="section-title" style="margin-bottom: 2rem;">2D <span>线性变换</span> 可视化</h2>' +
                '<div class="visualization-container">' +
                    '<div class="canvas-container"><canvas id="transformCanvas" class="transform-canvas"></canvas></div>' +
                    '<div class="controls-panel">' +
                        '<div class="control-group"><label class="control-label">旋转变换 (°)</label><div class="slider-container"><input type="range" class="slider" id="rotation-slider" min="-180" max="180" value="0"><span class="slider-value" id="rotation-value">0°</span></div></div>' +
                        '<div class="control-group"><label class="control-label">X轴缩放</label><div class="slider-container"><input type="range" class="slider" id="scaleX-slider" min="0" max="3" step="0.1" value="1"><span class="slider-value" id="scaleX-value">1.0</span></div></div>' +
                        '<div class="control-group"><label class="control-label">Y轴缩放</label><div class="slider-container"><input type="range" class="slider" id="scaleY-slider" min="0" max="3" step="0.1" value="1"><span class="slider-value" id="scaleY-value">1.0</span></div></div>' +
                        '<div class="control-group"><label class="control-label">X轴剪切</label><div class="slider-container"><input type="range" class="slider" id="shearX-slider" min="-2" max="2" step="0.1" value="0"><span class="slider-value" id="shearX-value">0.0</span></div></div>' +
                        '<div class="control-group"><label class="control-label">Y轴剪切</label><div class="slider-container"><input type="range" class="slider" id="shearY-slider" min="-2" max="2" step="0.1" value="0"><span class="slider-value" id="shearY-value">0.0</span></div></div>' +
                        '<div class="control-group"><label class="control-label">自定义矩阵</label><div class="matrix-inputs"><input type="number" class="matrix-input" id="m00" value="1" step="0.1"><input type="number" class="matrix-input" id="m01" value="0" step="0.1"><input type="number" class="matrix-input" id="m10" value="0" step="0.1"><input type="number" class="matrix-input" id="m11" value="1" step="0.1"></div></div>' +
                        '<div class="control-group"><label class="control-label">预设变换</label><div class="preset-buttons"><button class="preset-btn" data-preset="identity">单位矩阵</button><button class="preset-btn" data-preset="rotate90">旋转90°</button><button class="preset-btn" data-preset="flipX">X轴镜像</button><button class="preset-btn" data-preset="flipY">Y轴镜像</button><button class="preset-btn" data-preset="stretch">拉伸</button><button class="preset-btn" data-preset="shear">剪切</button></div></div>' +
                        '<div class="control-group"><label class="control-label">变换矩阵</label><div class="result-display" style="min-height: auto; padding: 1rem;"><div id="current-matrix" class="result-matrix">[1, 0]<br>[0, 1]</div></div></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        initCanvas();
        initEventListeners();
        startAnimation();
    }

    function initCanvas() {
        canvas = document.getElementById('transformCanvas');
        if (!canvas) return;
        var container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
    }

    function initEventListeners() {
        var sliders = [
            { id: 'rotation', param: 'rotation', suffix: '°' },
            { id: 'scaleX', param: 'scaleX', suffix: '' },
            { id: 'scaleY', param: 'scaleY', suffix: '' },
            { id: 'shearX', param: 'shearX', suffix: '' },
            { id: 'shearY', param: 'shearY', suffix: '' }
        ];

        sliders.forEach(function(slider) {
            var input = document.getElementById(slider.id + '-slider');
            var valueEl = document.getElementById(slider.id + '-value');
            if (input && valueEl) {
                input.addEventListener('input', function() {
                    var value = parseFloat(input.value);
                    params[slider.param] = value;
                    valueEl.textContent = value.toFixed(1) + slider.suffix;
                    updateTransformationMatrix();
                });
            }
        });

        ['m00', 'm01', 'm10', 'm11'].forEach(function(id, idx) {
            var input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    var row = Math.floor(idx / 2);
                    var col = idx % 2;
                    params.matrix[row][col] = parseFloat(input.value) || 0;
                    updateMatrixDisplay();
                });
            }
        });

        var presets = {
            identity: [[1, 0], [0, 1]],
            rotate90: [[0, -1], [1, 0]],
            flipX: [[-1, 0], [0, 1]],
            flipY: [[1, 0], [0, -1]],
            stretch: [[2, 0], [0, 0.5]],
            shear: [[1, 0.5], [0, 1]]
        };

        var presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var preset = btn.dataset.preset;
                if (presets[preset]) {
                    params.matrix = presets[preset].map(function(row) {
                        return row.slice();
                    });
                    applyMatrixToInputs();
                    updateMatrixDisplay();
                }
            });
        });

        window.addEventListener('resize', function() {
            if (canvas) {
                var container = canvas.parentElement;
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        });
    }

    function updateTransformationMatrix() {
        var rotation = MatrixOps.createRotationMatrix(params.rotation);
        var scale = MatrixOps.createScaleMatrix(params.scaleX, params.scaleY);
        var shear = MatrixOps.createShearMatrix(params.shearX, params.shearY);
        
        var result = rotation;
        result = MatrixOps.matrixMultiply(result, scale);
        result = MatrixOps.matrixMultiply(result, shear);
        
        params.matrix = result;
        applyMatrixToInputs();
        updateMatrixDisplay();
    }

    function applyMatrixToInputs() {
        ['m00', 'm01', 'm10', 'm11'].forEach(function(id, idx) {
            var input = document.getElementById(id);
            var row = Math.floor(idx / 2);
            var col = idx % 2;
            if (input) {
                input.value = params.matrix[row][col].toFixed(2);
            }
        });
    }

    function updateMatrixDisplay() {
        var display = document.getElementById('current-matrix');
        if (display) {
            display.innerHTML = '[' + params.matrix[0][0].toFixed(2) + ', ' + params.matrix[0][1].toFixed(2) + ']<br>[' + params.matrix[1][0].toFixed(2) + ', ' + params.matrix[1][1].toFixed(2) + ']';
        }
    }

    function startAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        function animate() {
            draw();
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }

    function draw() {
        if (!ctx || !canvas) return;
        
        var width = canvas.width;
        var height = canvas.height;
        var centerX = width / 2;
        var centerY = height / 2;
        var scale = 50;

        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        
        for (var i = -10; i <= 10; i++) {
            var transformedX1 = transformPoint([i, -10]);
            var transformedX2 = transformPoint([i, 10]);
            var transformedY1 = transformPoint([-10, i]);
            var transformedY2 = transformPoint([10, i]);
            
            ctx.beginPath();
            ctx.moveTo(centerX + transformedX1[0] * scale, centerY - transformedX1[1] * scale);
            ctx.lineTo(centerX + transformedX2[0] * scale, centerY - transformedX2[1] * scale);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX + transformedY1[0] * scale, centerY - transformedY1[1] * scale);
            ctx.lineTo(centerX + transformedY2[0] * scale, centerY - transformedY2[1] * scale);
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.lineWidth = 2;
        
        var axisX1 = transformPoint([-10, 0]);
        var axisX2 = transformPoint([10, 0]);
        var axisY1 = transformPoint([0, -10]);
        var axisY2 = transformPoint([0, 10]);
        
        ctx.beginPath();
        ctx.moveTo(centerX + axisX1[0] * scale, centerY - axisX1[1] * scale);
        ctx.lineTo(centerX + axisX2[0] * scale, centerY - axisX2[1] * scale);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + axisY1[0] * scale, centerY - axisY1[1] * scale);
        ctx.lineTo(centerX + axisY2[0] * scale, centerY - axisY2[1] * scale);
        ctx.stroke();

        var square = [[0, 0], [2, 0], [2, 2], [0, 2]];
        var transformedSquare = square.map(function(p) {
            return transformPoint(p);
        });
        
        ctx.fillStyle = 'rgba(0, 191, 255, 0.3)';
        ctx.strokeStyle = '#00bfff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX + transformedSquare[0][0] * scale, centerY - transformedSquare[0][1] * scale);
        for (var j = 1; j < transformedSquare.length; j++) {
            ctx.lineTo(centerX + transformedSquare[j][0] * scale, centerY - transformedSquare[j][1] * scale);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        var iVec = transformPoint([1, 0]);
        var jVec = transformPoint([0, 1]);
        
        drawArrow(centerX, centerY, centerX + iVec[0] * scale, centerY - iVec[1] * scale, '#00ff88', 'i');
        drawArrow(centerX, centerY, centerX + jVec[0] * scale, centerY - jVec[1] * scale, '#ff6b6b', 'j');

        drawArrow(centerX, centerY, centerX + scale, centerY, 'rgba(0, 255, 136, 0.3)');
        drawArrow(centerX, centerY, centerX, centerY - scale, 'rgba(255, 107, 107, 0.3)');
    }

    function transformPoint(point) {
        return MatrixOps.apply2DTransform(point, params.matrix);
    }

    function drawArrow(fromX, fromY, toX, toY, color, label) {
        var headLength = 10;
        var angle = Math.atan2(fromY - toY, toX - fromX);
        
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY + headLength * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY + headLength * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
        
        if (label) {
            ctx.font = 'bold 16px "JetBrains Mono"';
            ctx.fillText(label, toX + 10, toY - 10);
        }
    }

    function cleanup() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    return {
        render: render,
        cleanup: cleanup
    };
})();
