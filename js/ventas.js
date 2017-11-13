var productos = {};
var clientes = {};

function panelVentas(){
	$(".menu1").hide("slow");
	$.get("vistas/ventas/panel.tpl", function(resp){
		$("#modulo").html(resp);
		$(".wizard").bootstrapWizard({
			height: 400
		});

		$.post(server + "cventas", {
			"usuario": idUsuario,
			"action": "getBazares",
			"movil": 1
		}, function(bazares){
			$("#selBazar").find("option").remove();
			$.each(bazares, function(i, bazar){
				$("#selBazar").append($("<option />", {
					"text": bazar.nombre,
					"value": bazar.idBazar
				}));
				
				nuevaVenta();
			});
		}, "json");
		
		$(".btnNuevaVenta").click(function(){
			if (confirm("¿Seguro?")){
				nuevaVenta();
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
					class: "col-xs-4 text-center producto"
				}).append($('<img />', {
					class: "img-responsive",
					src: "img/logo.png"
				})).append($("<div />", {
					text: producto.descripcion
				}));
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
				alert("Debe de ser un número");
				$(this).val(venta.productos[$(this).attr("indice")].cantidad);
			}else{
				venta.productos[$(this).attr("indice")].cantidad = $(this).val();
				
				if($(this).val() <= venta.productos[$(this).attr("indice")].inventario){
					$(this).parent().parent().find(".entregados").val($(this).val());
					venta.productos[$(this).attr("indice")].entregado = $(this).val();
				}else{
					$(this).parent().parent().find(".entregados").val(venta.productos[$(this).attr("indice")].inventario);
					venta.productos[$(this).attr("indice")].entregado = venta.productos[$(this).attr("indice")].inventario;
				}
				var producto = venta.productos[$(this).attr("indice")];
				
				$(".totalCantidad").html(venta.getTotalCantidad());
				monto = (producto.cantidad * producto.precio * ((100 - producto.descuento) / 100)).toFixed(2);
				$(this).parent().parent().find(".total").html(formatNumber.new(monto));
				$(".totalEntregados").html(venta.getTotalEntregado());
				calcularMonto();
			}
		});
		
		$("#dvProductos").find(".descuento").change(function(){
			if ($(this).val() < 0){
				alert("Debe de ser mayor a 0");
				$(this).val(venta.productos[$(this).attr("indice")].descuento);
			}else if ($(this).val() > 100){
				alert("Debe de ser menor o igual a 100");
				$(this).val(venta.productos[$(this).attr("indice")].descuento);
			}else{
				var descuento = $(this).val();
				venta.productos[$(this).attr("indice")].descuento = descuento;
				if (descuento == 0)
					$(this).val("");
					
				var producto = venta.productos[$(this).attr("indice")];
					
				monto = (producto.cantidad * producto.precio * ((100 - producto.descuento) / 100)).toFixed(2);
				$(this).parent().parent().find(".total").html(formatNumber.new(monto));
				
				calcularMonto();
			}
		});
		
		$("#dvProductos").find(".entregados").change(function(){
			console.log($(this).val(), venta.productos[$(this).attr("indice")].inventario);
			cantidad = parseInt($(this).val());
			
			if($(this).val() == '' || cantidad > venta.productos[$(this).attr("indice")].cantidad){
				alert("No puede ser 0 ni menor a la cantidad vendida");
				
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
		
		/*
		$("#tblProductos").DataTable({
			"responsive": true,
			"language": espaniol,
			"paging": false,
			"lengthChange": false,
			"ordering": true,
			"info": true,
			"autoWidth": false
		});
		*/
		//calcularMonto();
		
		getListaPagos();
	}
}