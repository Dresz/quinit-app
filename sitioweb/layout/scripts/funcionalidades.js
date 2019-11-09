/**
 * FUNCIONALIDADES
**/

function login(account,bool){
  sessionStorage.setItem("cuenta", account);//numero de cuenta
  sessionStorage.setItem("logueado", bool);//true or false
  //lo enviamos a la pagina de ver perfil (index.html)
}

function logout(){
  sessionStorage.clear("cuenta");
  sessionStorage.clear("logueado");
  location.href = "../pages/login.html";
}

/*###########################################__VER-SALDO__####################################################*/
//incluye la carga de datos como el nombre y el numero de cuenta
//asi como la autenticacion del usuario

function alcargar(){
  var logueado = sessionStorage.getItem("logueado");
  if(!logueado){
    location.href = "../pages/login.html";
  }

  var clogin = sessionStorage.getItem("cuenta");//cuenta logueada
  var saldo = document.getElementById('saldoact');//saldo actual de la cuenta
  var nombre = document.getElementById('username');//nombre + apellido
  var cuenta = document.getElementById('account');//numero cuenta
  cuenta.textContent = clogin;//no de cuenta logueada

  $.ajax({
    type:"GET",
    url:"http://127.0.0.1:3000/versaldo/?act="+cuenta.textContent,
    crossDomain:true,
    success : function(data,status){
      if(status == 'success'){
        var json = JSON.parse(JSON.stringify(data).replace("RowDataPacket ",""));
        saldo.textContent=json[0].saldoini;
        nombre.textContent=json[0].nombre+" "+json[0].apellido;
      }
    }
  });
}

/*#########################################__TRANSFERENCIA__##################################################*/
function transf(){
  var cuenta = document.getElementById('account').textContent;//numero cuenta logueada
  var saldo = document.getElementById('saldoact').textContent;//saldo actual de la cuenta logueada
  var cuentaext = document.getElementById('cuentaext').value;//cuenta a la que quiero transferir
  var cantidad = document.getElementById('monto').value;//cantidad a transferir

  if( parseFloat(saldo) >=  parseFloat(cantidad)){
    $.ajax({
      type:"GET",
      url:"http://127.0.0.1:3000/buscarcuenta/?ext="+cuentaext,
      crossDomain:true,
      success : function(data,status){
        if(status == 'success'){
          if(data!=null){
            $.ajax({
              type:"GET",
              url:"http://127.0.0.1:3000/transferir1/?ext="+cuentaext+"&monto="+cantidad,
              crossDomain:true,
              success : function(data,status){
                if(status == 'success'){
                  if(data=="Correcto"){
                    $.ajax({
                      type:"GET",
                      url:"http://127.0.0.1:3000/transferir2/?act="+cuenta+"&monto="+cantidad,
                      crossDomain:true,
                      success : function(data,status){
                        if(status == 'success'){
                          if(data=="Correcto"){
                            console.log("Transferencia Terminada");
                            location.reload(true);
                          }
                        }
                      }
                    });
                  }
                }
              }
            });
          }
        }
      }
    });
  }else{
    alert("La cantidad que se desea transferir sobrepasa el saldo actual.");
  }
}

/*################################################__REGISTRO___##################################*/

