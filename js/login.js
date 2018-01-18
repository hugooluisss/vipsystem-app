/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db = null;
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		var idUsuario = window.localStorage.getItem("sesion");
		
		if (idUsuario != null && idUsuario != undefined && idUsuario != '')
			location.href = "inicio.html";
		else
			$("#bodyButtons").show("slow");
			
		$("#frmLogin").validate({
			debug: true,
			errorClass: "validateError",
			rules: {
				txtUsuario: {
					required : true,
					email: true
				},
				txtPass: {
					required : true
				}
			},
			wrapper: 'span',
			submitHandler: function(form){
				var obj = new TUsuario;
				obj.login({
					usuario: $("#txtUsuario").val(), 
					pass: $("#txtPass").val(),
					before: function(){
						$("#frmLogin [type=submit]").prop("disabled", true);
					},
					after: function(data){
						console.log(data);
						if (data.band == false || data.tipo == 1){
							mensajes.alert({mensaje: "Tus datos no son válidos", title: "No se pudo iniciar sesión"});
							$("#frmLogin [type=submit]").prop("disabled", false);
						}else{
							window.localStorage.removeItem("sesion");
							window.localStorage.setItem("sesion", data.datos.usuario);
							
							location.href = "inicio.html";
						}
					}
				});
			}
		});
	}
};

//app.initialize();

$(document).ready(function(){
	app.onDeviceReady();
});