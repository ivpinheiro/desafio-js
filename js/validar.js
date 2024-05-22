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
var meter = document.querySelector("#passStrengthMeter");
var resultado = document.querySelector("#inputResult");

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validaNome*/
nome.addEventListener("focusout", validaNome);

/*declaração tradicional de função validaNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validaNome(nomeParam) {
  //Valida o primeiro nome com a primeira letra maiúscula
  const regexNome = /^([A-Za-z\s]{6,})+$/;
  const nomeTrimado = nomeParam?.target.value.trim() || nome.value.trim();
  /**
   * Regra 1: O nome do usuário somente deve conter letras e deve ser de cumprimento maior a 6
   */
  if (nomeTrimado.match(regexNome) == null || nomeTrimado.length >= 6) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
    nomeHelp.textContent = "Nome inválido";
    nomeHelp.style.color = "red";
    return false;
  } else {
    nomeHelp.textContent = "";
    return true;
  }
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validaNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>
function validaAno(anoParam) {
  //declaração da expressão regular para definir o formato de um ano válido
  const regexAno = /^[0-9]{4}$/;
  //tirar (trim) espaços em branco antes e depois da string
  const anoTrimado = anoParam?.target.value.trim() || ano.value.trim();
  const menorAnoPermitido = 1900;
  const maiorAnoPermitido = 2022;

  if (anoTrimado.match(regexAno) == null) {
    //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
    anoHelp.textContent = "Ano inválido";
    anoHelp.style.color = "red";
    return false;
  } else {
    //objeto Date
    var date = new Date();
    if (parseInt(anoTrimado) > parseInt(maiorAnoPermitido)) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido`;
      anoHelp.style.color = "red";
      return false;
    } else if (parseInt(anoTrimado) < parseInt(menorAnoPermitido)) {
      //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
      anoHelp.textContent = `Ano inválido`;
      anoHelp.style.color = "red";
      return false;
    } else {
      anoHelp.textContent = "";
      return true;
    }
  }
}
ano.addEventListener("focusout", validaAno);

function validaEmail(emailParm) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+(br|com|net|org)$/;
  //tirar (trim) espaços em branco antes e depois da string
  const emailTrimado = emailParm?.target.value.trim() || email.value.trim();
  if (emailTrimado.match(regexEmail) == null) {
    emailHelp.textContent = "Formato de e-mail inválido";
    emailHelp.style.color = "red";
    return false;
  } else {
    emailHelp.textContent = "";
    return true;
  }
}

email.addEventListener("focusout", validaEmail);

function validaSenha(exec = true, senhaParam) {
  const senhaTrimada = senhaParam?.target.value.trim() || password.value.trim();
  const regexSenhaCaracteresSpeciais = /[^a-zA-Z0-9\s]/;
  const regexSenhaNumeros = /[0-9]/;
  const regexLetras = /[a-z,A-Z]/;
  const menorSenha = 6;
  const maiorSenha = 20;
  if (senhaTrimada.length < menorSenha) {
    passwordHelp.textContent = `Senha inválida`;
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.length > maiorSenha) {
    passwordHelp.textContent = `Senha inválida`;
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.match(regexSenhaCaracteresSpeciais) === null) {
    passwordHelp.textContent = "Senha inválida";
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.match(regexSenhaNumeros) === null) {
    passwordHelp.textContent = "Senha inválida";
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.match(regexLetras) === null) {
    passwordHelp.textContent = "Senha inválida";
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.match(new RegExp(nome.value.toLowerCase(), "gi"))) {
    passwordHelp.textContent = "Senha inválida";
    passwordHelp.style.color = "red";
    return false;
  } else if (senhaTrimada.match(new RegExp(ano.value.toLowerCase(), "gi"))) {
    passwordHelp.textContent = "Senha inválida";
    passwordHelp.style.color = "red";
    return false;
  } else {
    if (exec) {
      passwordHelp.textContent = "";
      return true;
    } else {
      return true;
    }
  }
}

function forcaDaSenha(e) {
  const senhaTrimada = e?.target.value.trim() || password.value.trim();
  const regexSenhaCaracteresSpeciais = /[^a-zA-Z0-9\s]/;
  const regexSenhaNumeros = /[0-9]/;
  const regexMaisculas = /[A-Z]/;
  if (
    senhaTrimada.length < 8 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length >= 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length >= 1
  ) {
    meter.value = 10;
    passwordHelp.textContent = "Senha fraca.";
    passwordHelp.style.color = "red";
  } else if (
    senhaTrimada.length < 12 &&
    senhaTrimada.length >= 8 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length >= 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length >= 1 &&
    senhaTrimada.match(regexMaisculas).input.length >= 1
  ) {
    meter.value = 20;
    passwordHelp.textContent = "Senha moderada.";
    passwordHelp.style.color = "orange";
  } else if (
    senhaTrimada.length >= 12 &&
    senhaTrimada.match(regexSenhaCaracteresSpeciais).input.length > 1 &&
    senhaTrimada.match(regexSenhaNumeros).input.length > 1 &&
    senhaTrimada.match(regexMaisculas).input.length > 1
  ) {
    meter.value = 30;
    passwordHelp.textContent = "Senha forte.";
    passwordHelp.style.color = "green";
  } else {
    passwordHelp.textContent = "";
  }
}

password.addEventListener("keyup", (e) => {
  if (validaSenha(e)) {
    forcaDaSenha(e);
  }
});

function enviarCadastro() {
  if (validaNome() && validaAno() && validaSenha(false) && validaEmail()) {
    resultado.textContent = "Seus dados foram registrados";
    resultado.style.color = "green";
  } else {
    resultado.textContent = "Seus dados não foram registrados";
    resultado.style.color = "red";
  }
}
