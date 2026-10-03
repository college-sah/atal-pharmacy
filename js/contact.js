// Contact Form Validation
(function(){
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        name: form.querySelector('#fullName'),
        email: form.querySelector('#email'),
        phone: form.querySelector('#phone'),
        message: form.querySelector('#message')
    };

    function showError(input, msg) {
        if (!input) return;
        input.classList.add('error');
        const err = input.parentElement.querySelector('.error-msg');
        if (err) {
            err.textContent = msg;
            err.classList.add('visible');
        }
    }
    function clearError(input) {
        if (!input) return;
        input.classList.remove('error');
        const err = input.parentElement.querySelector('.error-msg');
        if (err) err.classList.remove('visible');
    }

    function validate() {
        let ok = true;
        // Name
        if (!fields.name?.value.trim() || fields.name.value.trim().length < 2) {
            showError(fields.name, 'Please enter your full name (at least 2 characters).');
            ok = false;
        } else clearError(fields.name);

        // Email
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fields.email?.value.trim() || !emailRe.test(fields.email.value.trim())) {
            showError(fields.email, 'Please enter a valid email address.');
            ok = false;
        } else clearError(fields.email);

        // Phone optional but if present validate
        const phoneVal = fields.phone?.value.trim();
        if (phoneVal) {
            // allow Nepali formats
            const phoneRe = /^[0-9+\-\s]{7,15}$/;
            if (!phoneRe.test(phoneVal)) {
                showError(fields.phone, 'Please enter a valid phone number.');
                ok = false;
            } else clearError(fields.phone);
        } else {
            if (fields.phone) clearError(fields.phone);
        }

        // Message
        if (!fields.message?.value.trim() || fields.message.value.trim().length < 10) {
            showError(fields.message, 'Please enter a message with at least 10 characters.');
            ok = false;
        } else clearError(fields.message);

        return ok;
    }

    Object.values(fields).forEach(inp => {
        if (!inp) return;
        inp.addEventListener('input', () => clearError(inp));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Since no backend, show success UI
        const btn = form.querySelector('button[type="submit"]');
        const original = btn ? btn.innerHTML : '';
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Ready';
            btn.disabled = true;
        }

        const success = document.getElementById('formSuccess');
        if (success) {
            success.style.display = 'block';
            success.scrollIntoView({ behavior:'smooth', block:'center' });
        }

        // NOTE: Integrate EmailJS / backend here
        // Example EmailJS:
        // emailjs.send('service_id','template_id',{ name: fields.name.value, email: fields.email.value, phone: fields.phone.value, message: fields.message.value })

        setTimeout(() => {
            if (btn) {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        }, 3000);
    });
})();
