var ConceptsPage = (function() {
    var concepts = [
        {
            id: 'matrix',
            title: '矩阵基础',
            content: '' +
                '<div class="content-header"><h2 class="content-title">矩阵基础</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">什么是矩阵？</h3>' +
                '<p class="content-text">矩阵是由数字、符号或表达式排列成的矩形数组。它是线性代数中最基本的对象之一，用于表示线性变换、系统方程组等。</p>' +
                '<div class="matrix-display"><table class="matrix-table"><tr><td>a<sub>11</sub></td><td>a<sub>12</sub></td></tr><tr><td>a<sub>21</sub></td><td>a<sub>22</sub></td></tr></table></div></div>' +
                '<div class="content-section"><h3 class="section-heading">矩阵的维度</h3>' +
                '<p class="content-text">一个有 m 行和 n 列的矩阵称为 m×n 矩阵（读作 m 乘 n）。例如，一个 3×2 矩阵有 3 行和 2 列。</p>' +
                '<div class="example-block"><div class="example-title">示例：3×2 矩阵</div>' +
                '<div class="matrix-display"><table class="matrix-table"><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr><tr><td>5</td><td>6</td></tr></table></div>' +
                '<p class="content-text" style="margin-top: 1rem;">这个矩阵有 3 行（水平方向）和 2 列（垂直方向），每一行用换行表示，每一列用水平排列的单元格表示。</p></div></div>' +
                '<div class="content-section"><h3 class="section-heading">特殊矩阵</h3>' +
                '<p class="content-text"><strong>方阵</strong>：行数与列数相等的矩阵（n×n）<br>' +
                '<strong>零矩阵</strong>：所有元素都为 0 的矩阵<br>' +
                '<strong>单位矩阵</strong>：主对角线上元素为 1，其余为 0 的方阵</p>' +
                '<div class="matrix-display"><span style="margin-right: 1rem; font-size: 1.2rem;">I<sub>3</sub> = </span>' +
                '<table class="matrix-table"><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td></tr></table></div></div>'
        },
        {
            id: 'determinant',
            title: '行列式',
            content: '' +
                '<div class="content-header"><h2 class="content-title">行列式</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">行列式的定义</h3>' +
                '<p class="content-text">行列式是一个从方阵映射到实数的函数，记为 det(A) 或 |A|。它可以看作是矩阵的"缩放因子"，表示线性变换对空间的拉伸或压缩程度。</p></div>' +
                '<div class="content-section"><h3 class="section-heading">2×2 矩阵的行列式</h3>' +
                '<div class="matrix-display"><span style="margin-right: 1rem; font-size: 1.2rem;">|A| = </span>' +
                '<table class="matrix-table" style="border: 2px solid; border-radius: 4px;"><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>' +
                '<span style="margin-left: 1rem; font-size: 1.2rem;">= ad - bc</span></div>' +
                '<div class="example-block"><div class="example-title">计算示例</div>' +
                '<div class="matrix-display"><span style="margin-right: 1rem; font-size: 1.2rem;">|A| = </span>' +
                '<table class="matrix-table" style="border: 2px solid; border-radius: 4px;"><tr><td>3</td><td>2</td></tr><tr><td>1</td><td>4</td></tr></table>' +
                '<span style="margin-left: 1rem; font-size: 1.2rem;">= 3×4 - 2×1 = 12 - 2 = 10</span></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">行列式的几何意义</h3>' +
                '<p class="content-text">对于 2×2 矩阵，行列式的绝对值表示矩阵所代表的线性变换对单位正方形面积的缩放比例。如果行列式为负，表示发生了镜像翻转。</p>' +
                '<div class="application-card">' +
                '<div class="app-icon">📐</div><div class="app-content"><h4>面积计算</h4>' +
                '<p>已知三个点坐标，用行列式可快速计算三角形面积。</p></div></div>' +
                '<p class="content-text"><strong>行列式 = 0</strong>：矩阵不可逆，变换将空间压缩到更低维度<br>' +
                '<strong>行列式 > 0</strong>：保持空间方向<br>' +
                '<strong>行列式 < 0</strong>：翻转空间方向</p></div>'
        },
        {
            id: 'matrix-multiply',
            title: '矩阵乘法',
            content: '' +
                '<div class="content-header"><h2 class="content-title">矩阵乘法</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">基本规则</h3>' +
                '<p class="content-text">矩阵乘法 C = A × B 要求 A 的列数等于 B 的行数。结果矩阵 C 的行数等于 A 的行数，列数等于 B 的列数。</p>' +
                '<div class="matrix-display">' +
                '<table class="matrix-table"><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>' +
                '<span style="margin: 0 1rem; font-size: 1.5rem;">×</span>' +
                '<table class="matrix-table"><tr><td>e</td><td>f</td></tr><tr><td>g</td><td>h</td></tr></table>' +
                '<span style="margin: 0 1rem; font-size: 1.5rem;">=</span>' +
                '<table class="matrix-table"><tr><td>ae+bg</td><td>af+bh</td></tr><tr><td>ce+dg</td><td>cf+dh</td></tr></table></div></div>' +
                '<div class="content-section"><h3 class="section-heading">3×2 乘以 2×3 示例</h3>' +
                '<div class="matrix-display" style="flex-wrap: wrap; gap: 0.5rem;">' +
                '<table class="matrix-table" style="font-size: 0.9rem;"><tr><td>1</td><td>2</td></tr><tr><td>3</td><td>4</td></tr><tr><td>5</td><td>6</td></tr></table>' +
                '<span style="margin: 0 0.5rem; font-size: 1.2rem;">×</span>' +
                '<table class="matrix-table" style="font-size: 0.9rem;"><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>5</td><td>6</td></tr></table>' +
                '<span style="margin: 0 0.5rem; font-size: 1.2rem;">=</span>' +
                '<table class="matrix-table" style="font-size: 0.9rem;"><tr><td>9</td><td>12</td><td>15</td></tr><tr><td>19</td><td>26</td><td>33</td></tr><tr><td>29</td><td>40</td><td>51</td></tr></table></div></div>' +
                '<div class="content-section"><h3 class="section-heading">生活中的应用</h3>' +
                '<div class="application-card"><div class="app-icon">🏪</div><div class="app-content"><h4>超市销售计算</h4>' +
                '<p>用矩阵乘法计算多家商店的销售总额。例如：3家商店、4种商品的销售数量 × 单价 = 各店销售额。</p></div></div>' +
                '<div class="application-card"><div class="app-icon">🎨</div><div class="app-content"><h4>图像处理</h4>' +
                '<p>图像滤镜本质上是矩阵与像素矩阵的卷积运算。模糊、锐化、边缘检测都是矩阵乘法的应用。</p></div></div></div>'
        },
        {
            id: 'inverse',
            title: '逆矩阵',
            content: '' +
                '<div class="content-header"><h2 class="content-title">逆矩阵</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">定义</h3>' +
                '<p class="content-text">如果方阵 A 存在另一个方阵 B，使得 A × B = B × A = I（单位矩阵），则称 B 是 A 的逆矩阵，记为 A<sup>-1</sup>。</p>' +
                '<div class="matrix-display">' +
                '<table class="matrix-table"><tr><td>2</td><td>1</td></tr><tr><td>1</td><td>1</td></tr></table>' +
                '<span style="margin: 0 1rem; font-size: 1.2rem;">×</span>' +
                '<table class="matrix-table"><tr><td>1</td><td>-1</td></tr><tr><td>-1</td><td>2</td></tr></table>' +
                '<span style="margin: 0 1rem; font-size: 1.2rem;">=</span>' +
                '<table class="matrix-table"><tr><td>1</td><td>0</td></tr><tr><td>0</td><td>1</td></tr></table></div></div>' +
                '<div class="content-section"><h3 class="section-heading">2×2 矩阵求逆公式</h3>' +
                '<div class="matrix-display"><span style="font-size: 1.2rem;">A<sup>-1</sup> = </span>' +
                '<span style="font-size: 1.2rem;">(1/det(A)) × </span>' +
                '<table class="matrix-table"><tr><td>d</td><td>-b</td></tr><tr><td>-c</td><td>a</td></tr></table></div></div>' +
                '<div class="content-section"><h3 class="section-heading">生活中的应用</h3>' +
                '<div class="application-card"><div class="app-icon">🛡️</div><div class="app-content"><h4>加密解密</h4>' +
                '<p>Hill 密码用矩阵加密消息，用逆矩阵解密。只有知道密钥（逆矩阵）才能还原原始信息。</p></div></div>' +
                '<div class="application-card"><div class="app-icon">🔧</div><div class="app-content"><h4>机器人运动学</h4>' +
                '<p>机器人手臂的位置控制需要正向和逆向运动学，逆矩阵用于从末端位置反推关节角度。</p></div></div></div>'
        },
        {
            id: 'vector-space',
            title: '向量空间',
            content: '' +
                '<div class="content-header"><h2 class="content-title">向量空间</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">什么是向量空间？</h3>' +
                '<p class="content-text">向量空间是一组满足加法和标量乘法公理的向量集合。简单来说，就是可以进行向量加法和数乘运算，且结果仍在同一空间中的集合。</p></div>' +
                '<div class="content-section"><h3 class="section-heading">基本性质</h3>' +
                '<p class="content-text"><strong>加法封闭性</strong>：u + v ∈ V<br>' +
                '<strong>标量乘法封闭性</strong>：cv ∈ V<br>' +
                '<strong>存在零向量</strong>：0 ∈ V<br>' +
                '<strong>存在逆元素</strong>：-v ∈ V<br>' +
                '<strong>结合律</strong>：u + (v + w) = (u + v) + w<br>' +
                '<strong>分配律</strong>：c(u + v) = cu + cv</p></div>' +
                '<div class="content-section"><h3 class="section-heading">基与维数</h3>' +
                '<p class="content-text"><strong>基</strong>：向量空间中一组线性无关的生成向量<br>' +
                '<strong>维数</strong>：基向量的个数，记为 dim(V)</p>' +
                '<div class="example-block"><div class="example-title">R³ 空间的标准基</div>' +
                '<p class="content-text">e<sub>1</sub> = [1, 0, 0]<sup>T</sup>（x轴方向）</p>' +
                '<p class="content-text">e<sub>2</sub> = [0, 1, 0]<sup>T</sup>（y轴方向）</p>' +
                '<p class="content-text">e<sub>3</sub> = [0, 0, 1]<sup>T</sup>（z轴方向）</p></div></div>'
        },
        {
            id: 'linear-transformation',
            title: '线性变换',
            content: '' +
                '<div class="content-header"><h2 class="content-title">线性变换</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">定义</h3>' +
                '<p class="content-text">线性变换 T: V → W 是满足以下两个条件的函数：<br><br>' +
                '<strong>加法保持</strong>：T(u + v) = T(u) + T(v)<br>' +
                '<strong>数乘保持</strong>：T(cv) = cT(v)</p></div>' +
                '<div class="content-section"><h3 class="section-heading">矩阵表示</h3>' +
                '<p class="content-text">每一个线性变换都可以用一个矩阵来表示。矩阵的列向量就是标准基向量在变换后的像。</p>' +
                '<div class="matrix-display"><span style="font-size: 1.2rem;">T(v) = A × v</span></div></div>' +
                '<div class="content-section"><h3 class="section-heading">常见变换</h3>' +
                '<p class="content-text"><strong>旋转变换</strong>（绕原点旋转 θ 角）：</p>' +
                '<div class="matrix-display"><span style="font-size: 1.1rem;">R<sub>θ</sub> = </span>' +
                '<table class="matrix-table"><tr><td>cosθ</td><td>-sinθ</td></tr><tr><td>sinθ</td><td>cosθ</td></tr></table></div>' +
                '<p class="content-text" style="margin-top: 1.5rem;"><strong>缩放变换</strong>（x方向 s<sub>x</sub>，y方向 s<sub>y</sub>）：</p>' +
                '<div class="matrix-display"><span style="font-size: 1.1rem;">S = </span>' +
                '<table class="matrix-table"><tr><td>s<sub>x</sub></td><td>0</td></tr><tr><td>0</td><td>s<sub>y</sub></td></tr></table></div>' +
                '<p class="content-text" style="margin-top: 1.5rem;"><strong>剪切变换</strong>：</p>' +
                '<div class="matrix-display"><span style="font-size: 1.1rem;">H = </span>' +
                '<table class="matrix-table"><tr><td>1</td><td>h</td></tr><tr><td>0</td><td>1</td></tr></table></div></div>'
        },
        {
            id: 'eigenvalue',
            title: '特征值与特征向量',
            content: '' +
                '<div class="content-header"><h2 class="content-title">特征值与特征向量</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">定义</h3>' +
                '<p class="content-text">对于方阵 A，如果存在非零向量 v 和标量 λ，使得：</p>' +
                '<div class="matrix-display"><span style="font-size: 1.2rem;">Av = λv</span></div>' +
                '<p class="content-text">则 λ 称为 A 的<strong>特征值</strong>，v 称为对应的<strong>特征向量</strong>。特征向量是那些在矩阵变换下只被拉伸而不改变方向的向量。</p></div>' +
                '<div class="content-section"><h3 class="section-heading">特征方程</h3>' +
                '<p class="content-text">特征值满足特征方程：</p>' +
                '<div class="matrix-display"><span style="font-size: 1.2rem;">det(A - λI) = 0</span></div>' +
                '<p class="content-text">其中 I 是单位矩阵。解这个方程可以得到所有特征值。</p></div>' +
                '<div class="content-section"><h3 class="section-heading">几何意义</h3>' +
                '<p class="content-text">特征向量表示矩阵变换中的"不变方向"。在这些方向上，向量只被拉伸或压缩（由特征值决定拉伸比例），而不会发生旋转。</p>' +
                '<p class="content-text"><strong>λ > 1</strong>：特征向量方向被拉伸<br>' +
                '<strong>0 < λ < 1</strong>：特征向量方向被压缩<br>' +
                '<strong>λ < 0</strong>：特征向量方向被翻转</p></div>' +
                '<div class="content-section"><h3 class="section-heading">应用</h3>' +
                '<div class="application-card"><div class="app-icon">📊</div><div class="app-content"><h4>数据降维 (PCA)</h4>' +
                '<p>主成分分析用特征值分解找到数据的主要变化方向，用于压缩高维数据。</p></div></div>' +
                '<div class="application-card"><div class="app-icon">🔍</div><div class="app-content"><h4>搜索引擎排名</h4>' +
                '<p>Google PageRank 算法本质上是求网页链接矩阵的主特征向量。</p></div></div>' +
                '<div class="application-card"><div class="app-icon">⚛️</div><div class="app-content"><h4>量子力学</h4>' +
                '<p>量子态的能量本征值就是哈密顿量矩阵的特征值。</p></div></div></div>'
        },
        {
            id: 'applications',
            title: '应用案例',
            content: '' +
                '<div class="content-header"><h2 class="content-title">生活与专业应用</h2></div>' +
                '<div class="content-section"><h3 class="section-heading">🏪 零售行业：销售预测</h3>' +
                '<div class="application-card"><div class="app-icon">🛒</div><div class="app-content"><h4>超市收银系统</h4>' +
                '<p>假设3家商店销售4种商品，用矩阵记录销售数量和单价：</p>' +
                '<div class="matrix-display" style="margin: 1rem 0; flex-wrap: wrap;">' +
                '<span style="font-size: 1rem;">销售数量 = </span>' +
                '<table class="matrix-table" style="font-size: 0.85rem;"><tr><td>120</td><td>80</td><td>200</td><td>50</td></tr><tr><td>90</td><td>150</td><td>120</td><td>80</td></tr><tr><td>200</td><td>60</td><td>180</td><td>100</td></tr></table>' +
                '</div>' +
                '<p>乘以单价向量，即可得到各店销售额矩阵。</p></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">🎮 游戏开发：3D 变换</h3>' +
                '<div class="application-card"><div class="app-icon">🎯</div><div class="app-content"><h4>角色移动与旋转</h4>' +
                '<p>游戏中角色的位置、旋转、缩放都用矩阵表示。模型矩阵 × 视图矩阵 × 投影矩阵，最终得到屏幕上的像素坐标。</p>' +
                '<p>矩阵乘法的顺序非常重要：先旋转后平移 ≠ 先平移后旋转。</p></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">🛡️ 密码学：Hill 密码</h3>' +
                '<div class="application-card"><div class="app-icon">🔐</div><div class="app-content"><h4>矩阵加密解密</h4>' +
                '<p>将字母映射为数字（A=0, B=1...），用密钥矩阵加密，用逆矩阵解密。</p>' +
                '<p>例：密钥矩阵 [[1, 2], [3, 4]]，明文 "HELLO" → 分组后矩阵相乘得到密文，接收方用逆矩阵还原。</p></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">📈 经济学：投入产出分析</h3>' +
                '<div class="application-card"><div class="app-icon">🏭</div><div class="app-content"><h4>Leontief 模型</h4>' +
                '<p>描述国民经济各部门之间的相互依赖关系：X = AX + Y</p>' +
                '<p>其中 A 是消耗系数矩阵，用逆矩阵求解：X = (I - A)<sup>-1</sup>Y</p></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">📷 计算机视觉：图像变换</h3>' +
                '<div class="application-card"><div class="app-icon">🖼️</div><div class="app-content"><h4>人脸对齐与校正</h4>' +
                '<p>人脸识别中，用仿射变换矩阵将倾斜的人脸校正到标准姿态。逆矩阵用于从校正图像还原到原始位置。</p></div></div></div>' +
                '<div class="content-section"><h3 class="section-heading">🚗 自动驾驶：卡尔曼滤波</h3>' +
                '<div class="application-card"><div class="app-icon">📍</div><div class="app-content"><h4>状态估计</h4>' +
                '<p>用矩阵表示车辆状态（位置、速度）和协方差，通过矩阵运算融合传感器数据，实时更新位置估计。</p></div></div></div>'
        }
    ];

    var currentConcept = 'matrix';

    function render(container) {
        var conceptLinks = concepts.map(function(c) {
            return '<li class="concept-item"><a class="concept-link ' + (c.id === currentConcept ? 'active' : '') + '" data-concept="' + c.id + '">' + c.title + '</a></li>';
        }).join('');

        container.innerHTML = '' +
            '<div class="concepts-page">' +
                '<aside class="sidebar">' +
                    '<h3 class="sidebar-title">📚 知识点</h3>' +
                    '<ul class="concept-list" id="concept-list">' + conceptLinks + '</ul>' +
                '</aside>' +
                '<main class="concept-content">' +
                    '<div id="concept-detail" class="concept-detail page-transition">' + getConceptContent(currentConcept) + '</div>' +
                '</main>' +
            '</div>';
        
        initEventListeners(container);
    }

    function getConceptContent(id) {
        var concept = null;
        for (var i = 0; i < concepts.length; i++) {
            if (concepts[i].id === id) {
                concept = concepts[i];
                break;
            }
        }
        return concept ? concept.content : '';
    }

    function initEventListeners(container) {
        var conceptLinks = container.querySelectorAll('.concept-link');
        conceptLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                var conceptId = link.dataset.concept;
                if (conceptId !== currentConcept) {
                    currentConcept = conceptId;
                    conceptLinks.forEach(function(l) {
                        l.classList.remove('active');
                    });
                    link.classList.add('active');
                    var detail = document.getElementById('concept-detail');
                    if (detail) {
                        detail.classList.remove('page-transition');
                        void detail.offsetWidth;
                        detail.innerHTML = getConceptContent(conceptId);
                        detail.classList.add('page-transition');
                    }
                }
            });
        });
    }

    return {
        render: render
    };
})();
