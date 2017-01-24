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
            controller  : 'inicioController'
        })
        .when('/aclaraciones_otros', {
            templateUrl : 'vistas/aclaraciones_otros.html',
            controller  : 'inicioController'
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
rutas.controller('tramitesController', function($scope, $http, socket) 
{
    //console.log(sucursal);
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/admin_agua/public/folios/pagos/1"
        //url:"http://agua.dev/folios"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        alert("Ha ocurrido un error al mostrar los datos");
    });
    
    /*Tramites*/
    $scope.contratos = function($numero)
    {
        
        socket.emit("contrato", $numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            //url: "http://agua.dev/tikets",
            url: "http://localhost/admin_agua/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : 'Contrato', 'subasunto' : 'Trámites'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.convenio = function($numero)
    {

        socket.emit("convenio", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://agua.dev/tikets",
            url: "http://localhost/admin_agua/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1',  'estado' :  '0', 'asunto' : 'Convenio', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }

    $scope.cambio_nombre = function($numero)
    {

        socket.emit("cambio", $numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Cambio de nombre', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.carta_adeudo = function($numero)
    {

        socket.emit("carta", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Carta de adeudo', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.factibilidad = function($numero)
    {

        socket.emit("factibilidad", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Factibilidad', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.dostramites = function($numero)
    {
        
        //alert($numero);
        socket.emit("pdf", $numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://agua.dev/tikets",
            url: "http://localhost/admin_agua/public/tikets",
            data: ({'turno' : $numero , 'id_sucursal' : '1' , 'estado' :  '0', 'asunto' : '2 ó más trámites', 'subasunto' : 'Trámites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            url: "http://localhost/admin_agua/public/folios/actualizar/1",
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
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
        url: "http://localhost/admin_agua/public/folios/aclaraciones/1"
        //url:"http://agua.dev/folios"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        alert("Ha ocurrido un error al mostrar los datos");
    });
    /*Aclaraciones y otros*/
    $scope.alto_consumo = function($numero)
    {

        socket.emit("alto_consumo", $numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Alto consumo (con y sin medidor)', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.reconexion = function($numero)
    {

        socket.emit("reconexion", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Reconexión de servicio', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.error_lectura = function($numero)
    {

        socket.emit("error_lectura", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Error en lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.no_toma_lectura = function($numero)
    {
        
        socket.emit("no_toma_lectura", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'No toma lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }    
    $scope.noentrega = function($numero)
    {

        socket.emit("no_entrega", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'No entrega de recibo', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.cambio_tarifa = function($numero)
    {

        socket.emit("cambio_tarifa", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Cambio de tarifa', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }

    $scope.solicitud = function($numero)
    {
        
        socket.emit("solicitud", $numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Solicitud de medidor', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.otros_tramites = function($numero)
    {

        socket.emit("otros", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '1', 'estado' :  '0', 'asunto' : 'Otros trámites', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/1",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    /*Fin de aclaraciones */
});
