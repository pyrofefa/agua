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
        url: "http://localhost/api_agua/public/api/pagos/2"
        //url: "http://192.168.1.57:8080/turnomatic/publicfolios/pagos/2"
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

    $scope.pago = function($numero)
    {
        
        $("#cargando").show();
        $("#opciones").hide();
        socket.emit("pago","P"+$numero);
       	
        //agregando numero a la tabla tikets
        //alert();
        $http({
            method:"post",
            url: "http://localhost/api_agua/public/api/tikets_pago",
            //url: "http://192.168.1.57:8080/turnomatic/public tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2','asunto' : 'Seleccione', 'subasunto' : 'Pago'})
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir", { letra: 'P', numero : $numero, subasunto : 'pagos' });
			$("#cargando").hide();
            window.location.href = '#/final';
        }).error(function(data){
            console.log("ha ocurrido un error en guardar los datos");
            $("#cargando").show();
            $route.reload();    
        })
	}
});
rutas.controller('aclaracionesController', function($scope, $http, socket, $route) 
{
    //trayendo folios
    $http({
        method:"get",
        url: "http://localhost/api_agua/public/api/aclaraciones/2"
        //url: "http://192.168.1.57:8080/turnomatic/public folios/aclaraciones/2"
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
    $scope.aclaracion = function($numero)
    {
        $("#cargando").show();
        $("#opciones").hide();
        socket.emit("aclaracion", "A"+$numero);

        //agregando numero a la tabla tikets
        $http({
            method:"post",
            url: "http://localhost/api_agua/public/api/tikets_aclaraciones",
            //url: "http://192.168.1.57:8080/turnomatic/public tikets",
            data: ({'turno' : $numero, 'id_sucursal' : '2','asunto' : 'Seleccione', 'subasunto' : 'Aclaraciones y Otros' })
        }).success(function(data){
            console.log("datos guardados con exito");
            socket.emit("imprimir", { letra: 'A', numero : $numero, subasunto : 'aclaraciones' });
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