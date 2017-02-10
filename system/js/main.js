//var socket = io.connect('http://localhost:8080', { 'forceNew': true });

// Creación del módulo
var rutas = angular.module('rutas', ['ngRoute','ngResource']);
var sucursal = localStorage.getItem('sucursal');

// Configuración de las rutas
rutas.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'vistas/inicio.html',
            controller  : 'inicioController'
        })
       .when('/pagos_tramites', {
            templateUrl : 'vistas/tramites.html',
            controller  : 'tramitesController'
        })
        .when('/aclaraciones_otros', {
            templateUrl : 'vistas/aclaraciones_otros.html',
            controller  : 'aclaracionesController'
        })
        .when('/pago',{
            templateUrl : 'vistas/pagos.html',
            controller  : 'pagosController'

        })
        .when('/final', {
            templateUrl : 'vistas/final.html'
        })
        
        /*final*/  
        .otherwise({
            redirectTo: '/'
        });
});

//lamando a socket en angular
rutas.factory('socket',['$rootScope', function(){
    var socket = io.connect('http://localhost:8080');
    return{
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit:function(eventName,data){
            socket.emit(eventName,data);
        }
    };
}]);

//controlador 
rutas.controller('inicioController', function($scope) 
{
   
});
rutas.controller('pagosController', function($scope, $http, socket) 
{
    //trayendo folios
    $http({
        method:"get",
        //url: "http://192.168.1.57:8080/turnomatic/public/folios/pagos/1"
        url: "http://localhost/turnomatic/public/folios/pagos/1"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
    });

    $scope.pagos = function($numero)
    {
        
        socket.emit("pago","P"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : 'Pago', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar/1",
            url: "http://localhost/turnomatic/public/folios/actualizar/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.conveniopago = function($numero)
    {
        
        socket.emit("pagoconvenio", "P"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            url: "http://localhost/turnomatic/public/tikets",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : 'Pago de convenio', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar/1",
            url: "http://localhost/turnomatic/public/folios/actualizar/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.cartapago = function($numero)
    {
        
        socket.emit("pagocarta","P"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            url: "http://localhost/turnomatic/public/tikets",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : 'Pago carta no adeudo', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar/1",
            url: "http://localhost/turnomatic/public/folios/actualizar/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
});
rutas.controller('tramitesController', function($scope, $http, socket) 
{
    //console.log(sucursal);
    //trayendo folios
    $http({
        method:"get",
        //url: "http://192.168.1.57:8080/turnomatic/public/folios/aclaraciones/1"
        url: "http://localhost/turnomatic/public/folios/aclaraciones/1"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
    });
    
    /*Tramites*/
    $scope.contratos = function($numero)
    {
        
        socket.emit("contrato","A"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            url: "http://localhost/turnomatic/public/tikets",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : 'Contrato', 'subasunto' : 'Trámites'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.convenio = function($numero)
    {

        socket.emit("convenio","A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/tikets",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1',  'estado' :  '0', 'asunto' : 'Convenio', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }

    $scope.cambio_nombre = function($numero)
    {

        socket.emit("cambio", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Cambio de nombre', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.carta_adeudo = function($numero)
    {

        socket.emit("carta", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Carta de adeudo', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.factibilidad = function($numero)
    {

        socket.emit("factibilidad","A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Factibilidad', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.dostramites = function($numero)
    {
        
        //alert($numero);
        socket.emit("pdf", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/tikets",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            data: ({'turno' : $numero , 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : '2 ó más trámites', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    };
    /*Fin de servicios*/
});
rutas.controller('aclaracionesController', function($scope, $http, socket) 
{
    //trayendo folios
    $http({
        method:"get",
        //url: "http://192.168.1.57:8080/turnomatic/public/folios/aclaraciones/1"
        url: "http://localhost/turnomatic/public/folios/aclaraciones/1"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
    });
    /*Aclaraciones y otros*/
    $scope.alto_consumo = function($numero)
    {

        socket.emit("alto_consumo", "A"+$numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Alto consumo (con y sin medidor)', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.reconexion = function($numero)
    {

        socket.emit("reconexion", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Reconexión de servicio', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.error_lectura = function($numero)
    {

        socket.emit("error_lectura", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Error en lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.no_toma_lectura = function($numero)
    {
        
        socket.emit("no_toma_lectura", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'No toma lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }    
    $scope.noentrega = function($numero)
    {

        socket.emit("no_entrega", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'No entrega de recibo', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.cambio_tarifa = function($numero)
    {

        socket.emit("cambio_tarifa", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Cambio de tarifa', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }

    $scope.solicitud = function($numero)
    {
        
        socket.emit("solicitud", "A"+$numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Solicitud de medidor', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.otros_tramites = function($numero)
    {

        socket.emit("otros", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://192.168.1.57:8080/turnomatic/public/tikets",
            url: "http://localhost/turnomatic/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Otros trámites', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://192.168.1.57:8080/turnomatic/public/folios/actualizar_aclaraciones/1",
            url: "http://localhost/turnomatic/public/folios/actualizar_aclaraciones/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            console.log("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    /*Fin de aclaraciones */
});
