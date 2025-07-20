// Equipment interface definition
export interface Equipment {
  id: number;
  user: string;
  sector: string;
  type: 'Notebook' | 'Desktop';
  brandModel: string;
  processor: {
    name: string;
    brand: 'Intel' | 'AMD';
    specs: string;
  };
  ram: string;
  storage: string;
  os: string;
  gpu: string;
}

// Dashboard summary interface
export interface DashboardSummary {
  totalMachines: number;
  activeUsers: number;
  departments: number;
  notebooks: number;
  desktops: number;
}

// Helper functions (now accept data as argument)
export const getUniqueSectors = (equipments: Equipment[]): string[] => {
  return [...new Set(equipments.map(equipment => equipment.sector))];
};

export const getEquipmentByType = (equipments: Equipment[], type: 'Notebook' | 'Desktop'): Equipment[] => {
  return equipments.filter(equipment => equipment.type === type);
};

export const getEquipmentBySector = (equipments: Equipment[], sector: string): Equipment[] => {
  return equipments.filter(equipment => equipment.sector === sector);
};

export const searchEquipment = (equipments: Equipment[], query: string): Equipment[] => {
  const lowerQuery = query.toLowerCase();
  return equipments.filter(equipment => 
    equipment.user.toLowerCase().includes(lowerQuery) ||
    equipment.brandModel.toLowerCase().includes(lowerQuery) ||
    equipment.processor.name.toLowerCase().includes(lowerQuery)
  );
}; 