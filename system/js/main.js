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
            templateUrl : 'vistas/pagos_tramites.html',
            controller  : 'pagosController'
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
rutas.controller('pagosController', function($scope, $http, socket) 
{
    //console.log(sucursal);
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/admin_agua/public/folios/pagos/"+sucursal
        //url:"http://agua.dev/folios"
    }).success(function(data)
    {
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        alert("Ha ocurrido un error al mostrar los datos");
    });
    
    /*Pagos y tramites*/
    $scope.pagos = function($numero)
    {
        
        //alert($numero);
        socket.emit("pdf", $numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://agua.dev/tikets",
            url: "http://localhost/admin_agua/public/tikets",
            data: ({'turno' : $numero , 'id_sucursal' : sucursal , 'estado' :  '0', 'asunto' : 'Pago', 'subasunto' : 'Pagos y Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            //url: "http://agua.dev/folios/actualizar/"+$id,
            url: "http://localhost/admin_agua/public/folios/actualizar/"+sucursal,
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
    $scope.contratos = function($numero)
    {
        
        socket.emit("contrato", $numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            //url: "http://agua.dev/tikets",
            url: "http://localhost/admin_agua/public/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : sucursal , 'estado' :  '0', 'asunto' : 'Contrato', 'subasunto' : 'Pagos y Tramites'})
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal,  'estado' :  '0', 'asunto' : 'Convenio', 'subasunto' : 'Pagos y Tramites' })
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Cambio de nombre', 'subasunto' : 'Pagos y Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Carta de adeudo', 'subasunto' : 'Pagos y Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Factibilidad', 'subasunto' : 'Pagos y Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar/"+sucursal,
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
    /*Fin de servicios*/
});
rutas.controller('aclaracionesController', function($scope, $http, socket) 
{
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/admin_agua/public/folios/aclaraciones/"+sucursal
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Alto Consumo (Medidor)', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Reconexion', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
    $scope.alto_consumo_estimado = function($numero)
    {

        socket.emit("alto_consumo_estimado", $numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Alto Consumo (Estimado)', 'subasunto' : 'Aclaraciones y Otros' })
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Cambio de tarifa', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Error de lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
    $scope.correccion_datos = function($numero)
    {
        
        socket.emit("correccion", $numero);
        
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/admin_agua/public/tikets",
            //url: "http://agua.dev/tikets",
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Correccion de datos', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'No Toma Lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
            data: ({'turno' : $numero, 'id_sucursal' : sucursal, 'estado' :  '0', 'asunto' : 'Otros Tramites', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })

        //actualizando tabla folios incrementando a 1 cada vez
        $http({
            method:"put",
            url: "http://localhost/admin_agua/public/folios/actualizar_aclaraciones/"+sucursal,
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
