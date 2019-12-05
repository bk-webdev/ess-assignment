const navBtn = document.getElementById('nav-btn');
navBtn.addEventListener('click', function(e) {
	if (navBtn.textContent !== 'Back') {
		document.getElementById('first').style.display = 'none';
		document.getElementById('second').style.display = 'block';
		navBtn.textContent = 'Back';
	} else {
		document.getElementById('first').style.display = 'block';
		document.getElementById('second').style.display = 'none';
		navBtn.textContent = 'Next';
	}
});
