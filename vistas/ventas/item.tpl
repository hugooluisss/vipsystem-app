<div class="item">
	<div class="row">
		<div class="col-xs-12">
			<span campo="codigoInterno"></span> 
			<span campo="codigoBarras"></span>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12" campo="descripcion"></div>
	</div>
	<div class="row">
		<div class="col-xs-3 text-center">Talla</div>
		<div class="col-xs-3 text-center" campo="talla"></div>
		<div class="col-xs-3 text-center">Color</div>
		<div class="col-xs-3 text-center" campo="color"></div>
	</div>
	<br />
	<br />
	<div class="row">
		<div class="col-xs-2">Precio</div>
		<div class="col-xs-4" campo="precio"></div>
		<div class="col-xs-2">Cantidad</div>
		<div class="col-xs-4">
			<input type="number" class="form-control text-right cantidad" campo="cantidad"/>
		</div>
	</div>
	<div class="row">
		
		<div class="col-xs-6">Descuento</div>
		<div class="col-xs-6">
			<div class="input-group">
				<input type="number" class="form-control text-right descuento" campo="descuento" value="" indice=""/>
				<span class="input-group-addon" id="basic-addon2">%</span>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-xs-6">Cantidad entregada</div>
		<div class="col-xs-6">
			<input type="number" class="form-control text-right entregados" campo="cantidadEntregada"/>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-6"><b>Precio total</b></div>
		<div class="col-xs-6 text-right" campo="total"></div>
	</div>
</div>
<hr />