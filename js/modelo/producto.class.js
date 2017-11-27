TProducto = function(){
	var self = this;
	
	this.add = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cproductos', {
				"id": datos.id,
				"bazar": datos.bazar,
				"codigoBarras": datos.codigoBarras,
				"codigoInterno": datos.codigoInterno, 
				"descripcion": datos.descripcion,
				"color": datos.color,
				"marca": datos.marca,
				"talla": datos.talla,
				"unidad": datos.unidad,
				"costo": datos.costo,
				"descuento": datos.descuento,
				"existencias": datos.existencias,
				"precio": datos.precio,
				"observacion": datos.observacion,
				"eliminar": datos.eliminar?true:false,
				"action": "add",
				"movil": 1
			}, function(data){
				if (data.band == 'false')
					console.log(data.mensaje);
					
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	};
	
	
	this.del = function(id, fn){
		$.post(server + 'cproductos', {
			"id": id,
			"action": "del",
			"movil": 1
		}, function(data){
			if (fn.after != undefined)
				fn.after(data);
			if (data.band == 'false'){
				alert("Ocurrió un error al eliminar el registro");
			}
		}, "json");
	};
	
	this.get = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cproductos', {
			"codigo": datos.codigo,
			"bazar": datos.bazar,
			"action": "get"
		}, function(data){
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
};