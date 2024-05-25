function catalogo(){
    const correoElectronico = document.getElementById("email").value;
    const clave = document.getElementById("password").value;

    const data = {
        correoElectronico,clave
    }

    axios.post("http://localhost:400/usuario/login",data).then((response) => {
        if (response.data.error === true) {
          Swal.fire({
            title: 'No se encontró el usuario',
            icon: 'warning',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: 'Ingreso exitoso',
            text: "Bienvenido a Barberia y tendencias Natalia Martinez",
            icon: 'success',
            showConfirmButton: true,
          }).then((res) => {
            if (res.isConfirmed) {
              window.location.href = '/vistas/catalogo.html';
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
    }