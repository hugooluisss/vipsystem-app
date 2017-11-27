var productos = {};
var clientes = {};

function panelVentas(){
	var venta = new TVenta;
	$.get("vistas/ventas/panel.tpl", function(resp){
		$("#modulo").html(resp);
		$("#txtFecha").datepicker({ dateFormat: 'yy-mm-dd' });
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		
		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		var today = yyyy+'-'+mm+'-'+dd;
		$("#txtFecha").val(today);
		
		/*Gestion de botones del wizard*/
		$("#wizard").find("button").click(function(){
			$(".paneles").hide();
			$("#" + $(this).attr("panel")).show();
		});
		
		$.post(server + "cventas", {
			"usuario": idUsuario,
			"action": "getBazares",
			"movil": 1
		}, function(bazares){
			$("#selBazar").find("option").remove();
			$.each(bazares, function(i, bazar){
				$("#selBazar").append($("<option />", {
					"text": "Bazar " + bazar.nombre,
					"value": bazar.idBazar
				}));
				
				nuevaVenta();
			});
		}, "json");
		
		$("#txtFiltro").keyup(function(){
			var texto = $("#txtFiltro").val().toUpperCase();
			$(".producto").each(function(){
				var el = $(this);
				if (texto == '')
					el.show();
				else if (el.text().toUpperCase().search(texto) >= 0)
					el.show();
				else
					el.hide();
			});
		});
		
		
		$(".btnNuevaVenta").click(function(){
			if (confirm("¿Seguro?")){
				nuevaVenta();
			}
		});
		
		
		$("#winAddProducto").on("show.bs.modal", function(event){
			var ventana = $("#winAddProducto");
			var producto = jQuery.parseJSON(ventana.attr("datos"));
			
			$.each(producto, function(key, valor){
				ventana.find("[campo=" + key + "]").val(valor);
			});
		});
		
		$("#winAddProducto").find(".addProducto").click(function(){
			var producto = jQuery.parseJSON($("#winAddProducto").attr("datos"));
			producto.cantidad = 1;
			venta.add(producto);
			$("#winAddProducto").modal("hide");
			$(".paneles").hide();
			$("#pnlVenta").show();
			pintarVenta();
		});
		
		$("#txtDescuento").change(function(){
			calcularMonto();
		});
		
		nuevaVenta();
		reloadClientes();
		
		
		
		
		$("#frmAddProducto").validate({
			debug: true,
			rules: {
				//txtCodigo: "required",
				txtDescripcion: "required",
				txtPrecio: {
					required: true,
					number: true,
					min: 0
				},
			},
			wrapper: 'span', 
			submitHandler: function(form){
				var obj = new TProducto;
				obj.add({
					"bazar": $("#selBazar").val(),
					//"codigoInterno": $("#txtCodigo").val(), 
					"descripcion": $("#txtDescripcion").val(),
					"precio": $("#txtPrecio").val(),
					"observacion": "Pedido",
					"eliminar": true,
					fn: {
						after: function(datos){
							if (datos.band){
								$("#winNuevoProducto").modal("hide");
								
								var ventana = $("#frmAddProducto");
								var producto = {};
								producto.idProducto = datos.id;
								producto.descripcion = ventana.find("#txtDescripcion").val();
								producto.codigoInterno = ventana.find("#txtCodigo").val();
								producto.precio = ventana.find("#txtPrecio").val();
								producto.color = "";
								producto.talla = "";
								producto.descuento = 0;
								producto.codigoBarras = "";
								
								$(".paneles").hide();
								$("#pnlVenta").show();
								venta.add(producto);
								pintarVenta();
							}else{
								mensajes.alert({mensaje: "No se pudo guardar el registro", title: "Error"});
							}
						}
					}
				});
			}
		});
		
		$("#frmAddCliente").validate({
			debug: true,
			rules: {
				txtNombre: "required"
			},
			wrapper: 'span', 
			submitHandler: function(form){
				var obj = new TCliente;
				obj.add({
					id: $("#id").val(), 
					nombre: $("#txtNombre").val(), 
					razonSocial: $("#txtRazonSocial").val(), 
					domicilio: $("#txtDomicilio").val(), 
					exterior: $("#txtExterior").val(), 
					interior: $("#txtInterior").val(), 
					colonia: $("#txtColonia").val(), 
					municipio: $("#txtMunicipio").val(), 
					ciudad: $("#txtCiudad").val(), 
					estado: $("#txtEstado").val(), 
					rfc: $("#txtRFC").val(), 
					correo: $("#txtCorreo").val(), 
					telefono: $("#txtTelefono").val(), 
					promociones: $("#selPromociones").val(), 
					fn: {
						after: function(datos){
							if (datos.band){
								$("#txtCliente").attr("identificador", datos.id);
								$("#txtCliente").attr("email", $("#txtCorreo").val());
								$("#txtCliente").val($("#txtNombre").val());
								
								$("#frmAddCliente").get(0).reset();
								$("#winAddCliente").modal("hide");
								reloadClientes();
							}else{
								mensajes.alert({mensaje: "No se pudo guardar el registro", title: "Error"});
							}
						}
					}
				});
	        }
	
	    });
	});
	
	
	
	function nuevaVenta(){
		//var clienteDefault = jQuery.parseJSON($("#txtCliente").attr("jsonDefault"));
		venta = new TVenta;
		$("#btnGuardar").show();
		$("#txtComentario").val("");
		$("#txtDescuento").val("");
		//$("#txtCliente").val(clienteDefault.nombre).attr("identificador", clienteDefault.idCliente).attr("email", clienteDefault.correo);
	
		var bazar = new TBazar;
		
		bazar.getFolio({
			bazar: $("#selBazar").val(),
			fn: {
				before: function(){
					$("#txtFolio").val("");
				},
				after: function(resp){
					$("#txtFolio").val(resp.inicial + "-" + resp.folio).attr("folio", resp.folio).attr("inicial", resp.inicial);
				}
			}
		});
		var ventana = $("#winProductos");
		ventana.find(".moda-body").html('Estamos actualizando la lista de productos <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');
		
		$.post(server + "listaProductos", {
			"bazar": $("#selBazar").val(),
			"select": true,
			"movil": 1,
			"json": true
		}, function(productos){
			$("#lstProductos").html("");
			$.each(productos, function(i, producto){
				var col = $("<div />", {
					class: "col-xs-4 col-sm-3 text-center producto",
					json: producto.json,
					find: producto.codigoBarras + " " + producto.codigoInterno + " " + producto.descripcion,
					"data-toggle": "modal",
					"data-target": "#winAddProducto"
				}).append($("<h3/>", {
					text: producto.codigoBarras
				})).append($("<div />", {
					text: producto.descripcion
				})).append($("<div />", {
					text: "$ " + producto.precio
				}));
				
				col.click(function(){
					$("#winAddProducto").attr("datos", $(this).attr("json"));
				});
				$("#lstProductos").append(col);
			})
		}, "json");
		
		pintarVenta();
		//reloadClientes();
	}
	
	
	function pintarVenta(){
		$("#dvProductos").html("");
		$("#dvProductos").append(venta.getTable());
		
		$("#dvProductos").find(".cantidad").change(function(){
			if ($(this).val() == ''){
				mensajes.alert({mensaje: "La cantidad debe de ser un número", title: "Corrige lo siguiente"});
				$(this).val(venta.productos[$(this).attr("indice")].cantidad);
			}else{
				venta.productos[$(this).attr("indice")].cantidad = $(this).val();
				
				if($(this).val() <= venta.productos[$(this).attr("indice")].inventario){
					$(this).parent().parent().parent().find(".entregados").val($(this).val());
					venta.productos[$(this).attr("indice")].entregado = $(this).val();
				}else{
					$(this).parent().parent().parent().find(".entregados").val(venta.productos[$(this).attr("indice")].inventario);
					venta.productos[$(this).attr("indice")].entregado = venta.productos[$(this).attr("indice")].inventario;
				}
				var producto = venta.productos[$(this).attr("indice")];
				
				$(".totalCantidad").html(venta.getTotalCantidad());
				monto = (producto.cantidad * producto.precio * ((100 - producto.descuento) / 100)).toFixed(2);
				$(this).parent().parent().parent().find("[campo=total]").html("<b> $" + formatNumber.new(monto) + "</b>");
				$(".totalEntregados").html(venta.getTotalEntregado());
				calcularMonto();
			}
		});
		
		$("#dvProductos").find(".descuento").change(function(){
			if ($(this).val() < 0){
				mensajes.alert({mensaje: "El descuento debe de ser mayor a 0", title: "Corrige lo siguiente"});
				$(this).val(venta.productos[$(this).attr("indice")].descuento);
			}else if ($(this).val() > 100){
				mensajes.alert({mensaje: "El descuento debe de ser menor o igual a 100", title: "Corrige lo siguiente"});
				$(this).val(venta.productos[$(this).attr("indice")].descuento);
			}else{
				var descuento = $(this).val();
				venta.productos[$(this).attr("indice")].descuento = descuento;
				if (descuento == 0)
					$(this).val("");
					
				var producto = venta.productos[$(this).attr("indice")];
					
				monto = (producto.cantidad * producto.precio * ((100 - producto.descuento) / 100)).toFixed(2);
				$(this).parent().parent().parent().parent().find("[campo=total]").html("<b> $" + formatNumber.new(monto) + "</b>");
				
				calcularMonto();
			}
		});
		
		$("#dvProductos").find(".entregados").change(function(){
			cantidad = parseInt($(this).val());
			
			if($(this).val() == '' || cantidad > venta.productos[$(this).attr("indice")].cantidad){
				mensajes.alert({mensaje: "Los productos entregados no pueden ser 0 ni menores a la cantidad vendida", title: "Corrige lo siguiente"});
				
				$(this).val(venta.productos[$(this).attr("indice")].entregado);
			}else if(cantidad > venta.productos[$(this).attr("indice")].inventario){
				if(confirm("Solo existen " + venta.productos[$(this).attr("indice")].inventario + " disponibles en el inventario ¿Seguro de entregar?"))
					venta.productos[$(this).attr("indice")].entregado = cantidad;
				else{
					venta.productos[$(this).attr("indice")].entregado = venta.productos[$(this).attr("indice")].inventario;
					$(this).val(venta.productos[$(this).attr("indice")].inventario);
				}
			}else
				venta.productos[$(this).attr("indice")].entregado = $(this).val();
			
			$(".totalEntregados").html(venta.getTotalEntregado());
		});
		
		$("#dvProductos").find(".btn-danger").click(function(){
			if (confirm("¿Seguro?")){
				venta.del($(this).attr("indice"));
				pintarVenta();
			}
		});		
		calcularMonto();
	}
	
	function calcularMonto(){
		$("#dvSubtotal").html(formatNumber.new(venta.getTotalVenta()));
		$("#dvProductos").find(".totalMonto").html(formatNumber.new(venta.getTotalVenta()));
		
		var descuento = $("#txtDescuento").val() == ''?0:$("#txtDescuento").val();
		descuento = (100 - descuento) / 100;
		var total = (venta.getTotalVenta() * descuento).toFixed(2);
		var totalPagos = $("#deuda").val() == '' || $("#deuda").val() == undefined?0.00:$("#deuda").val();
		var saldo = (total - totalPagos).toFixed(2);
		$("#dvTotal").html(formatNumber.new(total));
		$("#dvTotalPagos").html(formatNumber.new(totalPagos));
		$("#dvSaldo").html(formatNumber.new(saldo));
	}
	
	
	
	
	function reloadClientes(){
		var ventana = $("#winClientes");
		ventana.find(".moda-body").html('Estamos actualizando la lista de clientes <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');
		$.post(server + "listaClientes", {
			"select": true,
			"movil": 1,
			"usuario": idUsuario
		}, function( data ){
			ventana.find(".modal-body").html(data);
			
			ventana.find("tbody").find("tr").click(function(){
				var datos = jQuery.parseJSON($(this).attr("json"));
				$("#txtCliente").attr("identificador", datos.idCliente);
				$("#txtCliente").attr("email", datos.correo);
				$("#txtCliente").val(datos.nombre);
				ventana.modal("hide");
				pintarVenta();
			});
		});
	}
	
	
	
	
	
}