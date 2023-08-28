
import { useState, useEffect } from 'react'

import { ErrorComponent } from './ErrorComponent'


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error,setError] = useState(false)


  useEffect(() => {
    if (Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])
  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha
  }

  
  const handleSubmit = ( e ) => {
    
    e.preventDefault();

    if ([ nombre, propietario, email, fecha, sintomas ].includes('')) {
      setError(true);
      return;
    };
    
    setError(false);   

    const objetoPaciente = {   
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    
    if ( paciente.id ) {

      // Editando el registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)

    } else {

      //Agregando el registro
      objetoPaciente.id = generarId()
      setPacientes([ ...pacientes, objetoPaciente ])
      setPaciente({})
    };


    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
 
  };


  return (

    <div className="md:w-1/2 lg:w-2/5 mx-5">

      <h1 className="font-black text-3xl text-center">Seguimiento Pacientes</h1>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold text-lg">Administralos</span>
      </p> 


      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={ handleSubmit }
      >
        { error && <ErrorComponent mensaje = {'Todos los campos son obligatorios'} /> }

        {/* Primer input nombre mascota */}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ nombre }
            onChange={ (e) => setNombre(e.target.value) }
          />
        </div>


        {/* Segundo input nombre propietario */}
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ propietario }
            onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>


        {/* Tercer input correo propietario */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email contacto propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </div>


        {/* Cuarto input fecha de alta */}
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Alta
          </label>

          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ fecha }
            onChange={ (e) => setFecha(e.target.value) }
          />
        </div>


        {/* Quinto input síntomas */}
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Síntomas
          </label>

          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            value={ sintomas }
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>


        {/* Botón para enviar el formulario*/}
        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                  hover:bg-indigo-700 cursor-pointer transition-colors rounded-sm"
          value= { paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />

      </form>

    </div>
  );
};


export default Formulario;