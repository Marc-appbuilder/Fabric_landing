// Community Fabric CIC — shared site behaviour (nav toggle, newsletter form, flip cards)

document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
        });
    }

    document.querySelectorAll('.newsletter-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var button = form.querySelector('button');
            var success = form.parentElement.querySelector('.form-success');
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            }).then(function (resp) {
                if (resp.ok) {
                    form.style.display = 'none';
                    if (success) success.style.display = 'block';
                } else if (button) {
                    button.textContent = 'Something went wrong';
                }
            }).catch(function () {
                if (button) button.textContent = 'Something went wrong';
            });
        });
    });

    document.querySelectorAll('.contact-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var button = form.querySelector('button[type="submit"]');
            var success = form.querySelector('.form-success');
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            }).then(function (resp) {
                if (resp.ok) {
                    form.reset();
                    Array.prototype.forEach.call(form.children, function (child) {
                        if (!child.classList.contains('form-success')) child.style.display = 'none';
                    });
                    if (success) success.style.display = 'block';
                } else if (button) {
                    button.textContent = 'Something went wrong — try again';
                }
            }).catch(function () {
                if (button) button.textContent = 'Something went wrong — try again';
            });
        });
    });

    document.querySelectorAll('.flip-card').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('flipped'); });
    });
});
