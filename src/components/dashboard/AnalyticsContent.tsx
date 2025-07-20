import React from 'react'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity,
  Monitor,
  Laptop
} from 'lucide-react'
import { type Equipment } from '../../data/equipmentsData'

interface AnalyticsContentProps {
  equipments: Equipment[]
}

const AnalyticsContent: React.FC<AnalyticsContentProps> = ({ equipments }) => {
  // Calculate analytics data
  const totalEquipment = equipments.length
  const notebooks = equipments.filter(e => e.type === 'Notebook').length
  const desktops = equipments.filter(e => e.type === 'Desktop').length
  const sectors = [...new Set(equipments.map(e => e.sector))]
  const intelProcessors = equipments.filter(e => e.processor.brand === 'Intel').length
  const amdProcessors = equipments.filter(e => e.processor.brand === 'AMD').length

  const sectorData = sectors.map(sector => ({
    name: sector,
    count: equipments.filter(e => e.sector === sector).length
  }))

  return (
    <div className="space-y-6">
      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Distribuição por Tipo</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Notebooks</span>
              </div>
              <span className="font-semibold text-foreground">{notebooks}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Desktops</span>
              </div>
              <span className="font-semibold text-foreground">{desktops}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Processadores</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Intel</span>
              <span className="font-semibold text-foreground">{intelProcessors}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">AMD</span>
              <span className="font-semibold text-foreground">{amdProcessors}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Setores</h3>
          </div>
          <div className="space-y-2">
            {sectorData.map(sector => (
              <div key={sector.name} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{sector.name}</span>
                <span className="font-semibold text-foreground">{sector.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Total Geral</h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{totalEquipment}</div>
            <p className="text-sm text-muted-foreground">Equipamentos</p>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição por Setor</h3>
          <div className="space-y-3">
            {sectorData.map(sector => {
              const percentage = ((sector.count / totalEquipment) * 100).toFixed(1)
              return (
                <div key={sector.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{sector.name}</span>
                    <span className="text-sm text-muted-foreground">{sector.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Especificações Técnicas</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">RAM</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted p-2 rounded">
                  <span className="text-muted-foreground">8GB:</span> {equipments.filter(e => e.ram.includes('8GB')).length}
                </div>
                <div className="bg-muted p-2 rounded">
                  <span className="text-muted-foreground">16GB:</span> {equipments.filter(e => e.ram.includes('16GB')).length}
                </div>
                <div className="bg-muted p-2 rounded">
                  <span className="text-muted-foreground">32GB:</span> {equipments.filter(e => e.ram.includes('32GB')).length}
                </div>
                <div className="bg-muted p-2 rounded">
                  <span className="text-muted-foreground">64GB:</span> {equipments.filter(e => e.ram.includes('64GB')).length}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Sistema Operacional</h4>
              <div className="space-y-2 text-sm">
                {[...new Set(equipments.map(e => e.os))].map(os => (
                  <div key={os} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="text-muted-foreground">{os}</span>
                    <span className="font-medium">{equipments.filter(e => e.os === os).length}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsContent 