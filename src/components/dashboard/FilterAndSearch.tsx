import React from 'react'
import { Search } from 'lucide-react'

interface FilterAndSearchProps {
  searchTerm: string
  selectedSector: string
  selectedType: string
  onSearchChange: (value: string) => void
  onSectorChange: (value: string) => void
  onTypeChange: (value: string) => void
  sectors: string[]
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({
  searchTerm,
  selectedSector,
  selectedType,
  onSearchChange,
  onSectorChange,
  onTypeChange,
  sectors
}) => {
  return (
    <div className="dashboard-card mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por usuário, modelo ou processador..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            value={selectedSector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option>Todos os Setores</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
          
          <select 
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option>Todos os Tipos</option>
            <option value="Notebook">Notebook</option>
            <option value="Desktop">Desktop</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterAndSearch 