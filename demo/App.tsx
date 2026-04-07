import { useState } from 'react';
import { ToastProvider } from '@crispui/react';
import { Home, DollarCircle, Flash, Grid2 } from 'iconsax-react';

// Pages — Home & Pricing
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';

// Pages — Getting Started
import { GettingStartedPage } from './pages/GettingStartedPage';

// Pages — Primitives
import {
  BadgePage, AvatarPage, CardPage, AlertPage,
  ProgressPage, SeparatorPage, SpinnerPage, EmptyStatePage,
} from './pages/PrimitivesPages';

// Pages — Button
import { ButtonPage } from './pages/ButtonPage';

// Pages — Forms
import {
  InputPage, TextareaPage, SelectPage, OTPInputPage, SliderPage,
} from './pages/InputPage';
import { CheckboxPage, RadioPage, SwitchPage } from './pages/CheckboxRadioPage';

// Pages — Composition
import {
  ModalPage, DrawerPage, TabsPage, AccordionPage,
  TooltipPage, ToastPage, CommandPalettePage,
} from './pages/CompositionPages';

// Pages — Animations
import {
  AnimatedIconPage, AnimatePage, StaggerPage,
  TypewriterPage, GlowPulsePage, ConfettiPage,
} from './pages/AnimationsPage';

// Pages — Icons
import { IconsBrowserPage, AnimatedIconsBrowserPage } from './pages/IconsPage';

// Pages — Layout
import { StackPage, GridPage, ContainerPage } from './pages/LayoutPage';

// Pages — Data Display
import { StatCardPage, DataTablePage } from './pages/DataDisplayPage';

// Pages — Productivity
import { PomodoroPage, KanbanPage, HabitTrackerPage } from './pages/ProductivityPage';

// Pages — Phase 2 (Effects, Charts, DataGrid, Sections)
import {
  BackgroundEffectsPage, ColorPickerPage, ChartPage, DataGridPage,
  FileUploadPage, SectionsPage, ButtonVariantsPage,
} from './pages/Phase2Pages';

// Pages — New Components (MUI + shadcn parity)
import {
  TypographyPage, KbdPage, AspectRatioPage, ChipPage,
  BreadcrumbPage, SkeletonPage, CollapsiblePage, TogglePage,
  RatingPage, PaginationPage, StepperPage, TimelinePage,
  HoverCardPage, NumberInputPage, AutocompletePage, DropdownMenuPage,
  ScrollAreaPage, CarouselPage, TablePage, CalendarPage,
  TreeViewPage, NavigationMenuPage, MenubarPage,
} from './pages/NewComponentsPages';

// Pages — Depth (full variant showcases + new rich components)
import {
  InputDepthPage, SelectDepthPage, CardDepthPage, ModalDepthPage,
  TagInputPage, AnimatedListPage, AnimatedNumberPage,
  PresenceAvatarsPage, StreamingTextPage, NotificationPage,
  PhoneInputPage, RichTextEditorPage, CodeEditorPage,
  JsonViewerPage, VirtualListPage, FloatingActionButtonPage, MentionInputPage,
} from './pages/DepthPages';

// ─── Nav tree ────────────────────────────────────────────────────────────────

