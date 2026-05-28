document.addEventListener('DOMContentLoaded', function() {
    AnimationUtils.createParticles('particles', 60);
    
    Navbar.init();
    
    Router.init();
    
    if (window.lucide) {
        lucide.createIcons();
    }
    
    console.log('线性代数学习网站已加载');
});

window.addEventListener('beforeunload', function() {
    if (VisualizationPage && VisualizationPage.cleanup) {
        VisualizationPage.cleanup();
    }
});
