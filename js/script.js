const nombreUsuario = "Juan Caiafa";
let saldoCuenta = 0;
let limiteExtraccion = 0;
const codigoSeguridad = 1234;
const cuentaAmiga1 = 123;
const cuentaAmiga2 = 456;
const agua = 3500;
const telefono = 4250;
const luz = 2100;
const internet = 5700;

window.onload = function () {
  iniciarSesion();
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
};

function cambiarLimiteDeExtraccion() {
  (async () => {
    const { value: $limiteExtraccion } = await Swal.fire({
      icon: "question",
      title: "Cambiar límite de extracción",
      text: "Ingresa el nuevo límite de extracción:",
      input: "number",
      allowEscapeKey: true,
      allowOutsideClick: true,
      showCancelButton: true,
      inputValidator: (value) => {
        if (esUnNumero(parseInt(value))) {
          if (esNegativo(value)) {
            return;
          }
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Listo!",
              text: `El nuevo límite de extracción es de $${value}.`,
            });
            limiteExtraccion = parseInt(value);
            actualizarLimiteEnPantalla();
          }, 100);
        } else if (limiteExtraccion == null || undefined || "") {
          return;
        } else {
          return "El valor ingresado no es válido.";
        }
      },
    });
  })();
}

function extraerDinero() {
  (async () => {
    const { value: $extraccion } = await Swal.fire({
      icon: "info",
      title: "Extraer dinero:",
      text: "Ingresa el monto que quieras extraer:",
      input: "number",
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (esUnNumero(parseInt(value))) {
          value = parseInt(value);
          if (esNegativo(value)) {
            return;
          }
          if (value > limiteExtraccion) {
            setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El monto supera el límite de extracción, intenta nuevamente.",
              });
            }, 200);
          } else if (value > saldoCuenta) {
            setTimeout(() => {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero, intenta nuevamente.",
              });
            }, 200);
          } else if (value % 100 === 0) {
            const saldoAnterior = saldoCuenta;
            saldoCuenta = restarDinero(value);
            actualizarSaldoEnPantalla();
            setTimeout(() => {
              Swal.fire({
                icon: "success",
                title: "Extracción exitosa:",
                text: `Has retirado: $${value}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`,
              });
            }, 200);
          } else {
            setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El cajero sólo entrega billetes de $100. Por favor, ingresa un monto válido: ",
              });
            }, 200);
          }
          return;
        }
        if (value != null) {
          setTimeout(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El valor ingresado no es válido.",
            });
          }, 200);
        }
        return;
      },
    });
  })();
}

function depositarDinero() {
  (async () => {
    const { value: $deposito } = await Swal.fire({
      icon: "info",
      title: `Depositar dinero:`,
      text: `Ingresa el monto a depositar:`,
      input: "number",
      showCancelButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (esUnNumero(parseInt(value))) {
          value = parseInt(value);
          if (esNegativo(value)) {
            return;
          }
          const saldoAnterior = saldoCuenta;
          saldoCuenta = sumarDinero(value);
          actualizarSaldoEnPantalla();
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              title: "Depósito exitoso:",
              text: `Has depositado: $${value}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`,
            });
          }, 200);
          return;
        }
        if (value != null) {
          setTimeout(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El valor ingresado no es válido.",
            });
          }, 200);
        }
        return;
      },
    });
  })();
}

function pagarServicio() {
  let servicioAPagar = prompt(
    "Ingresa el número que corresponda al servicio que quieras pagar: \n1- Agua \n2- Luz \n3- Internet \n4- Telefono"
  );
  switch (servicioAPagar) {
    case "1":
      servicioAPagar = agua;
      break;
    case "2":
      servicioAPagar = telefono;
      break;
    case "3":
      servicioAPagar = luz;
      break;
    case "4":
      servicioAPagar = internet;
      break;
    case null:
      servicioAPagar = false;
      break;
    default:
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El código no corresponde a un servicio habilitado.",
      });
      servicioAPagar = false;
      break;
  }
  if (servicioAPagar) {
    const dineroDisponible = saldoSuficiente(servicioAPagar);
    if (dineroDisponible) {
      restarDinero(servicioAPagar);
      Swal.fire({
        icon: "success",
        title: "Listo!",
        text: `El servicio ha sido abonado con éxito. Se debitaron $${servicioAPagar} de tu cuenta.`,
      });
      actualizarSaldoEnPantalla();
    }
  }
}

