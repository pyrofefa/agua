//var socket = io.connect('http://localhost:8080', { 'forceNew': true });

// Creaci? del m?ulo
var rutas = angular.module('rutas', ['ngRoute','ngResource']);
var sucursal = localStorage.getItem('sucursal');

// Configuraci? de las rutas
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
            templateUrl : 'vistas/final.html',
            controller  : 'finalController'

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

rutas.controller('pagosController', function($scope, $http, socket, $route) 
{
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/turnomatic/public/api/pagos/2"
        //url: "http://localhost/turnomatic/public/ folios/pagos/2"
    }).success(function(data)
    {
        $("#cargando").hide();
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
        $("#cargando").show();
        $route.reload();    
    });

    $scope.pagos = function($numero)
    {
        
        $("#cargando").show();
        socket.emit("pago","P"+$numero);
       	//agregando numero a la tabla tikets
        //alert();
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_pago",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2' , 'estado' :  '0', 'asunto' : 'Pago', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");    
			$("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $("#cargando").show();
            $route.reload();    
        })
	
	}
    $scope.conveniopago = function($numero)
    {
        $("#cargando").show();
        socket.emit("pagoconvenio", "P"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            //url: "http://localhost/turnomatic/public/ tikets",
            url: "http://localhost/turnomatic/public/api/tikets_pago",
            data: ({'turno' : $numero, 'id_sucursal' : '2' , 'estado' :  '0', 'asunto' : 'Pago de convenio', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $("#cargando").show();
            $route.reload();
        })
    }
    $scope.cartapago = function($numero)
    {
        $("#cargando").show();
        socket.emit("pagocarta","P"+$numero);
        //agregando numero a la tabla tikets
         $http({
            method:"post",
            //url: "http://localhost/turnomatic/public/ tikets",
            url: "http://localhost/turnomatic/public/api/tikets_pago",
            data: ({'turno' : $numero, 'id_sucursal' : '2' , 'estado' :  '0', 'asunto' : 'Pago carta no adeudo', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $("#cargando").show();
            $route.reload();
        })
    }
});
rutas.controller('tramitesController', function($scope, $http, socket, $route) 
{
    //console.log(sucursal);
    //trayendo folios
    $("#cargando").show();
    $http({
        method:"get",
        url: "http://localhost/turnomatic/public/api/aclaraciones/2"
        //url: "http://localhost/turnomatic/public/ folios/aclaraciones/2"
    }).success(function(data)
    {
        $('#cargando').hide();
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
        $("#cargando").show();
        $route.reload();
    });
    
    /*Tramites*/
    $scope.contratos = function($numero)
    {
        $("#cargando").show();
        socket.emit("contrato","A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://localhost/turnomatic/public/ tikets",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            data: ({'turno' : $numero, 'id_sucursal' : '2' , 'estado' :  '0', 'asunto' : 'Contrato', 'subasunto' : 'Tramites'})
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();   
        })
    }
    $scope.convenio = function($numero)
    {

        $("#cargando").show();
        socket.emit("convenio","A"+$numero);
        //$('#cargando').show();
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://localhost/turnomatic/public/ tikets",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            data: ({'turno' : $numero, 'id_sucursal' : '2',  'estado' :  '0', 'asunto' : 'Convenio', 'subasunto' : 'Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();   
        })
    }
    $scope.cambio_nombre = function($numero)
    {

        $("#cargando").show();
        socket.emit("cambio", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Cambio de nombre', 'subasunto' : 'Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
			window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();   
        })

        
    }
    $scope.carta_adeudo = function($numero)
    {
        $("#cargando").show();
        socket.emit("carta", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Carta de adeudo', 'subasunto' : 'Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.factibilidad = function($numero)
    {
        $("#cargando").show();
        socket.emit("factibilidad","A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Factibilidad', 'subasunto' : 'Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.dostramites = function($numero)
    {
        //alert($numero);
        $("#cargando").show();
        socket.emit("pdf", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            //url: "http://localhost/turnomatic/public/ tikets",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            data: ({'turno' : $numero , 'id_sucursal' : '2' , 'estado' :  '0', 'asunto' : '2 ?m? Tramites', 'subasunto' : 'Tramites' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    /*Fin de servicios*/
});
rutas.controller('aclaracionesController', function($scope, $http, socket, $route) 
{
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/turnomatic/public/api/aclaraciones/2"
        //url: "http://localhost/turnomatic/public/ folios/aclaraciones/2"
    }).success(function(data)
    {
        $('#cargando').hide();
        //console.log(data);
        $scope.datos=data;
    }).error(function(data){
        console.log("Ha ocurrido un error al mostrar los datos");
        $("#cargando").show();
        $route.reload();
    });
    /*Aclaraciones y otros*/
    $scope.alto_consumo = function($numero)
    {
        $("#cargando").show();
        socket.emit("alto_consumo", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Alto consumo (con y sin medidor)', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
		}).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.reconexion = function($numero)
    {
        socket.emit("reconexion", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Reconexi? de servicio', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").show();
			window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
        })
	}
    $scope.error_lectura = function($numero)
    {
        $("#cargando").show();
        socket.emit("error_lectura", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Error en lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.no_toma_lectura = function($numero)
    {
        $("#cargando").show();
        socket.emit("no_toma_lectura", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'No toma lectura', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
			$("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }    
    $scope.noentrega = function($numero)
    {
        $("#cargando").show();
        socket.emit("no_entrega", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'No entrega de recibo', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.cambio_tarifa = function($numero)
    {
        $("#cargando").show();
        socket.emit("cambio_tarifa", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Cambio de tarifa', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
			window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.solicitud = function($numero)
    {
        $("#cargando").show();
        socket.emit("solicitud", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Solicitud de medidor', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    $scope.otros_tramites = function($numero)
    {
        $("#cargando").show();
        socket.emit("otros", "A"+$numero);
        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/turnomatic/public/api/tikets_aclaraciones",
            //url: "http://localhost/turnomatic/public/ tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2', 'estado' :  '0', 'asunto' : 'Otros Tramites', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
           	socket.emit("imprimir");
            $("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $('#cargando').show();
            $route.reload();
        })
    }
    /*Fin de aclaraciones */
});
rutas.controller('finalController', function($scope, socket) 
{
	console.log(".")
    //socket.emit("imprimir");
});