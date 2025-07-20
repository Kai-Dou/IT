import React from 'react'
import { 
  Monitor, 
  Users, 
  Building2, 
  Laptop 
} from 'lucide-react'

interface DashboardSummary {
  totalMachines: number
  activeUsers: number
  departments: number
  notebooks: number
  desktops: number
}

interface SummaryCardsProps {
  dashboardSummary: DashboardSummary
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ dashboardSummary }) => {
  return (
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
            <Monitor className="w-4 h-4 text-orange-600" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Notebooks/Desktops</p>
          <p className="text-2xl font-bold text-foreground">{dashboardSummary.notebooks}/{dashboardSummary.desktops}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards 