document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. HAMBURGER MENU TOGGLE
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* =========================================
       2. CONTACT FORM VALIDATION (@gmail.com check)
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');

        // Helper: Clear errors when user starts typing
        [nameInput, emailInput, msgInput].forEach(input => {
            if(input) {
                input.addEventListener('input', () => {
                    input.style.borderColor = ''; 
                    if(formStatus) formStatus.textContent = '';
                });
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // STOP page reload

            // 1. Get Values
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const msgVal = msgInput.value.trim();

            let hasError = false;
            let errorMessage = "";

            // 2. Check for Empty Fields first
            if (nameVal === "") {
                nameInput.style.borderColor = "#ff4444";
                hasError = true;
            }
            if (emailVal === "") {
                emailInput.style.borderColor = "#ff4444";
                hasError = true;
            }
            if (msgVal === "") {
                msgInput.style.borderColor = "#ff4444";
                hasError = true;
            }

            if (hasError) {
                errorMessage = "Please fill in all required fields.";
            } 
            // 3. SPECIFIC CHECK: Must contain @gmail.com
            else if (!emailVal.toLowerCase().endsWith("@gmail.com")) {
                emailInput.style.borderColor = "#ff4444";
                hasError = true;
                errorMessage = "Email must be a valid @gmail.com address.";
            }

            // 4. If Error, Show message and Stop
            if (hasError) {
                if (formStatus) {
                    formStatus.textContent = errorMessage;
                    formStatus.style.color = "#ff4444";
                }
                return; // STOP execution here
            }

            // 5. Success Logic (Only runs if NO errors)
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            btn.innerText = "Message sent";
            btn.style.backgroundColor = "#5cc70c";
            btn.style.color = "#000";
            btn.style.borderColor = "#5cc70c";

            if (formStatus) {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "#5cc70c";
            }

            // Reset after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
                btn.style.borderColor = "";
                
                contactForm.reset();
                if (formStatus) formStatus.textContent = "";
            }, 3000);
        });
    }
});