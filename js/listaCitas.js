let citas=[]
function listarAgenda() {
    axios.get("http://localhost:400/agenda/listar").then((response) => {
        console.log("res",response);
        citas=response.data.resp.filter(r=> r.reservada==1)
        const tbody = document.querySelector('#agenda-table tbody');
        citas.forEach(agenda => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
              <td>${agenda.idAgenda}</td>
              <td>${new Date(agenda.fecha).toLocaleDateString()}</td>
              <td>${agenda.idColaborador}</td>
              <td>${agenda.reservada}</td>
              <td>${agenda.hora}</td>
              <td><button onclick="liberarAgenda(${agenda.idAgenda})">Liberar</button></td>
          `;

          tbody.appendChild(tr);
      });
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
    function liberarAgenda(idAgenda) {
      const data={
        idAgenda:idAgenda,
        reservada:0
      }
      axios.put("http://localhost:400/agenda/actualizar_reserva",data).then((response) => {
        if (response.data.error === true) {
          Swal.fire({
            title: 'No es posible actualizar la reserva',
            icon: 'warning',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            title: 'Ingreso exitoso',
            text: "Bienvenido a Barberia y tendencias Natalia Martinez",
            icon: 'success',
            showConfirmButton: true,
          })
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
    
listarAgenda()
