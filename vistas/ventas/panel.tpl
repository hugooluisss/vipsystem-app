<div id="panelVenta">
	<nav id="header" class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<div class="text-center">
					Nota de venta
				</div>
			</div>
		</div>
	</nav>
	<ul id="wizard">
		<li>
			<button class="btn btn-primary">Nota</button>
		</li>
		<li>
			<button class="btn btn-primary">Productos</button>
		</li>
		<li>
			<button class="btn btn-primary">Pagar</button>
		</li>
	</ul>
	
	<div class="box">
		<div class="row">
			<div class="col-xs-12">
				<form class="form-horizontal" id="frmFiltro">
					<div class="input-group">
						<span class="input-group-addon">
							<i class="fa fa-search" aria-hidden="true"></i>
						</span>
						<input id="txtFiltro" placeholder="Búsqueda rápida" class="form-control">
					</div>
				</form>
			</div>
		</div>
		<div id="lstProductos">
			
		</div>
	</div>
	
	
	
	
	
	<div class="container" id="puntoVenta">
		<div class="row">
			<div class="col-xs-12 col-sm-4">
				<select class="form-control select-xs" id="selBazar" name="selBazar">
					<option value="">Cargando bazares...</option>
				</select>
			</div>
			<div class="col-xs-12 col-sm-8 text-right">
				<div class="btn-group btn-group-xs">
					<button class="btn btn-primary btnNuevaVenta">Nueva venta</button>
					<button class="btn btn-default" data-toggle="modal" data-target="#winVentas">Historial de ventas</button>
				</div>
			</div>
		</div>
	</div>
	
	<div id="panel" class="example">
		<div class="panel panel-default">
			<div class="panel-body wizard">
				<ul class="nav nav-wizard">
					<li>
						<a href="#step1">Productos</a>
					</li>
					<li>
						<a href="#step2">Cliente</a>
					</li>
					<li>
						<a href="#step5">Pagos</a>
					</li>
				</ul>
	
				<div class="wizard-pane" id="step1">
					<div class="box">
						<div class="box-body" id="dvProductos"></div>
					</div>
				</div>
				<div class="wizard-pane" id="step2">
				</div>
				<div class="wizard-pane" id="step5">
					<h3>Step 5</h3>
				</div>
	        </div>
	    </div>
	</div>
	
	
	
	
	<div class="container" id="puntoVenta">	
		<br />
		<div class="box">
			<div class="box-body">
				<div class="row">
					<div class="col-xs-5 col-sm-3">
						<div class="input-group input-group-xs">
							<span class="input-group-addon" id="sizing-addon2">No</span>
							<input type="text" class="form-control" id="txtFolio" name="txtFolio" value="" readonly="true" title="Folio" />
						</div>
					</div>
					<div class="col-xs-7 col-sm-3 col-sm-offset-6 text-right">
						<div class="input-group input-group-xs">
							<span class="input-group-addon" id="sizing-addon2">Fecha</span>
							<input type="date" class="form-control text-right" id="txtFecha" name="txtFecha" readonly="true" placerholder="Fecha" title="Fecha" value="2017-11-15"/>
						</div>
					</div>
				</div>
				<br />
				<div class="input-group input-group-xs">
					<span class="input-group-addon" id="basic-addon1"><i class="fa fa-user-o" aria-hidden="true"></i></span>
					<input class="form-control" id="txtCliente" name="txtCliente" placeholder="Cliente" value="" identificador="" jsonDefault='' readonly="true" disabled="true">
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#winClientes"><i class="fa fa-search" aria-hidden="true"></i></button>
					</span>
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button" id="setClienteDefecto">D</button>
					</span>
					<span class="input-group-btn">
						<button class="btn btn-primary btn-xs btnNuevoCliente" data-toggle="modal" data-target="#winAddCliente"><i class="fa fa-plus" aria-hidden="true"></i></button>
					</span>
				</div>
				<div class="input-group input-group-xs">
					<span class="input-group-addon" id="basic-addon1"><i class="fa fa-shopping-basket" aria-hidden="true"></i></span>
					<input class="form-control" id="txtProducto" name="txtProducto" placeholder="Producto" readonly="true" disabled="true">
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button" data-toggle="modal" data-target="#winProductos"><i class="fa fa-search" aria-hidden="true"></i></button>
					</span>
					<span class="input-group-btn">
						<button class="btn btn-primary" type="button"><i class="fa fa-barcode" aria-hidden="true"></i></button>
					</span>
					<span class="input-group-btn">
						<button class="btn btn-primary btnNuevoProducto" data-toggle="modal" data-target="#winNuevoProducto"><i class="fa fa-plus" aria-hidden="true"></i></button>
					</span>
				</div>
			</div>
		</div>
		<br />
		
		<br />
		<div class="row">
			<div class="col-xs-12">
				<div class="box">
					<div class="box-body">
						Comentarios
						<textarea id="txtComentario" name="txtComentario" class="form-control" rows="5"></textarea>
					</div>
				</div>
			</div>
			<div class="col-xs-12">
				<div class="box">
					<div class="box-body">
						<div class="alert alert-success">
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
						</div>
						<div class="row">
							<div class="col-xs-12" id="dvPagos">
							</div>
						</div>
						<div class="text-center">
							<button class="btn btn-primary" id="btnPagar">Registro de pagos</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<br />
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<div class="box">
					<div class="box-body">
								<button class="btn btn-primary btn-block" id="btnGuardar">Guardar para despues / apartar</button>
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
						<!--
						<div class="form-group">
							<label for="txtCodigo" class="col-md-2 text-right">Código</label>
							<div class="col-md-3">
								<input class="form-control" id="txtCodigo" name="txtCodigo">
							</div>
						</div>
						-->
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
	
	<div class="modal fade" id="winAddCliente" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Registrar cliente</h4>
				</div>
				<div class="modal-body">
					<form role="form" id="frmAddCliente" class="form-horizontal" onsubmit="javascript: return false;">
						
						<button type="reset" id="btnReset" class="btn btn-default">Cancelar</button>
						<button type="submit" class="btn btn-info pull-right">Guardar</button>
						<input type="hidden" id="id"/>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	
	
	
	
	
	
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
				<div class="modal-body">
				</div>
			</div>
		</div>
	</div>
</