var AnimationUtils = (function() {
    var animationId = null;
    var particles = [];

    function createParticles(containerId, count) {
        if (count === undefined) count = 50;
        var container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        for (var i = 0; i < count; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            var colors = ['#00ff88', '#00bfff', '#9b59b6', '#ff6b6b'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(particle);
        }
    }

    function typeWriter(element, text, speed) {
        if (speed === undefined) speed = 100;
        return new Promise(function(resolve) {
            var i = 0;
            element.textContent = '';
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            type();
        });
    }

    function smoothScroll(target) {
        var element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function animateValue(element, start, end, duration, prefix, suffix) {
        if (prefix === undefined) prefix = '';
        if (suffix === undefined) suffix = '';
        var startTime = performance.now();
        function update(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var current = start + (end - start) * easeProgress;
            element.textContent = prefix + current.toFixed(0) + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    function fadeIn(element, duration) {
        if (duration === undefined) duration = 300;
        return new Promise(function(resolve) {
            element.style.opacity = '0';
            element.style.transition = 'opacity ' + duration + 'ms ease';
            requestAnimationFrame(function() {
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            });
        });
    }

    function fadeOut(element, duration) {
        if (duration === undefined) duration = 300;
        return new Promise(function(resolve) {
            element.style.opacity = '1';
            element.style.transition = 'opacity ' + duration + 'ms ease';
            requestAnimationFrame(function() {
                element.style.opacity = '0';
                setTimeout(resolve, duration);
            });
        });
    }

    function slideIn(element, direction, duration) {
        if (direction === undefined) direction = 'left';
        if (duration === undefined) duration = 400;
        return new Promise(function(resolve) {
            var transforms = {
                left: 'translateX(-50px)',
                right: 'translateX(50px)',
                top: 'translateY(-50px)',
                bottom: 'translateY(50px)'
            };
            element.style.opacity = '0';
            element.style.transform = transforms[direction] || transforms.left;
            element.style.transition = 'all ' + duration + 'ms ease-out';
            requestAnimationFrame(function() {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0)';
                setTimeout(resolve, duration);
            });
        });
    }

    function staggerAnimation(elements, callback, delay) {
        if (delay === undefined) delay = 100;
        elements.forEach(function(element, index) {
            setTimeout(function() {
                callback(element);
            }, index * delay);
        });
    }

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateOnScroll() {
        var elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(function(element) {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                fadeIn(element);
            }
        });
    }

    return {
        createParticles: createParticles,
        typeWriter: typeWriter,
        smoothScroll: smoothScroll,
        animateValue: animateValue,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        slideIn: slideIn,
        staggerAnimation: staggerAnimation,
        isInViewport: isInViewport,
        animateOnScroll: animateOnScroll
    };
})();
