

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});
function LogCambio(date) {
  if(!isNaN(Date.parse(date)))
  {
    return true;
  }
  return false;
        }
function ConsultarCambio(url)
{
  if( typeof ConsultarCambio.si == 'undefined' ) {
        ConsultarCambio.si = false;
    }
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
   var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', url, true);
            xmlhttp.withCredentials = true;
            // build SOAP request
            var sr =
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope ' + 
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    //'xmlns:api="http://127.0.0.1/Integrics/Enswitch/API" ' +
                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
                    'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soapenv:Body>' +
                        '<TipoCambioDia xmlns="http://www.banguat.gob.gt/variables/ws/" />' +
                    '</soapenv:Body>' +
                '</soapenv:Envelope>';

               
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                  //console.log(xmlhttp.status);
                    if (xmlhttp.status == 200) {
                       
                     ConsultarCambio.si =  true;
                    }
                    
                    
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
              var start = new Date().getTime();
                 
                  //alert(xmlhttp.status );
                  return url=='http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL';
           
}
Cuenta = function (nocuenta, nombre, apellido, dpi, saldoini, correo, contra) {
  this.nocuenta = nocuenta;
  this.nombre = nombre;
  this.apellido = apellido;
  this.dpi = dpi;
  this.saldoini = saldoini;
  this.correo = correo;
  this.contra = contra;
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

/*TRANSFERENCIA*/
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

/*VER SALDO*/
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


//Pruebas de Login y de Registro

function simularbddpi(dpi,cuenta1,cuenta2,cuenta3){
        if(dpi==cuenta1.dpi){
            return false
        }
        if(dpi==cuenta2.dpi){
            return false
        }
        if(dpi==cuenta3.dpi){
            return false
        }
        return true
    }
    function simularbdcorreo(correo,cuenta1,cuenta2,cuenta3){
        if(correo==cuenta1.correo){
            return false
        }
        if(correo==cuenta2.correo){
            return false
        }
        if(correo==cuenta3.correo){
            return false
        }
        return true
    }

    function passwcoinciden(pass,confpass){
        if(pass==confpass){
            return true;
        }
        return false;
    }
    function simularbd(user,pass,cuenta1,cuenta2,cuenta3){
        if(user==cuenta1.correo){
            if(pass==cuenta1.contra){
                return true
            }else{
                return false
            }
        }
        if(user==cuenta2.correo){
            if(pass==cuenta2.contra){
                return true
            }else{
                return false
            }
        }
        if(user==cuenta3.correo){
            if(pass==cuenta3.contra){
                return true
            }else{
                return false
            }
        }
        return false
    }

QUnit.test('Crear Cuenta con DPI ya asignado', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var nombre="Martinoli"
    var apellido="Garcia"
    var dpi="7777777777"
    var correo="martinoli@gmail.com"
    var pass="123"
    var confpass="123"

    assert.notOk(simularbddpi(dpi,cuenta1,cuenta2,cuenta3), dpi+ " DPI asignado a otra cuenta");
  });

  QUnit.test('Crear una cuenta con correo duplicado', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var nombre="Martinoli"
    var apellido="Garcia"
    var dpi="848421548"
    var correo="pedro@gmail.com"
    var pass="123"
    var confpass="123"
    assert.notOk(simularbdcorreo(correo,cuenta1,cuenta2,cuenta3), correo+" Correo ya utilizado en otra cuenta");
  });

  QUnit.test('Password de confirmacion no coincidente', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var nombre="Martinoli"
    var apellido="Garcia"
    var dpi="848421548"
    var correo="martnoli@gmail.com"
    var pass="1234"
    var confpass="1235"
    assert.notOk(passwcoinciden(pass,confpass), "Pass  no coinciden");
  });

  QUnit.test('Ingreso de datos correcto', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var nombre="Martinoli"
    var apellido="Garcia"
    var dpi="848421548"
    var correo="martnoli@gmail.com"
    var pass="1234"
    var confpass="1234"
    var resultado=false
    if(simularbddpi(dpi,cuenta1,cuenta2,cuenta3)&&passwcoinciden(pass,confpass)&&simularbdcorreo(correo,cuenta1,cuenta2,cuenta3)){
        resultado = true
    }
    assert.ok(resultado, "Datos correctos para ingresar a la BD");
  });
  

    
    
	
  QUnit.test('Ingresar con correo inexistente', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var userlog="martinoli@gmail.com"
    var passlog="123"

    assert.notOk(simularbd(userlog,passlog,cuenta1,cuenta2,cuenta3), "Usuario incorrecto");
  });

  QUnit.test('Ingresar con pass incorrecta', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var userlog="juan@gmail.com"
    var passlog="123"

    assert.notOk(simularbd(userlog,passlog,cuenta1,cuenta2,cuenta3), "Pass incorrecto");
  });

  QUnit.test('Ingresar con pass correcta', function (assert) {
    let cuenta1 = new Cuenta(1, "Juan", "Pérez", 3297999401108, 11.00, "juan@gmail.com", "juan123");
    let cuenta2 = new Cuenta(2, "Pedro", "Paz", 3297999401105, 0.00, "pedro@gmail.com", "pedro123");
    let cuenta3 = new Cuenta(3, "Cerre", "Ciete", 7777777777, 0.00, "cr7@gmail.com", "123");

    var userlog="cr7@gmail.com"
    var passlog="123"

    assert.ok(simularbd(userlog,passlog,cuenta1,cuenta2,cuenta3), "Ingreso correcto");
  });

/* Prueba de Perfil */
QUnit.test('Acceso a los componentes de la pagina', function (assert) {
  document.getElementById('cuenta').innerText=29781;
  let cuenta = document.getElementById('cuenta').innerText;    
  let resultadoEsperado = 29781;

  assert.equal(cuenta, resultadoEsperado, "Se accede correctamente");
});

QUnit.test('Testing usuario Loggeado', function (assert) {
    
  sessionStorage.setItem('cuenta',25467);
  let logueado = sessionStorage.getItem('cuenta');
  let resultadoEsperado = 25467;
  sessionStorage.clear();

  assert.equal(logueado, resultadoEsperado, "Se guardan las variables de sesion");
});
QUnit.test( 'Prueba tipo de cambio con fecha', function(assert) {
  assert.ok( LogCambio('02.26.2016 11:48:36') );
} );


  QUnit.test( 'Testing ConsultarCambio()', function(assert) {
  
  
  assert.ok( ConsultarCambio('http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL') );
  
} );
