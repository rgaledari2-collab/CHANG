import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'pill' | 'drawer';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'pill', className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'تغییر به حالت روز (روشن)' : 'تغییر به حالت شب (تاریک)'}
        title={isDark ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
        className={`relative inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] bg-white/10 hover:bg-white/20 border border-white/15 text-white ${className}`}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-[#FFD166] transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-[#F3C7CA] transition-transform duration-300" />
        )}
      </button>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
        isDark ? 'bg-[#181A20] border-[#2A2D36]' : 'bg-[#F2ECEC] border-[#E8DFE0]'
      } ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-[#2A2D36] text-[#FFD166]' : 'bg-white text-[#B92B3A] shadow-xs'
          }`}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div className="text-right">
            <span className={`block text-[13px] font-bold ${isDark ? 'text-white' : 'text-[#202124]'}`}>
              پوسته نمایش
            </span>
            <span className={`block text-[11px] ${isDark ? 'text-[#8E97A6]' : 'text-[#5a626d]'}`}>
              {isDark ? 'حالت شب (تیره و کنتراست بالا)' : 'حالت روز (روشن)'}
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          onClick={toggleTheme}
          aria-label={isDark ? 'خاموش کردن حالت شب' : 'روشن کردن حالت شب'}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] ${
            isDark ? 'bg-[#B92B3A]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isDark ? '-translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    );
  }

  // Default 'pill' variant for header
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? 'تغییر به پوسته روشن (روز)' : 'تغییر به پوسته تیره (شب)'}
      title={isDark ? 'فعال بودن حالت شب (کلیک برای حالت روز)' : 'فعال بودن حالت روز (کلیک برای حالت شب)'}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all duration-200 active:scale-95 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B92B3A] shadow-xs ${
        isDark
          ? 'bg-[#1C1F27] text-white hover:bg-[#252A35] border-[#313645] hover:border-[#42485C]'
          : 'bg-white hover:bg-[#FAF4F4] text-[#202124] border-[#E8DFE0] hover:border-[#B92B3A]'
      } ${className}`}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#B92B3A]/10 group-hover:bg-[#B92B3A]/20 transition-colors">
        {isDark ? (
          <Sun className="w-3.5 h-3.5 text-[#FFD166] transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-[#B92B3A] transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </span>
      <span className="leading-none pt-0.5 select-none">
        {isDark ? 'حالت شب' : 'حالت روز'}
      </span>
    </button>
  );
};
