import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Equipment } from '../data/equipmentsData'
import dellLogo from './icons/Dell.png'
import intelLogo from './icons/intel.png'
import amdLogo from './icons/amd.webp'
import lenovoLogo from './icons/Lenovo.png'
import samsungLogo from './icons/samsung.png'
import styles from './ui/AnimatedUploadButton.module.css'

const LOCAL_STORAGE_KEY = 'it_inventory_data';

const brandIcons: Record<string, string> = {
  Dell: dellLogo,
  Intel: intelLogo,
  AMD: amdLogo,
  Lenovo: lenovoLogo,
  Samsung: samsungLogo,
};

function getBrandIcon(brandModel: string, processorBrand: string) {
  if (/dell/i.test(brandModel)) return brandIcons.Dell;
  if (/lenovo/i.test(brandModel)) return brandIcons.Lenovo;
  if (/samsung/i.test(brandModel)) return brandIcons.Samsung;
  if (/intel/i.test(processorBrand)) return brandIcons.Intel;
  if (/amd/i.test(processorBrand)) return brandIcons.AMD;
  return undefined;
}

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loading, setLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const arr: Equipment[] = JSON.parse(stored);
        const found = arr.find(eq => eq.id === Number(id));
        setEquipment(found || null);
      } else {
        setEquipment(null);
      }
    } catch {
      setEquipment(null);
    }
    setLoading(false);
    setTimeout(() => setFadeIn(true), 80);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Inventário
          </button>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando dados do equipamento...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Inventário
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Equipamento não encontrado</h1>
            <p className="text-muted-foreground">O equipamento com ID {id} não foi encontrado.</p>
          </div>
        </div>
      </div>
    )
  }

  const brandIcon = getBrandIcon(equipment.brandModel, equipment.processor.brand);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Inventário
        </button>
        <div className={`${styles['fade-in-left']} ${fadeIn ? styles['show'] : ''}`}>
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow p-6 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Nome</span>
                <span className="font-semibold text-lg">{equipment.user}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Setor</span>
                <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded font-medium">{equipment.sector}</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-xs text-muted-foreground">Marca/Modelo</span>
                <span className="font-medium flex items-center gap-2">
                  {brandIcon && <img src={brandIcon} alt="Brand" style={{ width: 30, height: 'auto', verticalAlign: 'middle', marginRight: 5 }} />}
                  {equipment.brandModel}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Tipo de Uso</span>
                <span className="font-medium">Corporativo</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Última Atualização</span>
                <span className="font-medium">20/07/2025</span>
              </div>
            </div>
          </div>

          {/* Device Type and Status */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
              <span className="text-xs text-muted-foreground mb-1">Notebook</span>
              <span className="font-semibold">{equipment.brandModel}</span>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-100">
              <span className="text-xs text-muted-foreground mb-1">Próprio</span>
              <span className="font-semibold">Status do Equipamento</span>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Processor Card */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {brandIcon && <img src={brandIcon} alt="Brand" style={{ width: 24, height: 'auto', verticalAlign: 'middle', marginRight: 5 }} />}
                <span className="font-semibold">Processador</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Modelo</span><div>{equipment.processor.name}</div></div>
                <div><span className="text-muted-foreground">Configuração</span><div>{equipment.processor.specs}</div></div>
                <div><span className="text-muted-foreground">Núcleos</span><div>6</div></div>
                <div><span className="text-muted-foreground">Threads</span><div>8</div></div>
                <div><span className="text-muted-foreground">TDP</span><div>15W</div></div>
                <div><span className="text-muted-foreground">Socket</span><div>1744 FCBGA</div></div>
                <div><span className="text-muted-foreground">Arquitetura</span><div>Alder Lake</div></div>
                <div><span className="text-muted-foreground">Temperatura Atual</span><div>66°C</div></div>
              </div>
            </div>
            {/* RAM Card */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Memória RAM</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Capacidade Total</span><div>16GB</div></div>
                <div><span className="text-muted-foreground">Tipo</span><div>DDR4</div></div>
                <div><span className="text-muted-foreground">Slots Totais</span><div>2</div></div>
                <div><span className="text-muted-foreground">Slots Utilizados</span><div>2</div></div>
                <div className="col-span-2"><span className="text-muted-foreground">Uso Atual da Memória</span><div>7GB / 16GB</div></div>
                <div className="col-span-2"><span className="text-muted-foreground">Expansibilidade</span><div>0 slots disponíveis para expansão</div></div>
              </div>
            </div>
          </div>

          {/* Storage, GPU, OS Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Storage Card */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-4">
              <div className="font-semibold mb-2">Armazenamento</div>
              <div className="text-sm"><span className="text-muted-foreground">Dispositivo</span><div>KINGSTON SFRS</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Capacidade</span><div>1TB</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Tipo</span><div>NVMe</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Velocidade Leitura</span><div>7200MB/s</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Performance</span><div>Alta</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Uso do Disco</span><div>48% utilizado</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Espaço disponível</span><div>52%</div></div>
            </div>
            {/* GPU Card */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-4">
              <div className="font-semibold mb-2">Placa de Vídeo</div>
              <div className="text-sm"><span className="text-muted-foreground">Modelo</span><div>Intel UHD Graphics</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Memória</span><div>128MB</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Tipo</span><div>Dedicada</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Adequação para:</span><div>Escritório: Excelente, Design: Bom, Gaming: Bom</div></div>
            </div>
            {/* OS Card */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-4">
              <div className="font-semibold mb-2">Sistema Operacional</div>
              <div className="text-sm"><span className="text-muted-foreground">Sistema</span><div>Windows 10 Enterprise LTSC Evaluation</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Versão</span><div>21H2</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Status</span><div>Ativo</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentDetail 