function panelProductos(){
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
	});
	
	function getLista(){
		if ($("#selBazar").val() != null){
			jsShowWindowLoad("Espera un momento... estamos actualizando la lista de productos");
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
		}else
			mensajes.alert({"titulo": "Sin bazar definido", "mensaje": "Solicita que te asignen un bazar desde el backend", funcion: function(){
					location.reload(1);
				}
			});
	}
}