type NavItem = { id: string; label: string };
type NavGroup = { label: string; icon?: React.ReactNode; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ id: 'installation', label: 'Installation' }],
  },
  {
    label: 'Foundations',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'button-variants', label: 'Button Variants' },
      { id: 'badge', label: 'Badge' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'card', label: 'Card' },
      { id: 'card-depth', label: 'Card Showcase' },
      { id: 'alert', label: 'Alert' },
      { id: 'progress', label: 'Progress' },
      { id: 'separator', label: 'Separator' },
      { id: 'spinner', label: 'Spinner' },
      { id: 'empty-state', label: 'Empty State' },
    ],
  },
  {
    label: 'Typography',
    items: [
      { id: 'typography', label: 'Typography' },
      { id: 'kbd', label: 'Keyboard' },
      { id: 'chip', label: 'Chip' },
      { id: 'skeleton', label: 'Skeleton' },
      { id: 'aspect-ratio', label: 'Aspect Ratio' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'input-depth', label: 'Input Showcase' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'select', label: 'Select' },
      { id: 'select-depth', label: 'Select Showcase' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'switch', label: 'Switch' },
      { id: 'slider', label: 'Slider' },
      { id: 'otp-input', label: 'OTP Input' },
      { id: 'number-input', label: 'Number Input' },
      { id: 'autocomplete', label: 'Autocomplete' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'rating', label: 'Rating' },
      { id: 'calendar', label: 'Calendar' },
      { id: 'file-upload', label: 'File Upload' },
      { id: 'color-picker', label: 'Color Picker' },
    ],
  },
  {
    label: 'Rich Inputs',
    items: [
      { id: 'tag-input', label: 'Tag Input' },
      { id: 'phone-input', label: 'Phone Input' },
      { id: 'mention-input', label: 'Mention Input' },
      { id: 'rich-text-editor', label: 'Rich Text Editor' },
      { id: 'code-editor', label: 'Code Editor' },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'modal-depth', label: 'Modal Showcase' },
      { id: 'drawer', label: 'Drawer' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'hover-card', label: 'Hover Card' },
      { id: 'toast', label: 'Toast' },
      { id: 'notification', label: 'Notification' },
      { id: 'command-palette', label: 'Command Palette' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'navigation-menu', label: 'Navigation Menu' },
      { id: 'menubar', label: 'Menubar' },
      { id: 'dropdown-menu', label: 'Dropdown Menu' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'tree-view', label: 'Tree View' },
      { id: 'tabs', label: 'Tabs' },
    ],
  },
  {
    label: 'Data & Display',
    items: [
      { id: 'datagrid', label: 'Data Grid' },
      { id: 'chart', label: 'Charts' },
      { id: 'data-table', label: 'Data Table' },
      { id: 'stat-card', label: 'Stat Card' },
      { id: 'table', label: 'Table' },
      { id: 'json-viewer', label: 'JSON Viewer' },
      { id: 'virtual-list', label: 'Virtual List' },
      { id: 'scroll-area', label: 'Scroll Area' },
    ],
  },
  {
    label: 'Disclosure',
    items: [
      { id: 'accordion', label: 'Accordion' },
      { id: 'collapsible', label: 'Collapsible' },
      { id: 'stepper', label: 'Stepper' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'carousel', label: 'Carousel' },
    ],
  },
  {
    label: 'Motion',
    items: [
      { id: 'animate', label: 'Animate' },
      { id: 'animated-icon', label: 'Animated Icons' },
      { id: 'stagger', label: 'Stagger' },
      { id: 'typewriter', label: 'Typewriter' },
      { id: 'glow-pulse', label: 'Glow & Magnetic' },
      { id: 'confetti', label: 'Confetti' },
      { id: 'animated-list', label: 'Animated List' },
      { id: 'animated-number', label: 'Animated Number' },
      { id: 'streaming-text', label: 'Streaming Text' },
      { id: 'presence-avatars', label: 'Presence Avatars' },
      { id: 'fab', label: 'Floating Action Button' },
    ],
  },
  {
    label: 'Icons',
    items: [
      { id: 'icons-browser', label: 'Icon Browser' },
      { id: 'icons-animated', label: 'Animated Icons' },
    ],
  },
  {
    label: 'Backgrounds',
    items: [
      { id: 'background-effects', label: 'Background Effects' },
      { id: 'sections', label: 'Page Sections' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { id: 'stack', label: 'Stack' },
      { id: 'grid', label: 'Grid' },
      { id: 'container', label: 'Container' },
    ],
  },
  {
    label: 'Apps',
    items: [
      { id: 'pomodoro', label: 'Pomodoro Timer' },
      { id: 'kanban', label: 'Kanban Board' },
      { id: 'habit-tracker', label: 'Habit Tracker' },
    ],
  },
];

// ─── Page resolver ────────────────────────────────────────────────────────────

