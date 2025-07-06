import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {

                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/pacientes', config)
            console.log(data)

            setPacientes(data)
                
            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        if(paciente._id) {
            
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)

                console.log(data)
            } catch (error) {
               console.log(error) 
            }
        } else {

            try {
            const { data } = await clienteAxios.post('/pacientes', paciente, config)
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
            setPacientes([pacienteAlmacenado, ...pacientes])

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Conformas que desea eliminar?')

        if(confirmar) {
            try {

                const token = localStorage.getItem('token')
                const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
            const pacientesActualizados = pacientes.filter( pacienteState => pacienteState._id !== id)

            setPacientes(pacientesActualizados)
                
            } catch (error) {
                
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion, 
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}



export default PacientesContext;