function crearcuenta(){
  var logueado = sessionStorage.getItem("logueado");
  if(logueado){
    location.href = "../index.html";
  }

  var nombre = document.getElementById('nombretext').value;//nombre + apellido
  var apellido = document.getElementById('apellidotext').value;
  var dpi = document.getElementById('dpitext').value;
  var pass = document.getElementById('passtext').value;
  var confpass = document.getElementById('passconftext').value;
  var correo = document.getElementById('correotext').value;//numero cuenta
  if(pass==confpass){
    $.ajax({
      type:"GET",
      url:"http://127.0.0.1:3000/buscarcorreo/?ext="+correo,
      crossDomain:true,
      success : function(data,status){
        if(status == 'success'){
          if(data.length==0){
            $.ajax({
              type:"GET",
              url:"http://127.0.0.1:3000/buscardpi/?ext="+dpi,
              crossDomain:true,
              success : function(data,status){
                if(status == 'success'){
                  if(data.length==0){
                    $.ajax({
                      type:"GET",
                      url:"http://127.0.0.1:3000/insertarnuevacuenta/?nombre="+nombre+"&apellido="+apellido+"&dpi="+dpi+"&correo="+correo+"&contra="+pass,
                      crossDomain:true,
                      success : function(data,status){
                        if(status == 'success'){
                          if(data=="Correcto"){
                            console.log("Transferencia Terminada");
                            location.reload(true);
                            return true;
                          }
                        }
                      }
                    });
                  }
                  else{
                    alert("El DPI ya tiene cuenta asignada.");
                    return false;        
                  }
                }
              }
            });
          }
          else{
            alert("El correo ya existe.");
            return false;        
          }
        }
      }
    });
  }
  else{
    alert("Las contraseñas no coinciden.");
    return false;
  }
}

/*###########################################__LOGIN__#######################################################*/
function login(){
  var logueado = sessionStorage.getItem("logueado");
  if(logueado){
    location.href = "../index.html";
  }

  var correo = document.getElementById('correotext').value;//numero cuenta
  var pass = document.getElementById('passtext').value;
  $.ajax({
    type:"GET",
    url:"http://127.0.0.1:3000/buscarcorreo/?ext="+correo,
    crossDomain:true,
    success : function(data,status){
      if(status == 'success'){
        if(data.length==0){
          alert("El correo no está registrado.");
          return false;
        }else{
          $.ajax({
            type:"GET",
            url:"http://127.0.0.1:3000/buscarpassword/?ext="+correo,
            crossDomain:true,
            success : function(data,status){
              if(status == 'success'){
                var json = JSON.parse(JSON.stringify(data).replace("RowDataPacket ",""));
                var confpass =json[0].contra;
                if(confpass==pass){
                  $.ajax({
                    type:"GET",
                    url:"http://127.0.0.1:3000/buscarcuentaporcorreo/?ext="+correo,
                    crossDomain:true,
                    success : function(data,status){
                      if(status == 'success'){
                        var json = JSON.parse(JSON.stringify(data).replace("RowDataPacket ",""));
                        var cuentalog =json[0].nocuenta;
                        console.log(cuentalog);
                        sessionStorage.setItem("cuenta", cuentalog);//numero de cuenta
                        sessionStorage.setItem("logueado", true);
                        location.href ="../index.html";
                        return true;
                      }
                    }
                  });
                }else{
                  alert("Contraseña incorrecta")
                  return false;
                }
              }
            }
          });
        }
      }
    }
  });
}

/*##########################################__VerPerfil__##################################################*/
function verPerfil(){  
  var logueado = sessionStorage.getItem("logueado");
  var clogin = sessionStorage.getItem("cuenta");
  if(!logueado){
    location.href = "../pages/login.html";
  }

  $.ajax({
    type:"GET",
    url:"http://127.0.0.1:3000/verperfil/?ext="+clogin,
    crossDomain:true,
    success : function(data,status){
      if(status == 'success'){
        var json = JSON.parse(JSON.stringify(data).replace("RowDataPacket ",""));
        console.log(json);
        document.getElementById('cuenta').innerText=json[0].nocuenta      // Le asgina el numero de cuenta
        document.getElementById('nombre').innerText=json[0].nombre        // Le asgina el numero de cuenta
        document.getElementById('apellido').innerText=json[0].apellido    // Le asigna el apellido
        document.getElementById('dpi').innerText=json[0].dpi              // Le asigna el DPI
        document.getElementById('correo').innerText=json[0].correo        // le asigna el correo        
      }
    }
  });
}

