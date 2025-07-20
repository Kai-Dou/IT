import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SummaryCards from './SummaryCards'
import FilterAndSearch from './FilterAndSearch'
import EquipmentTable from './EquipmentTable'
import AnalyticsContent from './AnalyticsContent'
import * as XLSX from 'xlsx';
import { Equipment, getUniqueSectors } from '../../data/equipmentsData';
import AnimatedUploadButton from '../ui/AnimatedUploadButton';

interface DashboardLayoutProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedSector: string
  setSelectedSector: (sector: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
}

const LOCAL_STORAGE_KEY = 'it_inventory_data';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  selectedType,
  setSelectedType
}) => {
  const navigate = useNavigate()

  // State for equipment data
  const [allMachines, setAllMachines] = useState<Equipment[]>([])
  const [importing, setImporting] = useState(false)
  const [importDone, setImportDone] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setAllMachines(JSON.parse(stored));
      } catch {
        setAllMachines([]);
      }
    }
  }, []);

  // Filter equipment based on search and filters
  const filteredEquipment = allMachines.filter((equipment: Equipment) => {
    const matchesSearch = searchTerm === '' || 
      equipment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.brandModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.processor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === 'Todos os Setores' || equipment.sector === selectedSector
    const matchesType = selectedType === 'Todos os Tipos' || equipment.type === selectedType
    return matchesSearch && matchesSector && matchesType
  })

  const handleRowClick = (id: number) => {
    navigate(`/equipment/${id}`)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSectorChange = (value: string) => {
    setSelectedSector(value)
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
  }

  // CSV Upload Handler
  const handleFileSelect = async (file: File) => {
    setImporting(true)
    setImportDone(false)
    setImportError(null)
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows: any[] = XLSX.utils.sheet_to_json(sheet)
      // Mapping logic
      const mapped: Equipment[] = rows.map((row, idx) => {
        const get = (...keys: string[]) => {
          for (const k of keys) {
            if (row[k] !== undefined) return row[k]
          }
          return ''
        }
        const procName = get('NameProcessador', 'Processador', 'processorName', 'Processador Nome')
        let procBrand: 'Intel' | 'AMD' = 'Intel'
        const brandRaw = get('Processador', 'processorBrand', 'Marca Processador')
        if (typeof brandRaw === 'string' && /amd/i.test(brandRaw)) procBrand = 'AMD'
        else if (typeof procName === 'string' && /amd/i.test(procName)) procBrand = 'AMD'
        return {
          id: parseInt(get('Identificação', 'Identificao', 'id', 'ID', 'ID Equipamento')) || idx + 1,
          user: get('Usuário', 'Usuario', 'user', 'Usuario Atribuído'),
          sector: get('Setor', 'sector', 'Setor de TI'),
          type: /notebook/i.test(get('Tipo', 'type', 'Tipo de Equipamento')) ? 'Notebook' : 'Desktop',
          brandModel: get('Marca', 'brand', 'Marca Modelo', 'Marca/Modelo', 'Modelo', 'model'),
          processor: {
            name: procName,
            brand: procBrand,
            specs: get('Code', 'processorSpecs', 'Especificações Processador', 'Campo13')
          },
          ram: get('DDR', 'ram', 'RAM', 'Memória RAM', 'GB'),
          storage: get('Espaço', 'storage', 'Armazenamento', 'Disco', 'Leitura'),
          os: get('SO', 'os', 'OS', 'Sistema Operacional'),
          gpu: get('GPU', 'gpu', 'Placa de Vídeo', 'Adaptador Gráfico')
        }
      })
      setAllMachines(mapped)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mapped))
      setImportDone(true)
      setTimeout(() => setImportDone(false), 2000)
    } catch (err: any) {
      setImportError(err.message || 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard de Inventário de TI
          </h1>
          <p className="text-muted-foreground">
            Gestão de equipamentos do escritório
          </p>
        </div>
        <AnimatedUploadButton
          onFileSelect={handleFileSelect}
          isLoading={importing}
          isDone={importDone}
        />
      </div>
      {importError && <div className="text-red-500 mt-2">{importError}</div>}
      {/* Summary Cards */}
      <SummaryCards dashboardSummary={{
        totalMachines: allMachines.length,
        activeUsers: allMachines.filter(e => e.user).length,
        departments: getUniqueSectors(allMachines).length,
        notebooks: allMachines.filter(e => e.type === 'Notebook').length,
        desktops: allMachines.filter(e => e.type === 'Desktop').length
      }} />
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
      {/* Tab Content */}
      {activeTab === 'inventory' ? (
        <>
          {/* Search and Filters */}
          <FilterAndSearch
            searchTerm={searchTerm}
            selectedSector={selectedSector}
            selectedType={selectedType}
            onSearchChange={handleSearchChange}
            onSectorChange={handleSectorChange}
            onTypeChange={handleTypeChange}
            sectors={getUniqueSectors(allMachines)}
          />
          {/* Equipment Table */}
          <EquipmentTable
            filteredEquipment={filteredEquipment}
            onRowClick={handleRowClick}
          />
        </>
      ) : (
        /* Analytics Content */
        <AnalyticsContent equipments={allMachines} />
      )}
    </div>
  )
}

export default DashboardLayout 