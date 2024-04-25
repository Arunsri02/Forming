$(document).ready(function() {
	$('#login').click(function() {
		// connecting api to check password
		$.ajax({
			url: "https://script.google.com/macros/s/AKfycbyKwlMxgliIfjUu0KkwTfjES92v_CbDEePBaHtH_nMOACTjLD7m7j1_i5oXNRcJ5TvaVA/exec",
			method: 'GET',
			success: function(data) {
				// getting email and pass from user
				const email = $('#email_').val();
				const pass = $('#password').val();
				let isMatch = false;
				for (let i = 0; i < data.length; i++) {
					if (email === data[i].email && pass === data[i].password) {
						const name = data[i].firstName;
						const UpperCaseName = name.toUpperCase();
						$('#output').html(`<h5> Welcome  ${UpperCaseName} !</h5>`);
						setTimeout(() => {
							$('#output').html(``);
							window.location.href = "home.html";
							// Resetting the form if defined
								form.reset();
						}, 3000);
						isMatch = true;
						break; // Exit loop upon finding a match
					}
				}
				if (!isMatch) {
					$('#output').html(`<h5> Incorrect Email or Password !! </h5>`);
					setTimeout(() => {
						$('#output').html(``);
						form.reset();
					}, 4000);
				}
			},
			error: function(e) {
				console.log("Error", e);
				$('#output').html(`<h5> Something went wrong. Please try again later. </h5>`);
			}			
		})
	})
})			