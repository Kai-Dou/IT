import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/dashboard/DashboardLayout'
import EquipmentDetail from './components/EquipmentDetail'

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('inventory')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('Todos os Setores')
  const [selectedType, setSelectedType] = useState('Todos os Tipos')

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <DashboardLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSector={selectedSector}
              setSelectedSector={setSelectedSector}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          } 
        />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
        {/* Add more routes here as needed */}
        {/* <Route path="/analytics" element={<Analytics />} /> */}
      </Routes>
    </Router>
  )
}

export default App 