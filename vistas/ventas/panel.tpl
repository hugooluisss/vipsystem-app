<div id="panelVenta">
	<div class="row">
		<div class="col-xs-12 text-center tituloVenta">
			Nota de Venta
		</div>
	</div>
	<div class="box paneles" id="pnlVenta">
		<div class="row">
			<div class="widthfull">
				<select class="form-control select-xs" id="selBazar" name="selBazar">
					<option value="">Cargando bazares...</option>
				</select>
			</div>
		</div>
		<br />
		<br />
		<br />
		<br />
		<div class="row">
			<div class="col-xs-10 col-xs-offset-1">
				<button type="button" class="btn btn-primary btn-block" panel="btnNuevaVenta">Nueva Venta</button>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-xs-10 col-xs-offset-1">
				<button type="button" class="btn btn-warning btn-block"  data-toggle="modal" data-target="#winVentas">Historial de Ventas</button>
			</div>
		</div>
	</div>
	
	
	
	<div class="box paneles" id="pnlProductos" style="display: none">
		<div class="row dvFiltro">
			<div class="widthfull">
				<form class="form-horizontal" id="frmFiltro">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="fa fa-search" aria-hidden="true"></i>
						</span>
						<input id="txtFiltro" placeholder="Búsqueda rápida" class="form-control">
						<span class="input-group-addon" data-toggle="modal" data-target="#winNuevoProducto">
							<i class="fa fa-plus" aria-hidden="true"></i>
						</span>
						<span class="input-group-addon" id="btnGetBarcode">
							<i class="fa fa-barcode" aria-hidden="true"></i>
						</span>
					</div>
				</form>
			</div>
		</div>
		<div id="lstProductos">
			
		</div>
	</div>
	
	
	<div class="box paneles" id="pnlVenta">
		
		
		<div class="row">
			<div class="col-xs-12" id="dvProductos"></div>
		</div>
	</div>
	
	
	
	
	<div class="modal fade" id="winVentas" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Historial de ventas</h4>
				</div>
				<div class="modal-body" style="overflow-x: scroll">
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="modal fade" id="winAddProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" datos="">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Producto</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Interno</label>
						<div class="col-xs-9">
							<input class="form-control input-xs" campo="codigoInterno" disabled="true" readonly="true">
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Barras</label>
						<div class="col-xs-9">
							<input class="form-control input-xs" campo="codigoBarras" disabled="true" readonly="true">
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Barras</label>
						<div class="col-xs-9">
							<textarea readonly="true" disabled="true" campo="descripcion" class="form-control"></textarea>
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Precio</label>
						<div class="col-xs-9">
							<div class="input-group">
								<span class="input-group-addon" id="basic-addon2">$</span>
								<input class="form-control input-xs" campo="precio" disabled="true" readonly="true">
							</div>
						</div>
					</div>
					<hr />
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Color</label>
						<div class="col-xs-9">
							<input class="form-control input-xs" campo="color" disabled="true" readonly="true">
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Talla</label>
						<div class="col-xs-9">
							<input class="form-control input-xs" campo="talla" disabled="true" readonly="true">
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Existencia</label>
						<div class="col-xs-4">
							<input class="form-control input-xs" campo="existencia" disabled="true" readonly="true">
						</div>
					</div>
					<div class="row">
						<label for="txtCodigo" class="col-xs-3 text-right">Descuento</label>
						<div class="col-xs-4">
							<input class="form-control input-xs" campo="descuento" disabled="true" readonly="true">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="addProducto btn btn-primary" id="btnAddCarrito">Agregar</button>
					<button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
				</div>
			</div>
		</div>
	</div>
</div>