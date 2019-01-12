class Billetes {
		constructor(valor, cantidad, imagen, num){
			this.valor = valor;
			this.cantidad = cantidad;
			this.imagen = imagen;
			this.num = num;
		}
	}

	// Carga de Imagenes 
	
	var imagenes = document.querySelector("#imagenes");
	var lienzo = imagenes.getContext('2d');
	var imagen_5 = new Image();
	var imagen_10 = new Image();
	var imagen_20 = new Image();
	var imagen_50 = new Image();
	imagen_5.src = 'img/5.jpg';
	imagen_10.src = 'img/10.jpg';
	imagen_20.src = 'img/20.jpg';
	imagen_50.src = 'img/50.jpg';

	// Codigo Cajero Automatico 

	var dineroCajero = [];
	dineroCajero.push(new Billetes(50, 4, imagen_50, 1));
	dineroCajero.push(new Billetes(20, 10, imagen_20, 2));
	dineroCajero.push(new Billetes(10, 5, imagen_10, 3));
	dineroCajero.push(new Billetes(5, 10, imagen_5, 4));

	var entregado = [];
	var papeles = 0;
	var div = 0;

	var boton = document.querySelector('#boton');
	var borrar = document.querySelector('#borrar');
	boton.addEventListener('click', agregar);
	borrar.addEventListener('click', borrado);
	var mensaje_caja = document.querySelector('#mensaje_caja');
	var disponible = 0;
	var x = 0;
	var y = 0; 

	for (let bi of dineroCajero){
		disponible = disponible + (bi.valor * bi.cantidad);
	}

	function dibujar(img, q, y){
		for (var f = 0 ; f < q ; f++) {			 			
			lienzo.drawImage(img, x, y);
			x = x + 80;			
		}			
	}

	function agregar(){
		var retirar = parseInt(document.querySelector('#numeros').value);		

			if (retirar <= disponible && retirar%5 == 0) {

				disponible = disponible - retirar

				for(let bi of dineroCajero){

					if(retirar > 0){
						div = Math.floor(retirar/bi.valor);
						if (div > bi.cantidad) {
							papeles = bi.cantidad;
						}else{
							papeles = div;
						}				
						entregado.push( new Billetes(bi.valor, papeles, bi.imagen, bi.num));
						retirar = retirar - (bi.valor * papeles);		
						bi.cantidad = bi.cantidad - papeles;						
						dibujar(bi.imagen, papeles, y);
						if(papeles != 0){
							y = y + 50;								
						}
						x = 0;											
					}						
				}
				mensaje_caja.innerHTML = 'Concluida la operacion';
				mensaje_caja.className = 'mensaje-exitoso';

			}else if(disponible <= retirar){
				mensaje_caja.innerHTML = 'No hay suficiente dinero';
				mensaje_caja.className = 'mensaje-aviso';

			}else {
				mensaje_caja.innerHTML = 'Introduce valores multiplos de 5';
				mensaje_caja.className = 'mensaje-aviso';		
			} 		

		boton.style.display = 'none';
		borrar.style.display = 'block';	
		console.log(entregado)						
	}	

	function borrado(){
		boton.style.display = 'block';
		borrar.style.display = 'none';
		entregado = [];	
		lienzo.clearRect(0, 0, imagenes.width, imagenes.height);
		x = 0;
		y = 0;
	}	