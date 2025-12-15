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
       2. CONTACT FORM LOGIC (Validation + Sending)
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');

        // Helper: Remove red borders when user types
        [nameInput, emailInput, msgInput].forEach(input => {
            if(input) {
                input.addEventListener('input', () => {
                    input.style.borderColor = ''; 
                    if(formStatus) formStatus.textContent = '';
                });
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // STOP the page from reloading

            // --- A. VALIDATION STEP ---
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const msgVal = msgInput.value.trim();
            let hasError = false;
            let errorMessage = "";

            // Check for empty fields
            if (nameVal === "") { nameInput.style.borderColor = "#ff4444"; hasError = true; }
            if (emailVal === "") { emailInput.style.borderColor = "#ff4444"; hasError = true; }
            if (msgVal === "") { msgInput.style.borderColor = "#ff4444"; hasError = true; }

            // Check for @gmail.com
            if (!hasError && !emailVal.toLowerCase().endsWith("@gmail.com")) {
                emailInput.style.borderColor = "#ff4444";
                hasError = true;
                errorMessage = "Email must be a valid @gmail.com address.";
            } else if (hasError) {
                errorMessage = "Please fill in all required fields.";
            }

            // If there is an error, stop here
            if (hasError) {
                if (formStatus) {
                    formStatus.textContent = errorMessage;
                    formStatus.style.color = "#ff4444";
                }
                return;
            }

            // --- B. SENDING STEP (Web3Forms) ---
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // 1. Show "Sending..." state
            btn.innerText = "Sending...";
            btn.disabled = true;

            // 2. Prepare the data
            const formData = new FormData(contactForm);

            // 3. Send to Web3Forms
            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                if (response.status == 200) {
                    // SUCCESS!
                    btn.innerText = "Message sent";
                    btn.style.backgroundColor = "#5cc70c";
                    btn.style.color = "#000";
                    btn.style.borderColor = "#5cc70c";

                    if (formStatus) {
                        formStatus.textContent = "Message sent successfully!";
                        formStatus.style.color = "#5cc70c";
                    }

                    // Reset form after 3 seconds
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = "";
                        btn.style.color = "";
                        btn.style.borderColor = "";
                        btn.disabled = false;
                        contactForm.reset();
                        if (formStatus) formStatus.textContent = "";
                    }, 3000);
                } else {
                    // SERVER ERROR
                    console.log("Error:", response);
                    if (formStatus) {
                        formStatus.textContent = "Error sending message. Check Access Key.";
                        formStatus.style.color = "#ff4444";
                    }
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            })
            .catch(error => {
                // NETWORK ERROR
                console.log(error);
                if (formStatus) {
                    formStatus.textContent = "Connection error. Please try again.";
                    formStatus.style.color = "#ff4444";
                }
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }
});
