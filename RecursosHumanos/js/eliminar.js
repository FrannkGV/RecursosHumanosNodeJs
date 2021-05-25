window.onload = init;
function init(){

    if(localStorage.getItem("token")){
        document.querySelector('.eliminar').addEventListener('click', eliminar);
    }
    else{
        window.location.href = "employees.html";
    }
}

function eliminar(){
    var id = document.getElementById('id').value;
    
    console.log(id);

    axios({
        method: 'delete',
        url: 'http://localhost:3000/employee/eliminar',
        data: {
            empleado_id : id
        }
    }).then(function(res) {
        console.log(res);
        alert("Empleado borrado correctamente");
        window.location.href = "employees.html"
    }).catch(function(err){
        console.log(err);
    })
}