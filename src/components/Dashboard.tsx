import React, { useState } from 'react'
import { 
  Monitor, 
  Users, 
  Building2, 
  Laptop, 
  Search, 
  ChevronDown, 
  ExternalLink,
  Monitor as DesktopIcon,
  Laptop as LaptopIcon
} from 'lucide-react'
import { 
  equipments, 
  dashboardSummary, 
  getUniqueSectors, 
  searchEquipment,
  type Equipment 
} from '../data/equipmentsData'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('Todos os Setores')
  const [selectedType, setSelectedType] = useState('Todos os Tipos')

  // Filter equipment based on search and filters
  const filteredEquipment = equipments.filter((equipment: Equipment) => {
    const matchesSearch = searchTerm === '' || 
      equipment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.brandModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.processor.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSector = selectedSector === 'Todos os Setores' || equipment.sector === selectedSector
    const matchesType = selectedType === 'Todos os Tipos' || equipment.type === selectedType
    
    return matchesSearch && matchesSector && matchesType
  })

  const handleRowClick = (id: number) => {
    console.log('Clicked equipment:', id)
    // TODO: Implement detail view
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard de Inventário de TI
        </h1>
        <p className="text-muted-foreground">
          Gestão de equipamentos do escritório
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="summary-card">
          <div className="p-2 bg-blue-100 rounded-lg floating-icon">
            <Monitor className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Máquinas</p>
            <p className="text-2xl font-bold text-foreground">{dashboardSummary.totalMachines}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="p-2 bg-green-100 rounded-lg floating-icon">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Usuários Ativos</p>
            <p className="text-2xl font-bold text-foreground">{dashboardSummary.activeUsers}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="p-2 bg-purple-100 rounded-lg floating-icon">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Departamentos</p>
            <p className="text-2xl font-bold text-foreground">{dashboardSummary.departments}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="p-2 bg-orange-100 rounded-lg floating-icon">
            <div className="flex items-center gap-1">
              <Laptop className="w-4 h-4 text-orange-600" />
              <DesktopIcon className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Notebooks/Desktops</p>
            <p className="text-2xl font-bold text-foreground">{dashboardSummary.notebooks}/{dashboardSummary.desktops}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 slide-in">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inventory' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            Inventário
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analytics' ? 'tab-active' : 'tab-inactive'
            }`}
          >
            Análises
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="dashboard-card mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por usuário, modelo ou processador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input-background focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select 
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option>Todos os Setores</option>
              {getUniqueSectors().map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option>Todos os Tipos</option>
              <option value="Notebook">Notebook</option>
              <option value="Desktop">Desktop</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
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
                  onClick={() => handleRowClick(equipment.id)}
                  className="hover:bg-accent cursor-pointer transition-colors"
                >
                  <td className="table-cell font-medium">{equipment.user}</td>
                  <td className="table-cell">
                    <span className="sector-tag">{equipment.sector}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      {equipment.type === 'Notebook' ? (
                        <LaptopIcon className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <DesktopIcon className="w-4 h-4 text-muted-foreground" />
                      )}
                      {equipment.type}
                    </div>
                  </td>
                  <td className="table-cell">{equipment.brandModel}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                        {equipment.processor.brand === 'Intel' ? 'I' : 'A'}
                      </div>
                      <div>
                        <div className="font-medium">{equipment.processor.name}</div>
                        <div className="text-xs text-muted-foreground">{equipment.processor.specs}</div>
                      </div>
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
    </div>
  )
}

export default Dashboard 