function setMenu(){
	$("#menu").find("a[role=button]").click(function(){
		$("#menuPrincipal").removeClass("in").prop("aria-expanded", "true");
	});
	
	$("#menu").find("#btnOrdenes").click(function(){
		panelOrdenes();
	});
	
	$("#btnSalir").click(function(){
		alertify.confirm("¿Seguro?", function(e){
    		if(e) {
    			//window.plugins.PushbotsPlugin.removeTags(["transportista_" + idTransportista]);
	    		window.localStorage.removeItem("sesion");
	    		window.localStorage.removeItem("idOrden");
	    		//backgroundGeolocation.stop();
	    		location.href = "index.html";
	    	}
    	});
	});
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