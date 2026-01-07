
import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Upload, X } from 'lucide-react';

const AddClientForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let logoUrl = '';

      if (logoFile) {
        const fileExt = logoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from('client-logos')
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('client-logos')
          .getPublicUrl(fileName);
        
        logoUrl = publicUrl;
      }

      const generateSlug = (text: string) => {
        return text
          .toString()
          .toLowerCase()
          .normalize('NFD') // Normalize special characters
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(/[^\w\-]+/g, '') // Remove all non-word chars
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, ''); // Trim - from end of text
      };

      const slug = generateSlug(name);

      const { error: insertError } = await supabase
        .from('clients')
        .insert([{ 
          name, 
          business_type: businessType, 
          logo_url: logoUrl,
          slug: slug
        }]);

      if (insertError) {
        if (insertError.code === '23505') { // Unique violation
           throw new Error('Já existe um cliente com este nome (slug duplicado).');
        }
        throw insertError;
      }

      // Reset form
      setName('');
      setBusinessType('');
      removeLogo();
      onSuccess();
    } catch (err: any) {
      console.error('Error adding client:', err);
      setError(err.message || 'Erro ao adicionar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Adicionar Novo Cliente</h2>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Nome do Cliente</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
            placeholder="Ex: Minha Loja"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Tipo de Negócio</label>
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            required
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-slate-50"
            placeholder="Ex: Varejo, Restaurante, Tech..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Logo do Cliente</label>
          
          {!logoPreview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm text-slate-500 font-medium">Clique para fazer upload</p>
                <p className="text-xs text-slate-400">PNG, JPG (MAX. 2MB)</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          ) : (
            <div className="relative w-32 h-32 border border-slate-200 rounded-xl overflow-hidden group">
              <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-3 px-6 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? 'Adicionando...' : 'Salvar Cliente'}
        </button>
      </form>
    </div>
  );
};

export default AddClientForm;
