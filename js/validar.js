//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var password = document.querySelector("#inputPassword");
var passwordHelp = document.querySelector("#inputPasswordHelp");
var meter = document.querySelector("#passStrengthMeter");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener("focusout", validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e) {
  //Valida o primeiro nome com a primeira letra maiúscula
  const regexNome = /^[A-Z][a-z]+$/;

  /**
   * Regra 1: O nome do usuário somente deve conter letras e deve ser de cumprimento maior a 6
   */
  if (
    e.target.value.trim().match(regexNome) == null ||
    e.target.value.length <= 6
  ) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
    nomeHelp.textContent = "Formato de nome inválido";
    nomeHelp.style.color = "red";
  } else {
    nomeHelp.textContent = "";
  }
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener("focusout", () => {
  //declaração da expressão regular para definir o formato de um ano válido
  const regexAno = /^[0-9]{4}$/;
  //tirar (trim) espaços em branco antes e depois da string
  const anoTrimado = ano.value.trim();
  const menorAnoPermitido = 1900;
  const maiorAnoPermitido = 2022;

  if (anoTrimado.match(regexAno) == null) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
    anoHelp.textContent = "Formato de ano inválido";
    anoHelp.style.color = "red";
  } else {
    //objeto Date
    var date = new Date();
    if (parseInt(anoTrimado) > parseInt(maiorAnoPermitido)) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${maiorAnoPermitido}.`;
      anoHelp.style.color = "red";
    } else if (parseInt(anoTrimado) < parseInt(menorAnoPermitido)) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${menorAnoPermitido}.`;
      anoHelp.style.color = "red";
    } else {
      anoHelp.textContent = "";
    }
  }
});

email.addEventListener("focusout", (e) => {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+(br|com|net|org)$/;
  //tirar (trim) espaços em branco antes e depois da string
  const emailTrimado = e.target.value.trim();
  if (emailTrimado.match(regexEmail) == null) {
    emailHelp.textContent = "Formato de e-mail inválido";
    emailHelp.style.color = "red";
  } else {
    emailHelp.textContent = "";
  }
});

function validaSenha(e) {
  const senhaTrimada = e.target.value.trim();
  const regexSenhaCaracteresSpeciais = /[^a-zA-Z0-9\s]/;
  const regexSenhaNumeros = /[0-9]/;
  const regexLetras = /[a-z,A-Z]/;
  const menorSenha = 6;
  const maiorSenha = 20;
  if (senhaTrimada.length < menorSenha) {
    passwordHelp.textContent = `A senha não pode ter menos que ${menorSenha} caracteres`;
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.length > maiorSenha) {
    passwordHelp.textContent = `A senha não pode ter mais que ${maiorSenha} caracteres`;
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.match(regexSenhaCaracteresSpeciais) === null) {
    passwordHelp.textContent = "A senha não possuí caracteres especiais";
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.match(regexSenhaNumeros) === null) {
    passwordHelp.textContent = "A senha não possuí números";
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.match(regexLetras) === null) {
    passwordHelp.textContent = "A senha não possuí letras";
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.match(new RegExp(nome.value.toLowerCase(), "gi"))) {
    passwordHelp.textContent = "A senha não pode incluir seu nome";
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else if (senhaTrimada.match(new RegExp(ano.value.toLowerCase(), "gi"))) {
    passwordHelp.textContent =
      "A senha não pode incluir o seu ano de nascimento";
    passwordHelp.style.color = "red";
    return "Senha inválida";
  } else {
    passwordHelp.textContent = "";
    console.log(senhaTrimada.match(regexSenhaCaracteresSpeciais));
    return "Senha válida";
  }
}

function forcaDaSenha(e) {
  const senhaTrimada = e.target.value.trim();
  const regexSenhaCaracteresSpeciais = /[^a-zA-Z0-9\s]/;
  const regexSenhaNumeros = /[0-9]/;
  const regexMaisculas = /[A-Z]/;
  if (
    senhaTrimada.length < 8 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length >= 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length >= 1
  ) {
    meter.value = 10;
  } else if (
    senhaTrimada.length >= 8 &&
    senhaTrimada.length < 12 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length >= 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length >= 1 &&
    senhaTrimada.match(regexMaisculas).input.length >= 1
  ) {
    meter.value = 20;
  } else if (
    senhaTrimada.length >= 12 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length > 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length > 1 &&
    senhaTrimada.match(regexMaisculas).input.length > 1
  ) {
    meter.value = 30;
  }
}

password.addEventListener("keyup", (e) => {
  if (validaSenha(e) === "Senha válida") {
    forcaDaSenha(e);
  }
});