var productos = {};
var clientes = {};
var clienteDefault = null;

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
		jsShowWindowLoad("Espera un momento... estamos descargando los datos");
		$.post(server + "puntoventa", {
			"usuario": idUsuario,
			//"action": "getBazares",
			"movil": 1,
			"json": true
		}, function(datos){
			$("#selBazar").find("option").remove();
			$.each(datos.bazares, function(i, bazar){
				$("#selBazar").append($("<option />", {
					"text": "Bazar " + bazar.nombre,
					"value": bazar.idBazar
				}));
				
				nuevaVenta();
			});
			
			$("#selMetodoPago").find("option").remove();
			$.each(datos.metodosPago, function(i, metodo){
				$("#selMetodoPago").append($("<option />", {
					"text": metodo.nombre,
					"value": metodo.idMetodoPago,
					"json": metodo.cobros
				}));
			});
			
			$("#selMetodoPago").change(function(){
				var pagos = jQuery.parseJSON($("#selMetodoPago option:selected").attr("json"));
				$("#selMetodoCobro").find("option").remove();
				$("#selMetodoCobro").append('<option value="" selected>Seleccionar</option>');
				$.each(pagos, function(i, el){
					$("#selMetodoCobro").append('<option value="' + el.idMetodoCobro + '">' + el.destino + '</option>');
				});
			});
			
			$("#winPago").on("show.bs.modal", function(event){
				var ventana = $("#winPago");
				var monto = parseFloat($("#dvSaldo").html().replace(",", ""));
				monto = monto < 0?0:monto;
				
				ventana.find("#txtMonto").val(monto.toFixed(2));
				ventana.find("#montoMaximo").val(monto.toFixed(2));
				
			});
			
			$("#winPago").on("shown.bs.modal", function(event){
				var ventana = $("#winPago");
				ventana.find("#txtMonto").select();
				
				var pagos = jQuery.parseJSON($("#selMetodoPago option:selected").attr("json"));
				$("#selMetodoCobro").find("option").remove();
				$("#selMetodoCobro").append('<option value="" selected>Seleccionar</option>');
				$.each(pagos, function(i, el){
					$("#selMetodoCobro").append('<option value="' + el.idMetodoCobro + '">' + el.destino + '</option>');
				});
			});
			jsRemoveWindowLoad();
		}, "json");
		
		$("#winVentas").on("show.bs.modal", function(event){
		$("#winVentas").find(".modal-body").find("#tblVentas").remove();
		$("#winVentas").find(".modal-body").html('Espera mientras actualizamos la lista');
		$.post(server + "listaVentas", {
				bazar: $("#selBazar").val(),
				movil: 1
			}, function( data ) {
				$("#winVentas").find(".modal-body").html(data);
				
				$("[action=cargar]").click(function(){
					nuevaVenta();
					var el = jQuery.parseJSON($(this).attr("datos"));
					$("#txtCliente").val(el.nombreCliente).attr("identificador", el.idCliente);
					$("#txtComentario").val(el.comentario);
					$("#txtDescuento").val(el.descuento);
					$(this).prop("disabled", true);
					venta.id = el.idVenta;
					venta.getProductos({
						fn: {
							before: function(){
								$(this).prop("disabled", true);
							},
							after: function(productos){
								pintarVenta();
								$("#winVentas").modal("hide");
								
								$("#txtFolio").val(el.folio);
								
								calcularMonto();
								getListaPagos();
								
								mensajes.log({mensaje: "Listo, la venta fue cargada"});
							}
						}
					});
					console.log(el);
					if (el.idEstado != 1){
						$("#btnGuardar").hide();
					}
				});
				
				$("#winVentas").find("[action=imprimir]").click(function(){
					var el = $(this);
					var json = jQuery.parseJSON(el.attr("datos"));
					var objVenta = new TVenta;
					
					objVenta.id = json.idVenta;
					objVenta.imprimir({
						fn: {
							before: function(){
								el.prop("disabled", true);
							}, after: function(resp){
								el.prop("disabled", false);
								try{
									console.log(ventanaImpresion);
									if (ventanaImpresion == undefined)
										ventanaImpresion = window.open(resp.url, "Ticket");
									else
										ventanaImpresion.location.href = resp.url;
								}catch(err){
									ventanaImpresion = window.open(resp.url, "Ticket");
								}
							}
						}
					});
				});
				
				$("#winVentas").find("[action=email]").click(function(){
					var el = $(this);
					var json = jQuery.parseJSON(el.attr("datos"));
					var objVenta = new TVenta;
					
					var email = prompt("¿A que correo se envía?", json.correo);
					var json = jQuery.parseJSON(el.attr("datos"));
					
					objVenta.id = json.idVenta;
					objVenta.imprimir({
						"email": email,
						fn: {
							before: function(){
								el.prop("disabled", true);
							}, after: function(resp){
								el.prop("disabled", false);
							}
						}
					});
				});
				
				$("#winVentas").find("#tblVentas").DataTable({
					"language": espaniol,
					"paging": true,
					"lengthChange": false,
					"ordering": true,
					"autoWidth": false,
					"scrollX": true, 
					"buttons": false,
					"order": [[ 0, "desc" ]]
				});
			});
		});
		
		$("#frmPago").validate({
			debug: true,
			rules: {
				txtMonto: {
					required: true,
					min: 1,
				},
				selMetodoCobro: {
					required: true
				},
				selMetodoPago: {
					required: true
				}
			},
			wrapper: 'span', 
			submitHandler: function(form){
				console.log($("#txtMonto").val(), $("#montoMaximo").val());
				var obj = new TPago;
				obj.add({
					id: $("#id").val(), 
					venta: venta.id, 
					metodoCobro: $("#selMetodoCobro").val(), 
					metodoPago: $("#selMetodoPago").val(), 
					monto: $("#txtMonto").val(), 
					referencia: $("#txtReferencia").val(), 
					fn: {
						before: function(){
							$("#frmPago").find("[type=submit]").prop("disabled", true);
						},
						after: function(datos){
							$("#frmPago").find("[type=submit]").prop("disabled", false);
							if (datos.band){
								$("#frmPago").get(0).reset();
								$("#winPago").modal("hide");
								
								getListaPagos();
							}else{
								mensajes.alert({mensaje: "No se pudo guardar el registro", title: "Error"});
							}
						}
					}
				});
	        }
	    });
	    
	    getListaPagos();
	    
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
								mensajes.log("Cliente registrado y asignado");
							}else{
								mensajes.alert({mensaje: "No se pudo guardar el registro", title: "Error"});
							}
						}
					}
				});
	        }
	
	    });
	    
	    $("#setClienteDefecto").click(function(){
			$("#txtCliente").val(clienteDefault.nombre).attr("identificador", clienteDefault.idCliente).attr("email", clienteDefault.correo);
			mensajes.log({mensaje: "Cliente por defecto asignado"});
		});
		
		/*Proces guardar*/
		$("#btnGuardar").click(function(){
			guardar({
				before: function(){
					$("#btnGuardar").prop("disabled", true);
			    	$("#btnPagar").prop("disabled", true);
			    	
			    	nuevaVenta();
			    },
			    after: function(resp){
			    	$("#btnGuardar").prop("disabled", false);
			    	$("#btnPagar").prop("disabled", false);
			    	
			    	if (resp.band)
			    		mensajes.log({mensaje: "Los datos de la venta fueron guardados"});
			    	else
			    		mensajes.alert({mensaje: "No se pudo guardar la venta", title: "Error"});
			    }
			});
		});
		
		/*Cerrar venta*/
		$(".btnCerrar").click(function(){
			var msg = venta.isAllEntregado()?"":"El inventario actual reportado en sistema no permite la entrega de la totalidad de la nota de venta. Las cantidades no entregadas se reportarán como pedido ";
			
			if(confirm(msg + "¿Seguro?")){
		    	guardar({
					before: function(){
						$("#btnGuardar").prop("disabled", true);
				    	$("#btnPagar").prop("disabled", true);
				    },
				    after: function(resp){
				    	$("#btnGuardar").prop("disabled", false);
				    	$("#btnPagar").prop("disabled", false);
				    	
				    	var email = prompt("¿A que correo deseas enviar la nota de venta?", $("#txtCliente").attr("email"), function(resp){
					    	if (resp.band){
					    		venta.cerrar({
						    		"email": resp.input1,
						    		fn: {
							    		before: function(){
								    		$("#btnCerrar").prop("disabled", true);
							    		}, after: function(resp){
								    		$("#btnCerrar").prop("disabled", false);
								    		
								    		if (resp.band){
								    			alert("La venta ha sido cerrada");
								    			
								    			
								    			var objVenta = new TVenta;
												objVenta.id = venta.id;
												objVenta.imprimir({
													"email": email,
													fn: {
														after: function(resp){
															if (resp.email)
																mensajes.alert({mensaje: "Nota de venta enviada al comprador", title: "Venta cerrada"});
														}
													}
												});
												
								    			nuevaVenta();
								    		}else
								    			alert("La venta no pudo ser cerrada");
							    		}
						    		}
						    	});
					    	}else
					    		alert("Ocurrió un error al guardar la venta");
					    });
				    }
				});
			}
		});
		
		$("#btnCancelar").click(function(){
			if (venta.id == null)
				alert("La venta no se ha guardado, no puede ser cancelada");
			else if (confirm("¿Seguro?")){
				venta.cancelar({
					fn: {
						before: function(){
							$("#btnCancelar").prop("disabled", true);
						},
						after: function(resp){
							if (resp.band)
								nuevaVenta();
							else
								alert("No se pudo cancelar la venta");
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
		getListaPagos();
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
			
			clienteDefault = jQuery.parseJSON($("#winClientes").find("#tblDatos").find("[clienteDefault=1]").attr("json"));
			$("#txtCliente").val(clienteDefault.nombre).attr("identificador", clienteDefault.idCliente).attr("email", clienteDefault.correo);
		});
	}
	
	
	function guardar(fn){
		if ($("#txtCliente").attr("identificador") == ''){
			mensajes.alert({mensaje: "Indica un cliente", title: "Corrige lo siguiente"});
			$("#txtCliente").select();
		}else if(venta.productos.length < 1){
			mensajes.alert({mensaje: "Agrega un producto", title: "Corrige lo siguiente"});
			$("#txtProducto").focus();
		}else{
			venta.guardar({
				fecha: $("#txtFecha").val(),
				bazar: $("#selBazar").val(),
				cliente: $("#txtCliente").attr("identificador"),
				comentario: $("#txtComentario").val(), 
				descuento: $("#txtDescuento").val(), 
				fn: {
					before: function(){
				    	if (fn.before !== undefined) fn.before();
					}, after: function(resp){
				    	if (resp.band){
					    	if ($("#txtFolio").val() != resp.folio){
					    		$("#txtFolio").val(resp.folio);
					    	}
					    	
					    	getListaPagos();
				    	}
				    	
				    	if (fn.after !== undefined) fn.after(resp);
				   }
				}
			});
		}
	}
	
	function getListaPagos(){
	    $.post(server + "listaPagos", {
			"venta": venta.id,
			"movil": 1
		}, function(data) {
			$("#dvPagos").html(data);
			
			$("[action=eliminarPago]").click(function(){
				var obj = new TPago;
				obj.del({
					identificador: $(this).attr("identificador"),
					fn: {
						before: function(){
							$(this).prop("disabled", true);
						},
						after: function(resp){
							$(this).prop("disabled", false);
							getListaPagos();
						}
					}
				})
			});
			calcularMonto();
		});
	}
}