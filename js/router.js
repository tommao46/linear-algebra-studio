var Router = (function() {
    var routes = {
        '#/': { render: HomePage.render, name: 'home' },
        '#/concepts': { render: ConceptsPage.render, name: 'concepts' },
        '#/visualization': { render: VisualizationPage.render, name: 'visualization' },
        '#/calculator': { render: CalculatorPage.render, name: 'calculator' }
    };

    var currentRoute = null;

    function init() {
        window.addEventListener('hashchange', handleRouteChange);
        handleRouteChange();
    }

    function handleRouteChange() {
        var hash = window.location.hash || '#/';
        var route = routes[hash] || routes['#/'];
        
        if (currentRoute && currentRoute === 'visualization' && VisualizationPage.cleanup) {
            VisualizationPage.cleanup();
        }
        
        var container = document.getElementById('page-container');
        if (container && route) {
            container.innerHTML = '';
            route.render(container);
            Navbar.updateActiveNav(route.name);
            currentRoute = route.name;
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return {
        init: init
    };
})();
