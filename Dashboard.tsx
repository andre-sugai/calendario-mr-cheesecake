
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Sair
        </button>
      </header>
      
      <main>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-medium text-slate-700 mb-4">Bem-vindo ao Painel</h2>
          <p className="text-slate-500">
            Você está logado como administrador.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
