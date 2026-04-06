export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface PropsTableProps {
  props: PropDef[];
  title?: string;
}

export function PropsTable({ props, title = 'Props' }: PropsTableProps) {
  return (
    <div className="mt-10">
      <h3 className="text-base font-semibold text-gray-100 mb-3">{title}</h3>
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.07] bg-gray-900/60">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide w-36">Prop</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide w-44">Type</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide w-24">Default</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr key={p.name} className={`border-b border-white/[0.04] last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                <td className="px-4 py-2.5">
                  <span className="font-mono text-amber-300 text-xs">{p.name}</span>
                  {p.required && <span className="ml-1 text-rose-400 text-xs">*</span>}
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-mono text-sky-400 text-xs">{p.type}</span>
                </td>
                <td className="px-4 py-2.5">
                  {p.default ? (
                    <span className="font-mono text-emerald-400 text-xs">{p.default}</span>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-gray-400 text-xs leading-relaxed">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
