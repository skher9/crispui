import { useState, useCallback, useEffect } from 'react';
import { motion, useAnimation, type TargetAndTransition } from 'framer-motion';
import type { Icon as IxIcon } from 'iconsax-react';
import {
  Home, Heart, Star, User, SearchNormal, Notification, Setting2, Shield, Lock,
  Sms, Send, TickCircle, CloseCircle, Add, Edit, Trash, Import, Export,
  Code, Flash, Layer, Global, Chart, Camera, Gallery, MusicPlay, Video,
  Location, Map, Call, Wifi, Cpu, Data, CloudAdd, Crown, Diamonds,
  Award, Gift, Bag, ShoppingCart, Wallet, Card, DollarCircle, Timer, Calendar,
  Clock, Flag, Bookmark, Tag, Filter, Sort, Grid2, HambergerMenu, Eye,
  Book, Copy, Link, Share, Folder2, Document, Note, Message, MessageText,
  CallCalling, Briefcase, People, Profile2User, PictureFrame,
} from 'iconsax-react';
import { DocPage, DocSection, Callout } from '../components/DocPage';
import { ExampleBlock } from '../components/ExampleBlock';

// ── Types ────────────────────────────────────────────────────────────────────

type IconVariant = 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
type AnimPreset = 'bounce' | 'spin' | 'pulse' | 'shake' | 'wiggle' | 'pop' | 'ping' | 'heartbeat';

const ANIM_PRESETS: Record<AnimPreset, TargetAndTransition> = {
  bounce:    { y: [0, -14, 0, -7, 0], transition: { duration: 0.6, ease: 'easeOut' } },
  spin:      { rotate: [0, 360], transition: { duration: 0.5, ease: 'easeInOut' } },
  pulse:     { scale: [1, 1.35, 1], transition: { duration: 0.4, ease: 'easeOut' } },
  shake:     { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.5 } },
  wiggle:    { rotate: [0, -15, 15, -10, 10, -5, 5, 0], transition: { duration: 0.5 } },
  pop:       { scale: [1, 1.6, 0.85, 1.1, 1], transition: { duration: 0.4, type: 'spring', stiffness: 300 } },
  ping:      { scale: [1, 1.5, 1], opacity: [1, 0.4, 1], transition: { duration: 0.6 } },
  heartbeat: { scale: [1, 1.25, 1, 1.15, 1], transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] } },
};

// ── Icon catalog ─────────────────────────────────────────────────────────────

