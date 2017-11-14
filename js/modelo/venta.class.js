TVenta = function(){
	var self = this;
	this.productos = new Array;
	this.pagos = new Array;
	this.total = 0;
	this.id = null;
	
	this.templateItem = "";
	
	$.get("vistas/ventas/item.tpl", function(plantilla){
		this.templateItem = plantilla;
	});
	
	this.add = function(datos){
		datos.cantidad = 1;
		datos.entregado = 0;
		var band = true;
		console.log("Producto", datos);
		$.each(self.productos, function(i, el){
			if(el.idProducto == datos.idProducto){
				self.productos[i].cantidad++;
				if (self.productos[i].cantidad <= self.productos[i].inventario)
					self.productos[i].entregado = self.productos[i].cantidad;
				band = false;
			}
		});
		
		if (band){
			if (datos.cantidad <= datos.inventario)
				datos.entregado = datos.cantidad;
				
			self.productos.push(datos);
		}
	}
	
	this.del = function(indice){
		self.productos.splice(indice, 1);
	}
	
	this.getTable = function(){
		//var plantilla = $('<table id="tblProductos" class="table table-bordered table-hover"><thead><tr><th>Código Barras</th><th>Descripción</th><th>Cantidad</th><th>Precio U.</th><th>Descuento</th><th>Precio total</th><th>Cantidad entregada</th><th></th></tr></thead><tbody></tbody><tfoot><tr></tr></tfoot></table>');
		var sumaCantidad = 0;
		var sumaTotal = 0;
		var sumaEntregados = 0;
		var cont = 0;
		plantilla = $("<div />");
		if (self.productos.length == 0){
			plantilla = $("<div />", {
				text: "Sin productos en la venta"
			});
			console.log("Sin productos");
		}else{
			$(self.productos).each(function(){
				producto = this;
				producto.descuento = producto.descuento == ''?0:producto.descuento;
				var item = $(this.templateItem);
				
				$.each(producto, function(campo, valor){
					item.find("[campo=" + campo + "]").val(valor);
					item.find("[campo=" + campo + "]").text(valor);
				});
				
				/*
				var tr = $("<tr />").attr("identificador", producto.idProducto)
				tr.append($('<td>' + producto.codigoBarras + '</td>'));
				tr.append($('<td style="width: 40%">' + producto.descripcion + ' ' + producto.color + ' ' + producto.talla + '</td>'));
				tr.append($('<td><input style="width: 100px;" type="number" size="3" class="text-right cantidad" value="' + producto.cantidad + '" indice="' + cont + '" existencias="' + producto.existenciareales + '"/></td>'));
				tr.append($('<td class="text-right">' + formatNumber.new(producto.precio) + '</td>'));
				tr.append($('<td class="text-right"><div class="input-group"><input style="width: 100px;" type="number" size="3" class="text-right descuento" value="' + (producto.descuento == 0?'':producto.descuento) + '" indice="' + cont + '"/><span class="input-group-addon" id="basic-addon2">%</span></div></td>'));
				tr.append($('<td class="text-right total">' + formatNumber.new((producto.cantidad * producto.precio * ((100 - producto.descuento) / 100)).toFixed(2)) + '</td>'));
				tr.append($('<td><input type="number" style="width: 100px;" class="text-right entregados" size="3" value="' + producto.entregado + '" indice="' + cont + '"/></td>'));
				tr.append($('<td class="text-right"><button type="button" class="btn btn-danger" indice="' + cont + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>'));
				
				plantilla.find("tbody").append(tr);
				*/
				
				plantilla.append(item);
				sumaCantidad += parseInt(producto.cantidad);
				sumaTotal += (producto.cantidad * producto.precio * ((100 - producto.descuento) / 100));
				sumaEntregados += parseInt(producto.entregado) * 1;
				cont++;
			});
		}
		self.total = sumaTotal;
		/*
		plantilla.find("tfoot").find("tr").append($('<td colspan="2">&nbsp;</td>'));
		plantilla.find("tfoot").find("tr").append($('<td class="text-right totalCantidad">' + sumaCantidad + '</td>'));
		plantilla.find("tfoot").find("tr").append($('<td colspan="2">&nbsp;</td>'));
		plantilla.find("tfoot").find("tr").append($('<td class="text-right totalMonto">' + formatNumber.new(self.getTotalVenta()) + '</td>'));
		plantilla.find("tfoot").find("tr").append($('<td class="text-right totalEntregados">' + sumaEntregados + '</td>'));
		plantilla.find("tfoot").find("tr").append($('<td>&nbsp;</td>'));
		
		plantilla.find("tbody").find(".descuento").change(function(){
			if ($(this).val() > 100){
				alert("No puede ser mayor a 100");
				$(this).val(100);
			}
			
			if ($(this).val() < 0){
				alert("No puede ser menor a 0");
				$(this).val("");
			}
			
			if ($(this).val() == 0)
				$(this).val("");
		});
		*/
		return plantilla;
	}
	
	
	this.getTotalVenta = function(){
		var total = 0;
		$(self.productos).each(function(){
			producto = this;
			
			total += producto.precio * producto.cantidad * ((100 - producto.descuento) / 100);
		});
		
		return total.toFixed(2);
	}
	
	this.getTotalCantidad = function(){
		var total = 0;
		$(self.productos).each(function(){
			producto = this;
			
			total += parseInt(producto.cantidad);
		});
		
		return parseInt(total);
	}
	
	this.getTotalEntregado = function(){
		var total = 0;
		$(self.productos).each(function(){
			producto = this;
			
			total += parseInt(producto.entregado);
		});
		
		return parseInt(total);
	}
	
	this.guardar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
			"id": self.id,
			"bazar": datos.bazar,
			"cliente": datos.cliente,
			"fecha": datos.fecha, 
			"comentario": datos.comentario,
			"descuento": datos.descuento,
			"productos": self.productos,
			"action": "guardar",
			"movil": 1
		}, function(data){
			if (data.band == 'false')
				console.log(data.mensaje);
			else{
				self.id = data.id;
			}
				
			if (datos.fn.after !== undefined)
				datos.fn.after(data);
		}, "json");
	}
	
	this.getProductos = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
				"id": self.id,
				"action": "getProductos",
			"movil": 1
			}, function(data){
				self.productos = data;
								
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.cerrar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
				"id": self.id,
				"correo": datos.email,
				"action": "cerrar",
			"movil": 1
			}, function(data){
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.cancelar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
				"id": self.id,
				"action": "cancelar",
			"movil": 1
			}, function(data){
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.imprimir = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
				"id": self.id,
				"email": datos.email,
				"action": "imprimir",
			"movil": 1
			}, function(data){
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.setBazar = function(datos){
		if (datos.fn.before !== undefined) datos.fn.before();
		
		$.post(server + 'cventas', {
				"id": datos.id,
				"action": "setBazar",
				"movil": 1
			}, function(data){
				if (datos.fn.after !== undefined)
					datos.fn.after(data);
			}, "json");
	}
	
	this.isAllEntregado = function(){
		var band = true;
		
		$.each(this.productos, function(){
			var producto = this;
			
			if (producto.cantidad > producto.entregado)
				band = false;
		});
		
		return band;
	}
};

var formatNumber = {
	separador: ",", // separador para los miles
	sepDecimal: '.', // separador para los decimales
	
	formatear:function (num){
		num +='';
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
		}
		return this.simbol + splitLeft  +splitRight;
	},
	new:function(num, simbol){
		this.simbol = simbol ||'';
		return this.formatear(num);
	}
}