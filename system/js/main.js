//var socket = io.connect('http://localhost:8080', { 'forceNew': true });

// Creación del módulo
var rutas = angular.module('rutas', ['ngRoute','ngResource']);
// Configuración de las rutas
rutas.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'vistas/inicio.html',
            controller  : 'inicioController'
        })
       .when('/pagos_tramites', {
            templateUrl : 'vistas/pagos_tramites.html',
            controller  : 'inicioController'
        })
        .when('/aclaraciones_otros', {
            templateUrl : 'vistas/aclaraciones_otros.html',
            controller  : 'inicioController'
        })
        .when('/final', {
            templateUrl : 'vistas/final.html',
            controller  : 'inicioController'
        })
        
        /*final*/  
        .otherwise({
            redirectTo: '/'
        });
});

//lamando a socket en angular
rutas.factory('socket',['$rootScope', function($rootScope){
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
rutas.controller('inicioController', function($scope, $http, $route, socket) 
{
    //trayendo folios
    $http({
        method:"get",
        //url: "http://10.10.10.11/admin_agua/public/folios"
        url:"http://agua.dev/folios"
    }).success(function(data)
    {
        console.log(data);
        $scope.datos=data;
    }).error(function(data){
        alert("Ha ocurrido un error al mostrar los datos");
    });
    
    /*Pagos y tramites*/
    $scope.pagos = function($id, $numero)
    {
        //alert(asunto);
        //alert($numero);
        socket.emit("pdf",$numero);
        socket.emit("imprimir");


        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://agua.dev/tikets",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Pago' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://agua.dev/folios/actualizar/"+$id,
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    };
    $scope.contratos = function($id, $numero)
    {
        
        socket.emit("pdf", $numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            url: "http://agua.dev/tikets",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Contrato' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.convenio = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://agua.dev/tikets",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Convenio' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://agua.dev/folios/actualizar/"+$id,
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }

    $scope.cambio_nombre = function($id, $numero)
    {

        socket.emit("pdf", $numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Cambio de nombre' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.carta_adeudo = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Carta de adeudo' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.factibilidad = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Factibilidad' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    /*Fin de servicios*/
    /*Aclaraciones y otros*/
    $scope.alto_consumo = function($id, $numero)
    {

        socket.emit("pdf", $numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Alto Consumo (Medidor)' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.reconexion = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Reconexion' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.alto_consumo_estimado = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Alto Consumo (Estimado)' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.cambio_tarifa = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Cambio de tarifa' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.error_lectura = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Error de lectura' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.correccion_datos = function($id, $numero)
    {
        
        socket.emit("pdf", $numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Correccion de datos' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.no_toma_lectura = function($id, $numero)
    {
        
        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'No Toma Lectura' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    $scope.otros_tramites = function($id, $numero)
    {

        socket.emit("pdf", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://10.10.10.11/admin_agua/public/tikets",
            url: "http://agua.dev/tikets",
            data: ({'turno' : $numero , 'estado' :  '0', 'asunto' : 'Otros Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://10.10.10.11/admin_agua/public/folios/actualizar/"+$id,
            url: "http://agua.dev/folios/actualizar/"+$id,
            data: ({ 'numero' : $numero })
        }).success(function(data){
                //alert("Datos actualizados con exito");
                window.location.href = '#/final';
                socket.emit("imprimir","imprimiendo");
        }).error(function(data){
            alert("Ha ocurrido un error al actualizar los datos");
                //console.log(id);
        })
    }
    /*Fin de aclaraciones */
});