/** @format */

(() => {
	'use strict';

	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.needs-validation');

	// Loop over them and prevent submission
	Array.prototype.slice.call(forms).forEach((form) => {
		form.addEventListener(
			'submit',
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			},
			false
		);
	});
})();

() => {
	'use strict';

	const body = $('body');

	function goToNextInput(e) {
		const key = e.which,
			t = $(e.target),
			sib = t.next('input');

		if (key != 9 && (key < 48 || key > 57)) {
			e.preventDefault();
			return false;
		}

		if (key === 9) {
			return true;
		}

		if (!sib || !sib.length) {
			sib = body.find('input').eq(0);
		}
		sib.select().focus();
	}

	function onKeyDown(e) {
		const key = e.which;

		if (key === 9 || (key >= 48 && key <= 57)) {
			return true;
		}

		e.preventDefault();
		return false;
	}

	function onFocus(e) {
		$(e.target).select();
	}

	body.on('keyup', 'input', goToNextInput);
	body.on('keydown', 'input', onKeyDown);
	body.on('click', 'input', onFocus);
};

console.log('done');
