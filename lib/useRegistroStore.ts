import { create } from "zustand"; // ✅ Importación corregida

interface Registro {
  empleado: string;
  fecha: string;
  horas: string;
  servicio: string;
}

interface RegistroStore {
  registros: Registro[];
  agregarRegistro: (registro: Registro) => void;
  limpiarRegistros: () => void;
}

const useRegistroStore = create<RegistroStore>((set) => ({
  registros: [],
  agregarRegistro: (registro) => set((state) => ({ registros: [...state.registros, registro] })),
  limpiarRegistros: () => set({ registros: [] }),
}));

export default useRegistroStore;