const ICON_GROUPS = [
  {
    label: 'Navigation & UI',
    icons: [
      { name: 'Home', C: Home },
      { name: 'HambergerMenu', C: HambergerMenu },
      { name: 'SearchNormal', C: SearchNormal },
      { name: 'Filter', C: Filter },
      { name: 'Sort', C: Sort },
      { name: 'Grid2', C: Grid2 },
      { name: 'Setting2', C: Setting2 },
      { name: 'Eye', C: Eye },
      { name: 'Bookmark', C: Bookmark },
      { name: 'Flag', C: Flag },
      { name: 'Layer', C: Layer },
      { name: 'PictureFrame', C: PictureFrame },
    ],
  },
  {
    label: 'Actions',
    icons: [
      { name: 'Add', C: Add },
      { name: 'Edit', C: Edit },
      { name: 'Trash', C: Trash },
      { name: 'Copy', C: Copy },
      { name: 'Link', C: Link },
      { name: 'Share', C: Share },
      { name: 'Import', C: Import },
      { name: 'Export', C: Export },
      { name: 'Send', C: Send },
      { name: 'TickCircle', C: TickCircle },
      { name: 'CloseCircle', C: CloseCircle },
      { name: 'Flash', C: Flash },
    ],
  },
  {
    label: 'Communication',
    icons: [
      { name: 'Message', C: Message },
      { name: 'MessageText', C: MessageText },
      { name: 'Sms', C: Sms },
      { name: 'Call', C: Call },
      { name: 'CallCalling', C: CallCalling },
      { name: 'Notification', C: Notification },
      { name: 'Global', C: Global },
      { name: 'Wifi', C: Wifi },
      { name: 'Share', C: Share },
      { name: 'Link', C: Link },
    ],
  },
  {
    label: 'Files & Data',
    icons: [
      { name: 'Folder2', C: Folder2 },
      { name: 'Document', C: Document },
      { name: 'Note', C: Note },
      { name: 'Book', C: Book },
      { name: 'Code', C: Code },
      { name: 'Data', C: Data },
      { name: 'Cpu', C: Cpu },
      { name: 'CloudAdd', C: CloudAdd },
      { name: 'Chart', C: Chart },
    ],
  },
  {
    label: 'People & Identity',
    icons: [
      { name: 'User', C: User },
      { name: 'People', C: People },
      { name: 'Profile2User', C: Profile2User },
      { name: 'Shield', C: Shield },
      { name: 'Lock', C: Lock },
      { name: 'Briefcase', C: Briefcase },
      { name: 'Crown', C: Crown },
      { name: 'Award', C: Award },
    ],
  },
  {
    label: 'Commerce',
    icons: [
      { name: 'Bag', C: Bag },
      { name: 'ShoppingCart', C: ShoppingCart },
      { name: 'Wallet', C: Wallet },
      { name: 'Card', C: Card },
      { name: 'DollarCircle', C: DollarCircle },
      { name: 'Gift', C: Gift },
      { name: 'Diamonds', C: Diamonds },
      { name: 'Tag', C: Tag },
    ],
  },
  {
    label: 'Media & Location',
    icons: [
      { name: 'Camera', C: Camera },
      { name: 'Gallery', C: Gallery },
      { name: 'MusicPlay', C: MusicPlay },
      { name: 'Video', C: Video },
      { name: 'Location', C: Location },
      { name: 'Map', C: Map },
      { name: 'Timer', C: Timer },
      { name: 'Calendar', C: Calendar },
      { name: 'Clock', C: Clock },
    ],
  },
  {
    label: 'Expressive',
    icons: [
      { name: 'Heart', C: Heart },
      { name: 'Star', C: Star },
    ],
  },
];

const VARIANTS: IconVariant[] = ['Linear', 'Outline', 'Broken', 'Bold', 'Bulk', 'TwoTone'];
const ANIMS: AnimPreset[] = ['bounce', 'spin', 'pulse', 'shake', 'wiggle', 'pop', 'ping', 'heartbeat'];

// ── Animated icon cell ───────────────────────────────────────────────────────

function AnimIconCell({ name, C, anim, replaySignal }: {
  name: string;
  C: IxIcon;
  anim: AnimPreset;
  replaySignal: number;
}) {
  const controls = useAnimation();
  const [active, setActive] = useState(false);

  const play = useCallback(async () => {
    setActive(true);
    await controls.start(ANIM_PRESETS[anim]);
    await controls.start({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, transition: { duration: 0 } });
    setActive(false);
  }, [controls, anim]);

  // Trigger when replaySignal changes (Replay All button)
  useEffect(() => {
    if (replaySignal > 0) play();
  }, [replaySignal]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      onClick={play}
      className={`group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer select-none
        ${active ? 'border-crisp-500/60 bg-crisp-500/10' : 'border-gray-800 hover:border-gray-600 hover:bg-gray-800/50'}`}
    >
      {/* Fixed-size wrapper so transform never shifts siblings */}
      <span className="w-7 h-7 flex items-center justify-center overflow-visible">
        <motion.span
          animate={controls}
          style={{ display: 'inline-flex', willChange: 'transform' }}
          className="text-crisp-400"
        >
          <C size={28} color="currentColor" />
        </motion.span>
      </span>
      <div className="text-center">
        <p className="text-[10px] font-medium text-gray-300">{name}</p>
        <p className="text-[9px] text-crisp-500 mt-0.5">{anim}</p>
      </div>
    </button>
  );
}

// ── Static icon cell ─────────────────────────────────────────────────────────

