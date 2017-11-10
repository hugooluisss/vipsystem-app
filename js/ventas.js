function panelVentas(){
	$(".menu1").hide("slow");
	$.get("vistas/ventas/panel.tpl", function(resp){
		$("#modulo").html(resp);
	});
}