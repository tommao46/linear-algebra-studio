/**
 * 路由系统模块
 * 管理单页应用的页面导航和渲染
 * 基于哈希路由实现，无需后端支持
 */
var Router = (function() {
    /**
     * 路由配置表
     * key: 哈希路径
     * value: { render: 渲染函数, name: 路由名称 }
     */
    var routes = {
        '#/': { render: HomePage.render, name: 'home' },
        '#/concepts': { render: ConceptsPage.render, name: 'concepts' },
        '#/visualization': { render: VisualizationPage.render, name: 'visualization' },
        '#/calculator': { render: CalculatorPage.render, name: 'calculator' },
        '#/applications': { render: ApplicationsPage.render, name: 'applications' },
        '#/essence': { render: EssencePage.render, name: 'essence' }
    };

    /**
     * 当前激活的路由名称
     * 用于在路由切换时清理资源（如Canvas动画）
     */
    var currentRoute = null;

    /**
     * 初始化路由系统
     * 监听哈希变化事件，并执行初始路由
     */
    function init() {
        window.addEventListener('hashchange', handleRouteChange);
        handleRouteChange();
    }

    /**
     * 处理路由变化
     * 根据当前哈希值找到对应路由，执行清理和渲染
     */
    function handleRouteChange() {
        // 获取当前哈希，如果没有则使用首页
        var hash = window.location.hash || '#/';
        var route = routes[hash] || routes['#/'];
        
        // 可视化页面需要特殊清理（取消Canvas动画）
        if (currentRoute && currentRoute === 'visualization' && VisualizationPage.cleanup) {
            VisualizationPage.cleanup();
        }
        // 线性代数本质页面也需要清理动画
        if (currentRoute && currentRoute === 'essence' && EssencePage.cleanup) {
            EssencePage.cleanup();
        }
        
        // 渲染新页面
        var container = document.getElementById('page-container');
        if (container && route) {
            container.innerHTML = '';
            route.render(container);
            Navbar.updateActiveNav(route.name);
            currentRoute = route.name;
            
            // 平滑滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return {
        init: init
    };
})();
