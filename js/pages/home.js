var HomePage = (function() {
    function render(container) {
        container.innerHTML = '' +
            '<section class="hero">' +
                '<div class="floating-math" style="top: 20%; left: 10%;">∫</div>' +
                '<div class="floating-math" style="top: 30%; right: 15%; animation-delay: 1s;">Σ</div>' +
                '<div class="floating-math" style="bottom: 25%; left: 20%; animation-delay: 2s;">∇</div>' +
                '<div class="floating-math" style="bottom: 35%; right: 10%; animation-delay: 0.5s;">λ</div>' +
                '<div class="floating-math" style="top: 50%; left: 5%; animation-delay: 1.5s;">A</div>' +
                '<div class="floating-math" style="top: 60%; right: 5%; animation-delay: 2.5s;">v</div>' +
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
                        '<a href="#/calculator" class="btn btn-secondary">' +
                            '<span>🧮</span> 矩阵计算器' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</section>' +
            '<section class="features-section">' +
                '<h2 class="section-title">核心 <span>功能</span></h2>' +
                '<div class="features-grid">' +
                    '<div class="feature-card" data-route="concepts">' +
                        '<div class="feature-icon">📖</div>' +
                        '<h3 class="feature-title">概念学习</h3>' +
                        '<p class="feature-desc">' +
                            '系统学习矩阵、行列式、向量空间、线性变换等核心概念，' +
                            '配合实例与公式详解，循序渐进掌握线性代数精髓' +
                        '</p>' +
                    '</div>' +
                    '<div class="feature-card" data-route="visualization">' +
                        '<div class="feature-icon">🎨</div>' +
                        '<h3 class="feature-title">可视化演示</h3>' +
                        '<p class="feature-desc">' +
                            '2D向量空间可视化，实时观察线性变换效果。' +
                            '旋转、缩放、剪切，亲眼见证矩阵如何改变空间' +
                        '</p>' +
                    '</div>' +
                    '<div class="feature-card" data-route="calculator">' +
                        '<div class="feature-icon">🔢</div>' +
                        '<h3 class="feature-title">矩阵计算器</h3>' +
                        '<p class="feature-desc">' +
                            '支持矩阵加减乘、转置、逆矩阵、行列式、' +
                            '秩等多种运算，步骤清晰，结果准确' +
                        '</p>' +
                    '</div>' +
                    '<div class="feature-card" data-route="concepts">' +
                        '<div class="feature-icon">💡</div>' +
                        '<h3 class="feature-title">实战例题</h3>' +
                        '<p class="feature-desc">' +
                            '精选典型例题与详细解析，' +
                            '帮助你理解理论知识并应用到实际问题中' +
                        '</p>' +
                    '</div>' +
                '</div>' +
            '</section>';
        
        initEventListeners(container);
    }

    function initEventListeners(container) {
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
