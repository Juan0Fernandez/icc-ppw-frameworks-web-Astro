import type { Proyecto } from '../interface/proyecto'; 

const STORAGE_KEY = 'proyectosApp';

const DEFAULT_PROYECTOS: Proyecto[] = [
    { id: 1, nombre: 'Proyecto Inicial A', descripcion: 'Descripción A' },
    { id: 2, nombre: 'Proyecto Inicial B', descripcion: 'Descripción B' }
];

// Guardar en LocalStorage (Solo cliente)
function saveProyectos(proyectos: Proyecto[]) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(proyectos));
    }
}

// Cargar proyectos
export function loadProyectos(): Proyecto[] {
    if (typeof localStorage === 'undefined') { 
         return DEFAULT_PROYECTOS;
    }

    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            return JSON.parse(savedData) as Proyecto[];
        }
    } catch (e) {
        console.error("Error al parsear localStorage:", e);
    }

    // Si no hay datos guardados, inicializamos
    saveProyectos(DEFAULT_PROYECTOS);
    return DEFAULT_PROYECTOS;
}

export function addProyecto(nuevoProyecto: Proyecto): Proyecto[] {
    const currentProyectos = loadProyectos(); 
    const updatedProyectos = [...currentProyectos, nuevoProyecto];
    saveProyectos(updatedProyectos); 
    return updatedProyectos;
}

export function removeFirstProyecto(): Proyecto[] {
    const currentProyectos = loadProyectos();
    
    if (currentProyectos.length > 0) {
        const updatedProyectos = currentProyectos.slice(1);
        // Guardamos en localStorage
        if (typeof localStorage !== 'undefined') {
             localStorage.setItem('proyectosApp', JSON.stringify(updatedProyectos));
        }
        return updatedProyectos;
    }
    
    return currentProyectos;
}