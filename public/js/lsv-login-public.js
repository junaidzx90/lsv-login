jQuery(function( $ ) {
	'use strict';

	// Show / Hide password
    $('span.showhidepass').on('click', function () {
        let data = $(this).next('.password').attr('type');
        if (data == 'password') {
            $(this).next('.password').attr('type', 'text');
        } else {
            $(this).next('.password').attr('type', 'password');
        }
	});
	
	// Email check
	function isEmail(email) {
  		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		return regex.test(email);
	}

	var access = false;

	// Ignoring errors
	$('input').on("keyup", function () {
		$(this).css('border-color','#ddd');
	});

	// Error shoing
	function errorsshow(txt) {
		$('.signinbtn').append('<span class="errors">'+txt+'</span>');
		setTimeout(() => {
			$('.errors').remove();
		}, 1500);
	}

	$('#signinbtn').on("click", function (e) {
		e.preventDefault();

		let email = $('#email').val();
		let password = $('#password').val();

		if (email == "") {
			$('#email').css('border-color', 'red');
			errorsshow('Email is required');
			return false;
		}

		if (!isEmail(email)) {
			$('#email').css('border-color', 'red');
			errorsshow('Invalid Email');
			return false;
		}

		if (password == "") {
			$('#password').css('border-color', 'red');
			errorsshow('Password is required');
			return false;
		}

		$.ajax({
			type: "post",
			url: public_ajax_requ.ajaxurl,
			data: {
				action: "lsv_login_requests",
				email: email,
				password: password,
				nonce: public_ajax_requ.nonce
			},
			beforeSend: () => {
				$('#signinbtn').prop('disabled',true);
				$('#signinbtn').val('Signing...');
			},
			dataType: "json",
			success: function (response) {
				if (response.error) {
					access = false;
					$('#signinbtn').val('Sing In');
					$('#signinbtn').removeAttr('disabled');
					$('#email').css('border-color', 'red');
					$('#password').css('border-color', 'red');
					errorsshow(response.error);
					return false;
				}
				if (response.success) {
					location.href = response.success;
				}
			}
		});
	});


	// Forgot password 1rst step
	$('#forgotcontinue').on("click", function (e) {
		e.preventDefault();

		let email = $('#email').val();

		if (email == "") {
			$('#email').css('border-color', 'red');
			errorsshow('Email is required');
			return false;
		}

		if (!isEmail(email)) {
			$('#email').css('border-color', 'red');
			errorsshow('Invalid Email');
			return false;
		}

		$.ajax({
			type: "post",
			url: public_ajax_requ.ajaxurl,
			data: {
				action: "lsv_email_check",
				email: email,
				nonce: public_ajax_requ.nonce
			},
			dataType: "json",
			beforeSend: () => {
				$('#forgotcontinue').text('Checking...');
			},
			success: function (response) {
				if (response.exist) {
					access = true;
					window.history.pushState('', '', '?reset=true&email='+email);
					location.reload();
				}
				if (response.notexist) {
					access = false;
					$('#email').css('border-color', 'red');
					errorsshow('This email is incorrect.');
					$('#forgotcontinue').text('Continue');
					return false;
				}
			}
		});
	});

	// Forgot pass 2 step
	$('#changepass').on("click", function (e) {
		e.preventDefault();
		let email = $('.changableeml').val();
		let password = $('#password').val();

		if (email == "") {
			$('#changableeml').css('border-color', 'red');
			errorsshow('Bad request!');
			return false;
		}

		if (password == "") {
			$('#password').css('border-color', 'red');
			errorsshow('Password is required!');
			return false;
		}

		if (password.length < 6) {
			$('#password').css('border-color', 'red');
			errorsshow('Password requires 6 characters.');
			return false;
		}

		$.ajax({
			type: "post",
			url: public_ajax_requ.ajaxurl,
			data: {
				action: "lsv_password_change",
				email: email,
				password: password,
				nonce: public_ajax_requ.nonce
			},
			dataType: "json",
			beforeSend: () => {
				$('#changepass').val('Changing..');
			},
			success: function (response) {
				if (response.error) {
					location.href = response.error;
				}
				if (response.success) {
					location.href = response.success;
				}
			}
		});
	});

});
