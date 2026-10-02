// ---------- Hero Slideshow ----------
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  // remove active from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // add active to the target slide and dot
  slides[index].classList.add('active');
  dots[index].classList.add('active');

  currentSlide = index;
}

function nextSlide() {
  let next = (currentSlide + 1) % slides.length; // loops back to 0 after last slide
  showSlide(next);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000); // change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// clicking a dot jumps to that slide
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.getAttribute('data-slide'));
    showSlide(slideIndex);
    stopAutoSlide();   // stop auto-rotation once user takes control
    startAutoSlide();  // restart the timer fresh from here
  });
});

// start the slideshow on page load
startAutoSlide();

// ---------- Active Nav Link ----------
const navLinks = document.querySelectorAll('.navbar ul li a');

// get just the filename from the current URL, e.g. "services.html"
let currentPage = window.location.pathname.split('/').pop();

// if we're at the root (like "/" with no filename), treat it as index.html
if (currentPage === '' || currentPage === '/') {
  currentPage = 'index.html';
}

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');

  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

// ---------- Auth Role Toggle ----------
const roleOptions = document.querySelectorAll('.role-option');

roleOptions.forEach(option => {
  option.addEventListener('click', () => {
    roleOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
  });
});

// ---------- Password Show/Hide ----------
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

if (togglePassword && passwordInput) {
  togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePassword.textContent = isHidden ? '🙈' : '👁️';
  });
}
// ---------- Signup: Confirm Password Toggle ----------
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const signupPassword = document.getElementById('signupPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPassword = document.getElementById('confirmPassword');

if (toggleSignupPassword && signupPassword) {
  toggleSignupPassword.addEventListener('click', () => {
    const isHidden = signupPassword.type === 'password';
    signupPassword.type = isHidden ? 'text' : 'password';
    toggleSignupPassword.textContent = isHidden ? '🙈' : '👁️';
  });
}

if (toggleConfirmPassword && confirmPassword) {
  toggleConfirmPassword.addEventListener('click', () => {
    const isHidden = confirmPassword.type === 'password';
    confirmPassword.type = isHidden ? 'text' : 'password';
    toggleConfirmPassword.textContent = isHidden ? '🙈' : '👁️';
  });
}

// ---------- Log in Button Redirect ----------
const loginBtn = document.querySelector('.log-in');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

const signupBtn = document.querySelector('.sign-up');

if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    window.location.href = 'sign_up.html'
  })
}

// ---------- Mobile Hamburger Menu ----------
const hamburgerIcon = document.getElementById('hamburgerIcon');
const navLinksWrapper = document.getElementById('navLinksWrapper');
const navOverlay = document.getElementById('navOverlay');
const closeIcon = document.querySelector('.icon-close');

if (hamburgerIcon && navLinksWrapper && navOverlay && closeIcon) {

  function openMenu() {
    navLinksWrapper.classList.add('active');
    navOverlay.classList.add('active');
    hamburgerIcon.style.display = 'none';
    closeIcon.classList.add('active');
  }

  function closeMenu() {
    navLinksWrapper.classList.remove('active');
    navOverlay.classList.remove('active');
    hamburgerIcon.style.display = 'block';
    closeIcon.classList.remove('active');
  }

  hamburgerIcon.addEventListener('click', openMenu);
  closeIcon.addEventListener('click', closeMenu);
  navOverlay.addEventListener('click', closeMenu);
}

// ---------- Services Page: Live Search Filter ----------
const serviceSearchInput = document.querySelector('.services-search-bar input');
const serviceCards = document.querySelectorAll('.category-browse-card');

if (serviceSearchInput && serviceCards.length > 0) {

  serviceSearchInput.addEventListener('input', () => {
    const query = serviceSearchInput.value.toLowerCase().trim();

    serviceCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();
      const tag = card.querySelector('.browse-tag').textContent.toLowerCase();

      const matches = title.includes(query) || description.includes(query) || tag.includes(query);

      card.style.display = matches ? 'block' : 'none';
    });
  });
}


// ---------- Login Form Validation ----------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from reloading/navigating away

    const emailOrPhone = loginForm.querySelector('input[type="text"]').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    if (emailOrPhone === '' || password === '') {
      alert('Please fill in both your email/phone and password.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    alert('Login successful! (Demo only — no real account connected yet)');
    loginForm.reset();
  });
}

// ---------- Signup Form Validation ----------
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = signupForm.querySelector('input[type="text"]').value.trim();
    const emailOrPhone = signupForm.querySelectorAll('input[type="text"]')[1].value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();
    const agreeCheckbox = signupForm.querySelector('input[type="checkbox"]');

    if (fullName === '' || emailOrPhone === '') {
      alert('Please fill in your full name and campus email/phone number.');
      return;
    }

    if (password === '' || confirmPass === '') {
      alert('Please fill in both password fields.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPass) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreeCheckbox.checked) {
      alert('You must agree to the Campus Trust Code before creating an account.');
      return;
    }

    alert('Account created successfully!!');
    signupForm.reset();
  });
}