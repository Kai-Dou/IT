import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft,
  Monitor, 
  Laptop, 
  Cpu, 
  MemoryStick,
  HardDrive,
  Zap,
  User,
  Building2,
  Calendar,
  Settings,
  Thermometer,
  Activity
} from "lucide-react";
import { IntelIcon } from "./icons/IntelIcon";
import { AMDIcon } from "./icons/AMDIcon";
import { DellIcon } from "./icons/DellIcon";
import { HPIcon } from "./icons/HPIcon";
import { LenovoIcon } from "./icons/LenovoIcon";
import { ASUSIcon } from "./icons/ASUSIcon";
import { motion, AnimatePresence } from "framer-motion";

interface Machine {
  id: number;
  tipo: string;
  uso: string;
  setor: string;
  usuario: string;
  locacao: string;
  marca: string;
  modelo: string;
  processador: string;
  name: string;
  code: string;
  tdp: number;
  socket: string;
  nucleo: number;
  core: string;
  thread: number;
  ddr: string;
  gb: number;
  slot: number;
  utilizado: number;
  aModelo: string;
  storage: string;
  espaco: string;
  leitura: string;
  so: string;
  version: string;
  gpu: string;
  size: string;
}

interface UserDetailDashboardProps {
  machine: Machine;
  onBack: () => void;
}

