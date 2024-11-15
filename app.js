const cursos = [
	{ "id": 1, "curso": "Noviazgo y sexualidad", "precio": "1500.00", "tipoCurso": "taller" },
	{ "id": 2, "curso": "Inteligencia emocional", "precio": "1500.00", "tipoCurso": "taller" },
	{ "id": 3, "curso": "Mi yo social", "precio": "1500.00", "tipoCurso": "taller" },
	{ "id": 4, "curso": "Administracion del tiempo", "precio": "1200.00", "tipoCurso": "dialogos" },
	{ "id": 5, "curso": "Toma de decisiones", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 6, "curso": "Estableciendo metas", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 7, "curso": "Aprendiendo a comunicarte", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 8, "curso": "Deportes y pasatiempos", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 9, "curso": "Redes sociales", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 10, "curso": "Estrés en adolescentes", "precio": "1200.00", "tipoCurso": "dialogos"},
	{ "id": 11, "curso": "Mi relación con el dinero", "precio": "1200.00", "tipoCurso": "dialogos"},
];


let flag_fin = true;
let total = 0.0;
let showCursos = "";
let cantidad = 0;
let showPromocion = "No tienes promocion \n";


for (p in cursos) {
	showCursos =
		showCursos +
		`${cursos[p].id}. ${cursos[p].curso} = $ ${cursos[p].precio} \n`;
}


function init() {
	let carrito = [];
	let validarPromocion;
	
	while (flag_fin) {
		let id = parseInt(
			prompt(
				"Catalogo de cursos\n" + showCursos + "Ingresa el id del curso"
			)
		);

		let cursoSeleccionado = buscarCurso(id);
		console.log(cursoSeleccionado);

		if (cursoSeleccionado.hasOwnProperty("id")) {
			//cantidad += 1;
			//carrito.push(cursoSeleccionado);
			localStorage.setItem(id, JSON.stringify(cursoSeleccionado));
			/* validarPromocion = calcularPromocion(cantidad, carrito);

			console.log(JSON.stringify(validarPromocion));

			if (validarPromocion.promocion) {
				showPromocion = "Tienes promocion \n";
			} */
			
		} else {
			alert("El id del curso seleccionado no existe");
		}
		flag_fin = confirm("¿Deseas adquirir otro curso?");
		
	}
	cantidad = localStorage.length;
	for (const key in localStorage) {
		if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
			const element = localStorage[key];
			carrito.push(JSON.parse(element));
		}
	}
	validarPromocion = calcularPromocion(cantidad, carrito);

			console.log(JSON.stringify(validarPromocion));

			if (validarPromocion.promocion) {
				showPromocion = "Tienes promocion \n";
			}

	alert(showPromocion + "Cantidad de cursos: " + cantidad + "\n" + "Tu total es: $ " + validarPromocion.total);
	
}

//calcular promocion
function calcularPromocion(q, c) {
	console.log("carrito", c);
	console.log("cantidad", q);

	let total = 0;
	let nuevoCarrito = [];

	for (l in c) {
		nuevoCarrito.push(c[l]);
	}

	let tienePromocion = false;
	let resultado = {};

	if (q >= 3) {
		tienePromocion = true;
		for (l in nuevoCarrito) {
			if (nuevoCarrito[l].tipoCurso == "taller"){
				nuevoCarrito[l].precio = 1200.00;
			}
			if (nuevoCarrito[l].tipoCurso == "dialogos"){
				nuevoCarrito[l].precio = 1000.00;
			}
		}
		console.log(JSON.stringify(nuevoCarrito));
	}

	if (tienePromocion) {
		resultado["promocion"] = true;
		for (l in nuevoCarrito) {
			total = total + parseFloat(nuevoCarrito[l].precio);
		}
		resultado["total"] = total;
	} else {
		resultado["promocion"] = false;
		for (l in nuevoCarrito) {			
			total = total + parseFloat(nuevoCarrito[l].precio);
		}
		resultado["total"] = total;
	}

	return resultado;
}


function buscarCurso(id) {
	let detalleCurso = {};

	for (p in cursos) {
		if (id == cursos[p].id) {
			detalleCurso = cursos[p];
		}
	}

	return detalleCurso;
}

