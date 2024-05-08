document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Seleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');

    //Asignamos eventos
    //El blur sirve cuando un usuario ingresa al input y no escribe nada este avisa (por ejemplo: no puede quedar vacio).
    inputEmail.addEventListener('input',  validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)

    formulario.addEventListener('submit',enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();


    })

    function enviarEmail(e){
        e.preventDefault();

        console.log('enviando...')

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');


        setTimeout(() =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent='Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() =>{
                alertaExito.classList.add('hidden');
            }, 3000)
        }, 3000)

        exitoso = createElement('p');
        exitoso.textContent = 'Datos enviados exitosamente';
        exitoso.classList.add('text-green')

    }   

    function validar(e){
        if (e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        //Comprueba que ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white','p-2', 'text-center')

        referencia.appendChild(error)
    }


    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }
    }


    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)@\w+([.-_+]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }

    function resetFormulario(){

        //reiniciar el objeto
        email.email = '';
        asunto.asunto = '';
        mensaje.mensaje = '';
        formulario.reset();
        comprobarEmail();

    }
});

