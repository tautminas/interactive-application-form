// Elements
const form = document.querySelector('#registerForm');
const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.indicator');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');

// Step
let currentStep = 0;

// Moving Through Steps
const move = (n) => {
  // Stop Movement if Form is Not Valid
  if (n === 1 && !validateForm()) return false;

  // Remove Current Step and Pass Value for Next One
  steps[currentStep].style.display = 'none';
  currentStep = currentStep + n;

  // Display Data on the Last Step
  if (currentStep == (steps.length - 1)) {
    displayOutro();
  }

  // Show Next Step
  showStep(currentStep);
}

// Validation for Form
const validateForm = () => {
  // Set Initial Data
  let inputs = steps[currentStep].querySelectorAll('input');
  let valid = true;

  // After Moving to Next Step Clear Error Messages
  eraseErrors(currentStep);

  // Switch Case For Validation According to Current Step
  switch (currentStep) {
    case 1:
      if (! inputs[0].value.match(/^[A-Za-z]+$/)) {
        steps[currentStep].querySelector('#err1').innerHTML = "Name must contain only letters.";
        valid = false;
      }

      if (inputs[0].value.length === 0) {
        steps[currentStep].querySelector('#err1').innerHTML = "Name field is empty.";
        valid = false;
      }

      if (! inputs[1].value.match(/^[A-Za-z]+$/)) {
        steps[currentStep].querySelector('#err2').innerHTML = "Surname must contain only letters.";
        valid = false;
      }

      if (inputs[1].value.length === 0) {
        steps[currentStep].querySelector('#err2').innerHTML = "Surname field is empty.";
        valid = false;
      }

      if (inputs[2].value.length === 0) {
        steps[currentStep].querySelector('#err3').innerHTML = "Phone field is empty.";
        valid = false;
      } else {
        if (! inputs[2].value.match(/^\+{0,1}[0-9]+$/)) {
          steps[currentStep].querySelector('#err3').innerHTML = "Phone number must contain only digits (or '+' symbol at the beginning).";
          valid = false;
        }
  
        if ( !(inputs[2].value.match(/\d/g).length === 9 || inputs[2].value.match(/\d/g).length === 11) ) {
          steps[currentStep].querySelector('#err3').innerHTML = "Phone number must contain either 9 or 11 numbers.";
          valid = false;
        }
      }

      if (! inputs[3].value.match(/\S+@\S+\.\S+/)) {
        steps[currentStep].querySelector('#err4').innerHTML = "Email is not valid.";
        valid = false;
      }

      if (inputs[3].value.length === 0) {
        steps[currentStep].querySelector('#err4').innerHTML = "Email field is empty.";
        valid = false;
      }
      break;
    case 2:
      // Check if Any Radio Input is Selected
      let radioValid = false;
      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) radioValid = true;     
      }

      if (!radioValid) {
        valid = false;
        steps[currentStep].querySelector('#err5').innerHTML = "You must choose some option.";
      }
      break;
    case 3:
      // Check if Any Check Box Input is Selected
      let checkValid = false;
      for (i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) checkValid = true;     
      }

      if (!checkValid) {
        valid = false;
        steps[currentStep].querySelector('#err6').innerHTML = "You must choose at least one option.";
      }
      break;
    case 4:
      if (steps[currentStep].querySelector('select')) {
        if (steps[currentStep].querySelector('select').value === "") {
          valid = false;
          steps[currentStep].querySelector('#err7').innerHTML = "You must choose some option.";
        }
      }
      break;
    case 5:
      if (steps[currentStep].querySelector('textarea')) {
        if (steps[currentStep].querySelector('textarea').value === "") {
          valid = false;
          steps[currentStep].querySelector('#err8').innerHTML = "You must write some additional information.";
        }
      }
      break;
  }
  
  // If everything is Okay, Continue with Movement
  if (valid) {
    indicators[currentStep].className += ' finish';
    eraseErrors(currentStep);
  }

  return valid;

}

// Show Exact Step
const showStep = (n) => {
  // Show Next Step
  steps[n].style.display = 'block';

  if (n == 0 || n == (steps.length - 1)) {
    document.querySelector('.indicators').style.opacity = 0;
  } else {
    document.querySelector('.indicators').style.opacity = 1;
  }

  // Change the Text or Display of Buttons Based on Showed Step
  if (n == 0 || n == 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
  }
  
  if (n == (steps.length - 2)) {
    nextBtn.innerHTML = 'Submit';
  } else {
    nextBtn.innerHTML = 'Next';
  }

  // Update Indicators
  stepIndicator(n);
}

// Set Step Indicator
const stepIndicator = (n) => {
  // Remove Active Indicator Styling
  for (i = 0; i < indicators.length; i++) {
    indicators[i].className = indicators[i].className.replace(' active', '');
  }

  // Show Active Indicator
  indicators[n].className += ' active';
}

// Erase Error Messages
const eraseErrors = (n) => {
  const errors = steps[n].querySelectorAll('.error')
  if (errors.length != 0) {
    for (let i = 0; i < errors.length; i++) {
      errors[i].innerHTML = "";
    }
  }
}

// Displayed All Questions and Answers in Summary Page (Outro)
const displayOutro = () => {
  nextBtn.disabled = true;
  nextBtn.style.visibility = 'hidden';
  prevBtn.disabled = true;
  prevBtn.style.visibility = 'hidden';

  console.log();
  document.querySelector('#mainH').innerHTML = "Congratulations! Your registration was successful.";

  let answString = "";
  answString += "<b>Name</b>: " + form.fname.value + "<br>";
  answString += "<b>Surname</b>: " + form.lname.value + "<br>";
  answString += "<b>Phone number</b>: " + form.phone.value + "<br>";
  answString += "<b>Email</b>: " + form.email.value + "<br>";
  answString += "<b>Gender</b>: ";
  if (form.male.checked) answString += "Male <br>";
  if (form.female.checked) answString += "Female <br>";
  if (form.unknown.checked) answString += "Unknown <br>";
  answString += "<b>Credit cards you are interested in</b>: ";
  
  if (form.card1.checked) answString += "Revolving credit card, ";
  if (form.card2.checked) answString += "Gold revolving credit card, ";
  if (form.card3.checked) answString += "Mastercard Platinum credit card, ";
  answString = answString.replace(/,\s*$/, "");
  answString += "<br/>";

  answString += "<b>Desirable credit limit</b>: "
  if (form.limit.value === "limitUnknown") answString += "No preference</br>";
  if (form.limit.value === "limit300") answString += "From 300</br>";
  if (form.limit.value === "limit600") answString += "From 600</br>";
  if (form.limit.value === "limit2000") answString += "From 2000</br>";

  answString += "<b>Additional information</b>: " + form.additional.value;
  
  document.getElementById("outro").innerHTML = answString;
}

// Commands Executed on Load
showStep(currentStep);

nextBtn.innerHTML = "Begin";