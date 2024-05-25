function registro (){
    const nombre = document.getElementById('nombre').value.trim();
    const correoElectronico = document.getElementById('correoElectronico').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const contrasenia = document.getElementById('contrasena').value.trim();
    const confirmarContrasenia = document.getElementById('confirmar_contrasena').value.trim();
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
    const idTipoUsuario = document.getElementById('idTipoUsuario').value;
    console.log("idTipoUsuario",idTipoUsuario);
    // const noSoyRobot = document.getElementById('robot-no').checked;

    const data = {
        nombre,correoElectronico,telefono,contrasenia,fechaNacimiento,idTipoUsuario
    }
    if(contrasenia==confirmarContrasenia){
      axios.post("http://localhost:400/usuario/crear",data).then((response) => {
        if (response.data.error === true) {
          Swal.fire({
            title: 'No se encontró el usuario',
            icon: 'warning',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: 'Registro exitoso',
            text: "Bienvenido a Barberia y tendencias Natalia Martinez",
            icon: 'success',
            showConfirmButton: true,
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = '/vistas/login.html';
              return response.text();
            }
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
        Swal.fire({
          title: 'No se encontró el usuario',
          icon: 'warning',
          showConfirmButton: true,
        });
      });

} else{
  Swal.fire({
    title: 'las contraseñas no coinciden',
    icon: 'warning',
    showConfirmButton: true,
  });
} 
    }
    
