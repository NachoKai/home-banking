let nombreUsuario = 'Juan Caiafa'
let saldoCuenta = 0
let limiteExtraccion = 0
let codigoSeguridad = 1234
let cuentaAmiga1 = 12345
let cuentaAmiga2 = 56789

window.onload = function () {
    iniciarSesion()
    cargarNombreEnPantalla()
    actualizarSaldoEnPantalla()
    actualizarLimiteEnPantalla()
}

function cambiarLimiteDeExtraccion() {
    (async () => {
        const {
            value: $limiteExtraccion
        } = await Swal.fire({
            icon: 'question',
            title: `Cambiar límite de extracción`,
            text: `Ingresa el nuevo límite de extracción:`,
            input: 'number',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: true,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    if (esNegativo(value)) {
                        return
                    } else {
                        setTimeout(() => {
                            Swal.fire({
                                icon: 'success',
                                title: `Listo!`,
                                text: `El nuevo límite de extracción es de $${value}.`
                            })
                            limiteExtraccion = parseInt(value)
                            actualizarLimiteEnPantalla()
                        }, 100)
                    }
                } else if (extraccion == null) {
                    return
                } else {
                    return 'El valor ingresado no es válido.'
                }
            }
        })
    })()
}

function extraerDinero() {


    (async () => {
        const {
            value: $extraccion
        } = await Swal.fire({
            icon: 'info',
            title: `Extraer dinero:`,
            text: `Ingresa el monto que quieras extraer:`,
            input: 'number',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    value = parseInt(value)
                    if (esNegativo(value)) {
                        return
                    } else {
                        if (value > limiteExtraccion) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'El monto supera el límite de extracción, intenta nuevamente.',
                                })
                            }, 200);
                        } else if (value > saldoCuenta) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Oops...',
                                    text: 'No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero, intenta nuevamente.',
                                })
                            }, 200);
                        } else if (value % 100 !== 0) {
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'El cajero sólo entrega billetes de $100. Por favor, ingresa un monto válido: ',
                                })
                            }, 200);
                        } else {
                            let saldoAnterior = saldoCuenta
                            saldoCuenta = restarDinero(value)
                            actualizarSaldoEnPantalla()
                            setTimeout(() => {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Extracción exitosa:',
                                    text: `Has retirado: $${value}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
                                })
                            }, 200);
                        }
                    }
                } else if (value == null) {
                    return
                } else {
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El valor ingresado no es válido.',
                        })
                    }, 200);
                    return
                }
            }
        })
    })()
}

function depositarDinero() {

    let deposito = prompt('Ingresa el monto a depositar: ')
    if (esUnNumero(parseInt(deposito))) {
        deposito = parseInt(deposito)
        if (esNegativo(deposito)) {
            return
        } else {
            let saldoAnterior = saldoCuenta
            saldoCuenta = sumarDinero(deposito)
            actualizarSaldoEnPantalla()
            Swal.fire({
                icon: 'info',
                title: 'Depósito exitoso:',
                text: `Has depositado: $${deposito}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
            })
        }
    } else if (deposito == null) {
        return
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado no es válido.',
        })
        return
    }
}

function pagarServicio() {
    let agua = 3500
    let telefono = 4250
    let luz = 2100
    let internet = 5700
    let servicioAPagar = prompt('Ingresa el número que corresponda al servicio que quieras pagar: \n1- Agua \n2- Luz \n3- Internet \n4- Telefono')
    switch (servicioAPagar) {
        case '1':
            servicioAPagar = agua
            break
        case '2':
            servicioAPagar = telefono
            break
        case '3':
            servicioAPagar = luz
            break
        case '4':
            servicioAPagar = internet
            break
        case null:
            servicioAPagar = false
            break
        default:
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El código no corresponde a un servicio habilitado.',
            })
            servicioAPagar = false
            break
    }
    if (servicioAPagar) {
        let dineroDisponible = saldoSuficiente(servicioAPagar)
        if (dineroDisponible) {
            restarDinero(servicioAPagar)
            Swal.fire({
                icon: 'success',
                title: 'Listo!',
                text: `El servicio ha sido abonado con éxito. Se debitaron de tu cuenta $${servicioAPagar}.`,
            })
            actualizarSaldoEnPantalla()
        }
    }
}

function transferirDinero() {
    let montoATransfeir = prompt('Ingrese el monto que desea transferir:')
    if (esUnNumero(parseInt(montoATransfeir))) {
        montoATransfeir = parseInt(montoATransfeir)
        if (esNegativo(montoATransfeir)) {
            return
        } else {
            if (saldoSuficiente(montoATransfeir)) {
                let cuentaATransferir = parseInt(prompt('Ingresa el Número de la cuenta a la que deseas transferir dinero:'))
                if (esUnNumero(cuentaATransferir)) {
                    if ((cuentaATransferir == cuentaAmiga1) || (cuentaATransferir == cuentaAmiga2)) {
                        let saldoAnterior = saldoCuenta
                        saldoCuenta = restarDinero(montoATransfeir)
                        actualizarSaldoEnPantalla()
                        Swal.fire({
                            icon: 'success',
                            title: 'Listo!',
                            text: `Has realizado una transferencia por $${montoATransfeir}. Cuenta Amiga Número: ${cuentaATransferir}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El código que ingresaste no corresponde a ninguna Cuenta Amiga.',
                        })
                    }
                }

            }
        }
    } else if (montoATransfeir == null) {
        return
    } else {
        Swal.fire('El valor ingresado no es válido.')
        return
    }
}

function iniciarSesion() {
    (async () => {
        const {
            value: codigoUsuario
        } = await Swal.fire({
            icon: 'question',
            title: 'Contraseña:',
            text: `Ingresa el código de acceso para la cuenta de: ${nombreUsuario}`,
            input: 'password',
            showCancelButton: true,
            allowEscapeKey: false,
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (value == codigoSeguridad) {
                    setTimeout(() => {
                        saldoCuenta = 10000
                        actualizarSaldoEnPantalla()
                        limiteExtraccion = 1000
                        actualizarLimiteEnPantalla()
                        Swal.fire({
                            icon: 'success',
                            title: `Bienvenido/a ${nombreUsuario}`,
                            text: `Ya puedes comenzar a realizar operaciones.`,
                        })
                    }, 200)
                    saldoCuenta = 10000
                    actualizarSaldoEnPantalla()
                } else if (value != codigoSeguridad) {
                    saldoCuenta = 0
                    actualizarSaldoEnPantalla()
                    limiteExtraccion = 0
                    actualizarLimiteEnPantalla()
                    return 'El código ingresado es incorrecto. El dinero será retenido por cuestiones de seguridad.'
                }
            }
        })
    })()
}

function saldoSuficiente(data) {
    if (data > saldoCuenta) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El saldo de la cuenta es insuficiente para realizar esta operación.',
        })
        return false
    }
    return true
}

function esUnNumero(data) {
    if (isNaN(data)) {
        return false
    }
    return true
}

function esNegativo(data) {
    if (Math.sign(data) === -1) {
        Swal.fire('El valor ingresado no es válido.')
        return true
    }
    return false
}

function restarDinero(data) {
    saldoCuenta -= data
    return saldoCuenta
}

function sumarDinero(data) {
    saldoCuenta += data
    return saldoCuenta
}

function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es de: $" + limiteExtraccion
}