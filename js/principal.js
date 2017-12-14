function setPrincipal(){
	jsShowWindowLoad("Espera un momento... estamos descargando los datos");
	$.post(server + "panelPrincipal", {
		"movil": 1,
		"json": true,
		"usuario": idUsuario
	}, function(datosUsuario){
		console.log("Respuesta del dashboard", datosUsuario);
		
		$.get("vistas/dashboard/bienvenido.tpl", function(plantilla){
			$("#modulo").html(plantilla);
			
			$("[campo=usuarioNombre]").text(datosUsuario.usuario.nombre);
			$("[campo=usuarioPerfil]").text(datosUsuario.usuario.nombrePerfil);
			$("#imgLogotipo").attr("src", server + datosUsuario.empresa.logotipo);
			
			if (datosUsuario.usuario.idPerfil == 1){
				if (datosUsuario.pendientes){
					$.get("vistas/dashboard/pendientes.tpl", function(plantilla){
						$("#modulo").find(".container").html(plantilla);
						$("[pendientes]").hide();
						
						if (datosUsuario.pendientes.bandMetodosCobro)
							$("[pendientes=metodosCobro]").show();
							
						if (!datosUsuario.pendientes.bandBazar)
							$("[pendientes=bazar]").hide();
							
						if (!datosUsuario.pendientes.bandEmpresa){
							$("[pendientes=empresa]").show();
							if (datosUsuario.usuario.idPerfil == 1)
								$("[pendientes=empresa2]").hide();
							else
								$("[pendientes=empresa1]").hide();
						}
					});
				}else{
					getBazares(datosUsuario.bazares);
				}
			}else
				getBazares(datosUsuario.bazares);
			
			jsRemoveWindowLoad();
		});
	}, "json");
	
	
	function getBazares(bazares){
		$.get("vistas/dashboard/bazares.tpl", function(plantilla){
			$("#modulo").find(".alertas").html(plantilla);
			var total = 0;
			
			if (bazares.length > 0){
				$.each(bazares, function(i, bazar){
					var tpl = $('<tr><td campo="nombre">{$row.inicio}</td><td class="text-right" campo="total">{$row.total}</td></tr>');
					
					$.each(bazar, function(key, valor){
						tpl.find("[campo=" + key + "]").text(valor);
					});
					console.log(bazar.total2);
					total = total + parseFloat(bazar.total2);
					$("#modulo").find(".container").find("#tblBazares").find("tbody").append(tpl);
				});
			}else{
				var tpl = $('<tr><td colspan="2" class="text-center"> No hay bazares activos</td></tr>');
				$("#modulo").find(".container").find("#tblBazares").find("tbody").append(tpl);
			}
			
			$("#modulo").find(".container").find("[campo=totalBazares]").text(formatNumber.new(total.toFixed(2)));
		});
	}
}