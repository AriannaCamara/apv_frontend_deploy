import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' || email.length <  6) {
            setAlerta({msg: 'El email es obligatorio', error: true})
            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })

            console.log(data)
            setAlerta({msg: data.msg})
            
        }  catch (error) {
            setAlerta({
                msg: error?.response?.data?.msg || "Ocurrió un error inesperado",
                error: true
        });
    console.error("Error en olvide-password:", error);
    }
}

    const { msg } = alerta

  return (
    <>
        <div>
            <h1 className='text-fuchsia-900 font-black text-6xl'>Recupera tu Acceso y no Pierdas {""} <span className='text-emerald-600'>Tus Pacientes</span></h1>
        </div>

         <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            { msg && <Alerta 
                alerta={alerta}
            />}

            <form
                onSubmit={handleSubmit}
            >

               <div className='my-5'>
                    <label
                        className='uppercase text-gray-600 block text-xl font-bold'
                    >
                        Email
                    </label>
                    <input 
                        type='email'
                        placeholder='Email de registro'
                        className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type='submit'
                    value='Enviar Instrucciones'
                    className='bg-fuchsia-900 w-full py-3 px-20 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-fuchsia-950 md:w-auto '
                />
            </form>

            
            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/">¿Ya tienes una cuentas? Inicia Sesión</Link>
                <Link 
                    className="block text-center my-5 text-gray-500"
                    to="/registrar">¿No tienes una cuentas? Regístrate</Link>
            </nav>
        </div>

    </>
  )
};

export default OlvidePassword;
