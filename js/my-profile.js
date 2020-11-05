function myFunction() {
    
    let resp = confirm("Se borraran todos los campos, ¿Estas seguro?");
    if (resp == true) {
        localStorage.removeItem('perfil');
    } else {
      alert('¡De acuerdo!');
    } 
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let perfil = localStorage.getItem('perfil');

    if (perfil) {
        perfil = JSON.parse(perfil);


        if (perfil.ImgWeb != "") {
            document.getElementById('profilePic').src = perfil.profilePic;
        }

        /*https://i.ibb.co/2qxfyCy/Ec-WHVd8-Ws-AEYo-RT.png*/

        document.getElementById('desdeWeb').value = perfil.profilePic;

        document.getElementById('nombre').value = perfil.nombre;
        document.getElementById('apellido').value = perfil.apellido;
        document.getElementById('edad').value = perfil.edad;
        document.getElementById('email').value = perfil.mail;
        document.getElementById('phone').value = perfil.phone;
    }


    document.getElementById('guardar').addEventListener('click', function (e) {

        let passedValidation = true;
        let ImgWeb = document.getElementById('desdeWeb');
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let edad = document.getElementById('edad');
        let mail = document.getElementById('email');
        let phone = document.getElementById('phone');

        if (nombre.value === '') {
            nombre.classList.add("is-invalid");
            passedValidation = false;
        } else {
            nombre.classList.remove("is-invalid");
            nombre.classList.add("was-validated");
        }

        if (apellido.value === '') {
            apellido.classList.add("is-invalid");
            passedValidation = false;
        } else {
            apellido.classList.remove("is-invalid");
            apellido.classList.add("was-validated");
        }

        if (edad.value === '') {
            edad.classList.add("is-invalid");
            passedValidation = false;
        } else {
            edad.classList.remove("is-invalid");
            edad.classList.add("was-validated");
        }

        if (mail.value === '') {
            mail.classList.add("is-invalid");
            passedValidation = false;
        } else {
            mail.classList.remove("is-invalid");
            mail.classList.add("was-validated");
        }

        if (phone.value === '') {
            phone.classList.add("is-invalid");
            passedValidation = false;
        } else {
            phone.classList.remove("is-invalid");
            phone.classList.add("was-validated");
        }

        if (passedValidation) {
            localStorage.setItem('perfil', JSON.stringify({
                profilePic: ImgWeb.value,
                nombre: nombre.value,
                apellido: apellido.value,
                edad: edad.value,
                mail: mail.value,
                phone: phone.value
            }));

            window.location = 'my-profile.html';
        }

    });

    document.getElementById('clean').addEventListener('click', function() {

        

        myFunction();

        
        window.location= 'my-profile.html';
    })
}); 