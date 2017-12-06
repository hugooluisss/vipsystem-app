function setMenu(){
	$("#click").click(function(){
		$("#nav").toggleClass("closed");
	});

	$(".menu1").find("a").click(function(){
		$(".menu1").find("#navbarNav").removeClass("in").prop("aria-expanded", "true");
	});
	
	$(".menu1").find(".venta").click(function(){
		panelVentas();
	});
	
	$(".menu1 .salir").click(function(){
		mensajes.confirm({
			mensaje: "¿Seguro de querer salir?", 
			funcion: function(buttonIndex){
	    		if(buttonIndex == 1) {
		    		window.localStorage.removeItem("sesion");
		    		window.localStorage.removeItem("idOrden");
		    		
		    		location.href = "index.html";
		    	}
		    }
    	});
	});
	
	//panelVentas();
}

function setPrincipal(){
	$("#modulo").find("#btnOrdenes").click(function(){
		panelOrdenes();
	});
	
	$("#modulo").find("#btnPostuladas").click(function(){
		panelPostuladas();
	});
	
	$("#modulo").find("#btnAdjudicados").click(function(){
		panelAdjudicados();
	});
	
}