<div id="panelVenta">
	<div id="header" class="navbar navbar-default navbar-fixed-top">
		<ul id="wizard">
			<li>
				<button class="btn btn-primary" panel="pnlVenta">Nota</button>
			</li>
			<li>
				<button class="btn btn-primary" panel="pnlProductos">Agregar producto</button>
			</li>
			<li>
				<button class="btn btn-primary" panel="pnlPagar">Pagar</button>
			</li>
		</ul>
		<div class="row">
			<div class="col-xs-12">
				<select class="form-control select-xs" id="selBazar" name="selBazar">
					<option value="">Cargando bazares...</option>
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="btn-group btn-group-justified">
					<div class="btn-group">
						<button class="btn btn-primary btnNuevaVenta">Nueva venta</button>
					</div>
					<div class="btn-group">
						<button class="btn btn-warning" data-toggle="modal" data-target="#winVentas">Historial de ventas</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="box paneles" id="pnlVenta">
		
		
		<div class="row">
			<div class="col-xs-12" id="dvProductos"></div>
		</div>
	</div>
	
	<div class="box paneles" id="pnlProductos" style="display: none">
		<div class="row dvFiltro">
			<div class="col-xs-12">
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
	
	<div class="box paneles" id="pnlPagar" style="display: none">
		<br />
		<div class="row">
			<div class="col-xs-6 col-sm-6">
				<div class="input-group input-group-xs">
					<span class="input-group-addon" id="sizing-addon2">Folio</span>
					<input type="text" class="form-control" id="txtFolio" name="txtFolio" value="" readonly="true" title="Folio" />
				</div>
			</div>
			<div class="col-xs-6 col-sm-6 text-right">
				<div class="input-group input-group-xs">
					<span class="input-group-addon" id="sizing-addon2">Fecha</span>
					<input type="text" class="form-control text-right" id="txtFecha" name="txtFecha" readonly="true" placerholder="Fecha" title="Fecha" value="2017-11-15"/>
				</div>
			</div>
		</div>
		<br />
	
		<div class="input-group">
			<span class="input-group-addon" id="basic-addon1"><i class="fa fa-user-o" aria-hidden="true"></i></span>
			<input class="form-control" id="txtCliente" name="txtCliente" placeholder="Cliente" value="" identificador="" jsonDefault='' readonly="true" disabled="true">
			<span class="input-group-btn">
				<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#winClientes"><i class="fa fa-search" aria-hidden="true"></i></button>
			</span>
			<span class="input-group-btn">
				<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#winAddCliente"><i class="fa fa-plus" aria-hidden="true"></i></button>
			</span>
			<span class="input-group-btn">
				<button class="btn btn-primary" type="button" id="setClienteDefecto">D</button>
			</span>
		</div>
		<br />
		<div class="alert alert-primary" role="alert">
			Comentarios
			<textarea id="txtComentario" name="txtComentario" class="form-control" rows="5"></textarea>
			<br />
			<div class="row">
				<div class="col-xs-6 col-sm-4">Subtotal</div>
				<div class="col-xs-6 col-sm-8 text-right" id="dvSubtotal"></div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-4">Descuento (%)</div>
				<div class="col-xs-6 col-sm-3 col-sm-offset-5 text-right">
					<input type="text" value="" class="form-control text-right" id="txtDescuento" name="txtDescuento"/>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-4">Total</div>
				<div class="col-xs-6 col-sm-8 text-right" id="dvTotal"></div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-4">Pagos</div>
				<div class="col-xs-6 col-sm-8 text-right" id="dvTotalPagos"></div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-4">Saldo</div>
				<div class="col-xs-6 col-sm-8 text-right" id="dvSaldo"></div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-xs-offset-6 col-sm-4 col-sm-offset-8 text-right">
					<div class="btn-group btn-group-justified">
						<div class="btn-group">
							<button class="btn btn-primary" id="btnPagar" data-toggle="modal" data-target="#winPago">Registrar pago</button>
						</div>
					</div>
				</div>
			</div>
			<br />
			<div class="row">
				<div class="col-xs-12" id="dvPagos">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<div class="box">
					<div class="box-body">
						<div class="btn-group btn-group-justified">
							<div class="btn-group">
								<button class="btn btn-primary" id="btnGuardar">Guardar para despues / apartar</button>
							</div>
						</div>
						<div class="btn-group btn-group-justified">
							<div class="btn-group">
								<button class="btn btn-danger" id="btnCancelar">Cancelar</button>
							</div>
							<div class="btn-group">
								<button class="btn btn-success btnCerrar">Cerrar y enviar</button>
							</div>
						</div>
					</div>
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
	
	
	<div class="modal fade" id="winProductos" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Productos</h4>
				</div>
				<div class="modal-body">
					
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="winNuevoProducto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Agregar producto</h4>
				</div>
				<div class="modal-body">
					<form role="form" id="frmAddProducto" class="form-horizontal" onsubmit="javascript: return false;">
						<div class="form-group">
							<label for="txtCodigo" class="col-md-2 text-right">Código</label>
							<div class="col-md-3">
								<input class="form-control" id="txtCodigo" name="txtCodigo">
							</div>
						</div>
						<div class="form-group">
							<label for="txtDescripcion" class="col-md-2 text-right">Descripción</label>
							<div class="col-md-10">
								<input class="form-control" id="txtDescripcion" name="txtDescripcion">
							</div>
						</div>
						<div class="form-group">
							<label for="txtPrecio" class="col-md-2 text-right">Precio público</label>
							<div class="col-md-3">
								<input class="form-control" id="txtPrecio" name="txtPrecio" type="number" value="0">
							</div>
						</div>
						
						<div class="row">
							<div class="col-xs-12">
								<button type="reset" id="btnReset" class="btn btn-default">Cancelar</button>
								<button type="submit" class="btn btn-info pull-right">Guardar</button>
							</div>
						</div>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	
	
	
	
	
	
	<div class="modal fade" id="winClientes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Clientes registrados</h4>
				</div>
				<div class="modal-body">
					
				</div>
			</div>
		</div>
	</div>
	
	<form role="form" id="frmAddCliente" class="form-horizontal" onsubmit="javascript: return false;">
		<div class="modal fade" id="winAddCliente" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Registrar cliente</h4>
					</div>
					<div class="modal-body" style="max-height: 500px;">					
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtNombre">Nombre</label>
							<div class="col-xs-10">
								<input class="form-control input-sm" id="txtNombre" name="txtNombre" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtRazonSocial">Razón social</label>
							<div class="col-xs-10">
								<input class="form-control input-sm" id="txtRazonSocial" name="txtRazonSocial" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtDomicilio">Domicilio</label>
							<div class="col-xs-10">
								<input class="form-control input-sm" id="txtDomicilio" name="txtDomicilio" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtExterior">#ext</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtExterior" name="txtExterior" />
							</div>
							<label class="col-xs-2 text-right" for="txtInterior">#int</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtInterior" name="txtInterior" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtColonia">Colonia</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtColonia" name="txtColonia" />
							</div>
							<label class="col-xs-2 text-right" for="txtMunicipio">Municipio</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtMunicipio" name="txtMunicipio" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtCiudad">Ciudad</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtCiudad" name="txtCiudad" />
							</div>
							<label class="col-xs-2 text-right" for="txtEstado">Estado</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtEstado" name="txtEstado" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtRFC">RFC</label>
							<div class="col-xs-8">
								<input class="form-control input-sm" id="txtRFC" name="txtRFC" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtTelefono">Teléfono</label>
							<div class="col-xs-8">
								<input class="form-control input-sm" id="txtTelefono" name="txtTelefono" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-xs-2 text-right" for="txtCorreo">Correo</label>
							<div class="col-xs-4">
								<input class="form-control input-sm" id="txtCorreo" name="txtCorreo" />
							</div>
							<label class="col-xs-2 text-right" for="txtTelefono">¿Desea recibir promociones?</label>
							<div class="col-xs-4">
								<select id="selPromociones" name="selPromociones" class="form-control">
									<option value="0">No</option>
									<option value="1">Si</option>
								</select>
							</div>
						</div>
						<input type="hidden" id="id"/>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn btn-primary">Guardar</button>
						<button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	
	
	
	
	
	
	<form role="form" id="frmPago" class="form-horizontal" onsubmit="javascript: return false;">
		<div class="modal fade" id="winPago" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">Pago</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="selMetodoPago" class="col-sm-3">Método de pago</label>
							<div class="col-sm-9">
								<select class="form-control" id="selMetodoPago" name="selMetodoPago">
									{foreach from=$metodosPago item="row"}
										<option value='{$row.idMetodoPago}' json='{$row.cobros}'>{$row.nombre}</option>
									{/foreach}
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="txtReferencia" class="col-sm-3">Referencia</label>
							<div class="col-sm-5">
								<input class="form-control" id="txtReferencia" name="txtReferencia" value="" type="text" />
							</div>
							<div class="col-sm-4 text-muted">
								Por ejemplo: últimos 4 dígitos
							</div>
						</div>
						<div class="form-group">
							<label for="selMetodoCobro" class="col-sm-3">Método de cobro</label>
							<div class="col-sm-9">
								<select class="form-control" id="selMetodoCobro" name="selMetodoCobro">
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="txtMonto" class="col-sm-3">Monto</label>
							<div class="col-sm-3">
								<input class="form-control text-right" id="txtMonto" name="txtMonto" value="0" type="text" />
								<input id="montoMaximo" name="montoMaximo" value="0" type="hidden" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn btn-primary">Guardar</button>
						<button type="reset" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					</div>
				</div>
			</div>
		</div>
	</form>
	
	
	
	
	
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