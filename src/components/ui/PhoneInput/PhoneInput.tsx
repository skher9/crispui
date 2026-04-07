import { forwardRef, useId, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── Country data ─────────────────────────────────────────────────────────────

export interface Country {
  code: string;   // ISO 3166-1 alpha-2
  name: string;
  dial: string;   // e.g. "+1"
  flag: string;   // emoji
}

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States',   dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom',  dial: '+44',  flag: '🇬🇧' },
  { code: 'CA', name: 'Canada',          dial: '+1',   flag: '🇨🇦' },
  { code: 'AU', name: 'Australia',       dial: '+61',  flag: '🇦🇺' },
  { code: 'IN', name: 'India',           dial: '+91',  flag: '🇮🇳' },
  { code: 'DE', name: 'Germany',         dial: '+49',  flag: '🇩🇪' },
  { code: 'FR', name: 'France',          dial: '+33',  flag: '🇫🇷' },
  { code: 'JP', name: 'Japan',           dial: '+81',  flag: '🇯🇵' },
  { code: 'CN', name: 'China',           dial: '+86',  flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil',          dial: '+55',  flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico',          dial: '+52',  flag: '🇲🇽' },
  { code: 'KR', name: 'South Korea',     dial: '+82',  flag: '🇰🇷' },
  { code: 'IT', name: 'Italy',           dial: '+39',  flag: '🇮🇹' },
  { code: 'ES', name: 'Spain',           dial: '+34',  flag: '🇪🇸' },
  { code: 'RU', name: 'Russia',          dial: '+7',   flag: '🇷🇺' },
  { code: 'NL', name: 'Netherlands',     dial: '+31',  flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden',          dial: '+46',  flag: '🇸🇪' },
  { code: 'NO', name: 'Norway',          dial: '+47',  flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark',         dial: '+45',  flag: '🇩🇰' },
  { code: 'FI', name: 'Finland',         dial: '+358', flag: '🇫🇮' },
  { code: 'CH', name: 'Switzerland',     dial: '+41',  flag: '🇨🇭' },
  { code: 'PL', name: 'Poland',          dial: '+48',  flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal',        dial: '+351', flag: '🇵🇹' },
  { code: 'TR', name: 'Turkey',          dial: '+90',  flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia',    dial: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE',             dial: '+971', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore',       dial: '+65',  flag: '🇸🇬' },
  { code: 'HK', name: 'Hong Kong',       dial: '+852', flag: '🇭🇰' },
  { code: 'NZ', name: 'New Zealand',     dial: '+64',  flag: '🇳🇿' },
  { code: 'ZA', name: 'South Africa',    dial: '+27',  flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria',         dial: '+234', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt',           dial: '+20',  flag: '🇪🇬' },
  { code: 'PK', name: 'Pakistan',        dial: '+92',  flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh',      dial: '+880', flag: '🇧🇩' },
  { code: 'ID', name: 'Indonesia',       dial: '+62',  flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia',        dial: '+60',  flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand',        dial: '+66',  flag: '🇹🇭' },
  { code: 'PH', name: 'Philippines',     dial: '+63',  flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam',         dial: '+84',  flag: '🇻🇳' },
  { code: 'AR', name: 'Argentina',       dial: '+54',  flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia',        dial: '+57',  flag: '🇨🇴' },
  { code: 'CL', name: 'Chile',           dial: '+56',  flag: '🇨🇱' },
  { code: 'UA', name: 'Ukraine',         dial: '+380', flag: '🇺🇦' },
  { code: 'IL', name: 'Israel',          dial: '+972', flag: '🇮🇱' },
  { code: 'GR', name: 'Greece',          dial: '+30',  flag: '🇬🇷' },
  { code: 'RO', name: 'Romania',         dial: '+40',  flag: '🇷🇴' },
  { code: 'CZ', name: 'Czech Republic',  dial: '+420', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary',         dial: '+36',  flag: '🇭🇺' },
  { code: 'AT', name: 'Austria',         dial: '+43',  flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium',         dial: '+32',  flag: '🇧🇪' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PhoneValue {
  country: Country;
  number: string;
  full: string;  // dial + number, e.g. "+14155550123"
}

export interface PhoneInputProps {
  value?: PhoneValue;
  defaultCountry?: string;  // ISO code, e.g. "US"
  onChange?: (value: PhoneValue) => void;
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}

const sizeMap = {
  sm: { wrap: 'h-8 text-xs rounded-lg',    btn: 'px-2 text-xs', input: 'text-xs' },
  md: { wrap: 'h-10 text-sm rounded-xl',   btn: 'px-3 text-sm', input: 'text-sm' },
  lg: { wrap: 'h-12 text-base rounded-xl', btn: 'px-3 text-base', input: 'text-base' },
};

// ─── PhoneInput ───────────────────────────────────────────────────────────────

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(({
  value, defaultCountry = 'US', onChange, label, hint, error,
  placeholder = '000 000 0000', disabled = false, size = 'md',
  id: propId, className,
}, ref) => {
  const genId = useId();
  const id = propId ?? genId;
  const s = sizeMap[size];

  const initCountry = COUNTRIES.find(c => c.code === defaultCountry) ?? COUNTRIES[0];
  const [country, setCountry] = useState<Country>(value?.country ?? initCountry);
  const [number, setNumber] = useState(value?.number ?? '');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // sync controlled
  useEffect(() => {
    if (value) { setCountry(value.country); setNumber(value.number); }
  }, [value]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) { setOpen(false); setSearch(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const emit = (c: Country, n: string) => {
    onChange?.({ country: c, number: n, full: c.dial + n.replace(/\D/g, '') });
  };

  const selectCountry = (c: Country) => {
    setCountry(c); setOpen(false); setSearch('');
    emit(c, number);
  };

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.value;
    setNumber(n);
    emit(country, n);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-200">{label}</label>
      )}

      <div ref={containerRef} className="relative">
        <div className={cn(
          'flex items-center border bg-gray-900 transition-all duration-150 overflow-visible',
          s.wrap,
          error ? 'border-rose-500' : 'border-gray-700 hover:border-gray-500 focus-within:border-crisp-500 focus-within:ring-2 focus-within:ring-crisp-500/20',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}>
          {/* Country selector button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen(o => !o)}
            className={cn(
              'flex items-center gap-1.5 border-r border-gray-700 shrink-0 h-full text-gray-200 hover:bg-gray-800 transition-colors',
              s.btn,
            )}
          >
            <span className="text-lg leading-none">{country.flag}</span>
            <span className="text-gray-400 tabular-nums">{country.dial}</span>
            <svg className={cn('w-3 h-3 text-gray-500 transition-transform duration-150', open && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Phone number input */}
          <input
            ref={ref}
            id={id}
            type="tel"
            value={number}
            onChange={handleNumber}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'flex-1 h-full bg-transparent px-3 text-gray-100 placeholder-gray-600 focus:outline-none',
              s.input,
            )}
          />
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.13 }}
              className="absolute z-50 left-0 top-full mt-1.5 w-72 rounded-xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/50"
            >
              {/* Search */}
              <div className="p-2 border-b border-gray-800">
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search country or dial code…"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-crisp-500"
                />
              </div>

              {/* List */}
              <ul className="max-h-56 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-gray-500 text-center">No results</li>
                ) : filtered.map(c => (
                  <li
                    key={c.code}
                    onClick={() => selectCountry(c)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors text-sm',
                      c.code === country.code
                        ? 'bg-crisp-500/10 text-crisp-300'
                        : 'text-gray-200 hover:bg-gray-800',
                    )}
                  >
                    <span className="text-lg shrink-0">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-gray-500 tabular-nums shrink-0">{c.dial}</span>
                    {c.code === country.code && (
                      <svg className="w-3.5 h-3.5 text-crisp-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(error || hint) && (
        <p className={cn('text-xs', error ? 'text-rose-400' : 'text-gray-500')}>{error ?? hint}</p>
      )}
    </div>
  );
});
PhoneInput.displayName = 'PhoneInput';
