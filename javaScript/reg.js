$(document).ready(function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyKwlMxgliIfjUu0KkwTfjES92v_CbDEePBaHtH_nMOACTjLD7m7j1_i5oXNRcJ5TvaVA/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("output");

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const pass = $('#exampleInputPassword1').val().trim();
        const cPass = $('#exampleInputPassword2').val().trim();

        if (pass === cPass) {
            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form),
            })
            .then(response => {
                console.log("Success!!");
                msg.innerHTML = "<h1>Registered successfully</h1>";
                setTimeout(function() {
                    msg.innerHTML = "";
                    window.location.href = "home.html";
                    form.reset(); // Reset after successful submission
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
            });
        } else {
            console.log("Passwords do not match!");
            msg.innerHTML = "<h4>Passwords do not match!</h4>";
            setTimeout(function() {
                msg.innerHTML = "";
            }, 4000);
        }
    });

    $('#submit').click(function() {
        form.dispatchEvent(new Event('submit')); // Trigger the submit event
    });
});
