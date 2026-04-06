import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

// ─── StreamingText ─────────────────────────────────────────────────────────────

export interface StreamingTextProps {
  text: string;
  speed?: number;          // ms per character
  delay?: number;          // ms before starting
  cursor?: boolean;        // show blinking cursor
  cursorChar?: string;
  onComplete?: () => void;
  className?: string;
  streaming?: boolean;     // when true, appends new chars as text grows
}

export function StreamingText({
  text, speed = 18, delay = 0, cursor = true,
  cursorChar = '▍', onComplete, className, streaming = false,
}: StreamingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const prevTextRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // If streaming mode and text grew, just append new chars
    const prev = prevTextRef.current;
    const startIdx = streaming && text.startsWith(prev) ? prev.length : 0;
    if (startIdx === 0) setDisplayed('');
    prevTextRef.current = text;
    setDone(false);

    let i = startIdx;
    const run = () => {
      if (i >= text.length) { setDone(true); onComplete?.(); return; }
      setDisplayed(text.slice(0, ++i));
      timerRef.current = setTimeout(run, speed);
    };
    timerRef.current = setTimeout(run, delay);
    return () => clearTimeout(timerRef.current);
  }, [text]);

  return (
    <span className={cn('', className)}>
      {displayed}
      {cursor && !done && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-crisp-400 ml-0.5"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}

// ─── StreamingMessage ─────────────────────────────────────────────────────────
// Full AI message bubble with avatar + streaming text

export interface StreamingMessageProps {
  text: string;
  role?: 'user' | 'assistant';
  avatar?: string;
  name?: string;
  speed?: number;
  streaming?: boolean;
  className?: string;
}

export function StreamingMessage({
  text, role = 'assistant', avatar, name, speed = 18, streaming = false, className,
}: StreamingMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <div className={cn('flex gap-3 max-w-2xl', isAssistant ? '' : 'flex-row-reverse ml-auto', className)}>
      {/* Avatar */}
      <div className={cn('w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white',
        isAssistant ? 'bg-gradient-to-br from-crisp-500 to-violet-500' : 'bg-gray-700')}>
        {avatar
          ? <img src={avatar} className="w-full h-full rounded-full object-cover" alt={name} />
          : isAssistant ? 'AI' : (name?.[0] ?? 'U')
        }
      </div>

      {/* Bubble */}
      <div className={cn('rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[80%]',
        isAssistant
          ? 'bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-sm'
          : 'bg-crisp-600 text-white rounded-tr-sm',
      )}>
        <StreamingText text={text} speed={speed} streaming={streaming} />
      </div>
    </div>
  );
}

// ─── StreamingCode ────────────────────────────────────────────────────────────

export interface StreamingCodeProps {
  code: string;
  language?: string;
  speed?: number;
  className?: string;
}

export function StreamingCode({ code, language, speed = 8, className }: StreamingCodeProps) {
  return (
    <div className={cn('rounded-xl overflow-hidden border border-gray-800', className)}>
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <span className="text-xs text-gray-500 font-mono">{language}</span>
        </div>
      )}
      <div className="bg-gray-950 p-4 font-mono text-sm text-gray-300 overflow-x-auto">
        <StreamingText text={code} speed={speed} cursor cursorChar="█" />
      </div>
    </div>
  );
}
