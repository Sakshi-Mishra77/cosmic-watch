import { useState, useEffect } from 'react';
import api from '../services/api';
import { Bell, ShieldAlert, Save, Mail } from 'lucide-react'; // Added Mail icon

const AlertSettings = () => {
  const [prefs, setPrefs] = useState({ 
    minRiskScore: 50, 
    notifyImminent: true, 
    emailFrequency: 'daily' 
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const { data } = await api.get('/alerts/preferences');
        // Ensure we merge with defaults in case backend returns partial data
        if (data) setPrefs(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to load preferences", err);
      }
    };
    fetchPrefs();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/alerts/preferences', prefs);
      alert('Preferences updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl mb-6">
      <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-white/10 pb-4">
        <Bell className="text-accent-purple" /> Alert Configuration
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Risk Score Slider */}
        <div className="space-y-3">
          <label className="text-gray-400 text-sm flex justify-between">
            <span>Minimum Risk Score Threshold</span>
            <span className="text-accent-purple font-mono">{prefs.minRiskScore}</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="w-full accent-accent-purple h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
            value={prefs.minRiskScore} 
            onChange={(e) => setPrefs({...prefs, minRiskScore: Number(e.target.value)})} 
          />
          <p className="text-xs text-gray-500">Alerts will trigger for asteroids exceeding this score.</p>
        </div>

        {/* Email Frequency - ADDED THIS SECTION */}
        <div className="space-y-3">
          <label className="text-gray-400 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email Frequency
          </label>
          <select 
            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-accent-purple outline-none transition-colors"
            value={prefs.emailFrequency}
            onChange={(e) => setPrefs({...prefs, emailFrequency: e.target.value})}
          >
            <option value="daily">Daily Summary (09:00 AM)</option>
            <option value="weekly">Weekly Digest</option>
            <option value="never">Do Not Send Emails</option>
          </select>
        </div>

        {/* Imminent Notification Toggle */}
        <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <ShieldAlert className={`w-5 h-5 ${prefs.notifyImminent ? 'text-red-400' : 'text-gray-500'}`} />
            <span className="text-white text-sm">Notify on Imminent Approaches</span>
          </div>
          <input 
            type="checkbox" 
            className="w-5 h-5 accent-accent-purple rounded cursor-pointer"
            checked={prefs.notifyImminent} 
            onChange={(e) => setPrefs({...prefs, notifyImminent: e.target.checked})} 
          />
        </div>

        {/* Save Button */}
        <div className="flex items-end">
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSettings;