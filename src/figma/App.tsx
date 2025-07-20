import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Monitor,
  Laptop,
  Users,
  Building2,
  HardDrive,
  Cpu,
  MemoryStick,
  Search,
  Filter,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { IntelIcon } from "./components/icons/IntelIcon";
import { AMDIcon } from "./components/icons/AMDIcon";
import { UserDetailDashboard } from "./components/UserDetailDashboard";
import { motion } from "framer-motion";

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

export default function App() {
  // State for navigation
  const [currentView, setCurrentView] = useState<
    "dashboard" | "user-detail"
  >("dashboard");
  const [selectedMachine, setSelectedMachine] =
    useState<Machine | null>(null);

  // Mock data based on your Excel structure
  const machines: Machine[] = [
    {
      id: 1,
      tipo: "Notebook",
      uso: "Corporativo",
      setor: "Comercial Público",
      usuario: "Kayky",
      locacao: "Não",
      marca: "Dell",
      modelo: "Inspiron 15 3520",
      processador: "Intel",
      name: "Intel Core i3-1215U",
      code: "Alder Lake",
      tdp: 15.0,
      socket: "1744 FCBGA",
      nucleo: 6,
      core: "2P+4E",
      thread: 8,
      ddr: "DDR4",
      gb: 16,
      slot: 2,
      utilizado: 2,
      aModelo: "NVMe",
      storage: "KINGSTON SFRS",
      espaco: "1TB",
      leitura: "7200MB/s",
      so: "Windows 10 Enterprise LTSC Evaluation",
      version: "21H2",
      gpu: "Intel UHD Graphics",
      size: "128MB",
    },
    {
      id: 2,
      tipo: "Desktop",
      uso: "Corporativo",
      setor: "TI",
      usuario: "Maria Silva",
      locacao: "Sim",
      marca: "HP",
      modelo: "EliteDesk 800 G9",
      processador: "Intel",
      name: "Intel Core i5-12500",
      code: "Alder Lake",
      tdp: 65.0,
      socket: "LGA1700",
      nucleo: 6,
      core: "6P+0E",
      thread: 12,
      ddr: "DDR4",
      gb: 32,
      slot: 4,
      utilizado: 2,
      aModelo: "NVMe",
      storage: "Samsung 980 PRO",
      espaco: "512GB",
      leitura: "7000MB/s",
      so: "Windows 11 Pro",
      version: "23H2",
      gpu: "NVIDIA GeForce GTX 1650",
      size: "4GB",
    },
    {
      id: 3,
      tipo: "Notebook",
      uso: "Administrativo",
      setor: "Recursos Humanos",
      usuario: "João Santos",
      locacao: "Não",
      marca: "Lenovo",
      modelo: "ThinkPad E14",
      processador: "AMD",
      name: "AMD Ryzen 5 5500U",
      code: "Lucienne",
      tdp: 15.0,
      socket: "FP6",
      nucleo: 6,
      core: "6C",
      thread: 12,
      ddr: "DDR4",
      gb: 8,
      slot: 2,
      utilizado: 1,
      aModelo: "SSD",
      storage: "WD Blue",
      espaco: "256GB",
      leitura: "560MB/s",
      so: "Windows 11 Home",
      version: "22H2",
      gpu: "AMD Radeon Graphics",
      size: "Integrada",
    },
    {
      id: 4,
      tipo: "Desktop",
      uso: "Desenvolvimento",
      setor: "TI",
      usuario: "Ana Costa",
      locacao: "Sim",
      marca: "Dell",
      modelo: "OptiPlex 7090",
      processador: "Intel",
      name: "Intel Core i7-11700",
      code: "Rocket Lake",
      tdp: 65.0,
      socket: "LGA1200",
      nucleo: 8,
      core: "8P+0E",
      thread: 16,
      ddr: "DDR4",
      gb: 64,
      slot: 4,
      utilizado: 4,
      aModelo: "NVMe",
      storage: "Samsung 980 PRO",
      espaco: "1TB",
      leitura: "7000MB/s",
      so: "Windows 11 Pro",
      version: "23H2",
      gpu: "NVIDIA RTX 3060",
      size: "12GB",
    },
    {
      id: 5,
      tipo: "Notebook",
      uso: "Corporativo",
      setor: "Financeiro",
      usuario: "Carlos Oliveira",
      locacao: "Não",
      marca: "ASUS",
      modelo: "VivoBook 15",
      processador: "Intel",
      name: "Intel Core i5-1135G7",
      code: "Tiger Lake",
      tdp: 28.0,
      socket: "BGA1449",
      nucleo: 4,
      core: "4P+0E",
      thread: 8,
      ddr: "DDR4",
      gb: 16,
      slot: 2,
      utilizado: 1,
      aModelo: "SSD",
      storage: "ADATA SU630",
      espaco: "512GB",
      leitura: "520MB/s",
      so: "Windows 10 Pro",
      version: "22H2",
      gpu: "Intel Iris Xe Graphics",
      size: "Integrada",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSetor, setFilterSetor] = useState("all");
  const [filterTipo, setFilterTipo] = useState("all");

  // Handle user row click
  const handleUserClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setCurrentView("user-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedMachine(null);
  };

  // Show user detail dashboard if a machine is selected
  if (currentView === "user-detail" && selectedMachine) {
    return (
      <UserDetailDashboard
        machine={selectedMachine}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Filter machines based on search and filters
  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.usuario
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      machine.modelo
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      machine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSetor =
      filterSetor === "all" || machine.setor === filterSetor;
    const matchesTipo =
      filterTipo === "all" || machine.tipo === filterTipo;

    return matchesSearch && matchesSetor && matchesTipo;
  });

  // Calculate statistics
  const totalMachines = machines.length;
  const totalUsers = new Set(machines.map((m) => m.usuario))
    .size;
  const totalDepartments = new Set(machines.map((m) => m.setor))
    .size;
  const notebookCount = machines.filter(
    (m) => m.tipo === "Notebook",
  ).length;
  const desktopCount = machines.filter(
    (m) => m.tipo === "Desktop",
  ).length;

  // Get unique values for filters
  const uniqueSetores = [
    ...new Set(machines.map((m) => m.setor)),
  ];
  const uniqueTipos = [...new Set(machines.map((m) => m.tipo))];

  // OS distribution
  const osDistribution = machines.reduce(
    (acc, machine) => {
      const os = machine.so.includes("Windows 11")
        ? "Windows 11"
        : machine.so.includes("Windows 10")
          ? "Windows 10"
          : "Outros";
      acc[os] = (acc[os] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <motion.div
      className="min-h-screen bg-background p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Building2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-semibold">
              Dashboard de Inventário de TI
            </h1>
            <p className="text-muted-foreground">
              Gestão de equipamentos do escritório
            </p>
          </div>
        </motion.div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: Monitor,
              value: totalMachines,
              label: "Total de Máquinas",
              color: "text-blue-500",
              delay: 0.1,
            },
            {
              icon: Users,
              value: totalUsers,
              label: "Usuários Ativos",
              color: "text-green-500",
              delay: 0.2,
            },
            {
              icon: Building2,
              value: totalDepartments,
              label: "Departamentos",
              color: "text-purple-500",
              delay: 0.3,
            },
            {
              icon: Laptop,
              value: `${notebookCount}/${desktopCount}`,
              label: "Notebooks/Desktops",
              color: "text-orange-500",
              delay: 0.4,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <stat.icon
                      className={`h-8 w-8 ${stat.color}`}
                    />
                    <div>
                      <p className="text-2xl font-semibold">
                        {stat.value}
                      </p>
                      <p className="text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">
              Inventário
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Análises
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Busca e Filtros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por usuário, modelo ou processador..."
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerm(e.target.value)
                        }
                        className="pl-10"
                      />
                    </div>

                    <Select
                      value={filterSetor}
                      onValueChange={setFilterSetor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por setor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todos os Setores
                        </SelectItem>
                        {uniqueSetores.map((setor) => (
                          <SelectItem key={setor} value={setor}>
                            {setor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={filterTipo}
                      onValueChange={setFilterTipo}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todos os Tipos
                        </SelectItem>
                        {uniqueTipos.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Machines Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      Equipamentos ({filteredMachines.length})
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ExternalLink className="h-4 w-4" />
                      Clique em uma linha para ver detalhes
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuário</TableHead>
                          <TableHead>Setor</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Marca/Modelo</TableHead>
                          <TableHead>Processador</TableHead>
                          <TableHead>RAM</TableHead>
                          <TableHead>Armazenamento</TableHead>
                          <TableHead>
                            Sistema Operacional
                          </TableHead>
                          <TableHead>GPU</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMachines.map(
                          (machine, index) => (
                            <motion.tr
                              key={machine.id}
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() =>
                                handleUserClick(machine)
                              }
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.7 + index * 0.05,
                              }}
                              whileHover={{ x: 5 }}
                            >
                              <TableCell className="font-medium">
                                {machine.usuario}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {machine.setor}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {machine.tipo ===
                                  "Notebook" ? (
                                    <Laptop className="h-4 w-4" />
                                  ) : (
                                    <Monitor className="h-4 w-4" />
                                  )}
                                  {machine.tipo}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {machine.marca}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {machine.modelo}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  {machine.processador ===
                                  "Intel" ? (
                                    <IntelIcon className="h-6 w-6 text-blue-600" />
                                  ) : (
                                    <AMDIcon className="h-6 w-6 text-red-600" />
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {machine.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {machine.core} •{" "}
                                      {machine.thread} threads
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {machine.gb}GB {machine.ddr}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {machine.utilizado}/
                                    {machine.slot} slots
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {machine.espaco}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {machine.aModelo}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {machine.so
                                      .split(" ")
                                      .slice(0, 2)
                                      .join(" ")}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {machine.version}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">
                                    {machine.gpu}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {machine.size}
                                  </p>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* OS Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Distribuição por Sistema Operacional
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(osDistribution).map(
                      ([os, count], index) => (
                        <motion.div
                          key={os}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.1,
                          }}
                        >
                          <div className="flex justify-between">
                            <span>{os}</span>
                            <span className="font-medium">
                              {count} máquinas
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-primary h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(count / totalMachines) * 100}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: 0.5 + index * 0.1,
                              }}
                            />
                          </div>
                        </motion.div>
                      ),
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Department Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Equipamentos por Setor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {uniqueSetores.map((setor, index) => {
                      const count = machines.filter(
                        (m) => m.setor === setor,
                      ).length;
                      return (
                        <motion.div
                          key={setor}
                          className="space-y-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + index * 0.1,
                          }}
                        >
                          <div className="flex justify-between">
                            <span>{setor}</span>
                            <span className="font-medium">
                              {count} máquinas
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-blue-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(count / totalMachines) * 100}%`,
                              }}
                              transition={{
                                duration: 1,
                                delay: 0.6 + index * 0.1,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hardware Summary with Processor Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Resumo de Hardware
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                        }}
                      >
                        <p className="text-sm text-muted-foreground">
                          RAM Total
                        </p>
                        <p className="font-medium">
                          {machines.reduce(
                            (sum, m) => sum + m.gb,
                            0,
                          )}
                          GB
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6,
                        }}
                      >
                        <p className="text-sm text-muted-foreground">
                          RAM Média
                        </p>
                        <p className="font-medium">
                          {Math.round(
                            machines.reduce(
                              (sum, m) => sum + m.gb,
                              0,
                            ) / machines.length,
                          )}
                          GB
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.7,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <IntelIcon className="h-6 w-6 text-blue-600" />
                          <p className="text-sm text-muted-foreground">
                            Processadores Intel
                          </p>
                        </div>
                        <p className="font-medium">
                          {
                            machines.filter(
                              (m) => m.processador === "Intel",
                            ).length
                          }
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <AMDIcon className="h-6 w-6 text-red-600" />
                          <p className="text-sm text-muted-foreground">
                            Processadores AMD
                          </p>
                        </div>
                        <p className="font-medium">
                          {
                            machines.filter(
                              (m) => m.processador === "AMD",
                            ).length
                          }
                        </p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Storage Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5" />
                      Resumo de Armazenamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          label: "SSDs",
                          value: machines.filter(
                            (m) =>
                              m.aModelo.includes("SSD") ||
                              m.aModelo.includes("NVMe"),
                          ).length,
                          delay: 0.6,
                        },
                        {
                          label: "NVMe",
                          value: machines.filter(
                            (m) => m.aModelo === "NVMe",
                          ).length,
                          delay: 0.7,
                        },
                        {
                          label: "Capacidade > 512GB",
                          value: machines.filter(
                            (m) =>
                              m.espaco.includes("1TB") ||
                              (m.espaco.includes("GB") &&
                                parseInt(m.espaco) >= 512),
                          ).length,
                          delay: 0.8,
                        },
                        {
                          label: "Alta Performance",
                          value: machines.filter(
                            (m) =>
                              parseInt(
                                m.leitura.replace(/[^\d]/g, ""),
                              ) > 5000,
                          ).length,
                          delay: 0.9,
                        },
                      ].map((stat) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: stat.delay,
                          }}
                        >
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="font-medium">
                            {stat.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}