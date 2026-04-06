import { useEffect, useState } from 'react';
import { cn } from '../../../utils/cn';

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
  onDone?: () => void;
}

export function Typewriter({
  text,
  speed = 55,
  deleteSpeed = 30,
  pauseDelay = 1800,
  loop = false,
  cursor = true,
  cursorChar = '|',
  className,
  onDone,
}: TypewriterProps) {
  const phrases = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);
  const [blink, setBlink] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done && !loop) return;

    const current = phrases[phraseIdx];

    if (!isDeleting && displayed === current) {
      // Finished typing this phrase
      if (!loop && phraseIdx === phrases.length - 1) {
        setDone(true);
        onDone?.();
        return;
      }
      const id = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(id);
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      return;
    }

    const id = setTimeout(() => {
      setDisplayed(prev =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1),
      );
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(id);
  }, [displayed, isDeleting, phraseIdx, done, loop, phrases, speed, deleteSpeed, pauseDelay, onDone]);

  return (
    <span className={cn('inline', className)}>
      {displayed}
      {cursor && (
        <span
          className="ml-px font-thin"
          style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
          aria-hidden
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