function init(){
  alcargar();
  verPerfil();
}
function soap() {
           $("#este").empty();
              
              var p = document.getElementById("este");
              var newElement = document.createElement("div");
              newElement.setAttribute('id', 'este2');
              //newElement.innerHTML = html;
              p.appendChild(newElement);
          //alert(document.getElementById("cuentaext").value);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL', true);
            xmlhttp.withCredentials = true;
            // build SOAP request
            var sr =
                '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope ' + 
                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                    //'xmlns:api="http://www.banguat.gob.gt/variables/ws/TipoCambioFechaInicial" ' +
                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
                    'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soapenv:Body>' +
                        '<TipoCambioFechaInicial xmlns="http://www.banguat.gob.gt/variables/ws/"> ' +
                        '<fechainit>'+document.getElementById("cuentaext").value+'</fechainit> '+
                        '</TipoCambioFechaInicial> '+
                    '</soapenv:Body>' +
                '</soapenv:Envelope>';

                /*
                <?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <TipoCambioFechaInicial xmlns="http://www.banguat.gob.gt/variables/ws/">
      <fechainit>string</fechainit>
    </TipoCambioFechaInicial>
  </soap:Body>
</soap:Envelope>*/

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var respuesta = xmlhttp.responseText;
                       var res = respuesta.split("<Var>");
                       //var res2 = res.replace("</", " ");
                       //res2 = res2.replace(">", " ");
                       for (var i = res.length - 1; i >= 0; i--) {
                        var res2 = res[i];
                        res2 = res2.split("<fecha>");
                        var res3 = res2[1];
                        res3 = res3.split("</fecha>");
                        var body = document.getElementById("este2");
                        var h1 = document.createElement("h6");
                        h1.innerHTML = "Fecha";
                        h1.setAttribute("class", "otroh6");
                        body.appendChild(h1);
                        var h2 = document.createElement("h6");
                        h2.innerHTML = res3[0];
                        h2.setAttribute("align", "center");
                        h2.setAttribute("class", "clear");

                        body.appendChild(h2);
                           //alert(res3[0]);
                        res2 = res[i];
                        res2 = res2.split("<venta>");
                        res3 = res2[1];
                        res3 = res3.split("</venta>");
                        var h3 = document.createElement("h6");
                        h3.innerHTML = "Venta";
                        h3.setAttribute("class", "otroh6");
                        body.appendChild(h3);
                        var h4 = document.createElement("h6");
                        h4.innerHTML = res3[0];
                        h4.setAttribute("align", "center")
                        body.appendChild(h4);
                        /*h1.innerHTML = "Venta";
                        body.appendChild(h1);
                        h1.innerHTML = res3[0];
                        body.appendChild(h1);*/

                           //alert(res3[0]);
                        res2 = res[i];
                        res2 = res2.split("<compra>");
                        res3 = res2[1];
                        res3 = res3.split("</compra>");
                        var h5 = document.createElement("h6");
                        h5.innerHTML = "Compra";
                        h5.setAttribute("class", "otroh6");
                        body.appendChild(h5);
                        var h6 = document.createElement("h6");
                        h6.innerHTML = res3[0];
                        h6.setAttribute("align", "center")
                        body.appendChild(h6);
                        /*h1.innerHTML = "Venta";
                        body.appendChild(h1);
                        h1.innerHTML = res3[0];
                        body.appendChild(h1);*/

                           //alert(res3[0]);
                       }
                    


                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
        }
function soap2() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL', true);
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

                /*
                <?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <TipoCambioDia xmlns="http://www.banguat.gob.gt/variables/ws/" />
  </soap:Body>
</soap:Envelope>*/

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                       var respuesta = xmlhttp.responseText;
                       var res = respuesta.split("fecha");
                       var res2 = res[1].replace("</", " ");
                       res2 = res2.replace(">", " ");
                        //alert(res2);
                       var din = respuesta.split("referencia");
                       var dinero = din[1].replace("</", " ");
                       dinero = dinero.replace(">", " ");
                        document.getElementById("cambio").innerHTML = "Q. "+dinero;
                        // alert('done. use firebug/console to see network response');
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
        }