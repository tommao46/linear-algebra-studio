/**
 * 首页模块
 * 包含英雄区域展示、功能卡片入口
 */
var HomePage = (function() {
    /**
     * 渲染首页
     * @param {HTMLElement} container - 页面容器元素
     */
    function render(container) {
        container.innerHTML = '' +
            '<section class="hero">' +
                // 浮动数学符号装饰
                '<div class="floating-math" style="top: 20%; left: 10%;">∫</div>' +
                '<div class="floating-math" style="top: 30%; right: 15%; animation-delay: 1s;">Σ</div>' +
                '<div class="floating-math" style="bottom: 25%; left: 20%; animation-delay: 2s;">∇</div>' +
                '<div class="floating-math" style="bottom: 35%; right: 10%; animation-delay: 0.5s;">λ</div>' +
                '<div class="floating-math" style="top: 50%; left: 5%; animation-delay: 1.5s;">A</div>' +
                '<div class="floating-math" style="top: 60%; right: 5%; animation-delay: 2.5s;">v</div>' +
                
                // 英雄区域内容
                '<div class="hero-content">' +
                    '<h1 class="hero-title">线性代数</h1>' +
                    '<p class="hero-subtitle">' +
                        '探索矩阵、向量空间与线性变换的奥秘<br>' +
                        '通过可视化演示和交互式计算器，让抽象数学变得直观易懂' +
                    '</p>' +
                    '<div class="hero-buttons">' +
                        '<a href="#/concepts" class="btn btn-primary">' +
                            '<span>📚</span> 开始学习' +
                        '</a>' +
                        '<a href="#/applications" class="btn btn-secondary">' +
                            '<span>🚀</span> 应用场景' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</section>' +
            
            // 核心功能展示区
            '<section class="features-section">' +
                '<h2 class="section-title">核心 <span>功能</span></h2>' +
                '<div class="features-grid">' +
                    // 概念学习卡片
                    '<div class="feature-card" data-route="concepts">' +
                        '<div class="feature-icon">📖</div>' +
                        '<h3 class="feature-title">概念学习</h3>' +
                        '<p class="feature-desc">' +
                            '系统学习矩阵、行列式、向量空间、线性变换等核心概念，' +
                            '配合实例与公式详解，循序渐进掌握线性代数精髓' +
                        '</p>' +
                    '</div>' +
                    
                    // 可视化演示卡片
                    '<div class="feature-card" data-route="visualization">' +
                        '<div class="feature-icon">🎨</div>' +
                        '<h3 class="feature-title">可视化演示</h3>' +
                        '<p class="feature-desc">' +
                            '2D向量空间可视化，实时观察线性变换效果。' +
                            '旋转、缩放、剪切，亲眼见证矩阵如何改变空间' +
                        '</p>' +
                    '</div>' +
                    
                    // 矩阵计算器卡片
                    '<div class="feature-card" data-route="calculator">' +
                        '<div class="feature-icon">🔢</div>' +
                        '<h3 class="feature-title">矩阵计算器</h3>' +
                        '<p class="feature-desc">' +
                            '支持矩阵加减乘、转置、逆矩阵、行列式、' +
                            '秩等多种运算，步骤清晰，结果准确' +
                        '</p>' +
                    '</div>' +
                    
                    // 应用场景卡片
                    '<div class="feature-card" data-route="applications">' +
                        '<div class="feature-icon">🚀</div>' +
                        '<h3 class="feature-title">应用场景</h3>' +
                        '<p class="feature-desc">' +
                            '探索矩阵在图像处理、密码学、机器人学、' +
                            '经济学、游戏开发、数据分析中的实际应用' +
                        '</p>' +
                    '</div>' +
                    
                    // 线性代数本质卡片（3Blue1Brown风格）
                    '<div class="feature-card" data-route="essence">' +
                        '<div class="feature-icon">💡</div>' +
                        '<h3 class="feature-title">线性代数本质</h3>' +
                        '<p class="feature-desc">' +
                            '以几何视角理解线性代数的深层含义。' +
                            '从向量、线性变换到特征值、网络矩阵，7个章节交互式讲解' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</section>';
        
        // 初始化事件监听
        initEventListeners(container);
    }

    /**
     * 初始化事件监听器
     * @param {HTMLElement} container - 页面容器元素
     */
    function initEventListeners(container) {
        // 功能卡片点击事件：跳转到对应页面
        var featureCards = container.querySelectorAll('.feature-card');
        featureCards.forEach(function(card) {
            card.addEventListener('click', function() {
                var route = card.dataset.route;
                if (route) {
                    window.location.hash = '/' + route;
                }
            });
        });
    }

    return {
        render: render
    };
})();
