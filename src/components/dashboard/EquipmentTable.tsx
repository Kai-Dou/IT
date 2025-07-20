import React from 'react'
import { ExternalLink } from 'lucide-react'
import { type Equipment } from '../../data/equipmentsData'
import intelLogo from '../icons/intel.png'
import amdLogo from '../icons/amd.webp'

interface EquipmentTableProps {
  filteredEquipment: Equipment[]
  onRowClick: (id: number) => void
}

function getProcessorIcon(brand: string) {
  if (/intel/i.test(brand)) return intelLogo;
  if (/amd/i.test(brand)) return amdLogo;
  return undefined;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ 
  filteredEquipment, 
  onRowClick 
}) => {
  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Equipamentos ({filteredEquipment.length})
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ExternalLink className="w-4 h-4" />
          <span>Clique em uma linha para ver detalhes</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Usuário</th>
              <th className="table-header">Setor</th>
              <th className="table-header">Tipo</th>
              <th className="table-header">Marca/Modelo</th>
              <th className="table-header">Processador</th>
              <th className="table-header">RAM</th>
              <th className="table-header">Armazenamento</th>
              <th className="table-header">Sistema Operacional</th>
              <th className="table-header">GPU</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map((equipment: Equipment) => (
              <tr 
                key={equipment.id}
                onClick={() => onRowClick(equipment.id)}
                className="hover:bg-accent cursor-pointer transition-colors"
              >
                <td className="table-cell font-medium">{equipment.user}</td>
                <td className="table-cell">
                  <span className="sector-tag">{equipment.sector}</span>
                </td>
                <td className="table-cell">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    equipment.type === 'Notebook' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {equipment.type}
                  </span>
                </td>
                <td className="table-cell">{equipment.brandModel}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    {getProcessorIcon(equipment.processor.brand) && (
                      <img src={getProcessorIcon(equipment.processor.brand)} alt={equipment.processor.brand} style={{ width: 16, height: 'auto', verticalAlign: 'middle' }} />
                    )}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {equipment.processor.brand}
                    </span>
                    {equipment.processor.name}
                  </div>
                </td>
                <td className="table-cell">{equipment.ram}</td>
                <td className="table-cell">{equipment.storage}</td>
                <td className="table-cell">{equipment.os}</td>
                <td className="table-cell">{equipment.gpu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EquipmentTable 