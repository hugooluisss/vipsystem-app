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
			
			if (datosUsuario.usuario.idPerfil != 1){
				if (datosUsuario.pendientes){
					$.get("vistas/dashboard/pendientes.tpl", function(plantilla){
						$("#modulo").find(".container").html(plantilla);
						$("[pendientes]").hide();
						
						if (datosUsuario.pendientes.bandMetodosCobro)
							$("[pendientes=metodosCobro]").show();
							
						if (!datosUsuario.pendientes.bandBazar)
							$("[pendientes=bazar]").hide();
							
						if (!datosUsuario.pendientes.bandEmpresa){
							if (datosUsuario.usuario.idPerfil == 1)
								$("[pendientes=empresa2]").hide();
							else
								$("[pendientes=empresa1]").hide();
						}
					});
				}else{
					$.get("vistas/dashboard/bazares.tpl", function(plantilla){
						$("#modulo").find(".container").html(plantilla);
					});
				}
			}
			
			jsRemoveWindowLoad();
		});
	}, "json");
}