function StaticIconCell({ name, C, variant }: { name: string; C: IxIcon; variant: IconVariant }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`import { ${name} } from 'iconsax-react';\n\n<${name} size={24} color="currentColor" variant="${variant}" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-800 hover:border-gray-600 hover:bg-gray-800/50 transition-all cursor-pointer select-none relative"
    >
      <span className="text-gray-300 group-hover:text-crisp-400 transition-colors">
        <C size={26} color="currentColor" variant={variant} />
      </span>
      <p className="text-[10px] text-gray-400 group-hover:text-gray-200 transition-colors">{name}</p>
      {copied && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-medium"
        >
          Copied!
        </motion.span>
      )}
    </button>
  );
}

// ── Pages ─────────────────────────────────────────────────────────────────────

export function IconsBrowserPage() {
  const [variant, setVariant] = useState<IconVariant>('Linear');
  const [search, setSearch] = useState('');

  const filtered = ICON_GROUPS.map(g => ({
    ...g,
    icons: g.icons.filter(i => i.name.toLowerCase().includes(search.toLowerCase())),
  })).filter(g => g.icons.length > 0);

  return (
    <DocPage title="Icons" description="993 Iconsax icons available in 6 style variants. Click any icon to copy its import snippet. Powered by iconsax-react." importNames="">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchNormal size={16} color="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-crisp-500 transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {VARIANTS.map(v => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all
                ${variant === v ? 'bg-crisp-500/20 border-crisp-500/60 text-crisp-300' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <Callout variant="tip">Click any icon to copy its import snippet to clipboard.</Callout>

      {filtered.map(group => (
        <DocSection key={group.label} title={group.label}>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {group.icons.map(({ name, C }) => (
              <StaticIconCell key={name + variant} name={name} C={C} variant={variant} />
            ))}
          </div>
        </DocSection>
      ))}
    </DocPage>
  );
}

export function AnimatedIconsBrowserPage() {
  const [selectedAnim, setSelectedAnim] = useState<AnimPreset>('bounce');
  const [search, setSearch] = useState('');
  const [replayAll, setReplayAll] = useState(0);

  const allIcons = ICON_GROUPS.flatMap(g => g.icons).filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DocPage title="Animated Icons" description="Every icon with 8 motion presets. Click an icon to replay its animation. Use the preset selector to switch animations." importNames="">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchNormal size={16} color="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-crisp-500 transition-colors"
          />
        </div>
        <button
          onClick={() => setReplayAll(r => r + 1)}
          className="px-4 py-2 text-xs font-semibold bg-crisp-600 text-white rounded-lg hover:bg-crisp-700 transition-colors"
        >
          Replay All ↺
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {ANIMS.map(a => (
          <button
            key={a}
            onClick={() => setSelectedAnim(a)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all
              ${selectedAnim === a ? 'bg-crisp-500/20 border-crisp-500/60 text-crisp-300' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'}`}
          >
            {a}
          </button>
        ))}
      </div>

      <Callout variant="tip">Click any icon to replay the animation. You can click multiple times — each click restarts it.</Callout>

      <div className="mt-4">
        <ExampleBlock code={`import { Home } from 'iconsax-react';
import { motion, useAnimation } from 'framer-motion';

function AnimatedIcon() {
  const controls = useAnimation();

  const play = async () => {
    await controls.start({ y: [0, -14, 0, -7, 0], transition: { duration: 0.6 } });
    controls.start({ y: 0, transition: { duration: 0 } });
  };

  return (
    <motion.span animate={controls} onClick={play} style={{ display: 'inline-flex' }}>
      <Home size={28} color="currentColor" />
    </motion.span>
  );
}`} previewClassName="flex-col items-stretch">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {allIcons.map(({ name, C }) => (
              <AnimIconCell key={name + selectedAnim} name={name} C={C} anim={selectedAnim} replaySignal={replayAll} />
            ))}
          </div>
        </ExampleBlock>
      </div>
    </DocPage>
  );
}
