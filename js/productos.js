function panelProductos(){
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
	
	$.get("vistas/productos/panel.tpl", function(resp){
		$("#modulo").html(resp);
		
		jsShowWindowLoad("Espera un momento... estamos descargando los datos");
		$.post(server + "puntoventa", {
			"usuario": idUsuario,
			"movil": 1,
			"json": true
		}, function(datos){
			$("#selBazar").find("option").remove();
			$.each(datos.bazares, function(i, bazar){
				$("#selBazar").append($("<option />", {
					"text": "Bazar " + bazar.nombre,
					"value": bazar.idBazar
				}));
			});
			jsRemoveWindowLoad();
			getLista();
		}, "json");
		
		$("#selBazar").change(function(){
			getLista();
		});
		
		$("#frmAddProducto").validate({
			debug: true,
			rules: {
				txtCodigoBarras: "required",
				txtCodigoInterno: "required",
				txtDescripcion: "required",
				txtPrecio: {
					required: true,
					number: true,
					min: 0
				},
				txtExistencias: {
					required: true,
					digits: true,
					min: 0
				},
				txtDescuento: {
					required: true,
					digits: true,
					min: 0,
					max: 100
				}
				
			},
			wrapper: 'span', 
			submitHandler: function(form){
				var obj = new TProducto;
				obj.add({
					"id": $("#id").val(),
					"bazar": $("#selBazar").val(),
					"codigoBarras": $("#txtCodigoBarras").val(),
					"codigoInterno": $("#txtCodigoInterno").val(), 
					"descripcion": $("#txtDescripcion").val(),
					"color": $("#txtColor").val(),
					"talla": $("#txtTalla").val(),
					"unidad": $("#txtUnidad").val(),
					//"costo": $("#txtCosto").val(),
					"costo": 0,
					"descuento": $("#txtDescuento").val(),
					"existencias": $("#txtExistencias").val(),
					"precio": $("#txtPrecio").val(),
					"marca": $("#txtMarca").val(),
					"observacion": $("#txtObservacion").val(),
					fn: {
						after: function(datos){
							if (datos.band){
								getLista();
								$("#frmAddProducto").get(0).reset();
								$("#winAddProducto").modal("hide");
							}else{
								alert("No se pudo guardar el registro");
							}
						}
					}
				});
	        }
	
	    });
	    
	    $("#btnGetBarcode").click(function(){
			cordova.plugins.barcodeScanner.scan(function(result){
				if (result.text != '' || result.text != undefined)
					$("#txtCodigoBarras").val(result.text);
				else
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
	});
	
	function getLista(){
		jsShowWindowLoad("Espera un momento... estamos actualizando la lista de productos");
		console.log($("#selBazar").val());
		if ($("#selBazar").val() != null){
			$.post(server + "listaProductos", {
				"bazar": $("#selBazar").val(),
				"movil": 1
			}, function( data ) {
				jsRemoveWindowLoad();
				
				$("#dvLista").html(data);
				
				$("[action=eliminar]").click(function(){
					var el = $(this);
					mensajes.confirm({
						"mensaje": "¿Seguro?",
						funcion: function(resp){
							if (resp == 1){
								var obj = new TProducto;
								obj.del(el.attr("identificador"), {
									after: function(data){
										getLista();
									}
								});
							}
						}
					});
				});
				
				$("[action=modificar]").click(function(){
					var el = jQuery.parseJSON($(this).attr("datos"));
					
					$("#id").val(el.idProducto);
					$("#txtCodigoBarras").val(el.codigoBarras);
					$("#txtCodigoInterno").val(el.codigoInterno);
					$("#txtDescripcion").val(el.descripcion);
					$("#txtColor").val(el.color);
					$("#txtTalla").val(el.talla);
					$("#txtUnidad").val(el.unidad);
					$("#txtCosto").val(el.costo);
					$("#txtDescuento").val(el.descuento);
					$("#txtExistencias").val(el.existencias);
					$("#txtPrecio").val(el.precio);
					$("#txtMarca").val(el.marca);
					$("#txtObservacion").val(el.observacion);
					
					$("#winAddProducto").modal();
				});
				
				$("#tblDatos").DataTable({
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
		}else{
			mensajes.alert({"titulo": "Sin bazar definido", "mensaje": "Solicita que te asignen un bazar desde el backend"});
			location.reload(1);
		}
	}
}