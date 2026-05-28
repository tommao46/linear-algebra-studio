/**
 * 矩阵应用场景页面
 * 展示矩阵乘法和逆矩阵在生活与专业中的实际应用
 * 包含：图像处理、密码学、经济学、机器人学等交互式演示
 */
var ApplicationsPage = (function() {
    // 当前活动的应用场景
    var currentApp = 'image';
    
    // 所有应用场景定义
    var applications = [
        {
            id: 'image',
            title: '图像处理',
            icon: '🖼️',
            description: '图像卷积、滤镜变换',
            color: '#00ff88'
        },
        {
            id: 'crypto',
            title: '密码学',
            icon: '🔐',
            description: 'Hill密码加密解密',
            color: '#00bfff'
        },
        {
            id: 'economics',
            title: '经济学',
            icon: '📈',
            description: '投入产出分析',
            color: '#9b59b6'
        },
        {
            id: 'robotics',
            title: '机器人学',
            icon: '🤖',
            description: '运动学变换',
            color: '#ff6b6b'
        },
        {
            id: 'graphics',
            title: '计算机图形',
            icon: '🎮',
            description: '3D变换矩阵',
            color: '#f39c12'
        },
        {
            id: 'data',
            title: '数据分析',
            icon: '📊',
            description: '线性回归矩阵',
            color: '#1abc9c'
        }
    ];

    // 渲染主页面
    function render(container) {
        var appCards = applications.map(function(app, index) {
            return '' +
                '<div class="app-select-card" data-app="' + app.id + '" style="--app-color: ' + app.color + ';">' +
                    '<div class="app-select-icon">' + app.icon + '</div>' +
                    '<div class="app-select-info">' +
                        '<h3>' + app.title + '</h3>' +
                        '<p>' + app.description + '</p>' +
                    '</div>' +
                    '<div class="app-select-arrow">→</div>' +
                '</div>';
        }).join('');

        container.innerHTML = '' +
            '<div class="applications-page page-transition">' +
                '<h2 class="section-title" style="margin-bottom: 2rem;">矩阵 <span>应用场景</span></h2>' +
                '<p class="app-intro">探索矩阵乘法和逆矩阵在生活与专业中的实际应用。点击下方卡片进入交互式演示！</p>' +
                '<div class="apps-grid">' + appCards + '</div>' +
                '<div id="app-detail-container" class="app-detail-container"></div>' +
            '</div>';
        
        initEventListeners(container);
    }

    // 初始化事件监听
    function initEventListeners(container) {
        var appCards = container.querySelectorAll('.app-select-card');
        appCards.forEach(function(card) {
            card.addEventListener('click', function() {
                var appId = card.dataset.app;
                showAppDetail(appId);
                
                // 更新激活状态
                appCards.forEach(function(c) { c.classList.remove('active'); });
                card.classList.add('active');
            });
        });
    }

    // 显示应用详情
    function showAppDetail(appId) {
        currentApp = appId;
        var detailContainer = document.getElementById('app-detail-container');
        if (!detailContainer) return;

        var content = '';
        switch(appId) {
            case 'image':
                content = renderImageProcessing();
                break;
            case 'crypto':
                content = renderCrypto();
                break;
            case 'economics':
                content = renderEconomics();
                break;
            case 'robotics':
                content = renderRobotics();
                break;
            case 'graphics':
                content = renderGraphics();
                break;
            case 'data':
                content = renderDataAnalysis();
                break;
        }

        detailContainer.innerHTML = '' +
            '<div class="app-detail-card page-transition">' +
                '<button class="close-detail" id="close-detail">✕</button>' +
                content +
            '</div>';

        // 绑定详情页事件
        bindDetailEvents(appId);

        // 滚动到详情区域
        setTimeout(function() {
            detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    /**
     * 图像处理应用 - 卷积滤镜演示
     */
    function renderImageProcessing() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">🖼️</span> 图像处理 - 卷积滤镜</h2>' +
                '<p class="app-detail-desc">图像滤镜本质上是矩阵与像素矩阵的卷积运算。下面演示不同的卷积核对图像的变换效果。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">📐 卷积核矩阵</h3>' +
                    '<div class="filter-selector">' +
                        '<button class="filter-btn active" data-filter="identity">单位矩阵</button>' +
                        '<button class="filter-btn" data-filter="blur">模糊</button>' +
                        '<button class="filter-btn" data-filter="sharpen">锐化</button>' +
                        '<button class="filter-btn" data-filter="edge">边缘检测</button>' +
                        '<button class="filter-btn" data-filter="emboss">浮雕</button>' +
                    '</div>' +
                    '<div id="kernel-display" class="kernel-display">' +
                        '<div class="matrix-display" style="justify-content: center;">' +
                            '<table class="matrix-table">' +
                                '<tr><td>0</td><td>0</td><td>0</td></tr>' +
                                '<tr><td>0</td><td>1</td><td>0</td></tr>' +
                                '<tr><td>0</td><td>0</td><td>0</td></tr>' +
                            '</table>' +
                        '</div>' +
                    '</div>' +
                    '<div class="formula-explanation">' +
                        '<h4>💡 原理说明</h4>' +
                        '<p>卷积操作：将3×3核在图像上滑动，对应位置相乘后求和，得到新的像素值。</p>' +
                        '<div class="formula-box">' +
                            'O[x,y] = ΣΣ I[x+i,y+j] × K[i,j]' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">🎨 效果预览</h3>' +
                    '<div class="canvas-demo-container">' +
                        '<canvas id="image-canvas" class="demo-canvas" width="300" height="300"></canvas>' +
                        '<canvas id="filtered-canvas" class="demo-canvas" width="300" height="300"></canvas>' +
                    '</div>' +
                    '<div class="canvas-labels">' +
                        '<span>原始图像</span>' +
                        '<span>处理后图像</span>' +
                    '</div>' +
                    '<div class="control-row">' +
                        '<button class="action-btn" id="generate-pattern">🎲 生成测试图案</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * 密码学应用 - Hill密码
     */
    function renderCrypto() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">🔐</span> 密码学 - Hill密码</h2>' +
                '<p class="app-detail-desc">Hill密码使用矩阵加密消息，使用逆矩阵解密。这是矩阵逆的经典应用场景。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">🔑 密钥矩阵</h3>' +
                    '<div class="key-matrix-input">' +
                        '<div class="matrix-inputs" style="grid-template-columns: repeat(2, 1fr);">' +
                            '<input type="number" class="matrix-input key-input" id="k00" value="3" min="1" max="25">' +
                            '<input type="number" class="matrix-input key-input" id="k01" value="2" min="0" max="25">' +
                            '<input type="number" class="matrix-input key-input" id="k10" value="5" min="0" max="25">' +
                            '<input type="number" class="matrix-input key-input" id="k11" value="7" min="1" max="25">' +
                        '</div>' +
                        '<p class="hint-text" style="margin-top: 1rem;">行列式必须与26互质才能解密</p>' +
                        '<div class="inverse-preview" id="inverse-preview">' +
                            '<h4>逆矩阵（解密密钥）</h4>' +
                            '<div id="inverse-matrix-display">计算中...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="formula-explanation">' +
                        '<h4>💡 加密原理</h4>' +
                        '<div class="formula-box">' +
                            'C = (K × P) mod 26<br>' +
                            'P = (K⁻¹ × C) mod 26' +
                        '</div>' +
                        '<p>字母映射：A=0, B=1, ..., Z=25</p>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">✉️ 加密/解密演示</h3>' +
                    '<div class="crypto-input-section">' +
                        '<label class="input-label">输入明文（字母）</label>' +
                        '<input type="text" class="crypto-input" id="plaintext-input" value="HELLO" placeholder="输入要加密的文本">' +
                        '<div class="crypto-buttons">' +
                            '<button class="action-btn primary" id="encrypt-btn">🔒 加密</button>' +
                            '<button class="action-btn secondary" id="decrypt-btn">🔓 解密</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="crypto-result" id="crypto-result">' +
                        '<h4>结果</h4>' +
                        '<div class="result-box" id="crypto-output">等待输入...</div>' +
                    '</div>' +
                    '<div class="step-by-step-crypto" id="crypto-steps">' +
                        '<h4>📝 计算过程</h4>' +
                        '<div id="crypto-steps-content">输入文本后显示详细步骤</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * 经济学应用 - 投入产出分析
     */
    function renderEconomics() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">📈</span> 经济学 - 投入产出分析</h2>' +
                '<p class="app-detail-desc">Leontief投入产出模型使用逆矩阵计算经济系统的总产出需求。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">🏭 消耗系数矩阵 A</h3>' +
                    '<p class="panel-subtitle">3个部门：农业、工业、服务业</p>' +
                    '<div class="matrix-inputs" style="grid-template-columns: repeat(3, 1fr); max-width: 280px;">' +
                        '<input type="number" class="matrix-input eco-input" id="eco00" value="0.2" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco01" value="0.1" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco02" value="0.05" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco10" value="0.15" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco11" value="0.25" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco12" value="0.1" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco20" value="0.08" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco21" value="0.12" step="0.05">' +
                        '<input type="number" class="matrix-input eco-input" id="eco22" value="0.15" step="0.05">' +
                    '</div>' +
                    '<h3 class="panel-title" style="margin-top: 1.5rem;">📦 最终需求向量 Y</h3>' +
                    '<div class="vector-inputs">' +
                        '<input type="number" class="matrix-input" id="demand0" value="100" placeholder="农业">' +
                        '<input type="number" class="matrix-input" id="demand1" value="200" placeholder="工业">' +
                        '<input type="number" class="matrix-input" id="demand2" value="150" placeholder="服务业">' +
                    '</div>' +
                    '<div class="formula-explanation" style="margin-top: 1.5rem;">' +
                        '<h4>💡 Leontief模型</h4>' +
                        '<div class="formula-box">' +
                            'X = (I - A)⁻¹ × Y' +
                        '</div>' +
                        '<p>求各部门的总产出 X，满足中间需求+最终需求</p>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">📊 计算结果</h3>' +
                    '<button class="action-btn primary" id="calculate-economics" style="margin-bottom: 1rem;">🧮 计算总产出</button>' +
                    '<div class="eco-results" id="eco-results">' +
                        '<div class="result-card">' +
                            '<h4>(I - A) 矩阵</h4>' +
                            '<div id="ia-matrix" class="result-matrix-small">等待计算...</div>' +
                        '</div>' +
                        '<div class="result-card">' +
                            '<h4>(I - A)⁻¹ 逆矩阵（列昂惕夫逆）</h4>' +
                            '<div id="inverse-matrix" class="result-matrix-small">等待计算...</div>' +
                        '</div>' +
                        '<div class="result-card highlight">' +
                            '<h4>🎯 总产出 X</h4>' +
                            '<div id="total-output" class="output-result">等待计算...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="eco-interpretation" id="eco-interpretation">' +
                        '<h4>📝 结果解读</h4>' +
                        '<p>调整参数并点击计算，查看经济系统的总产出需求。</p>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * 机器人学应用 - 运动学变换
     */
    function renderRobotics() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">🤖</span> 机器人学 - 运动学变换</h2>' +
                '<p class="app-detail-desc">机器人手臂的位置控制使用齐次变换矩阵，逆矩阵用于从末端位置反推关节角度。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">🦾 2关节机械臂参数</h3>' +
                    '<div class="robot-controls">' +
                        '<div class="control-group">' +
                            '<label class="control-label">关节1长度 (L₁)</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="l1-slider" min="50" max="120" value="100">' +
                                '<span class="slider-value" id="l1-value">100px</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">关节2长度 (L₂)</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="l2-slider" min="40" max="100" value="80">' +
                                '<span class="slider-value" id="l2-value">80px</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">关节1角度 (θ₁)</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="theta1-slider" min="0" max="180" value="45">' +
                                '<span class="slider-value" id="theta1-value">45°</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">关节2角度 (θ₂)</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="theta2-slider" min="-180" max="180" value="30">' +
                                '<span class="slider-value" id="theta2-value">30°</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="formula-explanation">' +
                        '<h4>💡 正运动学公式</h4>' +
                        '<div class="formula-box">' +
                            'x = L₁cosθ₁ + L₂cos(θ₁+θ₂)<br>' +
                            'y = L₁sinθ₁ + L₂sin(θ₁+θ₂)' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">🎯 机械臂可视化</h3>' +
                    '<div class="robot-canvas-container">' +
                        '<canvas id="robot-canvas" class="robot-canvas" width="350" height="350"></canvas>' +
                    '</div>' +
                    '<div class="robot-position-info" id="robot-position">' +
                        '<div class="info-row">' +
                            '<span>末端位置 (x, y):</span>' +
                            '<span id="end-effector-pos" class="highlight-text">(0, 0)</span>' +
                        '</div>' +
                        '<div class="info-row">' +
                            '<span>总变换矩阵:</span>' +
                        '</div>' +
                        '<div id="transform-matrix-display" class="matrix-display" style="justify-content: center; margin-top: 0.5rem;"></div>' +
                    '</div>' +
                    '<div class="inverse-kinematics-section">' +
                        '<h4>🔄 逆运动学演示</h4>' +
                        '<p class="panel-subtitle">输入目标位置，计算关节角度</p>' +
                        '<div class="target-inputs">' +
                            '<input type="number" class="matrix-input" id="target-x" value="100" placeholder="X">' +
                            '<input type="number" class="matrix-input" id="target-y" value="100" placeholder="Y">' +
                            '<button class="action-btn" id="ik-btn">🤔 计算</button>' +
                        '</div>' +
                        '<div id="ik-result" class="ik-result"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * 计算机图形学应用 - 3D变换
     */
    function renderGraphics() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">🎮</span> 计算机图形 - 3D变换矩阵</h2>' +
                '<p class="app-detail-desc">游戏和3D图形中，所有几何变换都用4×4齐次坐标矩阵表示。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">📐 变换参数</h3>' +
                    '<div class="transform-controls">' +
                        '<div class="control-group">' +
                            '<label class="control-label">旋转 X 轴</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="rotX" min="-180" max="180" value="0">' +
                                '<span class="slider-value" id="rotX-val">0°</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">旋转 Y 轴</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="rotY" min="-180" max="180" value="30">' +
                                '<span class="slider-value" id="rotY-val">30°</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">旋转 Z 轴</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="rotZ" min="-180" max="180" value="0">' +
                                '<span class="slider-value" id="rotZ-val">0°</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="control-group">' +
                            '<label class="control-label">缩放</label>' +
                            '<div class="slider-container">' +
                                '<input type="range" class="slider" id="scale3d" min="0.5" max="2" step="0.1" value="1">' +
                                '<span class="slider-value" id="scale3d-val">1.0x</span>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="formula-explanation">' +
                        '<h4>💡 模型变换矩阵</h4>' +
                        '<div class="formula-box">' +
                            'M = T × R × S' +
                        '</div>' +
                        '<p>平移矩阵 × 旋转矩阵 × 缩放矩阵</p>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">🧊 3D立方体预览</h3>' +
                    '<div class="cube-canvas-container">' +
                        '<canvas id="cube-canvas" class="cube-canvas" width="350" height="350"></canvas>' +
                    '</div>' +
                    '<div class="graphics-matrix-display">' +
                        '<h4>🔢 组合变换矩阵 (4×4)</h4>' +
                        '<div id="3d-transform-matrix" class="matrix-display" style="justify-content: center; font-size: 0.8rem;"></div>' +
                    '</div>' +
                    '<div class="vertex-info">' +
                        '<h4>📌 变换后顶点</h4>' +
                        '<div id="vertex-display" class="vertex-grid">拖动滑块查看变换效果</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    /**
     * 数据分析应用 - 线性回归
     */
    function renderDataAnalysis() {
        return '' +
            '<div class="app-detail-header">' +
                '<h2><span class="app-icon-large">📊</span> 数据分析 - 线性回归</h2>' +
                '<p class="app-detail-desc">最小二乘法线性回归使用矩阵运算求解最优拟合直线参数。</p>' +
            '</div>' +
            '<div class="app-content-row">' +
                '<div class="app-left-panel">' +
                    '<h3 class="panel-title">📝 数据点</h3>' +
                    '<div class="data-points-list" id="data-points-list">' +
                        '<div class="data-point-row"><span>(1, 2)</span><span>(2, 4)</span><span>(3, 5)</span></div>' +
                        '<div class="data-point-row"><span>(4, 4)</span><span>(5, 5)</span><span>(6, 7)</span></div>' +
                    '</div>' +
                    '<div class="add-point-section">' +
                        '<input type="number" class="matrix-input" id="new-x" placeholder="X" style="width: 70px;">' +
                        '<input type="number" class="matrix-input" id="new-y" placeholder="Y" style="width: 70px;">' +
                        '<button class="action-btn" id="add-point-btn">➕ 添加</button>' +
                    '</div>' +
                    '<div class="preset-data">' +
                        '<h4>📦 预设数据集</h4>' +
                        '<div class="preset-buttons">' +
                            '<button class="preset-btn small" data-preset="linear">线性</button>' +
                            '<button class="preset-btn small" data-preset="noise">带噪声</button>' +
                            '<button class="preset-btn small" data-preset="quadratic">二次</button>' +
                            '<button class="preset-btn small" id="clear-data">🗑️ 清空</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="formula-explanation">' +
                        '<h4>💡 最小二乘法</h4>' +
                        '<div class="formula-box">' +
                            'β̂ = (XᵀX)⁻¹Xᵀy' +
                        '</div>' +
                        '<p>使用逆矩阵求解回归系数</p>' +
                    '</div>' +
                '</div>' +
                '<div class="app-right-panel">' +
                    '<h3 class="panel-title">📈 回归可视化</h3>' +
                    '<div class="regression-canvas-container">' +
                        '<canvas id="regression-canvas" class="regression-canvas" width="350" height="300"></canvas>' +
                    '</div>' +
                    '<div class="regression-results" id="regression-results">' +
                        '<div class="result-row">' +
                            '<span>拟合直线:</span>' +
                            '<span id="regression-line" class="highlight-text">y = ax + b</span>' +
                        '</div>' +
                        '<div class="result-row">' +
                            '<span>斜率 a:</span>' +
                            '<span id="slope-value">-</span>' +
                        '</div>' +
                        '<div class="result-row">' +
                            '<span>截距 b:</span>' +
                            '<span id="intercept-value">-</span>' +
                        '</div>' +
                        '<div class="result-row">' +
                            '<span>R² 决定系数:</span>' +
                            '<span id="r2-value">-</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="matrix-breakdown">' +
                        '<h4>🔢 矩阵分解</h4>' +
                        '<button class="action-btn" id="show-matrix-breakdown">📋 显示计算矩阵</button>' +
                        '<div id="matrix-breakdown-content" style="display: none; margin-top: 1rem;"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    // 绑定详情页事件
    function bindDetailEvents(appId) {
        // 关闭按钮
        var closeBtn = document.getElementById('close-detail');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                var container = document.getElementById('app-detail-container');
                if (container) {
                    container.innerHTML = '';
                }
                document.querySelectorAll('.app-select-card').forEach(function(c) {
                    c.classList.remove('active');
                });
            });
        }

        switch(appId) {
            case 'image':
                initImageProcessing();
                break;
            case 'crypto':
                initCrypto();
                break;
            case 'economics':
                initEconomics();
                break;
            case 'robotics':
                initRobotics();
                break;
            case 'graphics':
                initGraphics();
                break;
            case 'data':
                initDataAnalysis();
                break;
        }
    }

    // ========== 图像处理实现 ==========
    var imageDataPoints = null;
    
    function initImageProcessing() {
        var canvas1 = document.getElementById('image-canvas');
        var canvas2 = document.getElementById('filtered-canvas');
        
        if (!canvas1 || !canvas2) return;
        
        generatePattern(canvas1, canvas2);
        
        // 滤镜按钮
        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                applyFilter(btn.dataset.filter, canvas1, canvas2);
            });
        });
        
        // 生成图案按钮
        var genBtn = document.getElementById('generate-pattern');
        if (genBtn) {
            genBtn.addEventListener('click', function() {
                generatePattern(canvas1, canvas2);
                var activeFilter = document.querySelector('.filter-btn.active');
                if (activeFilter) {
                    applyFilter(activeFilter.dataset.filter, canvas1, canvas2);
                }
            });
        }
    }
    
    function generatePattern(canvas1, canvas2) {
        var ctx1 = canvas1.getContext('2d');
        var ctx2 = canvas2.getContext('2d');
        var w = canvas1.width;
        var h = canvas1.height;
        
        ctx1.fillStyle = '#1a1a2e';
        ctx1.fillRect(0, 0, w, h);
        
        for (var i = 0; i < 50; i++) {
            var x = Math.random() * w;
            var y = Math.random() * h;
            var size = Math.random() * 30 + 10;
            var hue = Math.random() * 360;
            
            ctx1.fillStyle = 'hsl(' + hue + ', 70%, 50%)';
            ctx1.fillRect(x - size/2, y - size/2, size, size);
        }
        
        imageDataPoints = ctx1.getImageData(0, 0, w, h);
        ctx2.putImageData(imageDataPoints, 0, 0);
    }
    
    function applyFilter(filterName, canvas1, canvas2) {
        if (!imageDataPoints) return;
        
        var ctx1 = canvas1.getContext('2d');
        var ctx2 = canvas2.getContext('2d');
        var w = canvas1.width;
        var h = canvas1.height;
        
        var filters = {
            identity: [[0,0,0],[0,1,0],[0,0,0]],
            blur: [[0.0625,0.125,0.0625],[0.125,0.25,0.125],[0.0625,0.125,0.0625]],
            sharpen: [[0,-1,0],[-1,5,-1],[0,-1,0]],
            edge: [[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],
            emboss: [[-2,-1,0],[-1,1,1],[0,1,2]]
        };
        
        var kernel = filters[filterName] || filters.identity;
        
        updateKernelDisplay(kernel);
        
        var src = imageDataPoints.data;
        var dst = ctx1.createImageData(w, h);
        var dstData = dst.data;
        
        for (var y = 1; y < h - 1; y++) {
            for (var x = 1; x < w - 1; x++) {
                var r = 0, g = 0, b = 0;
                
                for (var ky = -1; ky <= 1; ky++) {
                    for (var kx = -1; kx <= 1; kx++) {
                        var idx = ((y + ky) * w + (x + kx)) * 4;
                        var k = kernel[ky + 1][kx + 1];
                        r += src[idx] * k;
                        g += src[idx + 1] * k;
                        b += src[idx + 2] * k;
                    }
                }
                
                var idx2 = (y * w + x) * 4;
                dstData[idx2] = Math.max(0, Math.min(255, r));
                dstData[idx2 + 1] = Math.max(0, Math.min(255, g));
                dstData[idx2 + 2] = Math.max(0, Math.min(255, b));
                dstData[idx2 + 3] = 255;
            }
        }
        
        ctx2.putImageData(dst, 0, 0);
    }
    
    function updateKernelDisplay(kernel) {
        var display = document.getElementById('kernel-display');
        if (!display) return;
        
        var html = '<div class="matrix-display" style="justify-content: center;"><table class="matrix-table">';
        for (var i = 0; i < 3; i++) {
            html += '<tr>';
            for (var j = 0; j < 3; j++) {
                html += '<td>' + Number(kernel[i][j]).toFixed(3) + '</td>';
            }
            html += '</tr>';
        }
        html += '</table></div>';
        display.innerHTML = html;
    }

    // ========== 密码学实现 ==========
    function initCrypto() {
        // 监听密钥变化
        document.querySelectorAll('.key-input').forEach(function(input) {
            input.addEventListener('input', updateCryptoKeys);
        });
        
        // 加密按钮
        var encryptBtn = document.getElementById('encrypt-btn');
        if (encryptBtn) {
            encryptBtn.addEventListener('click', encryptMessage);
        }
        
        // 解密按钮
        var decryptBtn = document.getElementById('decrypt-btn');
        if (decryptBtn) {
            decryptBtn.addEventListener('click', decryptMessage);
        }
        
        updateCryptoKeys();
    }
    
    function getKeyMatrix() {
        return [
            [parseInt(document.getElementById('k00').value) || 0, parseInt(document.getElementById('k01').value) || 0],
            [parseInt(document.getElementById('k10').value) || 0, parseInt(document.getElementById('k11').value) || 0]
        ];
    }
    
    function mod26(n) {
        return ((n % 26) + 26) % 26;
    }
    
    function modInverse(a, m) {
        a = mod26(a);
        for (var x = 1; x < m; x++) {
            if (mod26(a * x) === 1) return x;
        }
        return null;
    }
    
    function updateCryptoKeys() {
        var K = getKeyMatrix();
        var det = K[0][0] * K[1][1] - K[0][1] * K[1][0];
        det = mod26(det);
        
        var display = document.getElementById('inverse-matrix-display');
        if (!display) return;
        
        var detInv = modInverse(det, 26);
        
        if (detInv === null) {
            display.innerHTML = '<span style="color: #ff6b6b;">❌ 行列式 ' + det + ' 与26不互质，无法解密</span>';
            return;
        }
        
        var Kinv = [
            [mod26(detInv * K[1][1]), mod26(detInv * (-K[0][1]))],
            [mod26(detInv * (-K[1][0])), mod26(detInv * K[0][0])]
        ];
        
        display.innerHTML = '' +
            '<div class="matrix-display" style="justify-content: center; margin-top: 0.5rem;">' +
                '<table class="matrix-table" style="font-size: 0.9rem;">' +
                    '<tr><td>' + Kinv[0][0] + '</td><td>' + Kinv[0][1] + '</td></tr>' +
                    '<tr><td>' + Kinv[1][0] + '</td><td>' + Kinv[1][1] + '</td></tr>' +
                '</table>' +
            '</div>' +
            '<p style="margin-top: 0.5rem; font-size: 0.85rem; color: #666;">det=' + det + ', det⁻¹=' + detInv + ' mod26</p>';
    }
    
    function textToVector(text) {
        var clean = text.toUpperCase().replace(/[^A-Z]/g, '');
        if (clean.length % 2 === 1) clean += 'X';
        var vectors = [];
        for (var i = 0; i < clean.length; i += 2) {
            vectors.push([clean.charCodeAt(i) - 65, clean.charCodeAt(i + 1) - 65]);
        }
        return { text: clean, vectors: vectors };
    }
    
    function encryptMessage() {
        var input = document.getElementById('plaintext-input');
        var output = document.getElementById('crypto-output');
        var steps = document.getElementById('crypto-steps-content');
        
        if (!input || !output || !steps) return;
        
        var K = getKeyMatrix();
        var data = textToVector(input.value);
        
        var det = mod26(K[0][0] * K[1][1] - K[0][1] * K[1][0]);
        if (modInverse(det, 26) === null) {
            output.innerHTML = '<span style="color: #ff6b6b;">❌ 密钥矩阵不可逆</span>';
            return;
        }
        
        var cipherVecs = [];
        var stepsHtml = '<div class="step-item"><strong>明文:</strong> ' + data.text + '</div>';
        
        for (var i = 0; i < data.vectors.length; i++) {
            var v = data.vectors[i];
            var cv = [
                mod26(K[0][0] * v[0] + K[0][1] * v[1]),
                mod26(K[1][0] * v[0] + K[1][1] * v[1])
            ];
            cipherVecs.push(cv);
            
            stepsHtml += '<div class="step-item">分组 ' + (i+1) + ': [' + v[0] + ',' + v[1] + '] × K = [' + cv[0] + ',' + cv[1] + '] → "' + 
                String.fromCharCode(65 + v[0]) + String.fromCharCode(65 + v[1]) + '" → "' + 
                String.fromCharCode(65 + cv[0]) + String.fromCharCode(65 + cv[1]) + '"</div>';
        }
        
        var cipherText = cipherVecs.map(function(v) {
            return String.fromCharCode(65 + v[0]) + String.fromCharCode(65 + v[1]);
        }).join('');
        
        output.innerHTML = '<div class="cipher-text">🔒 ' + cipherText + '</div>';
        steps.innerHTML = stepsHtml;
    }
    
    function decryptMessage() {
        var input = document.getElementById('plaintext-input');
        var output = document.getElementById('crypto-output');
        var steps = document.getElementById('crypto-steps-content');
        
        if (!input || !output || !steps) return;
        
        var K = getKeyMatrix();
        var det = mod26(K[0][0] * K[1][1] - K[0][1] * K[1][0]);
        var detInv = modInverse(det, 26);
        
        if (detInv === null) {
            output.innerHTML = '<span style="color: #ff6b6b;">❌ 密钥矩阵不可逆</span>';
            return;
        }
        
        var Kinv = [
            [mod26(detInv * K[1][1]), mod26(detInv * (-K[0][1]))],
            [mod26(detInv * (-K[1][0])), mod26(detInv * K[0][0])]
        ];
        
        var data = textToVector(input.value);
        var plainVecs = [];
        var stepsHtml = '<div class="step-item"><strong>密文:</strong> ' + data.text + '</div>';
        
        for (var i = 0; i < data.vectors.length; i++) {
            var v = data.vectors[i];
            var pv = [
                mod26(Kinv[0][0] * v[0] + Kinv[0][1] * v[1]),
                mod26(Kinv[1][0] * v[0] + Kinv[1][1] * v[1])
            ];
            plainVecs.push(pv);
            
            stepsHtml += '<div class="step-item">分组 ' + (i+1) + ': [' + v[0] + ',' + v[1] + '] × K⁻¹ = [' + pv[0] + ',' + pv[1] + '] → "' + 
                String.fromCharCode(65 + v[0]) + String.fromCharCode(65 + v[1]) + '" → "' + 
                String.fromCharCode(65 + pv[0]) + String.fromCharCode(65 + pv[1]) + '"</div>';
        }
        
        var plainText = plainVecs.map(function(v) {
            return String.fromCharCode(65 + v[0]) + String.fromCharCode(65 + v[1]);
        }).join('');
        
        output.innerHTML = '<div class="cipher-text">🔓 ' + plainText + '</div>';
        steps.innerHTML = stepsHtml;
    }

    // ========== 经济学实现 ==========
    function initEconomics() {
        var calcBtn = document.getElementById('calculate-economics');
        if (calcBtn) {
            calcBtn.addEventListener('click', calculateEconomics);
        }
    }
    
    function getEconomicsMatrix() {
        return [
            [parseFloat(document.getElementById('eco00').value) || 0, parseFloat(document.getElementById('eco01').value) || 0, parseFloat(document.getElementById('eco02').value) || 0],
            [parseFloat(document.getElementById('eco10').value) || 0, parseFloat(document.getElementById('eco11').value) || 0, parseFloat(document.getElementById('eco12').value) || 0],
            [parseFloat(document.getElementById('eco20').value) || 0, parseFloat(document.getElementById('eco21').value) || 0, parseFloat(document.getElementById('eco22').value) || 0]
        ];
    }
    
    function getDemandVector() {
        return [
            parseFloat(document.getElementById('demand0').value) || 0,
            parseFloat(document.getElementById('demand1').value) || 0,
            parseFloat(document.getElementById('demand2').value) || 0
        ];
    }
    
    function formatMatrixAsTable(matrix, decimals) {
        decimals = decimals || 2;
        var html = '<table class="matrix-table" style="font-size: 0.85rem;">';
        for (var i = 0; i < matrix.length; i++) {
            html += '<tr>';
            for (var j = 0; j < matrix[i].length; j++) {
                html += '<td>' + Number(matrix[i][j]).toFixed(decimals) + '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    }
    
    function calculateEconomics() {
        try {
            var A = getEconomicsMatrix();
            var Y = getDemandVector();
            
            // I - A
            var IminusA = [
                [1 - A[0][0], -A[0][1], -A[0][2]],
                [-A[1][0], 1 - A[1][1], -A[1][2]],
                [-A[2][0], -A[2][1], 1 - A[2][2]]
            ];
            
            var iaDisplay = document.getElementById('ia-matrix');
            if (iaDisplay) {
                iaDisplay.innerHTML = formatMatrixAsTable(IminusA);
            }
            
            // (I - A)⁻¹
            var inv = MatrixOps.matrixInverse(IminusA);
            var invDisplay = document.getElementById('inverse-matrix');
            if (invDisplay) {
                invDisplay.innerHTML = formatMatrixAsTable(inv, 3);
            }
            
            // X = (I-A)⁻¹ × Y
            var X = [
                inv[0][0] * Y[0] + inv[0][1] * Y[1] + inv[0][2] * Y[2],
                inv[1][0] * Y[0] + inv[1][1] * Y[1] + inv[1][2] * Y[2],
                inv[2][0] * Y[0] + inv[2][1] * Y[1] + inv[2][2] * Y[2]
            ];
            
            var outputDisplay = document.getElementById('total-output');
            if (outputDisplay) {
                outputDisplay.innerHTML = '' +
                    '<div class="output-item"><span class="dept-name">农业:</span> <span class="output-value">' + X[0].toFixed(2) + '</span></div>' +
                    '<div class="output-item"><span class="dept-name">工业:</span> <span class="output-value">' + X[1].toFixed(2) + '</span></div>' +
                    '<div class="output-item"><span class="dept-name">服务业:</span> <span class="output-value">' + X[2].toFixed(2) + '</span></div>';
            }
            
            // 解读
            var interp = document.getElementById('eco-interpretation');
            if (interp) {
                var maxDept = X[0] > X[1] ? (X[0] > X[2] ? '农业' : '服务业') : (X[1] > X[2] ? '工业' : '服务业');
                interp.innerHTML = '<p>为满足最终需求，各部门需要的总产出如上图。<strong>' + maxDept + '</strong> 部门的总产出需求最大。</p>';
            }
            
        } catch (e) {
            var outputDisplay = document.getElementById('total-output');
            if (outputDisplay) {
                outputDisplay.innerHTML = '<span style="color: #ff6b6b;">❌ ' + e.message + '</span>';
            }
        }
    }

    // ========== 机器人学实现 ==========
    function initRobotics() {
        var sliders = [
            { id: 'l1', param: 'L1', suffix: 'px' },
            { id: 'l2', param: 'L2', suffix: 'px' },
            { id: 'theta1', param: 'theta1', suffix: '°' },
            { id: 'theta2', param: 'theta2', suffix: '°' }
        ];
        
        sliders.forEach(function(s) {
            var slider = document.getElementById(s.id + '-slider');
            var valueEl = document.getElementById(s.id + '-value');
            if (slider && valueEl) {
                slider.addEventListener('input', function() {
                    valueEl.textContent = slider.value + s.suffix;
                    drawRobot();
                });
            }
        });
        
        var ikBtn = document.getElementById('ik-btn');
        if (ikBtn) {
            ikBtn.addEventListener('click', calculateInverseKinematics);
        }
        
        drawRobot();
    }
    
    function drawRobot() {
        var canvas = document.getElementById('robot-canvas');
        if (!canvas) return;
        
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        
        var L1 = parseInt(document.getElementById('l1-slider').value);
        var L2 = parseInt(document.getElementById('l2-slider').value);
        var t1 = parseInt(document.getElementById('theta1-slider').value) * Math.PI / 180;
        var t2 = parseInt(document.getElementById('theta2-slider').value) * Math.PI / 180;
        
        var originX = w / 2;
        var originY = h / 2 + 50;
        
        // 计算关节位置
        var joint1X = originX + L1 * Math.cos(t1);
        var joint1Y = originY - L1 * Math.sin(t1);
        var endX = joint1X + L2 * Math.cos(t1 + t2);
        var endY = joint1Y - L2 * Math.sin(t1 + t2);
        
        // 清空画布
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, w, h);
        
        // 绘制底座
        ctx.fillStyle = '#333';
        ctx.fillRect(originX - 40, originY, 80, 20);
        
        // 绘制连杆1
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(joint1X, joint1Y);
        ctx.stroke();
        
        // 绘制连杆2
        ctx.strokeStyle = '#00bfff';
        ctx.beginPath();
        ctx.moveTo(joint1X, joint1Y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // 绘制关节
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(originX, originY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(joint1X, joint1Y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制末端执行器
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(endX, endY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 更新位置显示
        var posDisplay = document.getElementById('end-effector-pos');
        if (posDisplay) {
            posDisplay.textContent = '(' + (endX - originX).toFixed(1) + ', ' + (originY - endY).toFixed(1) + ')';
        }
        
        // 变换矩阵显示
        var matrixDisplay = document.getElementById('transform-matrix-display');
        if (matrixDisplay) {
            var cosTotal = Math.cos(t1 + t2);
            var sinTotal = Math.sin(t1 + t2);
            var html = '<table class="matrix-table" style="font-size: 0.75rem;">' +
                '<tr><td>' + cosTotal.toFixed(2) + '</td><td>' + (-sinTotal).toFixed(2) + '</td><td>' + (endX - originX).toFixed(1) + '</td></tr>' +
                '<tr><td>' + sinTotal.toFixed(2) + '</td><td>' + cosTotal.toFixed(2) + '</td><td>' + (originY - endY).toFixed(1) + '</td></tr>' +
                '<tr><td>0</td><td>0</td><td>1</td></tr>' +
                '</table>';
            matrixDisplay.innerHTML = html;
        }
    }
    
    function calculateInverseKinematics() {
        var tx = parseFloat(document.getElementById('target-x').value) || 0;
        var ty = parseFloat(document.getElementById('target-y').value) || 0;
        var L1 = parseInt(document.getElementById('l1-slider').value);
        var L2 = parseInt(document.getElementById('l2-slider').value);
        var result = document.getElementById('ik-result');
        
        if (!result) return;
        
        var d = Math.sqrt(tx * tx + ty * ty);
        
        if (d > L1 + L2) {
            result.innerHTML = '<span style="color: #ff6b6b;">❌ 目标位置超出可达范围</span>';
            return;
        }
        if (d < Math.abs(L1 - L2)) {
            result.innerHTML = '<span style="color: #ff6b6b;">❌ 目标位置太近</span>';
            return;
        }
        
        var cosTheta2 = (tx * tx + ty * ty - L1 * L1 - L2 * L2) / (2 * L1 * L2);
        cosTheta2 = Math.max(-1, Math.min(1, cosTheta2));
        var theta2 = Math.acos(cosTheta2);
        
        var k1 = L1 + L2 * cosTheta2;
        var k2 = L2 * Math.sin(theta2);
        var theta1 = Math.atan2(ty, tx) - Math.atan2(k2, k1);
        
        // 转换为角度并设置滑块
        var t1Deg = theta1 * 180 / Math.PI;
        var t2Deg = theta2 * 180 / Math.PI;
        
        document.getElementById('theta1-slider').value = t1Deg;
        document.getElementById('theta1-value').textContent = t1Deg.toFixed(1) + '°';
        document.getElementById('theta2-slider').value = t2Deg;
        document.getElementById('theta2-value').textContent = t2Deg.toFixed(1) + '°';
        
        drawRobot();
        
        result.innerHTML = '<span style="color: #00ff88;">✓ 已计算关节角度并更新</span>';
    }

    // ========== 计算机图形学实现 ==========
    function initGraphics() {
        var sliders = ['rotX', 'rotY', 'rotZ', 'scale3d'];
        sliders.forEach(function(id) {
            var slider = document.getElementById(id);
            var valEl = document.getElementById(id + '-val');
            if (slider && valEl) {
                slider.addEventListener('input', function() {
                    var suffix = id === 'scale3d' ? 'x' : '°';
                    valEl.textContent = slider.value + suffix;
                    drawCube();
                });
            }
        });
        
        drawCube();
    }
    
    function multiplyMatrixVector(m, v) {
        return [
            m[0][0]*v[0] + m[0][1]*v[1] + m[0][2]*v[2] + m[0][3]*v[3],
            m[1][0]*v[0] + m[1][1]*v[1] + m[1][2]*v[2] + m[1][3]*v[3],
            m[2][0]*v[0] + m[2][1]*v[1] + m[2][2]*v[2] + m[2][3]*v[3],
            m[3][0]*v[0] + m[3][1]*v[1] + m[3][2]*v[2] + m[3][3]*v[3]
        ];
    }
    
    function multiply4x4(a, b) {
        var result = MatrixOps.createMatrix(4, 4, 0);
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }
    
    function drawCube() {
        var canvas = document.getElementById('cube-canvas');
        if (!canvas) return;
        
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        
        var rx = (parseFloat(document.getElementById('rotX').value) || 0) * Math.PI / 180;
        var ry = (parseFloat(document.getElementById('rotY').value) || 0) * Math.PI / 180;
        var rz = (parseFloat(document.getElementById('rotZ').value) || 0) * Math.PI / 180;
        var s = parseFloat(document.getElementById('scale3d').value) || 1;
        
        // 旋转矩阵
        var Rx = [
            [1, 0, 0, 0],
            [0, Math.cos(rx), -Math.sin(rx), 0],
            [0, Math.sin(rx), Math.cos(rx), 0],
            [0, 0, 0, 1]
        ];
        var Ry = [
            [Math.cos(ry), 0, Math.sin(ry), 0],
            [0, 1, 0, 0],
            [-Math.sin(ry), 0, Math.cos(ry), 0],
            [0, 0, 0, 1]
        ];
        var Rz = [
            [Math.cos(rz), -Math.sin(rz), 0, 0],
            [Math.sin(rz), Math.cos(rz), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        var S = [
            [s, 0, 0, 0],
            [0, s, 0, 0],
            [0, 0, s, 0],
            [0, 0, 0, 1]
        ];
        
        var M = multiply4x4(multiply4x4(Rz, multiply4x4(Ry, Rx)), S);
        
        // 立方体顶点
        var size = 80;
        var vertices = [
            [-size, -size, -size, 1], [size, -size, -size, 1],
            [size, size, -size, 1], [-size, size, -size, 1],
            [-size, -size, size, 1], [size, -size, size, 1],
            [size, size, size, 1], [-size, size, size, 1]
        ];
        
        // 变换顶点
        var transformed = vertices.map(function(v) {
            return multiplyMatrixVector(M, v);
        });
        
        // 投影到2D
        var projected = transformed.map(function(v) {
            var scale = 300 / (300 + v[2]);
            return [w / 2 + v[0] * scale, h / 2 + v[1] * scale, v[2]];
        });
        
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, w, h);
        
        // 绘制边
        var edges = [
            [0,1], [1,2], [2,3], [3,0],
            [4,5], [5,6], [6,7], [7,4],
            [0,4], [1,5], [2,6], [3,7]
        ];
        
        var faces = [
            { indices: [0,1,2,3], color: 'rgba(0,255,136,0.3)' },
            { indices: [4,5,6,7], color: 'rgba(0,191,255,0.3)' },
            { indices: [0,1,5,4], color: 'rgba(155,89,182,0.3)' },
            { indices: [2,3,7,6], color: 'rgba(255,107,107,0.3)' },
            { indices: [0,3,7,4], color: 'rgba(243,156,18,0.3)' },
            { indices: [1,2,6,5], color: 'rgba(26,188,156,0.3)' }
        ];
        
        // 按深度排序面
        faces.sort(function(a, b) {
            var avgZ_a = (projected[a.indices[0]][2] + projected[a.indices[1]][2] + projected[a.indices[2]][2] + projected[a.indices[3]][2]) / 4;
            var avgZ_b = (projected[b.indices[0]][2] + projected[b.indices[1]][2] + projected[b.indices[2]][2] + projected[b.indices[3]][2]) / 4;
            return avgZ_b - avgZ_a;
        });
        
        faces.forEach(function(face) {
            ctx.beginPath();
            ctx.moveTo(projected[face.indices[0]][0], projected[face.indices[0]][1]);
            for (var i = 1; i < face.indices.length; i++) {
                ctx.lineTo(projected[face.indices[i]][0], projected[face.indices[i]][1]);
            }
            ctx.closePath();
            ctx.fillStyle = face.color;
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        // 变换矩阵显示
        var matrixDisplay = document.getElementById('3d-transform-matrix');
        if (matrixDisplay) {
            matrixDisplay.innerHTML = formatMatrixAsTable(M, 2);
        }
        
        // 顶点显示
        var vertexDisplay = document.getElementById('vertex-display');
        if (vertexDisplay) {
            vertexDisplay.innerHTML = transformed.slice(0, 4).map(function(v, i) {
                return '<div class="vertex-item">V' + i + ': (' + v[0].toFixed(1) + ', ' + v[1].toFixed(1) + ', ' + v[2].toFixed(1) + ')</div>';
            }).join('');
        }
    }

    // ========== 数据分析实现 ==========
    var regressionData = [
        [1, 2], [2, 4], [3, 5], [4, 4], [5, 5], [6, 7]
    ];
    
    function initDataAnalysis() {
        var addBtn = document.getElementById('add-point-btn');
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                var x = parseFloat(document.getElementById('new-x').value);
                var y = parseFloat(document.getElementById('new-y').value);
                if (!isNaN(x) && !isNaN(y)) {
                    regressionData.push([x, y]);
                    updateDataPointsList();
                    calculateRegression();
                }
            });
        }
        
        var clearBtn = document.getElementById('clear-data');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                regressionData = [];
                updateDataPointsList();
                calculateRegression();
            });
        }
        
        document.querySelectorAll('.preset-btn.small[data-preset]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                loadPresetData(btn.dataset.preset);
            });
        });
        
        var breakdownBtn = document.getElementById('show-matrix-breakdown');
        if (breakdownBtn) {
            breakdownBtn.addEventListener('click', function() {
                var content = document.getElementById('matrix-breakdown-content');
                if (content) {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
        
        updateDataPointsList();
        calculateRegression();
    }
    
    function loadPresetData(preset) {
        switch(preset) {
            case 'linear':
                regressionData = [];
                for (var i = 1; i <= 8; i++) {
                    regressionData.push([i, 2 * i + 1]);
                }
                break;
            case 'noise':
                regressionData = [];
                for (var j = 1; j <= 10; j++) {
                    regressionData.push([j, 1.5 * j + 2 + (Math.random() - 0.5) * 4]);
                }
                break;
            case 'quadratic':
                regressionData = [];
                for (var k = 1; k <= 8; k++) {
                    regressionData.push([k, k * k * 0.3 + 1]);
                }
                break;
        }
        updateDataPointsList();
        calculateRegression();
    }
    
    function updateDataPointsList() {
        var list = document.getElementById('data-points-list');
        if (!list) return;
        
        var html = '';
        for (var i = 0; i < regressionData.length; i += 3) {
            html += '<div class="data-point-row">';
            for (var j = i; j < Math.min(i + 3, regressionData.length); j++) {
                html += '<span>(' + regressionData[j][0].toFixed(1) + ', ' + regressionData[j][1].toFixed(1) + ')</span>';
            }
            html += '</div>';
        }
        list.innerHTML = html || '<div class="data-point-row"><span style="color: #666;">暂无数据</span></div>';
    }
    
    function calculateRegression() {
        var canvas = document.getElementById('regression-canvas');
        if (!canvas || regressionData.length < 2) {
            if (canvas) {
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#0a0a15';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#666';
                ctx.textAlign = 'center';
                ctx.fillText('至少需要2个数据点', canvas.width / 2, canvas.height / 2);
            }
            return;
        }
        
        var n = regressionData.length;
        var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        for (var i = 0; i < n; i++) {
            var x = regressionData[i][0];
            var y = regressionData[i][1];
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        }
        
        var a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        var b = (sumY - a * sumX) / n;
        
        // R²
        var yMean = sumY / n;
        var ssTotal = 0, ssRes = 0;
        for (var k = 0; k < n; k++) {
            var pred = a * regressionData[k][0] + b;
            ssTotal += Math.pow(regressionData[k][1] - yMean, 2);
            ssRes += Math.pow(regressionData[k][1] - pred, 2);
        }
        var r2 = ssTotal > 0 ? 1 - ssRes / ssTotal : 0;
        
        document.getElementById('slope-value').textContent = a.toFixed(4);
        document.getElementById('intercept-value').textContent = b.toFixed(4);
        document.getElementById('r2-value').textContent = r2.toFixed(4);
        document.getElementById('regression-line').textContent = 
            'y = ' + a.toFixed(2) + 'x' + (b >= 0 ? ' + ' : ' - ') + Math.abs(b).toFixed(2);
        
        drawRegression(canvas, a, b);
        
        // 矩阵分解
        var breakdown = document.getElementById('matrix-breakdown-content');
        if (breakdown) {
            var X = [];
            for (var m = 0; m < n; m++) {
                X.push([1, regressionData[m][0]]);
            }
            var XT = MatrixOps.matrixTranspose(X);
            var XTX = MatrixOps.matrixMultiply(XT, X);
            var XTXinv = MatrixOps.matrixInverse(XTX);
            var yVec = regressionData.map(function(p) { return [p[1]]; });
            var XTy = MatrixOps.matrixMultiply(XT, yVec);
            var beta = MatrixOps.matrixMultiply(XTXinv, XTy);
            
            breakdown.innerHTML = '' +
                '<div class="breakdown-section"><h5>设计矩阵 X (' + n + '×2)</h5>' + formatMatrixAsTable(X.slice(0, 5), 0) + (n > 5 ? '...' : '') + '</div>' +
                '<div class="breakdown-section"><h5>XᵀX</h5>' + formatMatrixAsTable(XTX, 2) + '</div>' +
                '<div class="breakdown-section"><h5>(XᵀX)⁻¹</h5>' + formatMatrixAsTable(XTXinv, 4) + '</div>' +
                '<div class="breakdown-section"><h5>β̂ = (XᵀX)⁻¹Xᵀy</h5>' + formatMatrixAsTable(beta, 4) + '</div>';
        }
    }
    
    function drawRegression(canvas, a, b) {
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        var padding = 40;
        
        var minX = Math.min.apply(null, regressionData.map(function(p) { return p[0]; }));
        var maxX = Math.max.apply(null, regressionData.map(function(p) { return p[0]; }));
        var minY = Math.min.apply(null, regressionData.map(function(p) { return p[1]; }));
        var maxY = Math.max.apply(null, regressionData.map(function(p) { return p[1]; }));
        
        var rangeX = maxX - minX || 1;
        var rangeY = maxY - minY || 1;
        minX -= rangeX * 0.1;
        maxX += rangeX * 0.1;
        minY -= rangeY * 0.1;
        maxY += rangeY * 0.1;
        
        function toCanvasX(x) {
            return padding + (x - minX) / (maxX - minX) * (w - 2 * padding);
        }
        function toCanvasY(y) {
            return h - padding - (y - minY) / (maxY - minY) * (h - 2 * padding);
        }
        
        ctx.fillStyle = '#0a0a15';
        ctx.fillRect(0, 0, w, h);
        
        // 坐标轴
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, h - padding);
        ctx.lineTo(w - padding, h - padding);
        ctx.stroke();
        
        // 网格
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for (var g = 0; g <= 5; g++) {
            ctx.beginPath();
            ctx.moveTo(padding + g * (w - 2 * padding) / 5, padding);
            ctx.lineTo(padding + g * (w - 2 * padding) / 5, h - padding);
            ctx.moveTo(padding, padding + g * (h - 2 * padding) / 5);
            ctx.lineTo(w - padding, padding + g * (h - 2 * padding) / 5);
            ctx.stroke();
        }
        
        // 回归线
        var lineX1 = minX;
        var lineY1 = a * lineX1 + b;
        var lineX2 = maxX;
        var lineY2 = a * lineX2 + b;
        
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(lineX1), toCanvasY(lineY1));
        ctx.lineTo(toCanvasX(lineX2), toCanvasY(lineY2));
        ctx.stroke();
        
        // 数据点
        for (var i = 0; i < regressionData.length; i++) {
            var cx = toCanvasX(regressionData[i][0]);
            var cy = toCanvasY(regressionData[i][1]);
            
            ctx.fillStyle = '#00bfff';
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        // 轴标签
        ctx.fillStyle = '#666';
        ctx.font = '12px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('X', w / 2, h - 10);
        ctx.save();
        ctx.translate(15, h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Y', 0, 0);
        ctx.restore();
    }

    return {
        render: render
    };
})();
