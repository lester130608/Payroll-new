import Link from "next/link";

export default function ConfiguracionPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Configuración</h1>
      <ul className="list-disc ml-5">
        <li>
          <Link href="/configuracion/roles" className="text-blue-600 hover:underline">Gestión de Roles</Link>
        </li>
        <li>
          <Link href="/configuracion/tarifas" className="text-blue-600 hover:underline">Gestión de Tarifas</Link>
        </li>
      </ul>
    </div>
  );
}
