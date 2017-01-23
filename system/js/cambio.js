$( document ).ready(function() 
{

    var c=0;


    $("#aparecer").click(function()
    {
        c++;
        console.log(c);
        if (c==10)
        {
            $("#oculto").show();
        }
    });

    $("#ocultar").click(function()
    {
       
        $("#oculto").hide();
        c=0;
        
    });

    $("#oculto").change(function()
    {
        var valor=$("#nombre").val();
        console.log(valor);
        localStorage.setItem('sucursal', valor);
    });    
});