let nombreUsuario = 'Juan Caiafa';
let saldoCuenta = 2000;
let limiteExtraccion = 300;
let codigoSeguridad = 1234;

window.onload = function () {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
};

function cambiarLimiteDeExtraccion() {
    (async () => {
        const {
            value: limiteExtraccion
        } = await Swal.fire({
            title: `Ingresa el nuevo limite de extraccion:`,
            input: 'number',
            showCancelButton: true,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    if (esNegativo(value)) {
                        return;
                    } else {
                        setTimeout(() => {
                            Swal.fire(`El nuevo limite de extraccion es de $${value}.`)
                        }, 100);
                        parseInt(value) = limiteExtraccion;
                        actualizarLimiteEnPantalla(limiteExtraccion)
                    }
                } else if (extraccion == null) {
                    return;
                } else {
                    return 'El valor ingresado no es valido.'
                }
            }
        })
    })()
}

function extraerDinero() {
    let infoText = false;
    let extraccion = prompt('Ingresa el monto que quieras extraer: ');
    if (esUnNumero(parseInt(extraccion))) {
        extraccion = parseInt(extraccion);
        if (esNegativo(extraccion)) {
            return;
        } else {
            if (extraccion > limiteExtraccion) {
                infoText = 'El monto supera el limite de extraccion, intenta nuevamente.';
                Swal.fire(infoText);
            } else if (extraccion > saldoCuenta) {
                infoText = 'No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero, intenta nuevamente.';
                Swal.fire(infoText);
            } else if (extraccion % 100 !== 0) {
                infoText = 'El cajero solo entrega billetes de $100. Por favor ingrese un monto valido: ';
                Swal.fire(infoText);
            } else {
                let saldoAnterior = saldoCuenta;
                saldoCuenta = restarDinero(extraccion);
                actualizarSaldoEnPantalla();
                Swal.fire('Has retirado: $' + extraccion + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
            }
        }
    } else if (extraccion == null) {
        return;
    } else {
        Swal.fire('El valor ingresado no es valido');
        return;
    }
}

function depositarDinero() {

    let deposito = prompt('Ingresa el monto a depositar: ');
    if (esUnNumero(parseInt(deposito))) {
        deposito = parseInt(deposito);
        if (esNegativo(deposito)) {
            return;
        } else {
            let saldoAnterior = saldoCuenta;
            saldoCuenta = sumarDinero(deposito);
            actualizarSaldoEnPantalla();
            Swal.fire('Has depositado: $' + deposito + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
        }
    } else if (deposito == null) {
        return;
    } else {
        Swal.fire('El valor ingresado no es valido');
        return;
    }
}

function pagarServicio() {
    let agua = 350;
    let telefono = 425;
    let luz = 210;
    let internet = 570;
    let servicioAPagar = prompt('Ingrese el numero que corresponda con el servicio que quieres pagar \n1- Agua \n2- Luz \n3- Internet \n4- Telefono');
    switch (servicioAPagar) {
        case '1':
            servicioAPagar = agua;
            break;
        case '2':
            servicioAPagar = telefono;
            break;
        case '3':
            servicioAPagar = luz;
            break;
        case '4':
            servicioAPagar = internet;
            break;
        case null:
            servicioAPagar = false;
            break;
        default:
            Swal.fire('El codigo no corresponde a un servicio habilitado.');
            servicioAPagar = false;
            break;
    }
    if (servicioAPagar) {
        let dineroDisponible = saldoSuficiente(servicioAPagar);
        if (dineroDisponible) {
            restarDinero(servicioAPagar);
            Swal.fire('El servicio ha sido abonado con exito. Se debitaron de su cuenta $' + servicioAPagar);
            actualizarSaldoEnPantalla();
        }
    }
}

function transferirDinero() {
    let cuentaAmiga1 = 1234567;
    let cuentaAmiga2 = 7654321;
    let montoATransfeir = prompt('Ingrese el monto que desea transferir.');
    if (esUnNumero(parseInt(montoATransfeir))) {
        montoATransfeir = parseInt(montoATransfeir);
        if (esNegativo(montoATransfeir)) {
            return;
        } else {
            if (saldoSuficiente(montoATransfeir)) {
                let cuentaATransferir = parseInt(prompt('Ingrese el Numero de la cuenta a la que desea transferirle dinero.'));
                if (esUnNumero(cuentaATransferir)) {
                    if ((cuentaATransferir == cuentaAmiga1) || (cuentaATransferir == cuentaAmiga2)) {
                        let saldoAnterior = saldoCuenta;
                        saldoCuenta = restarDinero(montoATransfeir);
                        actualizarSaldoEnPantalla();
                        Swal.fire('Has realizado una transferencia por $' + montoATransfeir + '\nCuenta amiga numero: ' + cuentaATransferir + '\nSaldo Anterior: $' + saldoAnterior + '\nSaldo actual: $' + saldoCuenta);
                    } else {
                        Swal.fire('El codigo que ingresaste no corresponde a ninguna Cuenta Amiga.');
                    }
                }

            }
        }
    } else if (montoATransfeir == null) {
        return;
    } else {
        Swal.fire('El valor ingresado no es valido');
        return;
    }
}

function iniciarSesion() {
    (async () => {
        const {
            value: codigoUsuario
        } = await Swal.fire({
            title: `Ingrese el codigo de acceso para la cuenta de: ${nombreUsuario}`,
            input: 'password',
            showCancelButton: true,
            inputValidator: (value) => {
                if (value == codigoSeguridad) {
                    setTimeout(() => {
                        Swal.fire(`Bienvenido ${nombreUsuario}. Ya puedes comenzar a realizar operaciones.`)
                    }, 100);
                    saldoCuenta = 2000;
                    actualizarSaldoEnPantalla();
                } else if (value != codigoSeguridad) {
                    saldoCuenta = 0;
                    actualizarSaldoEnPantalla();
                    return 'El codigo ingresado es incorrecto. El dinero sera retenido por cuestiones de seguridad.'
                }
            }
        })
    })()
}

function saldoSuficiente(data) {
    if (data > saldoCuenta) {
        Swal.fire('El saldo de la cuenta es insuficiente para realizar esta operacion.')
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
        Swal.fire('El valor ingresado no es valido.');
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

function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}