function transferirDinero() {
  let montoATransfeir = prompt("Ingrese el monto que desea transferir:");
  if (esUnNumero(parseInt(montoATransfeir))) {
    montoATransfeir = parseInt(montoATransfeir);
    if (esNegativo(montoATransfeir)) {
      return;
    }
    if (saldoSuficiente(montoATransfeir)) {
      const cuentaATransferir = parseInt(prompt("Ingresa el Número de la cuenta a la que deseas transferir dinero:"));
      if (esUnNumero(cuentaATransferir)) {
        if (cuentaATransferir == cuentaAmiga1 || cuentaATransferir == cuentaAmiga2) {
          const saldoAnterior = saldoCuenta;
          saldoCuenta = restarDinero(montoATransfeir);
          actualizarSaldoEnPantalla();
          Swal.fire({
            icon: "success",
            title: "Listo!",
            text: `Has realizado una transferencia de $${montoATransfeir}. Cuenta Amiga Número: ${cuentaATransferir}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El código que ingresaste no corresponde a ninguna Cuenta Amiga.",
          });
        }
      }
    }
    return;
  }
  if (montoATransfeir != null) {
    Swal.fire("El valor ingresado no es válido.");
  }
  return;
}

function iniciarSesion() {
  (async () => {
    const { value: codigoUsuario } = await Swal.fire({
      icon: "question",
      title: "Contraseña:",
      text: `Ingresa el código de acceso para la cuenta de: ${nombreUsuario}`,
      input: "password",
      allowEscapeKey: false,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (value == codigoSeguridad) {
          setTimeout(() => {
            saldoCuenta = 10_000;
            actualizarSaldoEnPantalla();
            limiteExtraccion = 1000;
            actualizarLimiteEnPantalla();
            Swal.fire({
              icon: "success",
              title: `Bienvenido/a ${nombreUsuario}`,
              text: "Ya puedes comenzar a realizar operaciones.",
              showConfirmButton: true,
              allowEscapeKey: true,
              allowOutsideClick: true,
              timer: 2000,
            });
          }, 200);
          saldoCuenta = 10_000;
          actualizarSaldoEnPantalla();
          return;
        }
        if (value == codigoSeguridad) {
          return;
        }
        saldoCuenta = 0;
        actualizarSaldoEnPantalla();
        limiteExtraccion = 0;
        actualizarLimiteEnPantalla();
        return "El código ingresado es incorrecto. El dinero será retenido por cuestiones de seguridad.";
      },
    });
  })();
}

function saldoSuficiente(data) {
  if (data > saldoCuenta) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El saldo de la cuenta es insuficiente para realizar esta operación.",
    });
    return false;
  }
  return true;
}

function esUnNumero(data) {
  if (isNaN(data)) {
    return false;
  }
  return true;
}

function esNegativo(data) {
  if (Math.sign(data) === -1) {
    Swal.fire("El valor ingresado no es válido.");
    return true;
  }
  return false;
}

function restarDinero(data) {
  saldoCuenta -= data;
  return saldoCuenta;
}

function sumarDinero(data) {
  saldoCuenta += data;
  return saldoCuenta;
}

const cargarNombreEnPantalla = () => (document.getElementById("nombre").innerHTML = `Bienvenido/a ${nombreUsuario}`);
const actualizarSaldoEnPantalla = () => (document.getElementById("saldo-cuenta").innerHTML = `$${saldoCuenta}`);
const actualizarLimiteEnPantalla = () =>
  (document.getElementById("limite-extraccion").innerHTML = `Tu límite de extracción es de: $${limiteExtraccion}`);

document.getElementById("current-year").innerHTML = new Date().getFullYear();
