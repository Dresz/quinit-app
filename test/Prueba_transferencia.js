Cuenta = function (nocuenta, nombre, apellido, dpi, saldoini, correo, contra) {
    this.nocuenta = nocuenta;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dpi = dpi;
    this.saldoini = saldoini;
    this.correo = correo;
}

function transferir(cuentaTransfiere, cuentaRecibe, montoTransferir) {
    if (cuentaTransfiere.saldoini >= montoTransferir) {
        cuentaRecibe.saldoini += montoTransferir;
        cuentaTransfiere.saldoini -= montoTransferir;
        return true;
    } else {
        return false;
    }
}

QUnit.test('Testing transferir con saldo suficiente', function (assert) {
    let cuentaTransfiere = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuentaRecibe = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let montoTransferir = 10.00;

    transferir(cuentaTransfiere, cuentaRecibe, montoTransferir);
    assert.ok(cuentaTransfiere.saldoini == 1.00, "Saldo que transfiere");
    assert.ok(cuentaRecibe.saldoini == 10.00, "Saldo que recibe");
});

QUnit.test('Testing transferir sin saldo suficiente', function (assert) {
    let cuentaTransfiere = new Cuenta(1, "Juan", "Pérez", 3297999401108, 9.00, "juan@gmail.com", "juan123");
    let cuentaRecibe = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let montoTransferir = 10.00;

    assert.notOk(transferir(cuentaTransfiere, cuentaRecibe, montoTransferir), "Sin fondos");
});

QUnit.test('Testing transferir monto cero', function (assert) {
    let cuentaTransfiere = new Cuenta(1, "Juan", "Pérez", 3297999401108, 9.00, "juan@gmail.com", "juan123");
    let cuentaRecibe = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let montoTransferir = 0.00;

    transferir(cuentaTransfiere, cuentaRecibe, montoTransferir);
    assert.ok(cuentaTransfiere.saldoini == 9.00, "Saldo que transfiere");
    assert.ok(cuentaRecibe.saldoini == 0.00, "Saldo que recibe");
});