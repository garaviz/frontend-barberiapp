// let idColaborador;
// let fecha;
// let hora;

// function seleccionar(value){
//     idColaborador=value
// console.log(value);
// }
// function agendar(){
//     console.log("ingresa a agendar");
// fecha=document.getElementById("date").value
// hora=document.getElementById("time").value
// const data={
//     fecha:fecha,
//     hora:hora,
//     idColaborador:idColaborador,
//     reservada:true
// }
// console.log("por aca tambien pasa");
// axios.post("http://localhost:400/agenda/validar_agenda",data).then((response) => {
//         if (response.data.error === false) {
//           Swal.fire({
//             title: 'Agenda no disponible',
//             icon: 'warning',
//             showConfirmButton: true,
//           });
//         } else {
//           Swal.fire({
//             text: "Agenda disponible",
//             icon: 'success',
//             showConfirmButton: true,
//           }).then((res) => {
//             if (res.isConfirmed) {

//                 axios.post("http://localhost:400/agenda/crear",data).then((res)=>{
//                     if (response.data.error === false){
//                         Swal.fire({
//                             text: "Agenda reservada",
//                             icon: 'success',
//                             showConfirmButton: true,
//                           })
//                     }
//                 })
//               return response.text();
//             }
//           });
//         }
//       })
//       .catch((error) => {
//         console.log('error', error);
//         Swal.fire({
//           title: 'No se encontró el usuario',
//           icon: 'warning',
//           showConfirmButton: true,
//         });
//       });
// }
let idColaborador;
let fecha;
let hora;

function seleccionar(value) {
    idColaborador = value;
    console.log("idColaborador seleccionado:", value);
}

function agendar(event) {
    if (event) event.preventDefault(); // Prevenir comportamiento predeterminado del botón

    console.log("Ingresa a agendar");
    fecha = document.getElementById("date").value;
    hora = document.getElementById("time").value;

    if (!fecha || !hora || !idColaborador) {
        console.log("Faltan datos para agendar.");
        Swal.fire({
            title: 'Faltan datos',
            text: 'Por favor, completa todos los campos.',
            icon: 'warning',
            showConfirmButton: true,
        });
        return;
    }

    const data = {
        fecha: fecha,
        hora: hora,
        idColaborador: idColaborador,
        reservada: true
    };

    console.log("Datos para enviar:", data);
    console.log("Por acá también pasa");

    axios.post("http://localhost:400/agenda/validar_agenda", data)
        .then((response) => {
            console.log("Respuesta del servidor:", response.data);
            if (response.data.length >0) {
                Swal.fire({
                    title: 'Agenda no disponible',
                    icon: 'warning',
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    text: "Agenda disponible",
                    icon: 'success',
                    showConfirmButton: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        axios.post("http://localhost:400/agenda/crear", data)
                            .then((res) => {
                                console.log("Respuesta al crear agenda:", res.data);
                                if (res.data.error === false) {
                                    Swal.fire({
                                        text: "Agenda reservada",
                                        icon: 'success',
                                        showConfirmButton: true,
                                    });
                                }
                            })
                            .catch((error) => {
                                console.error("Error al crear agenda:", error);
                            });
                    }
                });
            }
        })
        .catch((error) => {
            console.log('Error en la validación de la agenda:', error);
            Swal.fire({
                title: 'No se encontró el usuario',
                icon: 'warning',
                showConfirmButton: true,
            });
        });
}


