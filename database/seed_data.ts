
interface ISeedData {   
    entries: ISeedEntry[];    
}

interface ISeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

// solo estamos exportando este seedData
export const seedData: ISeedData = {
    entries: [
        {
            description: 'Pendiente: Lorem impsum',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En-Progreso Lorem impsum in-progres',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Lorem impsum finished',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}





