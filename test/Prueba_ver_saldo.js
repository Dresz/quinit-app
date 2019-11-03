Cuenta = function (nocuenta, nombre, apellido, dpi, saldoini, correo, contra) {
    this.nocuenta = nocuenta;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dpi = dpi;
    this.saldoini = saldoini;
    this.correo = correo;
}

QUnit.test('Testing ver saldo cero', function (assert) {
    let cuenta = new Cuenta(1, "Juan", "Pérez", 3297999401108, 0.00, "juan@gmail.com", "juan123");
    let resultadoEsperado = 0.00;

    assert.equal(cuenta.saldoini, resultadoEsperado, "Saldo cero (no tiene fondos)");
});

QUnit.test('Testing ver saldo de cuenta con fondos', function (assert) {
    let cuenta = new Cuenta(1, "Juan", "Pérez", 3297999401108, 1012.00, "juan@gmail.com", "juan123");
    let resultadoEsperado = 1012.00;

    assert.equal(cuenta.saldoini, resultadoEsperado, "Tiene fondos");
});

QUnit.test('Testing ver saldo de cuenta con deudas', function (assert) {
    let cuenta = new Cuenta(1, "Juan", "Pérez", 3297999401108, -1.00, "juan@gmail.com", "juan123");
    let resultadoEsperado = -1.00;

    assert.equal(cuenta.saldoini, resultadoEsperado, "Tiene saldo negativo (deuda/sin fondos)");
});