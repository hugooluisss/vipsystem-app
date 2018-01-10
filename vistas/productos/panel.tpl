<div class="panelProductos">
	<div class="widthFull">
		<div class="col-xs-12">
			<select class="form-control select-xs" id="selBazar" name="selBazar">
				<option value="">Cargando bazares...</option>
			</select>
			<button id="btnAdd" class="btn btn-primary btn-block" data-toggle="modal" data-target="#winAddProducto">Agregar nuevo producto</button>
		</div>
	</div>
	
	<div class="panel">
		<div class="panel-body">
			<div class="fullWidth">
				<div class="col-xs-12" id="dvLista">
				</div>
			</div>
		</div>
	</div>
</div>

<form role="form" id="frmAddProducto" class="form-horizontal" onsubmit="javascript: return false;">
		<div class="modal fade" id="winAddProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" datos="">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Producto</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="txtCodigoBarras" class="col-md-2 text-right">Código Barras</label>
							<div class="col-md-4">
								<div class="input-group">
									<span class="input-group-addon" id="btnGetBarcode">
										<i class="fa fa-barcode" aria-hidden="true"></i>
									</span>
									<input class="form-control" id="txtCodigoBarras" name="txtCodigoBarras">
								</div>
							</div>
							<label for="txtCodigoInterno" class="col-md-2 text-right">Código Interno</label>
							<div class="col-md-4">
								<input class="form-control" id="txtCodigoInterno" name="txtCodigoInterno">
							</div>
						</div>
						<hr />
						<div class="form-group">
							<label for="txtDescripcion" class="col-md-2 text-right">Descripción</label>
							<div class="col-md-10">
								<input class="form-control" id="txtDescripcion" name="txtDescripcion">
							</div>
						</div>
						<div class="form-group">
							<label for="txtColor" class="col-md-2 text-right">Color</label>
							<div class="col-md-2 text-right">
								<input class="form-control" id="txtColor" name="txtColor">
							</div>
							<label for="txtTalla" class="col-md-2 text-right">Talla</label>
							<div class="col-md-2 text-right">
								<input class="form-control" id="txtTalla" name="txtTalla">
							</div>
							<label for="txtUnidad" class="col-md-2 text-right">Unidad</label>
							<div class="col-md-2 text-right">
								<input class="form-control" id="txtUnidad" name="txtUnidad">
							</div>
						</div>
						<div class="form-group">
							<label for="txtMarca" class="col-md-2 text-right">Familia</label>
							<div class="col-md-2 text-right">
								<input class="form-control" id="txtMarca" name="txtMarca">
							</div>
						</div>
						<hr />
						<div class="form-group">
							<label for="txtPrecio" class="col-md-2 text-right">Precio público</label>
							<div class="col-md-3">
								<input class="form-control" id="txtPrecio" name="txtPrecio" type="number">
							</div>
							<!--
							<label for="txtCosto" class="col-md-offset-1 col-md-2 text-right">Costo</label>
							<div class="col-md-3">
								<input class="form-control" id="txtCosto" name="txtCosto" type="number" value="0">
							</div>
							-->
						</div>
						
						<div class="form-group">
							<label for="txtCosto" class="col-md-2 text-right">Existencia</label>
							<div class="col-md-3">
								<input class="form-control" id="txtExistencias" name="txtExistencias" type="number">
							</div>
							<label for="txtDescuento" class="col-md-offset-1 col-md-2 text-right">Descuento</label>
							<div class="col-md-3">
								<div class="input-group">
									<input class="form-control" id="txtDescuento" name="txtDescuento" type="number" aria-describedby="basic-addon1">
									<span class="input-group-addon" id="basic-addon1">%</span>
								</div>
							</div>
						</div>
						
						<div class="form-group">
							<label for="txtObservacion" class="col-md-2 text-right">Observaciones</label>
							<div class="col-md-10">
								<textarea rows="5" class="form-control" id="txtObservacion" name="txtObservacion"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="addProducto btn btn-primary">Agregar</button>
						<button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
						<input type="hidden" id="id"/>
					</div>
				</div>
			</div>
		</div>
	</form>
