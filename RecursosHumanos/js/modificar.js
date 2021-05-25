window.onload = init;
function init(){

    if(localStorage.getItem("token")){
        document.querySelector('.modificar').addEventListener('click', modificar);
    }
    else{
        window.location.href = "employees.html";
    }
}

function modificar(){
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var direccion = document.getElementById('direccion').value;

    console.log(id, nombre, apellido, telefono, correo, direccion);

    axios({
        method: 'patch',
        url: 'http://localhost:3000/employee/modificar',
        data: {
            empleado_id : id,
            empleado_nombre : nombre,
            empleado_apellidos: apellido,
            empleado_telefono: telefono,
            empleado_correo: correo,
            empleado_direccion: direccion 
        }
    }).then(function(res) {
        console.log(res);
        alert("Actualizacion exitosa");
        window.location.href = "employees.html"
    }).catch(function(err){
        console.log(err);
    })
}