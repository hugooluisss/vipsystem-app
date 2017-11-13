TBazar = function(){
	var self = this;
	
	this.getFolio = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cbazares', {
				"id": datos.bazar,
				"action": "getFolio",
				"movil": 1
			}, function(data){
				if (data.band == 'false')
					console.log(data.mensaje);
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
};