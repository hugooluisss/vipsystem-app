TUsuario = function(fn){
	var self = this;
	
	this.login = function(datos){
		if (datos.before !== undefined) datos.before();
		
		$.post(server + 'clogin', {
				"usuario": datos.usuario,
				"pass": datos.pass,
				"action": 'login',
				"movil": '1'
			}, function(resp){
				if (resp.band == 'false')
					console.log(resp.mensaje);
					
				if (datos.after !== undefined)
					datos.after(resp);
			}, "json");
	}
		
	this.getData = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		$.post(server + 'ctransportistas', {
				"id": datos.id,
				"action": 'getData',
				"movil": 1
			}, function(data){
				if (data.band == 'false')
					console.log("No se pudo recuperar la información del usuario");
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.recuperarPass = function(correo, fn){
		if (fn.before !== undefined) fn.before();
		
		$.post(server + 'cusuarios', {
				"correo": correo,
				"action": 'recuperarPass',
				"movil": '1'
			}, function(data){
				if (data.band == 'false')
					console.log(data.mensaje);
					
				if (fn.after !== undefined)
					fn.after(data);
			}, "json");
	};
};