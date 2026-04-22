import { UserCircle, Settings, Bell, Shield, LogOut } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="border-b border-slate-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">User Profile</h1>
        <p className="text-slate-400 mt-2">Manage your account and preferences.</p>
      </header>

      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 p-8 text-white border-b border-slate-800">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-slate-950 rounded border border-slate-700 flex items-center justify-center shadow-lg">
              <UserCircle className="w-16 h-16 text-slate-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ahmed Engineer</h2>
              <p className="text-slate-400 font-medium mt-1 text-sm uppercase tracking-widest">Industrial Maintenance Supervisor</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-bold text-sm text-white">App Language</p>
                      <p className="text-xs text-slate-500 mt-0.5">English (US)</p>
                    </div>
                  </div>
                  <button className="text-blue-500 font-bold text-[10px] uppercase tracking-widest hover:text-blue-400 transition-colors">CHANGE</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-bold text-sm text-white">Password & Security</p>
                      <p className="text-xs text-slate-500 mt-0.5">Last updated 2 months ago</p>
                    </div>
                  </div>
                  <button className="text-blue-500 font-bold text-[10px] uppercase tracking-widest hover:text-blue-400 transition-colors">UPDATE</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 border-b border-slate-800 pb-2 uppercase tracking-widest">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-bold text-sm text-white">Maintenance Reminders</p>
                      <p className="text-xs text-slate-500 mt-0.5">Push notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <button className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                  SIGN OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
