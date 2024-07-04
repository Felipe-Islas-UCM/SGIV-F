import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Dashboard } from "./components/Dashboard";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from './pages/Login/LoginPage';
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const queryClient = new QueryClient();
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/home" element={<HomePage />} />
        </Routes>
        <Toaster />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;




//mas adelante vamos a querer <Route path="/" element={<Navigate to="/DashboardPage" />} /> que sera la vista del
// masAdmin/ mas adelante vamos a querer <Route path="/" element={<Navigate to="/HomePage" />} /> que sera la vista de Home para invitados
// y de ella se podra acceder al login que llevara a DashboardPage

