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
            title: `Ingresa el nuevo limite de extraccion:`,
            input: 'number',
            showCancelButton: true,
            inputValidator: (value) => {
                if (esUnNumero(parseInt(value))) {
                    if (esNegativo(value)) {
                        return
                    } else {
                        setTimeout(() => {
                            Swal.fire(`El nuevo limite de extraccion es de $${value}.`)
                            limiteExtraccion = parseInt(value)
                            actualizarLimiteEnPantalla()
                        }, 100)
                    }
                } else if (extraccion == null) {
                    return
                } else {
                    return 'El valor ingresado no es valido.'
                }
            }
        })
    })()
}

function extraerDinero() {
    let extraccion = prompt('Ingresa el monto que quieras extraer: ')
    if (esUnNumero(parseInt(extraccion))) {
        extraccion = parseInt(extraccion)
        if (esNegativo(extraccion)) {
            return
        } else {
            if (extraccion > limiteExtraccion) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El monto supera el limite de extraccion, intenta nuevamente.',
                })
            } else if (extraccion > saldoCuenta) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero, intenta nuevamente.',
                })
            } else if (extraccion % 100 !== 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El cajero solo entrega billetes de $100. Por favor ingrese un monto valido: ',
                })
            } else {
                let saldoAnterior = saldoCuenta
                saldoCuenta = restarDinero(extraccion)
                actualizarSaldoEnPantalla()
                Swal.fire({
                    icon: 'info',
                    title: 'Extraccion exitosa:',
                    text: `Has retirado: $${extraccion}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
                })
            }
        }
    } else if (extraccion == null) {
        return
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado no es valido',
        })
        return
    }
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
                title: 'Deposito exitoso:',
                text: `Has depositado: $${deposito}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`
            })
        }
    } else if (deposito == null) {
        return
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado no es valido',
        })
        return
    }
}

function pagarServicio() {
    let agua = 3500
    let telefono = 4250
    let luz = 2100
    let internet = 5700
    let servicioAPagar = prompt('Ingrese el numero que corresponda con el servicio que quieres pagar \n1- Agua \n2- Luz \n3- Internet \n4- Telefono')
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
                text: `El servicio ha sido abonado con exito. Se debitaron de tu cuenta $${servicioAPagar}.`,
            })
            actualizarSaldoEnPantalla()
        }
    }
}

function transferirDinero() {
    let montoATransfeir = prompt('Ingrese el monto que desea transferir.')
    if (esUnNumero(parseInt(montoATransfeir))) {
        montoATransfeir = parseInt(montoATransfeir)
        if (esNegativo(montoATransfeir)) {
            return
        } else {
            if (saldoSuficiente(montoATransfeir)) {
                let cuentaATransferir = parseInt(prompt('Ingrese el Numero de la cuenta a la que desea transferirle dinero.'))
                if (esUnNumero(cuentaATransferir)) {
                    if ((cuentaATransferir == cuentaAmiga1) || (cuentaATransferir == cuentaAmiga2)) {
                        let saldoAnterior = saldoCuenta
                        saldoCuenta = restarDinero(montoATransfeir)
                        actualizarSaldoEnPantalla()
                        Swal.fire({
                            icon: 'success',
                            title: 'Listo!',
                            text: `Has realizado una transferencia por $${montoATransfeir}. Cuenta Amiga Nº: ${cuentaATransferir}. Saldo Anterior: $${saldoAnterior}. Saldo actual: $${saldoCuenta}.`,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'El codigo que ingresaste no corresponde a ninguna Cuenta Amiga.',
                        })
                    }
                }

            }
        }
    } else if (montoATransfeir == null) {
        return
    } else {
        Swal.fire('El valor ingresado no es valido')
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
            text: `Ingrese el codigo de acceso para la cuenta de: ${nombreUsuario}`,
            input: 'password',
            showCancelButton: true,
            inputValidator: (value) => {
                if (value == codigoSeguridad) {
                    setTimeout(() => {
                        saldoCuenta = 10000
                        actualizarSaldoEnPantalla()
                        limiteExtraccion = 1000
                        actualizarLimiteEnPantalla()
                        Swal.fire({
                            icon: 'success',
                            title: `Bienvenido ${nombreUsuario}`,
                            text: `Ya puedes comenzar a realizar operaciones.`,
                        })
                    }, 100)
                    saldoCuenta = 10000
                    actualizarSaldoEnPantalla()
                } else if (value != codigoSeguridad) {
                    saldoCuenta = 0
                    actualizarSaldoEnPantalla()
                    limiteExtraccion = 0
                    actualizarLimiteEnPantalla()
                    return 'El codigo ingresado es incorrecto. El dinero sera retenido por cuestiones de seguridad.'
                }
            }
        })
    })()
}

function saldoSuficiente(data) {
    if (data > saldoCuenta) {
        Swal.fire('El saldo de la cuenta es insuficiente para realizar esta operacion.')
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
        Swal.fire('El valor ingresado no es valido.')
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
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion
}

function validUser() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
    })
}

function invalidUser() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: 'Signed failed'
    })
}
