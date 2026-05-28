/**
 * 线性代数本质讲解页面
 * 采用3Blue1Brown风格：几何视角、动画演示、直观理解
 * 包含：向量的三种理解、线性变换的本质、矩阵与变换的联系、特征值的意义
 * 以及与网络/图论的深刻联系
 */
var EssencePage = (function() {
    // 当前章节
    var currentChapter = 0;
    
    // Canvas相关变量
    var canvas = null;
    var ctx = null;
    var animationId = null;
    
    // 章节定义
    var chapters = [
        {
            id: 'vectors',
            title: '向量究竟是什么？',
            subtitle: '三种视角的统一',
            icon: '➡️'
        },
        {
            id: 'transformation',
            title: '线性变换的本质',
            subtitle: '矩阵不是数字表格',
            icon: '🔄'
        },
        {
            id: 'multiplication',
            title: '矩阵乘法的几何意义',
            subtitle: '变换的复合',
            icon: '✖️'
        },
        {
            id: 'determinant',
            title: '行列式的真正含义',
            subtitle: '空间的缩放因子',
            icon: '📐'
        },
        {
            id: 'inverse',
            title: '逆矩阵的几何直觉',
            subtitle: '反向变换',
            icon: '↩️'
        },
        {
            id: 'eigen',
            title: '特征值与特征向量',
            subtitle: '变换中的不变方向',
            icon: '🎯'
        },
        {
            id: 'network',
            title: '网络世界的矩阵',
            subtitle: '从网页排名到社交网络',
            icon: '🕸️'
        }
    ];
    
    // 当前变换参数
    var transformParams = {
        matrix: [[1, 0], [0, 1]],
        isAnimating: false,
        animationProgress: 0,
        startMatrix: null,
        endMatrix: null,
        animationStartTime: null
    };
    
    /**
     * 渲染主页面
     */
    function render(container) {
        container.innerHTML = '' +
            '<div class="essence-page page-transition">' +
                '<div class="essence-header">' +
                    '<h1 class="essence-title">线性代数的 <span class="gradient-text">本质</span></h1>' +
                    '<p class="essence-subtitle">以几何视角理解矩阵与变换的深层含义</p>' +
                '</div>' +
                
                // 章节导航
                '<div class="chapters-nav">' +
                    chapters.map(function(ch, idx) {
                        return '' +
                            '<div class="chapter-dot ' + (idx === 0 ? 'active' : '') + '" data-chapter="' + idx + '" title="' + ch.title + '">' +
                                '<span class="chapter-icon">' + ch.icon + '</span>' +
                                '<span class="chapter-label">' + ch.title + '</span>' +
                            '</div>';
                    }).join('') +
                '</div>' +
                
                // 主内容区
                '<div class="essence-content">' +
                    '<div class="content-left">' +
                        '<div class="chapter-title-section">' +
                            '<span class="chapter-number" id="chapter-number">01</span>' +
                            '<div>' +
                                '<h2 class="chapter-title" id="chapter-title">' + chapters[0].title + '</h2>' +
                                '<p class="chapter-subtitle" id="chapter-subtitle">' + chapters[0].subtitle + '</p>' +
                            '</div>' +
                        '</div>' +
                        
                        '<div class="explanation-box" id="explanation-box"></div>' +
                        
                        '<div class="controls-box" id="controls-box"></div>' +
                        
                        '<div class="nav-buttons">' +
                            '<button class="nav-btn prev-btn" id="prev-btn">' +
                                '<span class="nav-icon">←</span> 上一章' +
                            '</button>' +
                            '<button class="nav-btn next-btn primary" id="next-btn">' +
                                '下一章 <span class="nav-icon">→</span>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                    
                    '<div class="content-right">' +
                        '<div class="canvas-container-large">' +
                            '<canvas id="essence-canvas" class="essence-canvas"></canvas>' +
                            '<div class="canvas-overlay" id="canvas-overlay"></div>' +
                        '</div>' +
                        '<div class="matrix-inspector" id="matrix-inspector"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        initCanvas();
        initEventListeners();
        renderChapter(0);
        startAnimationLoop();
    }
    
    /**
     * 初始化Canvas
     */
    function initCanvas() {
        canvas = document.getElementById('essence-canvas');
        if (!canvas) return;
        
        var container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        ctx = canvas.getContext('2d');
        
        window.addEventListener('resize', function() {
            if (canvas) {
                var container = canvas.parentElement;
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
            }
        });
    }
    
    /**
     * 初始化事件监听
     */
    function initEventListeners() {
        // 章节点点击
        document.querySelectorAll('.chapter-dot').forEach(function(dot) {
            dot.addEventListener('click', function() {
                var idx = parseInt(dot.dataset.chapter);
                renderChapter(idx);
            });
        });
        
        // 导航按钮
        var prevBtn = document.getElementById('prev-btn');
        var nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentChapter > 0) {
                    renderChapter(currentChapter - 1);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (currentChapter < chapters.length - 1) {
                    renderChapter(currentChapter + 1);
                }
            });
        }
    }
    
    /**
     * 渲染指定章节
     */
    function renderChapter(idx) {
        currentChapter = idx;
        var chapter = chapters[idx];
        
        // 更新导航点状态
        document.querySelectorAll('.chapter-dot').forEach(function(dot, i) {
            dot.classList.toggle('active', i === idx);
            dot.classList.toggle('visited', i < idx);
        });
        
        // 更新章节标题
        var numEl = document.getElementById('chapter-number');
        var titleEl = document.getElementById('chapter-title');
        var subtitleEl = document.getElementById('chapter-subtitle');
        
        if (numEl) numEl.textContent = String(idx + 1).padStart(2, '0');
        if (titleEl) titleEl.textContent = chapter.title;
        if (subtitleEl) subtitleEl.textContent = chapter.subtitle;
        
        // 更新导航按钮状态
        var prevBtn = document.getElementById('prev-btn');
        var nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.disabled = idx === 0;
        if (nextBtn) {
            nextBtn.disabled = idx === chapters.length - 1;
            nextBtn.textContent = idx === chapters.length - 1 ? '完成学习 ✓' : '下一章 →';
        }
        
        // 渲染章节内容
        var explanationBox = document.getElementById('explanation-box');
        var controlsBox = document.getElementById('controls-box');
        
        if (explanationBox && controlsBox) {
            switch(chapter.id) {
                case 'vectors':
                    renderVectorsChapter(explanationBox, controlsBox);
                    break;
                case 'transformation':
                    renderTransformationChapter(explanationBox, controlsBox);
                    break;
                case 'multiplication':
                    renderMultiplicationChapter(explanationBox, controlsBox);
                    break;
                case 'determinant':
                    renderDeterminantChapter(explanationBox, controlsBox);
                    break;
                case 'inverse':
                    renderInverseChapter(explanationBox, controlsBox);
                    break;
                case 'eigen':
                    renderEigenChapter(explanationBox, controlsBox);
                    break;
                case 'network':
                    renderNetworkChapter(explanationBox, controlsBox);
                    break;
            }
        }
        
        // 重置变换矩阵
        transformParams.matrix = [[1, 0], [0, 1]];
    }
    
    // ========== 第一章：向量 ==========
    
    function renderVectorsChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"向量是什么？这取决于你问谁。"' +
                '</div>' +
                
                '<div class="perspective-cards">' +
                    '<div class="perspective-card physics">' +
                        '<div class="perspective-icon">🎯</div>' +
                        '<h4>物理学家视角</h4>' +
                        '<p>向量是空间中的箭头，有<span class="highlight">长度</span>和<span class="highlight">方向</span></p>' +
                        '<div class="example-vector">v = (3, 4) → 向右3，向上4</div>' +
                    '</div>' +
                    
                    '<div class="perspective-card compsci">' +
                        '<div class="perspective-icon">💻</div>' +
                        '<h4>计算机学家视角</h4>' +
                        '<p>向量是有序的<span class="highlight">数字列表</span></p>' +
                        '<div class="example-vector">[身高, 体重, 年龄] = [175, 68, 25]</div>' +
                    '</div>' +
                    
                    '<div class="perspective-card math">' +
                        '<div class="perspective-icon">📐</div>' +
                        '<h4>数学家视角</h4>' +
                        '<p>向量是满足<span class="highlight">加法</span>和<span class="highlight">数乘</span>的任何对象</p>' +
                        '<div class="example-vector">u + v, αv 仍然是向量</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">💡</div>' +
                    '<div>' +
                        '<h4>关键洞察</h4>' +
                        '<p>在线性代数中，<strong>向量加法</strong> = 首尾相接，<strong>数乘</strong> = 缩放长度。这两种运算定义了整个向量空间的结构。</p>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🎮 交互演示</h4>' +
                '<p class="control-desc">拖动下方滑块，观察向量 v 和 w 以及它们的和</p>' +
                
                '<div class="vector-controls">' +
                    '<div class="vector-control">' +
                        '<label class="vector-label v1">向量 v</label>' +
                        '<div class="slider-row">' +
                            '<span class="coord-label">vₓ:</span>' +
                            '<input type="range" class="slider vector-slider" id="vec-vx" min="-3" max="3" step="0.1" value="2">' +
                            '<span class="slider-value" id="vx-val">2.0</span>' +
                        '</div>' +
                        '<div class="slider-row">' +
                            '<span class="coord-label">vᵧ:</span>' +
                            '<input type="range" class="slider vector-slider" id="vec-vy" min="-3" max="3" step="0.1" value="1">' +
                            '<span class="slider-value" id="vy-val">1.0</span>' +
                        '</div>' +
                    '</div>' +
                    
                    '<div class="vector-control">' +
                        '<label class="vector-label v2">向量 w</label>' +
                        '<div class="slider-row">' +
                            '<span class="coord-label">wₓ:</span>' +
                            '<input type="range" class="slider vector-slider" id="vec-wx" min="-3" max="3" step="0.1" value="1">' +
                            '<span class="slider-value" id="wx-val">1.0</span>' +
                        '</div>' +
                        '<div class="slider-row">' +
                            '<span class="coord-label">wᵧ:</span>' +
                            '<input type="range" class="slider vector-slider" id="vec-wy" min="-3" max="3" step="0.1" value="2">' +
                            '<span class="slider-value" id="wy-val">2.0</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="formula-display" id="vector-formula">' +
                    'v + w = (2, 1) + (1, 2) = <span class="highlight">(3, 3)</span>' +
                '</div>' +
            '</div>';
        
        // 绑定向量控制事件
        var vSliders = ['vx', 'vy', 'wx', 'wy'];
        vSliders.forEach(function(s) {
            var slider = document.getElementById('vec-' + s);
            var valEl = document.getElementById(s + '-val');
            if (slider && valEl) {
                slider.addEventListener('input', function() {
                    valEl.textContent = parseFloat(slider.value).toFixed(1);
                    updateVectorFormula();
                });
            }
        });
        
        // 自定义渲染函数
        transformParams.customRender = renderVectorsScene;
    }
    
    function updateVectorFormula() {
        var vx = parseFloat(document.getElementById('vec-vx').value);
        var vy = parseFloat(document.getElementById('vec-vy').value);
        var wx = parseFloat(document.getElementById('vec-wx').value);
        var wy = parseFloat(document.getElementById('vec-wy').value);
        
        var formula = document.getElementById('vector-formula');
        if (formula) {
            formula.innerHTML = 
                'v + w = (' + vx.toFixed(1) + ', ' + vy.toFixed(1) + ') + (' + 
                wx.toFixed(1) + ', ' + wy.toFixed(1) + ') = ' +
                '<span class="highlight">(' + (vx + wx).toFixed(1) + ', ' + (vy + wy).toFixed(1) + ')</span>';
        }
    }
    
    function renderVectorsScene(width, height, centerX, centerY, scale) {
        var vx = parseFloat(document.getElementById('vec-vx').value || 2);
        var vy = parseFloat(document.getElementById('vec-vy').value || 1);
        var wx = parseFloat(document.getElementById('vec-wx').value || 1);
        var wy = parseFloat(document.getElementById('vec-wy').value || 2);
        
        var margin = 40;
        var safeScale = Math.min(scale, Math.min(width, height) / 12);
        
        var vEndX = centerX + vx * safeScale;
        var vEndY = centerY - vy * safeScale;
        var wEndX = centerX + wx * safeScale;
        var wEndY = centerY - wy * safeScale;
        var sumEndX = centerX + (vx + wx) * safeScale;
        var sumEndY = centerY - (vy + wy) * safeScale;
        
        var maxX = Math.max(Math.abs(vEndX), Math.abs(wEndX), Math.abs(sumEndX), width / 2);
        var maxY = Math.max(Math.abs(vEndY), Math.abs(wEndY), Math.abs(sumEndY), height / 2);
        
        var scaleX = (width / 2 - margin) / Math.max(1, Math.max(Math.abs(vx), Math.abs(wx), Math.abs(vx + wx)));
        var scaleY = (height / 2 - margin) / Math.max(1, Math.max(Math.abs(vy), Math.abs(wy), Math.abs(vy + wy)));
        var dynamicScale = Math.min(safeScale, scaleX, scaleY);
        
        var actualVEndX = centerX + vx * dynamicScale;
        var actualVEndY = centerY - vy * dynamicScale;
        var actualWEndX = centerX + wx * dynamicScale;
        var actualWEndY = centerY - wy * dynamicScale;
        var actualSumEndX = centerX + (vx + wx) * dynamicScale;
        var actualSumEndY = centerY - (vy + wy) * dynamicScale;
        
        var maxVal = Math.max(
            Math.abs(vx), Math.abs(vy),
            Math.abs(wx), Math.abs(wy),
            Math.abs(vx + wx), Math.abs(vy + wy)
        );
        var gridRange = Math.ceil(maxVal) + 2;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (var i = -gridRange; i <= gridRange; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX - gridRange * dynamicScale, centerY - i * dynamicScale);
            ctx.lineTo(centerX + gridRange * dynamicScale, centerY - i * dynamicScale);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(centerX + i * dynamicScale, centerY - gridRange * dynamicScale);
            ctx.lineTo(centerX + i * dynamicScale, centerY + gridRange * dynamicScale);
            ctx.stroke();
        }
        
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - gridRange * dynamicScale, centerY);
        ctx.lineTo(centerX + gridRange * dynamicScale, centerY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - gridRange * dynamicScale);
        ctx.lineTo(centerX, centerY + gridRange * dynamicScale);
        ctx.stroke();
        
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.font = 'bold 14px JetBrains Mono';
        ctx.fillText('X', centerX + gridRange * dynamicScale - 25, centerY - 10);
        ctx.fillText('Y', centerX + 10, centerY - gridRange * dynamicScale + 25);
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '12px JetBrains Mono';
        ctx.fillText('O', centerX + 10, centerY + 20);
        
        drawArrow(centerX, centerY, actualVEndX, actualVEndY, '#00ff88', 'v');
        
        drawArrow(actualVEndX, actualVEndY, actualSumEndX, actualSumEndY, '#00bfff', 'w');
        
        drawArrow(centerX, centerY, actualSumEndX, actualSumEndY, '#ff6b6b', 'v+w');
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        ctx.beginPath();
        ctx.moveTo(actualWEndX, actualWEndY);
        ctx.lineTo(actualSumEndX, actualSumEndY);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }
    
    // ========== 第二章：线性变换 ==========
    
    function renderTransformationChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"线性变换是保持网格平行且等距分布的变换。"' +
                '</div>' +
                
                '<div class="transformation-intro">' +
                    '<p>想象整个空间是一张网格纸。一个<strong>线性变换</strong>就像：</p>' +
                    '<ul class="transformation-list">' +
                        '<li>保持<span class="highlight">原点不动</span></li>' +
                        '<li>把<span class="highlight">直线变成直线</span></li>' +
                        '<li>保持<span class="highlight">网格平行且等距</span></li>' +
                    '</ul>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">🎯</div>' +
                    '<div>' +
                        '<h4>核心思想</h4>' +
                        '<p>一旦知道基向量 i 和 j 变换后的去向，就可以知道<strong>任何向量</strong>的去向！因为：</p>' +
                        '<div class="formula-inline">T(ax + by) = aT(x) + bT(y)</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="matrix-intro">' +
                    '<p>这就是矩阵的真正含义：</p>' +
                    '<div class="matrix-meaning">' +
                        '<span class="matrix-symbol">[T] = </span>' +
                        '<span class="matrix-brackets">[</span>' +
                        '<span class="matrix-columns">' +
                            '<span class="col i-col">T(i)</span>' +
                            '<span class="col j-col">T(j)</span>' +
                        '</span>' +
                        '<span class="matrix-brackets">]</span>' +
                    '</div>' +
                    '<p class="matrix-caption">矩阵的每一列就是变换后的基向量！</p>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🔄 选择变换</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="transform-btn active" data-transform="identity">单位变换</button>' +
                    '<button class="transform-btn" data-transform="rotate">旋转90°</button>' +
                    '<button class="transform-btn" data-transform="shear">水平剪切</button>' +
                    '<button class="transform-btn" data-transform="stretch">垂直拉伸</button>' +
                    '<button class="transform-btn" data-transform="flip">X轴翻转</button>' +
                    '<button class="transform-btn" data-transform="combo">复合变换</button>' +
                '</div>' +
                
                '<div class="custom-matrix-section">' +
                    '<h4 class="control-heading">✏️ 自定义矩阵</h4>' +
                    '<div class="matrix-editor">' +
                        '<div class="matrix-input-grid">' +
                            '<input type="number" class="matrix-input-cell" id="m00" value="1" step="0.1">' +
                            '<input type="number" class="matrix-input-cell" id="m01" value="0" step="0.1">' +
                            '<input type="number" class="matrix-input-cell" id="m10" value="0" step="0.1">' +
                            '<input type="number" class="matrix-input-cell" id="m11" value="1" step="0.1">' +
                        '</div>' +
                        '<button class="apply-matrix-btn" id="apply-custom-matrix">应用变换</button>' +
                    '</div>' +
                '</div>' +
                
                '<div class="transformation-info" id="transform-info">' +
                    '<div class="info-item">' +
                        '<span class="info-label">T(i) = </span>' +
                        '<span class="info-value" id="ti-display">(1, 0)</span>' +
                    '</div>' +
                    '<div class="info-item">' +
                        '<span class="info-label">T(j) = </span>' +
                        '<span class="info-value" id="tj-display">(0, 1)</span>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        // 预设变换矩阵
        var transforms = {
            identity: [[1, 0], [0, 1]],
            rotate: [[0, -1], [1, 0]],
            shear: [[1, 1], [0, 1]],
            stretch: [[1, 0], [0, 2]],
            flip: [[-1, 0], [0, 1]],
            combo: [[1, 1], [1, 0]]
        };
        
        // 绑定变换按钮
        document.querySelectorAll('.transform-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.transform-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                var t = btn.dataset.transform;
                if (transforms[t]) {
                    animateToMatrix(transforms[t]);
                    updateMatrixInputs(transforms[t]);
                    updateTransformInfo(transforms[t]);
                }
            });
        });
        
        // 自定义矩阵输入
        ['m00', 'm01', 'm10', 'm11'].forEach(function(id) {
            var input = document.getElementById(id);
            if (input) {
                input.addEventListener('change', function() {
                    var m = [
                        [parseFloat(document.getElementById('m00').value) || 0, parseFloat(document.getElementById('m01').value) || 0],
                        [parseFloat(document.getElementById('m10').value) || 0, parseFloat(document.getElementById('m11').value) || 0]
                    ];
                    updateTransformInfo(m);
                });
            }
        });
        
        var applyBtn = document.getElementById('apply-custom-matrix');
        if (applyBtn) {
            applyBtn.addEventListener('click', function() {
                var m = [
                    [parseFloat(document.getElementById('m00').value) || 0, parseFloat(document.getElementById('m01').value) || 0],
                    [parseFloat(document.getElementById('m10').value) || 0, parseFloat(document.getElementById('m11').value) || 0]
                ];
                animateToMatrix(m);
                document.querySelectorAll('.transform-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
            });
        }
        
        transformParams.customRender = renderTransformationScene;
        transformParams.matrix = [[1, 0], [0, 1]];
    }
    
    function updateMatrixInputs(m) {
        document.getElementById('m00').value = m[0][0];
        document.getElementById('m01').value = m[0][1];
        document.getElementById('m10').value = m[1][0];
        document.getElementById('m11').value = m[1][1];
    }
    
    function updateTransformInfo(m) {
        var ti = document.getElementById('ti-display');
        var tj = document.getElementById('tj-display');
        if (ti) ti.textContent = '(' + m[0][0] + ', ' + m[1][0] + ')';
        if (tj) tj.textContent = '(' + m[0][1] + ', ' + m[1][1] + ')';
    }
    
    function animateToMatrix(targetMatrix) {
        transformParams.startMatrix = transformParams.matrix.map(function(row) { return row.slice(); });
        transformParams.endMatrix = targetMatrix;
        transformParams.isAnimating = true;
        transformParams.animationProgress = 0;
        transformParams.animationStartTime = performance.now();
    }
    
    function renderTransformationScene(width, height, centerX, centerY, scale) {
        var m = transformParams.matrix;
        
        // 绘制变换后的网格
        drawTransformedGrid(width, height, centerX, centerY, scale, m);
        
        // 绘制变换后的i向量
        var tiX = m[0][0] * scale;
        var tiY = m[1][0] * scale;
        drawArrow(centerX, centerY, centerX + tiX, centerY - tiY, '#00ff88', 'T(i)');
        
        // 绘制变换后的j向量
        var tjX = m[0][1] * scale;
        var tjY = m[1][1] * scale;
        drawArrow(centerX, centerY, centerX + tjX, centerY - tjY, '#00bfff', 'T(j)');
        
        // 绘制变换后的单位正方形
        drawTransformedSquare(centerX, centerY, scale, m);
    }
    
    function drawTransformedGrid(width, height, centerX, centerY, scale, m) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        var range = Math.ceil(Math.max(width, height) / (2 * scale)) + 1;
        
        for (var i = -range; i <= range; i++) {
            // 垂直线
            var p1 = transformPoint([i, -range], m);
            var p2 = transformPoint([i, range], m);
            ctx.beginPath();
            ctx.moveTo(centerX + p1[0] * scale, centerY - p1[1] * scale);
            ctx.lineTo(centerX + p2[0] * scale, centerY - p2[1] * scale);
            ctx.stroke();
            
            // 水平线
            var p3 = transformPoint([-range, i], m);
            var p4 = transformPoint([range, i], m);
            ctx.beginPath();
            ctx.moveTo(centerX + p3[0] * scale, centerY - p3[1] * scale);
            ctx.lineTo(centerX + p4[0] * scale, centerY - p4[1] * scale);
            ctx.stroke();
        }
        
        // 坐标轴
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.lineWidth = 2;
        
        var x1 = transformPoint([-range, 0], m);
        var x2 = transformPoint([range, 0], m);
        ctx.beginPath();
        ctx.moveTo(centerX + x1[0] * scale, centerY - x1[1] * scale);
        ctx.lineTo(centerX + x2[0] * scale, centerY - x2[1] * scale);
        ctx.stroke();
        
        var y1 = transformPoint([0, -range], m);
        var y2 = transformPoint([0, range], m);
        ctx.beginPath();
        ctx.moveTo(centerX + y1[0] * scale, centerY - y1[1] * scale);
        ctx.lineTo(centerX + y2[0] * scale, centerY - y2[1] * scale);
        ctx.stroke();
    }
    
    function drawTransformedSquare(centerX, centerY, scale, m) {
        var corners = [
            transformPoint([0, 0], m),
            transformPoint([1, 0], m),
            transformPoint([1, 1], m),
            transformPoint([0, 1], m)
        ];
        
        ctx.fillStyle = 'rgba(155, 89, 182, 0.3)';
        ctx.strokeStyle = '#9b59b6';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX + corners[0][0] * scale, centerY - corners[0][1] * scale);
        for (var i = 1; i < corners.length; i++) {
            ctx.lineTo(centerX + corners[i][0] * scale, centerY - corners[i][1] * scale);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    function transformPoint(p, m) {
        return [
            m[0][0] * p[0] + m[0][1] * p[1],
            m[1][0] * p[0] + m[1][1] * p[1]
        ];
    }
    
    // ========== 第三章：矩阵乘法 ==========
    
    function renderMultiplicationChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"矩阵乘法不是数字的随意相乘，而是变换的复合。"' +
                '</div>' +
                
                '<div class="compound-intro">' +
                    '<p>想象你先做一个<strong>旋转</strong>，再做一个<strong>剪切</strong>。最终效果是什么？</p>' +
                    '<div class="composition-diagram">' +
                        '<div class="step">旋转 R</div>' +
                        '<div class="arrow">→</div>' +
                        '<div class="step">剪切 S</div>' +
                        '<div class="arrow">=</div>' +
                        '<div class="step">复合 S×R</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">🔢</div>' +
                    '<div>' +
                        '<h4>关键公式</h4>' +
                        '<p>矩阵乘法的本质是<strong>变换的复合</strong>：</p>' +
                        '<div class="formula-large">M₂ × M₁ 表示：先应用 M₁，再应用 M₂</div>' +
                        '<p class="note">注意：矩阵乘法是右到左的！</p>' +
                    '</div>' +
                '</div>' +
                
                '<div class="multiplication-meaning">' +
                    '<h4>如何计算？</h4>' +
                    '<p>M₂ × M₁ 的第 i 列 = M₂ × (M₁ 的第 i 列)</p>' +
                    '<p>也就是说：把 M₁ 的每一列当作向量，用 M₂ 去变换它！</p>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🔄 选择第一个变换 M₁</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="m1-btn active" data-m="identity">I</button>' +
                    '<button class="m1-btn" data-m="rotate">R(90°)</button>' +
                    '<button class="m1-btn" data-m="shear">剪切</button>' +
                    '<button class="m1-btn" data-m="flip">翻转</button>' +
                '</div>' +
                
                '<h4 class="control-heading">🔄 选择第二个变换 M₂</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="m2-btn" data-m="identity">I</button>' +
                    '<button class="m2-btn active" data-m="rotate">R(90°)</button>' +
                    '<button class="m2-btn" data-m="shear">剪切</button>' +
                    '<button class="m2-btn" data-m="flip">翻转</button>' +
                '</div>' +
                
                '<div class="result-display">' +
                    '<div class="matrix-pair">' +
                        '<div class="small-matrix" id="m2-display">M₂</div>' +
                        '<span class="times">×</span>' +
                        '<div class="small-matrix" id="m1-display">M₁</div>' +
                        '<span class="equals">=</span>' +
                        '<div class="small-matrix result" id="product-display">M₂×M₁</div>' +
                    '</div>' +
                '</div>' +
                
                '<button class="play-animation-btn" id="play-composition">' +
                    '▶️ 播放复合动画' +
                '</button>' +
            '</div>';
        
        var matrices = {
            identity: [[1, 0], [0, 1]],
            rotate: [[0, -1], [1, 0]],
            shear: [[1, 1], [0, 1]],
            flip: [[-1, 0], [0, 1]]
        };
        
        var state = { m1: 'identity', m2: 'rotate' };
        
        function updateProduct() {
            var M1 = matrices[state.m1];
            var M2 = matrices[state.m2];
            var product = MatrixOps.matrixMultiply(M2, M1);
            
            document.getElementById('m1-display').innerHTML = formatSmallMatrix(M1);
            document.getElementById('m2-display').innerHTML = formatSmallMatrix(M2);
            document.getElementById('product-display').innerHTML = formatSmallMatrix(product);
            
            return product;
        }
        
        function formatSmallMatrix(m) {
            return '<table class="small-matrix-table">' +
                '<tr><td>' + m[0][0] + '</td><td>' + m[0][1] + '</td></tr>' +
                '<tr><td>' + m[1][0] + '</td><td>' + m[1][1] + '</td></tr>' +
                '</table>';
        }
        
        document.querySelectorAll('.m1-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.m1-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                state.m1 = btn.dataset.m;
                updateProduct();
            });
        });
        
        document.querySelectorAll('.m2-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.m2-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                state.m2 = btn.dataset.m;
                updateProduct();
            });
        });
        
        var playBtn = document.getElementById('play-composition');
        if (playBtn) {
            playBtn.addEventListener('click', function() {
                var M1 = matrices[state.m1];
                var M2 = matrices[state.m2];
                var product = updateProduct();
                
                // 播放动画：I → M1 → M2×M1
                animateToMatrix([[1, 0], [0, 1]]);
                setTimeout(function() { animateToMatrix(M1); }, 1000);
                setTimeout(function() { animateToMatrix(product); }, 2000);
            });
        }
        
        transformParams.customRender = renderTransformationScene;
        updateProduct();
    }
    
    // ========== 第四章：行列式 ==========
    
    function renderDeterminantChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"行列式告诉你：变换对空间拉伸或压缩了多少。"' +
                '</div>' +
                
                '<div class="det-intro">' +
                    '<p>想象一个单位正方形（面积 = 1）。经过线性变换后，它变成了一个平行四边形。</p>' +
                    '<p class="highlight-text">这个平行四边形的<strong>面积</strong>，就是行列式的<strong>绝对值</strong>！</p>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">📐</div>' +
                    '<div>' +
                        '<h4>几何意义</h4>' +
                        '<div class="det-meaning">' +
                            '<p><strong>det > 0</strong>：保持空间方向</p>' +
                            '<p><strong>det < 0</strong>：翻转空间方向（镜像）</p>' +
                            '<p><strong>det = 0</strong>：将空间压缩到更低维度（不可逆）</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="formula-box">' +
                    '<div class="det-formula">' +
                        'det(' +
                        '<span class="matrix-small">' +
                            '<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>' +
                        '</span>' +
                        ') = ad - bc' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🔄 观察面积变化</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="det-btn active" data-m="identity" data-det="1">单位 (det=1)</button>' +
                    '<button class="det-btn" data-m="stretch2" data-det="2">拉伸 (det=2)</button>' +
                    '<button class="det-btn" data-m="shrink" data-det="0.5">收缩 (det=0.5)</button>' +
                    '<button class="det-btn" data-m="flip" data-det="-1">翻转 (det=-1)</button>' +
                    '<button class="det-btn" data-m="collapse" data-det="0">压缩 (det=0)</button>' +
                    '<button class="det-btn" data-m="rotate" data-det="1">旋转 (det=1)</button>' +
                '</div>' +
                
                '<div class="det-display">' +
                    '<div class="det-value-box">' +
                        '<span class="det-label">行列式 det(M)</span>' +
                        '<span class="det-value" id="det-value">1</span>' +
                    '</div>' +
                    '<div class="area-visual">' +
                        '<div class="original-area">' +
                            '<span class="area-label">原始面积</span>' +
                            '<span class="area-num">1</span>' +
                        '</div>' +
                        '<span class="arrow">→</span>' +
                        '<div class="transformed-area">' +
                            '<span class="area-label">变换后面积</span>' +
                            '<span class="area-num" id="area-num">1</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="det-explanation" id="det-explanation">' +
                    '单位变换不改变面积，行列式为1。' +
                '</div>' +
            '</div>';
        
        var matrices = {
            identity: [[1, 0], [0, 1]],
            stretch2: [[2, 0], [0, 1]],
            shrink: [[0.5, 0], [0, 1]],
            flip: [[-1, 0], [0, 1]],
            collapse: [[1, 0.5], [2, 1]],
            rotate: [[0, -1], [1, 0]]
        };
        
        var explanations = {
            identity: '单位变换不改变面积，行列式为1。',
            stretch2: 'X轴方向拉伸2倍，面积变为2倍。',
            shrink: 'X轴方向收缩一半，面积变为0.5倍。',
            flip: '翻转变换，面积不变但方向反转（行列式为负）。',
            collapse: '行列式为0！空间被压缩到一条直线上。这个矩阵不可逆。',
            rotate: '旋转变换保持面积不变，行列式始终为1。'
        };
        
        document.querySelectorAll('.det-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.det-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                var m = btn.dataset.m;
                var det = parseFloat(btn.dataset.det);
                
                animateToMatrix(matrices[m]);
                
                document.getElementById('det-value').textContent = det;
                document.getElementById('area-num').textContent = Math.abs(det);
                document.getElementById('det-explanation').textContent = explanations[m];
            });
        });
        
        transformParams.customRender = renderTransformationScene;
    }
    
    // ========== 第五章：逆矩阵 ==========
    
    function renderInverseChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"逆矩阵就是反向操作的变换。"' +
                '</div>' +
                
                '<div class="inverse-intro">' +
                    '<p>如果你用矩阵 M 做了一个变换，那么 M<sup>-1</sup> 就是把它变回去。</p>' +
                    '<div class="inverse-diagram">' +
                        '<div class="before">v</div>' +
                        '<span class="arrow">→ M →</span>' +
                        '<div class="after">Mv</div>' +
                        '<span class="arrow">→ M⁻¹ →</span>' +
                        '<div class="before">v</div>' +
                    '</div>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">↩️</div>' +
                    '<div>' +
                        '<h4>核心公式</h4>' +
                        '<div class="formula-large">M × M⁻¹ = M⁻¹ × M = I</div>' +
                        '<p>矩阵乘上它的逆矩阵等于单位矩阵。</p>' +
                    '</div>' +
                '</div>' +
                
                '<div class="inverse-condition">' +
                    '<h4>什么时候存在逆矩阵？</h4>' +
                    '<div class="condition-list">' +
                        '<div class="condition-item good">' +
                            '<span class="check">✓</span>' +
                            '<span>det(M) ≠ 0（行列式不为零）</span>' +
                        '</div>' +
                        '<div class="condition-item good">' +
                            '<span class="check">✓</span>' +
                            '<span>矩阵是满秩的</span>' +
                        '</div>' +
                        '<div class="condition-item good">' +
                            '<span class="check">✓</span>' +
                            '<span>行向量线性无关</span>' +
                        '</div>' +
                        '<div class="condition-item good">' +
                            '<span class="check">✓</span>' +
                            '<span>变换不压缩空间维度</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🔄 观察逆变换</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="inv-btn active" data-m="rotate">旋转90°</button>' +
                    '<button class="inv-btn" data-m="shear">水平剪切</button>' +
                    '<button class="inv-btn" data-m="stretch">拉伸</button>' +
                    '<button class="inv-btn" data-m="flip">翻转</button>' +
                '</div>' +
                
                '<div class="inverse-animation-controls">' +
                    '<button class="anim-step-btn" id="show-original">1. 原始空间</button>' +
                    '<button class="anim-step-btn" id="show-transformed">2. 应用 M</button>' +
                    '<button class="anim-step-btn" id="show-inverse">3. 应用 M⁻¹</button>' +
                    '<button class="anim-step-btn primary" id="play-full">▶️ 完整演示</button>' +
                '</div>' +
                
                '<div class="matrix-pair-display">' +
                    '<div class="matrix-item">' +
                        '<span class="matrix-label">M = </span>' +
                        '<div class="matrix-display-small" id="inverse-m-display"></div>' +
                    '</div>' +
                    '<div class="matrix-item">' +
                        '<span class="matrix-label">M⁻¹ = </span>' +
                        '<div class="matrix-display-small" id="inverse-minv-display"></div>' +
                    '</div>' +
                    '<div class="matrix-item">' +
                        '<span class="matrix-label">det(M) = </span>' +
                        '<span class="det-value-small" id="inverse-det-display">1</span>' +
                    '</div>' +
                '</div>' +
                
                '<div class="step-info" id="inverse-step-info">' +
                    '选择一个变换，然后点击按钮观看逆变换演示。' +
                '</div>' +
            '</div>';
        
        var matrices = {
            rotate: {
                M: [[0, -1], [1, 0]],
                Minv: [[0, 1], [-1, 0]],
                det: 1
            },
            shear: {
                M: [[1, 1], [0, 1]],
                Minv: [[1, -1], [0, 1]],
                det: 1
            },
            stretch: {
                M: [[2, 0], [0, 0.5]],
                Minv: [[0.5, 0], [0, 2]],
                det: 1
            },
            flip: {
                M: [[-1, 0], [0, 1]],
                Minv: [[-1, 0], [0, 1]],
                det: -1
            }
        };
        
        var currentM = 'rotate';
        
        function updateMatrixDisplay(key) {
            var data = matrices[key];
            document.getElementById('inverse-m-display').innerHTML = formatSmallMatrix2(data.M);
            document.getElementById('inverse-minv-display').innerHTML = formatSmallMatrix2(data.Minv);
            document.getElementById('inverse-det-display').textContent = data.det;
        }
        
        function formatSmallMatrix2(m) {
            return '<table class="small-matrix-table">' +
                '<tr><td>' + m[0][0] + '</td><td>' + m[0][1] + '</td></tr>' +
                '<tr><td>' + m[1][0] + '</td><td>' + m[1][1] + '</td></tr>' +
                '</table>';
        }
        
        document.querySelectorAll('.inv-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.inv-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                currentM = btn.dataset.m;
                updateMatrixDisplay(currentM);
                animateToMatrix(matrices[currentM].M);
            });
        });
        
        document.getElementById('show-original').addEventListener('click', function() {
            animateToMatrix([[1, 0], [0, 1]]);
            document.getElementById('inverse-step-info').textContent = '原始空间：网格正交，单位正方形面积=1';
        });
        
        document.getElementById('show-transformed').addEventListener('click', function() {
            animateToMatrix(matrices[currentM].M);
            document.getElementById('inverse-step-info').textContent = '应用变换 M：空间被变形了';
        });
        
        document.getElementById('show-inverse').addEventListener('click', function() {
            animateToMatrix([[1, 0], [0, 1]]);
            document.getElementById('inverse-step-info').textContent = '应用逆变换 M⁻¹：空间恢复原状！';
        });
        
        document.getElementById('play-full').addEventListener('click', function() {
            animateToMatrix([[1, 0], [0, 1]]);
            document.getElementById('inverse-step-info').textContent = '原始空间...';
            
            setTimeout(function() {
                animateToMatrix(matrices[currentM].M);
                document.getElementById('inverse-step-info').textContent = '应用 M...';
            }, 1000);
            
            setTimeout(function() {
                animateToMatrix([[1, 0], [0, 1]]);
                document.getElementById('inverse-step-info').textContent = '应用 M⁻¹，回到原点！';
            }, 2000);
        });
        
        transformParams.customRender = renderTransformationScene;
        updateMatrixDisplay(currentM);
    }
    
    // ========== 第六章：特征值与特征向量 ==========
    
    function renderEigenChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"特征向量是变换中保持方向不变的特殊向量。"' +
                '</div>' +
                
                '<div class="eigen-intro">' +
                    '<p>对于大多数向量，变换后方向会改变。但<strong>特征向量</strong>是个例外：</p>' +
                    '<div class="eigen-formula">' +
                        'A v = <span class="lambda">λ</span> v' +
                    '</div>' +
                    '<p>变换后，它只被<strong>拉伸</strong>了 λ 倍，方向完全没变！</p>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">🎯</div>' +
                    '<div>' +
                        '<h4>为什么重要？</h4>' +
                        '<p>特征向量揭示了变换的<strong>"本质方向"</strong>。它们是理解复杂变换的关键。</p>' +
                        '<p class="example">例如：旋转变换的特征向量是旋转轴（3D），缩放变换的特征向量是坐标轴方向。</p>' +
                    '</div>' +
                '</div>' +
                
                '<div class="eigen-meaning">' +
                    '<h4>特征值的意义</h4>' +
                    '<div class="eigen-values">' +
                        '<div class="eigen-value-item">' +
                            '<span class="lambda">|λ| > 1</span>' +
                            '<span>：该方向被拉伸</span>' +
                        '</div>' +
                        '<div class="eigen-value-item">' +
                            '<span class="lambda">0 < |λ| < 1</span>' +
                            '<span>：该方向被压缩</span>' +
                        '</div>' +
                        '<div class="eigen-value-item">' +
                            '<span class="lambda">λ < 0</span>' +
                            '<span>：该方向被翻转</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '' +
            '<div class="control-group">' +
                '<h4 class="control-heading">🎯 观察特征向量</h4>' +
                '<div class="transform-buttons">' +
                    '<button class="eigen-btn active" data-m="stretch">非均匀拉伸</button>' +
                    '<button class="eigen-btn" data-m="shear">水平剪切</button>' +
                    '<button class="eigen-btn" data-m="diagonal">对角矩阵</button>' +
                    '<button class="eigen-btn" data-m="complex">复特征值</button>' +
                '</div>' +
                
                '<div class="eigen-display">' +
                    '<div class="eigen-info">' +
                        '<span class="info-label">矩阵 A = </span>' +
                        '<div class="matrix-display-small" id="eigen-m-display"></div>' +
                    '</div>' +
                    '<div class="eigen-values-display" id="eigen-values-display">' +
                        '特征值将在此显示...' +
                    '</div>' +
                '</div>' +
                
                '<div class="eigen-explanation" id="eigen-explanation">' +
                    '观察红色箭头：它们是特征向量，变换后方向保持不变！' +
                '</div>' +
            '</div>';
        
        var eigenMatrices = {
            stretch: {
                M: [[2, 0], [0, 0.5]],
                eigenvalues: [2, 0.5],
                eigenvectors: [[1, 0], [0, 1]],
                explanation: '这是对角矩阵。特征向量是坐标轴方向，特征值是对角元素。' +
                    'X轴被拉伸2倍（λ=2），Y轴被压缩（λ=0.5）。'
            },
            shear: {
                M: [[1, 1], [0, 1]],
                eigenvalues: [1, 1],
                eigenvectors: [[1, 0], [0, 0]],
                explanation: '剪切变换。只有一个特征方向（X轴），特征值为1。' +
                    '这是一个退化情况，称为"亏损矩阵"。'
            },
            diagonal: {
                M: [[3, 0], [0, -2]],
                eigenvalues: [3, -2],
                eigenvectors: [[1, 0], [0, 1]],
                explanation: '对角矩阵，特征值为3和-2。' +
                    '注意λ=-2：Y轴方向被拉伸2倍并翻转！'
            },
            complex: {
                M: [[0.5, -1], [1, 0.5]],
                eigenvalues: ['0.5+i', '0.5-i'],
                eigenvectors: null,
                explanation: '这个矩阵有复特征值！它表示旋转+缩放。' +
                    '在2D实空间中没有特征向量，因为所有方向都改变了。'
            }
        };
        
        function updateEigenDisplay(key) {
            var data = eigenMatrices[key];
            
            var html = '<table class="small-matrix-table">' +
                '<tr><td>' + data.M[0][0] + '</td><td>' + data.M[0][1] + '</td></tr>' +
                '<tr><td>' + data.M[1][0] + '</td><td>' + data.M[1][1] + '</td></tr>' +
                '</table>';
            document.getElementById('eigen-m-display').innerHTML = html;
            
            document.getElementById('eigen-explanation').textContent = data.explanation;
            
            var valHtml = '<div class="eigen-value-pair">';
            data.eigenvalues.forEach(function(val, i) {
                valHtml += '<div class="eigen-value-item">' +
                    '<span class="lambda">λ' + (i+1) + ' = ' + val + '</span>' +
                    (data.eigenvectors ? 
                        '<span class="eigen-vec">v' + (i+1) + ' = (' + data.eigenvectors[i][0] + ', ' + data.eigenvectors[i][1] + ')</span>' : '') +
                    '</div>';
            });
            valHtml += '</div>';
            document.getElementById('eigen-values-display').innerHTML = valHtml;
            
            animateToMatrix(data.M);
        }
        
        document.querySelectorAll('.eigen-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.eigen-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                updateEigenDisplay(btn.dataset.m);
            });
        });
        
        // 自定义渲染：绘制特征向量
        var originalRender = renderTransformationScene;
        transformParams.customRender = function(w, h, cx, cy, s) {
            originalRender(w, h, cx, cy, s);
            
            // 绘制原始基向量位置的特征向量方向
            var activeBtn = document.querySelector('.eigen-btn.active');
            if (activeBtn) {
                var key = activeBtn.dataset.m;
                var data = eigenMatrices[key];
                if (data && data.eigenvectors) {
                    var m = transformParams.matrix;
                    
                    // 绘制变换后的特征向量
                    data.eigenvectors.forEach(function(v, i) {
                        if (v[0] === 0 && v[1] === 0) return;
                        
                        var transformed = transformPoint(v, m);
                        var len = Math.sqrt(transformed[0] * transformed[0] + transformed[1] * transformed[1]);
                        if (len > 0) {
                            // 延长以便看清
                            var scale = 2 / len;
                            drawArrow(cx, cy, 
                                cx + transformed[0] * scale * s, 
                                cy - transformed[1] * scale * s, 
                                '#ff6b6b', 'λ' + (i+1));
                        }
                    });
                }
            }
        };
        
        updateEigenDisplay('stretch');
    }
    
    // ========== 第七章：网络与矩阵 ==========
    
    function renderNetworkChapter(expBox, ctrlBox) {
        expBox.innerHTML = '' +
            '<div class="explanation-content">' +
                '<div class="big-quote">' +
                    '"网络世界的本质，就是矩阵的世界。"' +
                '</div>' +
                
                '<div class="network-intro">' +
                    '<p>从<strong>社交网络</strong>到<strong>网页链接</strong>，从<strong>推荐系统</strong>到<strong>神经网络</strong>，矩阵无处不在。</p>' +
                '</div>' +
                
                '<div class="key-insight">' +
                    '<div class="insight-icon">🕸️</div>' +
                    '<div>' +
                        '<h4>邻接矩阵</h4>' +
                        '<p>用矩阵表示图：A[i][j] = 1 表示从节点 i 到节点 j 有一条边。</p>' +
                        '<p><strong>矩阵的幂 Aⁿ</strong> 表示 n 步路径的数量！</p>' +
                    '</div>' +
                '</div>' +
                
                '<div class="applications-grid">' +
                    '<div class="app-card">' +
                        '<div class="app-icon">🔍</div>' +
                        '<h4>Google PageRank</h4>' +
                        '<p>网页重要性 = 主特征向量</p>' +
                    '</div>' +
                    '<div class="app-card">' +
                        '<div class="app-icon">👥</div>' +
                        '<h4>社交网络</h4>' +
                        '<p>朋友的朋友 = 矩阵平方</p>' +
                    '</div>' +
                    '<div class="app-card">' +
                        '<div class="app-icon">🎬</div>' +
                        '<h4>推荐系统</h4>' +
                        '<p>协同过滤矩阵分解</p>' +
                    '</div>' +
                    '<div class="app-card">' +
                        '<div class="app-icon">🧠</div>' +
                        '<h4>神经网络</h4>' +
                        '<p>每层都是矩阵乘法</p>' +
                    '</div>' +
                '</div>' +
                
                '<div class="formula-box">' +
                    '<h4>PageRank 的核心思想</h4>' +
                    '<p>如果一个网页被很多重要网页链接，它也很重要。</p>' +
                    '<div class="pagerank-formula">' +
                        'PR(v) = α Σ (PR(u) / out(u)) + (1-α)/N' +
                    '</div>' +
                    '<p>这本质上是求链接矩阵的<strong>主特征向量</strong>！</p>' +
                '</div>' +
            '</div>';
        
        ctrlBox.innerHTML = '';
        
        var matrixInspector = document.getElementById('matrix-inspector');
        if (matrixInspector) {
            matrixInspector.innerHTML = '' +
                '<div class="control-group" style="margin-bottom: 1.5rem;">' +
                    '<h4 class="control-heading">🕸️ 选择网络拓扑</h4>' +
                    '<div class="network-selector">' +
                        '<button class="net-btn active" data-net="simple">简单链状</button>' +
                        '<button class="net-btn" data-net="star">星型网络</button>' +
                        '<button class="net-btn" data-net="cycle">环形网络</button>' +
                        '<button class="net-btn" data-net="web">网页链接</button>' +
                    '</div>' +
                '</div>' +
                
                '<div class="adjacency-matrix-display">' +
                    '<h4 class="control-heading">🔢 邻接矩阵 A（矩阵的幂）</h4>' +
                    '<div class="matrix-powers">' +
                        '<button class="power-btn" id="power-1">A¹ (直接链接)</button>' +
                        '<button class="power-btn" id="power-2">A² (2步路径)</button>' +
                        '<button class="power-btn" id="power-3">A³ (3步路径)</button>' +
                    '</div>' +
                    '<div id="adjacency-display" style="margin-top: 1rem;"></div>' +
                '</div>' +
                
                '<div class="power-explanation" id="power-explanation" style="margin-top: 1rem;">' +
                    '观察矩阵的幂如何揭示网络中的连接关系。Aⁿ[i][j] 表示从节点 i 到节点 j 的 n 步路径数量！' +
                '</div>' +
                
                '<div class="network-insight" style="margin-top: 1.5rem;">' +
                    '<h4 class="control-heading">💡 为什么这很重要？</h4>' +
                    '<div class="insight-content">' +
                        '<p><strong>PageRank</strong>：谷歌搜索排名的核心算法，本质上是求链接矩阵的<strong>主特征向量</strong>。</p>' +
                        '<p><strong>社交网络</strong>：A² 可以找出"朋友的朋友"，A³ 可以找出"朋友的朋友的朋友"。</p>' +
                        '<p><strong>推荐系统</strong>：通过矩阵分解，找出用户和物品之间的隐藏关系。</p>' +
                    '</div>' +
                '</div>';
        }
        
        // 网络定义
        var networks = {
            simple: {
                nodes: ['A', 'B', 'C', 'D'],
                edges: [[0,1], [1,2], [2,3]],
                description: 'A → B → C → D 的链状结构'
            },
            star: {
                nodes: ['中心', 'A', 'B', 'C', 'D'],
                edges: [[0,1], [0,2], [0,3], [0,4], [1,0], [2,0], [3,0], [4,0]],
                description: '中心节点连接所有其他节点'
            },
            cycle: {
                nodes: ['A', 'B', 'C', 'D'],
                edges: [[0,1], [1,2], [2,3], [3,0]],
                description: '环形结构，形成闭环'
            },
            web: {
                nodes: ['页A', '页B', '页C', '页D', '页E'],
                edges: [[0,1], [0,2], [1,2], [1,3], [2,3], [3,0], [3,4], [4,1], [4,2]],
                description: '模拟网页之间的链接关系'
            }
        };
        
        var currentNet = 'simple';
        var currentPower = 1;
        
        function createAdjacencyMatrix(net) {
            var n = net.nodes.length;
            var A = [];
            for (var i = 0; i < n; i++) {
                A[i] = [];
                for (var j = 0; j < n; j++) {
                    A[i][j] = 0;
                }
            }
            net.edges.forEach(function(e) {
                A[e[0]][e[1]] = 1;
            });
            return A;
        }
        
        function matrixPower(A, power) {
            var result = A.map(function(row) { return row.slice(); });
            for (var p = 1; p < power; p++) {
                result = MatrixOps.matrixMultiply(result, A);
            }
            return result;
        }
        
        function displayMatrix(M, labels) {
            var html = '<table class="adjacency-table">';
            html += '<tr><th></th>';
            labels.forEach(function(l) { html += '<th>' + l + '</th>'; });
            html += '</tr>';
            
            for (var i = 0; i < M.length; i++) {
                html += '<tr><th>' + labels[i] + '</th>';
                for (var j = 0; j < M[i].length; j++) {
                    var val = M[i][j];
                    var className = val > 0 ? 'cell-positive' : 'cell-zero';
                    html += '<td class="' + className + '">' + val + '</td>';
                }
                html += '</tr>';
            }
            html += '</table>';
            return html;
        }
        
        function drawNetwork(net) {
            var canvas = document.getElementById('network-canvas');
            if (!canvas) return;
            
            var ctx2 = canvas.getContext('2d');
            var w = canvas.width;
            var h = canvas.height;
            var cx = w / 2;
            var cy = h / 2;
            var n = net.nodes.length;
            var radius = Math.min(w, h) / 3;
            
            // 清空
            ctx2.fillStyle = '#0a0a15';
            ctx2.fillRect(0, 0, w, h);
            
            // 计算节点位置
            var positions = [];
            for (var i = 0; i < n; i++) {
                var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
                positions.push([
                    cx + radius * Math.cos(angle),
                    cy + radius * Math.sin(angle)
                ]);
            }
            
            // 绘制边
            ctx2.strokeStyle = 'rgba(0, 255, 136, 0.5)';
            ctx2.lineWidth = 2;
            net.edges.forEach(function(e) {
                var p1 = positions[e[0]];
                var p2 = positions[e[1]];
                ctx2.beginPath();
                ctx2.moveTo(p1[0], p1[1]);
                ctx2.lineTo(p2[0], p2[1]);
                ctx2.stroke();
                
                // 箭头
                var angle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
                var arrowSize = 8;
                ctx2.beginPath();
                ctx2.moveTo(p2[0], p2[1]);
                ctx2.lineTo(
                    p2[0] - arrowSize * Math.cos(angle - Math.PI / 6),
                    p2[1] - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                ctx2.moveTo(p2[0], p2[1]);
                ctx2.lineTo(
                    p2[0] - arrowSize * Math.cos(angle + Math.PI / 6),
                    p2[1] - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                ctx2.stroke();
            });
            
            // 绘制节点
            positions.forEach(function(p, i) {
                ctx2.fillStyle = '#16213e';
                ctx2.strokeStyle = '#00ff88';
                ctx2.lineWidth = 2;
                ctx2.beginPath();
                ctx2.arc(p[0], p[1], 20, 0, Math.PI * 2);
                ctx2.fill();
                ctx2.stroke();
                
                ctx2.fillStyle = '#fff';
                ctx2.font = 'bold 12px JetBrains Mono';
                ctx2.textAlign = 'center';
                ctx2.textBaseline = 'middle';
                ctx2.fillText(net.nodes[i], p[0], p[1]);
            });
        }
        
        function updateNetwork(key) {
            var net = networks[key];
            var A = createAdjacencyMatrix(net);
            var M = matrixPower(A, currentPower);
            
            document.getElementById('adjacency-display').innerHTML = 
                displayMatrix(M, net.nodes);
            
            var explanation = '';
            if (currentPower === 1) {
                explanation = 'A¹[i][j] = 1 表示从节点 ' + net.nodes[0] + ' 到 ' + net.nodes[1] + ' 有直接链接（1步路径）';
            } else if (currentPower === 2) {
                explanation = 'A²[i][j] 表示从 i 到 j 的 2 步路径数量。' + net.description;
            } else {
                explanation = 'A³[i][j] 表示从 i 到 j 的 3 步路径数量。矩阵的幂揭示了网络的连通性！';
            }
            document.getElementById('power-explanation').textContent = explanation;
        }
        
        document.querySelectorAll('.net-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.net-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                currentNet = btn.dataset.net;
                updateNetwork(currentNet);
            });
        });
        
        document.getElementById('power-1').addEventListener('click', function() {
            currentPower = 1;
            updateNetwork(currentNet);
        });
        
        document.getElementById('power-2').addEventListener('click', function() {
            currentPower = 2;
            updateNetwork(currentNet);
        });
        
        document.getElementById('power-3').addEventListener('click', function() {
            currentPower = 3;
            updateNetwork(currentNet);
        });
        
        transformParams.customRender = function(w, h, cx, cy, s) {
            var activeNetBtn = document.querySelector('.net-btn.active');
            var netKey = activeNetBtn ? activeNetBtn.dataset.net : 'simple';
            var net = networks[netKey];
            if (!net) return;
            
            var n = net.nodes.length;
            var radius = Math.min(w, h) / 3.5;
            var positions = [];
            
            for (var i = 0; i < n; i++) {
                var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
                positions.push([
                    cx + radius * Math.cos(angle),
                    cy + radius * Math.sin(angle)
                ]);
            }
            
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
            ctx.lineWidth = 2;
            net.edges.forEach(function(e) {
                var p1 = positions[e[0]];
                var p2 = positions[e[1]];
                
                ctx.beginPath();
                ctx.moveTo(p1[0], p1[1]);
                ctx.lineTo(p2[0], p2[1]);
                ctx.stroke();
                
                var angle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
                var arrowSize = 10;
                ctx.beginPath();
                ctx.moveTo(p2[0], p2[1]);
                ctx.lineTo(
                    p2[0] - arrowSize * Math.cos(angle - Math.PI / 6),
                    p2[1] - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                ctx.moveTo(p2[0], p2[1]);
                ctx.lineTo(
                    p2[0] - arrowSize * Math.cos(angle + Math.PI / 6),
                    p2[1] - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                ctx.stroke();
            });
            
            positions.forEach(function(p, i) {
                var gradient = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 35);
                gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p[0], p[1], 35, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#16213e';
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(p[0], p[1], 25, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 14px JetBrains Mono';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(net.nodes[i], p[0], p[1]);
            });
        };
        
        updateNetwork('simple');
    }
    
    // ========== 辅助函数 ==========
    
    function drawArrow(fromX, fromY, toX, toY, color, label) {
        var headLength = 12;
        var angle = Math.atan2(fromY - toY, toX - fromX);
        
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY + headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY + headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
        
        if (label) {
            ctx.font = 'bold 14px JetBrains Mono';
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            var labelX = toX + 15;
            var labelY = toY - 5;
            ctx.fillText(label, labelX, labelY);
        }
    }
    
    /**
     * 动画循环
     */
    function startAnimationLoop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        function animate() {
            // 更新动画进度
            if (transformParams.isAnimating && transformParams.animationStartTime) {
                var elapsed = performance.now() - transformParams.animationStartTime;
                var duration = 1000;
                var progress = Math.min(elapsed / duration, 1);
                var t = progress;
                t = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                
                transformParams.matrix[0][0] = transformParams.startMatrix[0][0] + 
                    (transformParams.endMatrix[0][0] - transformParams.startMatrix[0][0]) * t;
                transformParams.matrix[0][1] = transformParams.startMatrix[0][1] + 
                    (transformParams.endMatrix[0][1] - transformParams.startMatrix[0][1]) * t;
                transformParams.matrix[1][0] = transformParams.startMatrix[1][0] + 
                    (transformParams.endMatrix[1][0] - transformParams.startMatrix[1][0]) * t;
                transformParams.matrix[1][1] = transformParams.startMatrix[1][1] + 
                    (transformParams.endMatrix[1][1] - transformParams.startMatrix[1][1]) * t;
                
                if (progress >= 1) {
                    transformParams.isAnimating = false;
                    transformParams.matrix = transformParams.endMatrix.map(function(row) {
                        return row.slice();
                    });
                }
            }
            
            // 绘制
            drawScene();
            
            animationId = requestAnimationFrame(animate);
        }
        animate();
    }
    
    /**
     * 绘制场景
     */
    function drawScene() {
        if (!ctx || !canvas) return;
        
        var w = canvas.width;
        var h = canvas.height;
        var cx = w / 2;
        var cy = h / 2;
        var scale = 60;
        
        // 背景
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, w, h);
        
        // 绘制默认网格（如果没有自定义渲染）
        if (transformParams.customRender) {
            transformParams.customRender(w, h, cx, cy, scale);
        } else {
            // 默认绘制
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            
            for (var i = -10; i <= 10; i++) {
                ctx.beginPath();
                ctx.moveTo(cx - 10 * scale, cy - i * scale);
                ctx.lineTo(cx + 10 * scale, cy - i * scale);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(cx + i * scale, cy - 10 * scale);
                ctx.lineTo(cx + i * scale, cy + 10 * scale);
                ctx.stroke();
            }
            
            // 坐标轴
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - 10 * scale, cy);
            ctx.lineTo(cx + 10 * scale, cy);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(cx, cy - 10 * scale);
            ctx.lineTo(cx, cy + 10 * scale);
            ctx.stroke();
        }
    }
    
    /**
     * 清理资源
     */
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
