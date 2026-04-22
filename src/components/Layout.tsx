import { Link, useLocation, Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';
import { LayoutDashboard, MessageSquareText, Image as ImageIcon, Calculator, History, BookOpen, UserCircle, LogOut, Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Text Diagnosis', href: '/app/text-diagnosis', icon: MessageSquareText },
  { name: 'Image Diagnosis', href: '/app/image-diagnosis', icon: ImageIcon },
  { name: 'Calculators', href: '/app/calculators', icon: Calculator },
  { name: 'Fault History', href: '/app/history', icon: History },
  { name: 'Training Cases', href: '/app/training', icon: BookOpen },
  { name: 'Profile', href: '/app/profile', icon: UserCircle },
];

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row font-sans">
      {/* Mobile nav */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between p-4 sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="hidden sm:inline">SmartDetector</span>
          <span className="sm:hidden">SEFD</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 bg-slate-900 border-r border-slate-800 h-full text-slate-300 p-4 pt-20 flex flex-col" onClick={e => e.stopPropagation()}>
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800',
                      'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors'
                    )}
                  >
                    <item.icon className={cn('mr-3 flex-shrink-0 h-5 w-5', isActive ? 'text-blue-400' : 'text-slate-400')} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <Link to="/welcome" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-400 mt-auto transition-colors" onClick={() => setMobileMenuOpen(false)}>
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-slate-400" />
              Logout
            </Link>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/50 border-r border-slate-800 text-slate-300 z-10 shrink-0 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white leading-tight tracking-tight">SmartDetector</span>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto pb-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'text-slate-400 hover:bg-slate-800',
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200'
                )}
              >
                <item.icon className={cn('mr-3 flex-shrink-0 h-5 w-5 transition-colors', isActive ? 'text-blue-400' : 'text-slate-400')} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <Link to="/welcome" className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 text-slate-400 transition-all duration-200">
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-slate-400" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-950 relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/30 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-white hidden md:block">Fault Diagnosis Workspace</h1>
          <div className="flex md:hidden"></div>
          <div className="flex gap-4 items-center">
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-slate-400">System Status: Stable</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
