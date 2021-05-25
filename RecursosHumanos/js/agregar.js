window.onload = init;
function init(){

    if(localStorage.getItem("token")){
        document.querySelector('.actualizar').addEventListener('click', agregar);
    }
    else{
        window.location.href = "employees.html";
    }
}

function agregar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var direccion = document.getElementById('direccion').value;

    console.log(nombre, apellido, telefono, correo, direccion);

    axios({
        method: 'post',
        url: 'http://localhost:3000/employee/agregar',
        data: {
            empleado_nombre : nombre,
            empleado_apellidos: apellido,
            empleado_telefono: telefono,
            empleado_correo: correo,
            empleado_direccion: direccion 
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "employees.html"
    }).catch(function(err){
        console.log(err);
    })
}