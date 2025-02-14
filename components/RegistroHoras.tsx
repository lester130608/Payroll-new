import React, { useState } from 'react';
import useRegistroStore from '../../lib/useRegistroStore';

const RegistroHoras: React.FC = () => {
  const [empleado, setEmpleado] = useState('');
  const [fecha, setFecha] = useState('');
  const [horas, setHoras] = useState('');
  const [servicio, setServicio] = useState('');

  const agregarRegistro = useRegistroStore((state) => state.agregarRegistro);

  const handleGuardar = () => {
    const nuevoRegistro = { empleado, fecha, horas, servicio };
    agregarRegistro(nuevoRegistro);
    // Limpiar el formulario después de guardar
    setEmpleado('');
    setFecha('');
    setHoras('');
    setServicio('');
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="empleado" className="block text-sm font-medium text-gray-700">
          Empleado
        </label>
        <select
          id="empleado"
          name="empleado"
          value={empleado}
          onChange={(e) => setEmpleado(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecciona un empleado</option>
          <option value="empleado1">Empleado 1</option>
          <option value="empleado2">Empleado 2</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>

      <div>
        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
          Fecha
        </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      <div>
        <label htmlFor="horas" className="block text-sm font-medium text-gray-700">
          Horas trabajadas
        </label>
        <input
          type="number"
          id="horas"
          name="horas"
          value={horas}
          onChange={(e) => setHoras(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>

      <div>
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700">
          Servicio prestado
        </label>
        <select
          id="servicio"
          name="servicio"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecciona un servicio</option>
          <option value="servicio1">Servicio 1</option>
          <option value="servicio2">Servicio 2</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
      </div>

      <button
        type="button"
        onClick={handleGuardar}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Guardar
      </button>
    </form>
  );
};

export default RegistroHoras;