// Seleciona os elementos do DOM pelos seus IDs
var inputName = document.querySelector("#inputName");
var nameFeedback = document.querySelector("#inputNameHelp");
var inputYear = document.querySelector("#inputYear");
var yearFeedback = document.querySelector("#inputYearHelp");
var inputEmail = document.querySelector("#inputEmail");
var emailFeedback = document.querySelector("#inputEmailHelp");
var inputPassword = document.querySelector("#inputPassword");
var passwordFeedback = document.querySelector("#inputPasswordHelp");
var inputConfirmPassword = document.querySelector("#inputConfirmPassword"); // Campo de confirmação de senha adicionado
var passwordStrengthMeter = document.querySelector("#passStrengthMeter");

// Adiciona eventos para validação ao perder o foco ou ao inserir dados
inputName.addEventListener("focusout", validateName);
inputYear.addEventListener("focusout", validateYear);
inputEmail.addEventListener("focusout", validateEmail);
inputPassword.addEventListener("input", validatePassword);
inputConfirmPassword.addEventListener("focusout", validatePasswordConfirmation); // Evento para confirmação de senha adicionado

// Função para validar o nome
function validateName(e) {
  const nameRegex = /^[A-Za-z\s]{6,}$/;
  if (!e.target.value.trim().match(nameRegex)) {
    nameFeedback.textContent = "Nome deve conter somente letras e espaços, e ter no mínimo 6 caracteres.";
    nameFeedback.style.color = "red";
  } else {
    nameFeedback.textContent = "";
  }
}

// Função para validar o ano
function validateYear(e) {
  const yearRegex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-4])$/;
  if (!e.target.value.trim().match(yearRegex)) {
    yearFeedback.textContent = "Ano deve estar entre 1900 e 2024.";
    yearFeedback.style.color = "red";
  } else {
    yearFeedback.textContent = "";
  }
}

// Função para validar o email
function validateEmail(e) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
  if (!e.target.value.trim().match(emailRegex)) {
    emailFeedback.textContent = "Formato de email inválido.";
    emailFeedback.style.color = "red";
  } else {
    emailFeedback.textContent = "";
  }
}

// Função para validar a senha
function validatePassword(e) {
  const passwordValue = e.target.value;
  passwordFeedback.textContent = checkPasswordRules(passwordValue);
  passwordStrengthMeter.value = calculatePasswordStrength(passwordValue);
  updatePasswordStrengthVisuals(passwordStrengthMeter, passwordStrengthMeter.value);
}

// Verifica as regras da senha e retorna uma mensagem adequada
function checkPasswordRules(password) {
  if (password.includes(inputName.value.trim()) || password.includes(inputYear.value.trim())) {
    return "Senha inválida. Não deve conter seu nome ou ano de nascimento.";
  }
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  if (!password.match(passwordRegex)) {
    return "Senha deve conter 6 a 20 caracteres, incluindo números, letras e ao menos um símbolo especial.";
  }
  return "";
}

// Calcula a força da senha e retorna um valor numérico
function calculatePasswordStrength(password) {
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  let strengthLevel = "fraca";

  if (password.length >= 8 && hasSpecialChar && hasNumber && hasUpperCase) {
    strengthLevel = "moderada";
  }
  if (password.length > 12 && (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length > 1 && (password.match(/\d/g) || []).length > 1 && (password.match(/[A-Z]/g) || []).length > 1) {
    strengthLevel = "forte";
  }
  
  return { fraca: 10, moderada: 20, forte: 30 }[strengthLevel];
}

// Atualiza a cor do medidor de força da senha baseado no valor
function updatePasswordStrengthVisuals(meter, value) {
  meter.style.backgroundColor = value >= 30 ? "#32CD32" : value >= 20 ? "#ffa500" : "#ff3e3e";
}

// Função para validar a confirmação da senha
function validatePasswordConfirmation(e) {
  if (inputPassword.value !== e.target.value) {
    passwordFeedback.textContent = "Senhas não conferem.";
    passwordFeedback.style.color = "red";
  } else {
    passwordFeedback.textContent = "";
  }
}

// Adiciona um evento ao formulário para prevenir o comportamento padrão e alertar sucesso no cadastro
document.querySelector("#singleForm").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Usuário cadastrado com sucesso!");
});