export function UserDetailDashboard({ machine, onBack }: UserDetailDashboardProps) {
  // Calculate some derived values for display
  const ramUsagePercent = Math.floor(Math.random() * 40) + 30; // Mock usage 30-70%
  const storageUsagePercent = Math.floor(Math.random() * 50) + 25; // Mock usage 25-75%
  const cpuTemp = Math.floor(Math.random() * 30) + 45; // Mock temp 45-75°C
  const lastUpdate = new Date().toLocaleDateString('pt-BR');

  // Get brand icon component
  const getBrandIcon = (marca: string) => {
    const iconProps = { className: "h-6 w-6" };
    switch (marca.toLowerCase()) {
      case 'dell':
        return <DellIcon {...iconProps} />;
      case 'hp':
        return <HPIcon {...iconProps} />;
      case 'lenovo':
        return <LenovoIcon {...iconProps} />;
      case 'asus':
        return <ASUSIcon {...iconProps} />;
      default:
        return machine.tipo === "Notebook" ? 
          <Laptop className="h-6 w-6 text-muted-foreground" /> : 
          <Monitor className="h-6 w-6 text-muted-foreground" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (value: number) => ({
      width: `${value}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  const slotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          variants={cardVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Inventário
            </Button>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <User className="h-8 w-8 text-primary" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-semibold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Dashboard do Usuário: {machine.usuario}
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Detalhes completos do equipamento
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* User Overview */}
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Usuário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{machine.usuario}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-sm text-muted-foreground">Setor</p>
                  <Badge variant="secondary">{machine.setor}</Badge>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">Tipo de Uso</p>
                  <p className="font-medium">{machine.uso}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground">Última Atualização</p>
                  <p className="font-medium">{lastUpdate}</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getBrandIcon(machine.marca)}
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {machine.tipo}
                    </motion.p>
                    <motion.p 
                      className="text-muted-foreground flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {machine.marca} {machine.modelo}
                    </motion.p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Thermometer className="h-8 w-8 text-orange-500" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                    >
                      {cpuTemp}°C
                    </motion.p>
                    <p className="text-muted-foreground">Temperatura CPU</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Activity className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0, type: "spring" }}
                    >
                      {ramUsagePercent}%
                    </motion.p>
                    <p className="text-muted-foreground">Uso de RAM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Settings className="h-8 w-8 text-purple-500" />
                  </motion.div>
                  <div>
                    <motion.p 
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1, type: "spring" }}
                    >
                      {machine.locacao === "Sim" ? "Locado" : "Próprio"}
                    </motion.p>
                    <p className="text-muted-foreground">Status do Equipamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Hardware Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Processor Details */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {machine.processador === "Intel" ? (
                      <IntelIcon className="h-8 w-8 text-blue-600" />
                    ) : (
                      <AMDIcon className="h-8 w-8 text-red-600" />
                    )}
                  </motion.div>
                  Processador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">Modelo</p>
                  <p className="font-medium">{machine.name}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground">Arquitetura</p>
                  <p className="font-medium">{machine.code}</p>
                </motion.div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Núcleos", value: machine.nucleo, delay: 0.7 },
                    { label: "Threads", value: machine.thread, delay: 0.8 },
                    { label: "TDP", value: `${machine.tdp}W`, delay: 0.9 },
                    { label: "Socket", value: machine.socket, delay: 1.0 }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <p className="text-sm text-muted-foreground">Configuração</p>
                  <p className="font-medium">{machine.core}</p>
                </motion.div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Temperatura Atual</p>
                    <motion.p 
                      className="text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      {cpuTemp}°C
                    </motion.p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                      custom={(cpuTemp - 30) * 2}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Normal: 30-80°C</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Memory Details */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MemoryStick className="h-5 w-5" />
                  </motion.div>
                  Memória RAM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Capacidade Total", value: `${machine.gb}GB`, delay: 0.5 },
                    { label: "Tipo", value: machine.ddr, delay: 0.6 },
                    { label: "Slots Totais", value: machine.slot, delay: 0.7 },
                    { label: "Slots Utilizados", value: machine.utilizado, delay: 0.8 }
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Uso Atual da Memória</p>
                    <motion.p 
                      className="text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      {Math.round((machine.gb * ramUsagePercent) / 100)}GB / {machine.gb}GB
                    </motion.p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                      custom={ramUsagePercent}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{ramUsagePercent}% em uso</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Expansibilidade</p>
                  <div className="flex gap-2">
                    {Array.from({ length: machine.slot }, (_, i) => (
                      <motion.div
                        key={i}
                        className={`h-6 w-8 rounded border-2 ${
                          i < machine.utilizado
                            ? "bg-green-500 border-green-600"
                            : "bg-muted border-muted-foreground/20"
                        }`}
                        variants={slotVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        custom={i}
                      />
                    ))}
                  </div>
                  <motion.p 
                    className="text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    {machine.slot - machine.utilizado} slots disponíveis para expansão
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Storage Details */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <HardDrive className="h-5 w-5" />
                  </motion.div>
                  Armazenamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">Dispositivo</p>
                  <p className="font-medium">{machine.storage}</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Capacidade", value: machine.espaco, delay: 0.6 },
                    { label: "Tipo", value: <Badge variant="outline">{machine.aModelo}</Badge>, delay: 0.7 },
                    { label: "Velocidade Leitura", value: machine.leitura, delay: 0.8 },
                    { 
                      label: "Performance", 
                      value: (
                        <Badge variant={parseInt(machine.leitura.replace(/[^\d]/g, '')) > 5000 ? "default" : "secondary"}>
                          {parseInt(machine.leitura.replace(/[^\d]/g, '')) > 5000 ? "Alta" : "Padrão"}
                        </Badge>
                      ), 
                      delay: 0.9 
                    }
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <div className="font-medium">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Uso do Disco</p>
                    <motion.p 
                      className="text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      {storageUsagePercent}% utilizado
                    </motion.p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-primary h-2 rounded-full"
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                      custom={storageUsagePercent}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Espaço disponível: {100 - storageUsagePercent}%
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Graphics Details */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                  Placa de Vídeo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground">Modelo</p>
                  <p className="font-medium">{machine.gpu}</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-sm text-muted-foreground">Memória</p>
                    <p className="font-medium">{machine.size}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <Badge variant={machine.size === "Integrada" ? "secondary" : "default"}>
                      {machine.size === "Integrada" ? "Integrada" : "Dedicada"}
                    </Badge>
                  </motion.div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Adequação para:</p>
                  <div className="space-y-1">
                    {[
                      { label: "Escritório", badge: "Excelente", variant: "default", delay: 0.8 },
                      { 
                        label: "Design", 
                        badge: machine.size === "Integrada" ? "Básico" : "Bom",
                        variant: machine.size === "Integrada" ? "secondary" : "default",
                        delay: 0.9
                      },
                      { 
                        label: "Gaming", 
                        badge: machine.size === "Integrada" ? "Limitado" : "Bom",
                        variant: machine.size === "Integrada" ? "secondary" : "default",
                        delay: 1.0
                      }
                    ].map((item) => (
                      <motion.div 
                        key={item.label}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: item.delay }}
                      >
                        <span className="text-sm">{item.label}</span>
                        <Badge variant={item.variant as any}>{item.badge}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Operating System Details */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Monitor className="h-5 w-5" />
                </motion.div>
                Sistema Operacional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Sistema", value: machine.so, delay: 0.5 },
                  { label: "Versão", value: machine.version, delay: 0.6 },
                  { label: "Status", value: <Badge variant="default">Ativo</Badge>, delay: 0.7 }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay }}
                  >
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <div className="font-medium">{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={cardVariants} whileHover="hover">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Settings, label: "Configurações", delay: 0.5 },
                  { icon: Calendar, label: "Agendar Manutenção", delay: 0.6 },
                  { icon: Activity, label: "Relatório de Performance", delay: 0.7 },
                  { icon: Building2, label: "Transferir Setor", delay: 0.8 }
                ].map((action) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: action.delay }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline">
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}