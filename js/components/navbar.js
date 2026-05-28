/**
 * 导航栏组件
 * 处理滚动效果、汉堡菜单和导航链接高亮
 */
var Navbar = (function() {
    // 初始化导航栏
    function init() {
        var navbar = document.getElementById('navbar');
        var hamburger = document.querySelector('.hamburger');
        var navMenu = document.querySelector('.nav-menu');
        var navLinks = document.querySelectorAll('.nav-link');

        // 滚动效果：添加阴影和背景
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 汉堡菜单点击事件（移动端）
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                var bars = hamburger.querySelectorAll('.bar');
                if (hamburger.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        }

        // 点击导航链接时关闭菜单
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    var bars = hamburger.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    // 更新当前活动的导航链接
    function updateActiveNav(route) {
        var navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.dataset.route === route) {
                link.classList.add('active');
            }
        });
    }

    return {
        init: init,
        updateActiveNav: updateActiveNav
    };
})();
