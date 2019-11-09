
it("Crear cuenta de usuario",()=>{
    cy.visit("/pages/registro.html");
    cy.get("#dpitext").type("4758372649010");
    cy.get("#nombretext").type("cypress client");
    cy.get("#apellidotext").type("cypress");
    cy.get("#correotext").type("correo@gmail.com");
    cy.get("#passtext").type("1234");
    cy.get("#passconftext").type("1234");
    cy.get("#crearcuenta").click();
});

it("Loguear un usuario",()=>{
    cy.visit("/pages/login.html");
    cy.get("#correotext").type("correo@gmail.com");
    cy.get("#passtext").type("1234");
    cy.get("#login").click();
});

it("Transferencia de saldo",()=>{
    cy.visit("/pages/transferencia.html");
    cy.get("#cuentaext");
    cy.get("#monto");
    cy.get("#transferir");
});

it("Ver Saldo Actual",()=>{
    cy.visit("/pages/saldo.html");
});

it("Consultar tipo de cambio",()=>{
    cy.visit("/pages/tipocambio.html");
    cy.get("#cuentaext");
    cy.get("#transferir");
});

it("Ver Perfil",()=>{
    cy.visit("/index.html");
});
