var productos = {};
var clientes = {};
var clienteDefault = null;

function panelVentas(){
	try{
		cordova.plugins.diagnostic.requestCameraAuthorization(
		    function(status){
		        console.log("Authorization request for camera use was " + (status == cordova.plugins.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
		    }, function(error){
		        console.error("The following error occurred: "+error);
		    }, {
		        externalStorage: false
		    }
		);
	}catch(e){
		console.log(e);
	}

	var venta = new TVenta;
	$.get("vistas/ventas/panel.tpl", function(resp){
		$("#modulo").html(resp);
		
		
		$("[panel=btnNuevaVenta]").click(function(){
			nuevaVenta();
			
			$(".paneles").hide();
			$("#pnlProductos").show();
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
			
			/*Proceso de pagos y guardar*/
			$("#btnPagar").click(function(){
				guardar({
					before: function(){
						$("#btnGuardar").prop("disabled", true);
				    	$("#btnPagar").prop("disabled", true);
				    },
				    after: function(resp){
				    	$("#btnGuardar").prop("disabled", false);
				    	$("#btnPagar").prop("disabled", false);
					    $("#winPago").modal();
				    }
				});
			});
			console.log("Se terminó la carga");
			jsRemoveWindowLoad();
		}, "json");
		
		$("#btnCancelarAddProducto").click(function(){
			$(".paneles").hide();
			$("#pnlVentaProductos").show();
		});
		
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
		
		$("#btnGetBarcode").click(function(){
			cordova.plugins.barcodeScanner.scan(function(result){
				if (result.text != '' || result.text != undefined){
					var producto = new TProducto;
					producto.get({
						"codigo": result.text,
						"bazar": $("#selBazar").val(),
						fn: {
							before: function(){
								jsShowWindowLoad("Espera un momento... estamos buscando el producto");
								$(this).prop("disabled", true);
							}, after: function(producto){
								$(this).prop("disabled", false);
								$("#txtProducto").val("");
								jsRemoveWindowLoad();
								if (producto.band == false){
									mensajes.alert({mensaje: "El código no fue encontrado", title: "Error"});
									$("#winNuevoProducto").find("#txtCodigo").val(result.text);
									$("#winNuevoProducto").modal();
								}else{
									venta.add(producto);
									pintarVenta();
								}
								
								return false;
							}
						}
					});
				}else
					alertify.log("Código no escaneado");
			},function(error){
				alertify.error("Ocurrió un error al leer el código");
				console.log(error);
			}, {
				preferFrontCamera : false, // iOS and Android
				showFlipCameraButton : true, // iOS and Android
				showTorchButton : true, // iOS and Android
				//torchOn: true, // Android, launch with the torch switched on (if available)
				//saveHistory: true, // Android, save scan history (default false)
				prompt : "Coloque un código de barras dentro del área de escaneo", // Android
				resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
				formats : "QR_CODE,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF", // default: all but PDF_417 and RSS_EXPANDED
				//orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
				disableAnimations : true, // iOS
				disableSuccessBeep: true // iOS and Android
			});
		});
		
		
		$("#btnPanelAddProducto").click(function(){
			$(".paneles").hide();
			$("#pnlProductos").show();
		});
		
		$("#winAddProducto").on("show.bs.modal", function(event){
			var ventana = $("#winAddProducto");
			var producto = jQuery.parseJSON(ventana.attr("datos"));
			
			$.each(producto, function(key, valor){
				ventana.find("[campo=" + key + "]").val(valor);
			});
			
			ventana.find("[campo=precio]").val("$ " + formatNumber.new(producto.precio));
		});
		
		$("#winAddProducto").find(".addProducto").click(function(){
			var producto = jQuery.parseJSON($("#winAddProducto").attr("datos"));
			producto.cantidad = 1;
			venta.add(producto);
			$("#winAddProducto").modal("hide");
			$(".paneles").hide();
			$("#pnlVentaProductos").show();
			pintarVenta();
		});
		
		$("#txtDescuento").change(function(){
			calcularMonto();
		});
		
		reloadClientes();
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
				console.log("Clientes cargados");
			});
		}
		
		
		$("#btnPanelPagar").click(function(){
			if(venta.productos.length < 1)
				mensajes.alert({mensaje: "Agrega un producto", title: "Corrige lo siguiente"});
			else{
				$(".paneles").hide();
				$("#pnlPagar").show();
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
	});
	
	
	function nuevaVenta(){
		//var clienteDefault = jQuery.parseJSON($("#txtCliente").attr("jsonDefault"));
		console.log("Limpiando panel para nueva venta");
		
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
		console.log("Bazar", $("#selBazar").val());
		$.post(server + "listaProductos", {
			"bazar": $("#selBazar").val(),
			"select": true,
			"movil": 1,
			"json": true
		}, function(productos){
			$("#lstProductos").html("");			
			$.each(productos, function(i, producto){
				console.log(producto);
				var find = String(producto.codigoBarras);
				find.concat(" ", producto.codigoInterno);
				find.concat(" ", producto.descripcion);
				
				var col = $("<div />", {
					class: "col-xs-6 col-sm-4 text-center producto",
					"json": producto.json,
					"find": find,
					"data-toggle": "modal",
					"data-target": "#winAddProducto"
				}).append($("<h3/>", {
					text: producto.codigoBarras
				})).append($("<div />", {
					text: producto.descripcion
				})).append($("<div />", {
					style: "font-size: 14px",
					text: "$ " + formatNumber.new(producto.precio)
				}));
				
				col.click(function(){
					$("#winAddProducto").attr("datos", $(this).attr("json"));
				});
				$("#lstProductos").append(col);
			})
		}, "json");
		
		pintarVenta();
		getListaPagos();
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
						jsShowWindowLoad("Espera un momento... estamos descargando los datos");
				    	if (fn.before !== undefined) fn.before();
					}, after: function(resp){
						jsRemoveWindowLoad();
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
};