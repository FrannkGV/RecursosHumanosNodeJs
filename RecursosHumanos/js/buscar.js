window.onload = init;

function init(){

    document.querySelector('.buscar').addEventListener('click', buscar);
    if(localStorage.getItem("token")){

    
        document.querySelector('.agregar').addEventListener('click', function() {
            window.location.href = "agregarempleado.html"
        });

        document.querySelector('.actualizar').addEventListener('click', function() {
            window.location.href = "modificarempleado.html"
        });

        document.querySelector('.eliminar').addEventListener('click', function() {
            window.location.href = "eliminarempleado.html"
        });   
    }
    else{
        window.location.href = "index.html";
    }
}


async function buscar(){
    const buscarnombre = document.getElementById('buscarnombre');
    const {data} = await axios.post("http://localhost:3000/employee/buscar", {
        data: {
            empleado_nombre : buscarnombre.value,
        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    });
    console.log(data);
    displayempleados(data.empleado);
}

function displayempleados(empleados){
    const resultados = document.querySelector(".resultados");
    empleados.forEach(empleado => {
        resultados.innerHTML =`
        <p> ID: ${empleado.empleado_id} </p> 
        <p> Nombre: ${empleado.empleado_nombre} </p> 
        <p> Apellidos: ${empleado.empleado_apellidos} </p> 
        <p> Telefono: ${empleado.empleado_telefono} </p> 
        <p> Correo: ${empleado.empleado_correo}</p> 
        <p> Correo: ${empleado.empleado_direccion}</p> `;
    });
}