function Page({ id, onNavigate }: { id: string; onNavigate: (id: string) => void }) {
  switch (id) {
    case 'home':               return <HomePage onNavigate={onNavigate} />;
    case 'pricing':            return <PricingPage />;
    case 'installation':       return <GettingStartedPage />;
    case 'button':             return <ButtonPage />;
    case 'badge':              return <BadgePage />;
    case 'avatar':             return <AvatarPage />;
    case 'card':               return <CardPage />;
    case 'alert':              return <AlertPage />;
    case 'progress':           return <ProgressPage />;
    case 'separator':          return <SeparatorPage />;
    case 'spinner':            return <SpinnerPage />;
    case 'empty-state':        return <EmptyStatePage />;
    case 'input':              return <InputPage />;
    case 'textarea':           return <TextareaPage />;
    case 'select':             return <SelectPage />;
    case 'checkbox':           return <CheckboxPage />;
    case 'radio':              return <RadioPage />;
    case 'switch':             return <SwitchPage />;
    case 'slider':             return <SliderPage />;
    case 'otp-input':          return <OTPInputPage />;
    case 'modal':              return <ModalPage />;
    case 'drawer':             return <DrawerPage />;
    case 'tabs':               return <TabsPage />;
    case 'accordion':          return <AccordionPage />;
    case 'tooltip':            return <TooltipPage />;
    case 'toast':              return <ToastPage />;
    case 'command-palette':    return <CommandPalettePage />;
    case 'animate':            return <AnimatePage />;
    case 'animated-icon':      return <AnimatedIconPage />;
    case 'stagger':            return <StaggerPage />;
    case 'typewriter':         return <TypewriterPage />;
    case 'glow-pulse':         return <GlowPulsePage />;
    case 'confetti':           return <ConfettiPage />;
    case 'icons-browser':      return <IconsBrowserPage />;
    case 'icons-animated':     return <AnimatedIconsBrowserPage />;
    case 'stat-card':          return <StatCardPage />;
    case 'data-table':         return <DataTablePage />;
    case 'stack':              return <StackPage />;
    case 'grid':               return <GridPage />;
    case 'container':          return <ContainerPage />;
    case 'pomodoro':           return <PomodoroPage />;
    case 'kanban':             return <KanbanPage />;
    case 'habit-tracker':      return <HabitTrackerPage />;
    // Visual Effects & Advanced
    case 'background-effects':  return <BackgroundEffectsPage />;
    case 'sections':            return <SectionsPage />;
    case 'datagrid':            return <DataGridPage />;
    case 'chart':               return <ChartPage />;
    case 'color-picker':        return <ColorPickerPage />;
    case 'file-upload':         return <FileUploadPage />;
    case 'button-variants':     return <ButtonVariantsPage />;
    // Typography & Display
    case 'typography':         return <TypographyPage />;
    case 'kbd':                return <KbdPage />;
    case 'aspect-ratio':       return <AspectRatioPage />;
    case 'chip':               return <ChipPage />;
    case 'skeleton':           return <SkeletonPage />;
    case 'hover-card':         return <HoverCardPage />;
    // Navigation
    case 'breadcrumb':         return <BreadcrumbPage />;
    case 'navigation-menu':    return <NavigationMenuPage />;
    case 'menubar':            return <MenubarPage />;
    case 'dropdown-menu':      return <DropdownMenuPage />;
    case 'pagination':         return <PaginationPage />;
    case 'tree-view':          return <TreeViewPage />;
    // Advanced Forms
    case 'number-input':       return <NumberInputPage />;
    case 'autocomplete':       return <AutocompletePage />;
    case 'toggle':             return <TogglePage />;
    case 'rating':             return <RatingPage />;
    case 'calendar':           return <CalendarPage />;
    // Advanced Display
    case 'collapsible':        return <CollapsiblePage />;
    case 'stepper':            return <StepperPage />;
    case 'timeline':           return <TimelinePage />;
    case 'scroll-area':        return <ScrollAreaPage />;
    case 'carousel':           return <CarouselPage />;
    case 'table':              return <TablePage />;
    // Component Depth
    case 'input-depth':        return <InputDepthPage />;
    case 'select-depth':       return <SelectDepthPage />;
    case 'card-depth':         return <CardDepthPage />;
    case 'modal-depth':        return <ModalDepthPage />;
    case 'tag-input':          return <TagInputPage />;
    case 'animated-list':      return <AnimatedListPage />;
    case 'animated-number':    return <AnimatedNumberPage />;
    case 'presence-avatars':   return <PresenceAvatarsPage />;
    case 'streaming-text':     return <StreamingTextPage />;
    case 'notification':       return <NotificationPage />;
    // New Components
    case 'phone-input':        return <PhoneInputPage />;
    case 'mention-input':      return <MentionInputPage />;
    case 'rich-text-editor':   return <RichTextEditorPage />;
    case 'code-editor':        return <CodeEditorPage />;
    case 'json-viewer':        return <JsonViewerPage />;
    case 'virtual-list':       return <VirtualListPage />;
    case 'fab':                return <FloatingActionButtonPage />;
    default:                   return <HomePage onNavigate={onNavigate} />;
  }
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  current,
  onSelect,
  openGroups,
  toggleGroup,
}: {
  current: string;
  onSelect: (id: string) => void;
  openGroups: Set<string>;
  toggleGroup: (label: string) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-gray-950 border-r border-gray-800 flex flex-col z-30">
      {/* Logo */}
      <button
        onClick={() => onSelect('home')}
        className="h-14 flex items-center px-5 border-b border-gray-800 shrink-0 hover:bg-gray-900 transition-colors w-full text-left"
      >
        <span className="text-base font-semibold text-white tracking-tight">
          crisp<span className="text-crisp-400">ui</span>
        </span>
        <span className="ml-2 text-[10px] font-medium text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">0.1.0</span>
      </button>

      {/* Top actions */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-800 space-y-0.5">
        <button
          onClick={() => onSelect('home')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
            ${current === 'home' ? 'bg-crisp-500/15 text-crisp-300' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'}`}
        >
          <Home size={15} color="currentColor" />
          Home
        </button>
        <button
          onClick={() => onSelect('pricing')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
            ${current === 'pricing' ? 'bg-crisp-500/15 text-crisp-300' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'}`}
        >
          <DollarCircle size={15} color="currentColor" />
          Pricing
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {NAV.map(group => {
          const isOpen = openGroups.has(group.label);
          const hasActive = group.items.some(i => i.id === current);
          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors
                  ${hasActive ? 'text-crisp-400' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {group.label}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {isOpen && (
                <div className="mt-0.5 ml-2 space-y-0.5 border-l border-gray-800 pl-3">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onSelect(item.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors
                        ${current === item.id
                          ? 'bg-crisp-500/15 text-crisp-300 font-medium'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800 shrink-0">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
      </div>
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ current, onNavigate }: { current: string; onNavigate: (id: string) => void }) {
  const group = NAV.find(g => g.items.some(i => i.id === current));
  const item = group?.items.find(i => i.id === current);
  const isSpecial = current === 'home' || current === 'pricing';

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-gray-950/80 backdrop-blur border-b border-gray-800 flex items-center px-8 z-20 gap-3">
      {!isSpecial && group && (
        <>
          <span className="text-xs text-gray-500">{group.label}</span>
          <span className="text-gray-700">/</span>
        </>
      )}
      <span className="text-sm font-medium text-gray-200">
        {current === 'home' ? 'Overview' : current === 'pricing' ? 'Pricing' : item?.label ?? 'Docs'}
      </span>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => onNavigate('icons-browser')}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 border border-gray-700 hover:border-gray-500 rounded-lg transition-all"
        >
          <Grid2 size={13} color="currentColor" />
          Icons
        </button>
        <button
          onClick={() => onNavigate('pricing')}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 hover:text-gray-200 border border-gray-700 hover:border-gray-500 rounded-lg transition-all"
        >
          <Flash size={13} color="currentColor" />
          Upgrade
        </button>
      </div>
    </header>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [current, setCurrent] = useState('home');

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(NAV.map(g => g.label))
  );

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const navigate = (id: string) => {
    setCurrent(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFullWidth = current === 'home' || current === 'pricing';

  return (
    <ToastProvider position="top-right">
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
        <Sidebar
          current={current}
          onSelect={navigate}
          openGroups={openGroups}
          toggleGroup={toggleGroup}
        />
        <Header current={current} onNavigate={navigate} />
        <main className="pl-60 pt-14">
          <div className={isFullWidth ? 'px-8 py-6' : 'max-w-4xl mx-auto px-8 py-10'}>
            <Page id={current} onNavigate={navigate} />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
