import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { LayoutDashboard, Users, LogOut, Menu, Calendar, ExternalLink, Pencil } from 'lucide-react';
import AddClientForm from './AddClientForm';
import EditClientForm from './EditClientForm';

type View = 'overview' | 'clients';

interface Client {
    id: string;
    name: string;
    business_type: string;
    logo_url: string;
    slug: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const fetchClients = async () => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        setClients(data || []);
    } catch (error) {
        console.error('Error fetching clients:', error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary font-bold">
            OC
          </div>
          {isSidebarOpen && <span className="font-bold text-slate-800">Orbee Calendar</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
                setCurrentView('overview');
                setEditingClient(null);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              currentView === 'overview' && !editingClient
                ? 'bg-slate-100 text-slate-900 font-medium' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span>Visão Geral</span>}
          </button>

          <button
            onClick={() => {
                setCurrentView('clients');
                setEditingClient(null);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
              currentView === 'clients' 
                ? 'bg-slate-100 text-slate-900 font-medium' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Users size={20} />
            {isSidebarOpen && <span>Clientes</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">
              {editingClient ? 'Editar Cliente' : currentView === 'overview' ? 'Visão Geral' : 'Gerenciar Clientes'}
            </h1>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {editingClient ? (
              <div className="max-w-4xl mx-auto">
                  <EditClientForm 
                    client={editingClient} 
                    onSuccess={() => {
                        fetchClients();
                        setEditingClient(null);
                    }}
                    onCancel={() => setEditingClient(null)}
                  />
              </div>
          ) : currentView === 'clients' ? (
            <div className="space-y-6">
              <AddClientForm onSuccess={() => {
                  fetchClients();
                  setCurrentView('overview');
              }} />
            </div>
          ) : (
            <div className="space-y-8">
               {/* Stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="text-slate-500 text-sm font-medium mb-2">Total de Clientes</h3>
                      <p className="text-3xl font-bold text-slate-800">{clients.length}</p>
                  </div>
               </div>

               {/* Clients List */}
               <h2 className="text-lg font-bold text-slate-800 mb-4">Meus Clientes</h2>
               
               {loading ? (
                   <p className="text-slate-500">Carregando clientes...</p>
               ) : clients.length === 0 ? (
                   <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
                       <Users className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                       <h3 className="text-lg font-medium text-slate-900">Nenhum cliente cadastrado</h3>
                       <p className="text-slate-500 mb-6">Comece adicionando seu primeiro cliente.</p>
                       <button 
                           onClick={() => setCurrentView('clients')}
                           className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                       >
                           Adicionar Cliente
                       </button>
                   </div>
               ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       {clients.map(client => (
                           <div key={client.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-slate-300 transition-all group relative">
                               <button 
                                onClick={() => setEditingClient(client)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                                title="Editar Cliente"
                               >
                                   <Pencil size={16} />
                               </button>

                               <div className="flex items-start justify-between mb-4 mt-2">
                                   <div className="flex items-center gap-4">
                                       {client.logo_url ? (
                                           <img src={client.logo_url} alt={client.name} className="w-12 h-12 rounded-lg object-contain bg-slate-50 p-1" />
                                       ) : (
                                           <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                               <Users size={20} />
                                           </div>
                                       )}
                                       <div>
                                           <h3 className="font-bold text-slate-800 pr-6">{client.name}</h3>
                                           <p className="text-sm text-slate-500">{client.business_type}</p>
                                       </div>
                                   </div>
                               </div>
                               
                               <div className="flex gap-2 mt-4">
                                   <Link 
                                       to={`/${client.slug}`}
                                       target="_blank"
                                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium"
                                   >
                                       <Calendar size={16} />
                                       Abrir Calendário
                                       <ExternalLink size={14} className="opacity-50" />
                                   </Link>
                               </div>
                           </div>
                       ))}
                   </div>
               )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
