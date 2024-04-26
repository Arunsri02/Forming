$(document).ready(function() {

	const form = document.forms['submit-to-google-sheet'];
	const msg = document.getElementById("output");

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const email = $('#inlineFormInputGroupUsername').val();
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(email)) {
			$('#output').text('Please enter a valid email address.');
			setTimeout(function() {
				$('#output').text('');
			}, 4000);
		} else {

			$.ajax({
				url: 'https://script.google.com/macros/s/AKfycbyKwlMxgliIfjUu0KkwTfjES92v_CbDEePBaHtH_nMOACTjLD7m7j1_i5oXNRcJ5TvaVA/exec',
				method: 'GET',
				success: function(data) {
					const email = $('#inlineFormInputGroupUsername').val();
					let flag = true;
					for (let i = 0; i < data.length; i++) {
						if (email === data[i].email) {
							$('#output').text(' Email account alread exist!!')
							setTimeout(function() {
								$('#output').text('');
							}, 4000);

							flag = false;
							break;
						}
					}

					if (flag == true) {
						const pass = $('#exampleInputPassword1').val().trim();
						const cPass = $('#exampleInputPassword2').val().trim();
						const scriptURL = 'https://script.google.com/macros/s/AKfycbyKwlMxgliIfjUu0KkwTfjES92v_CbDEePBaHtH_nMOACTjLD7m7j1_i5oXNRcJ5TvaVA/exec';
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
										form.reset();
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
					}
				},
				error: function(e) {
					console.log("ERROR!!", e);
				}
			})
		}
	})

	$('#submit').click(function() {
		form.dispatchEvent(new Event('submit')); // Trigger the submit event
	});
});
