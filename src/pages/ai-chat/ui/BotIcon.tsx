import { useEffect, useRef } from 'react';

const L = { cx: 9, cy: 14 };
const R = { cx: 15, cy: 14 };
const EYE_RX = 1;
const EYE_RY = 2;

type Waypoint = {
  dx: number;
  dy: number;
  holdRange: [number, number];
  moveDur: number;
};

const WAYPOINTS: Waypoint[] = [
  { dx: 0.0, dy: 0.0, holdRange: [900, 1600], moveDur: 0.55 },
  { dx: -1.9, dy: 0.55, holdRange: [750, 1150], moveDur: 0.32 },
  { dx: -1.8, dy: 0.0, holdRange: [500, 850], moveDur: 0.5 },
  { dx: -1.0, dy: -0.55, holdRange: [400, 700], moveDur: 0.45 },
  { dx: 0.0, dy: -0.65, holdRange: [500, 900], moveDur: 0.52 },
  { dx: 0.0, dy: 0.0, holdRange: [300, 600], moveDur: 0.42 },
  { dx: 1.0, dy: -0.55, holdRange: [400, 700], moveDur: 0.45 },
  { dx: 1.8, dy: 0.0, holdRange: [500, 850], moveDur: 0.5 },
  { dx: 1.9, dy: 0.55, holdRange: [750, 1150], moveDur: 0.32 },
  { dx: 0.2, dy: 0.55, holdRange: [400, 750], moveDur: 0.55 },
];

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const rand = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export type BotIconProps = { size?: number | string };

export function BotIcon({ size = 96 }: BotIconProps) {
  const gazeLRef = useRef<SVGGElement>(null);
  const gazeRRef = useRef<SVGGElement>(null);
  const blinkLRef = useRef<SVGGElement>(null);
  const blinkRRef = useRef<SVGGElement>(null);
  const waypointIdx = useRef<number>(0);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (isReducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const wp = WAYPOINTS[waypointIdx.current];
      const ease = wp.moveDur <= 0.38 ? SPRING : SMOOTH;

      const transition = `transform ${wp.moveDur}s ${ease}`;
      const transformL = `translate(${wp.dx}px, ${wp.dy}px)`;
      const transformR = `translate(${R.cx - L.cx + wp.dx}px, ${wp.dy}px)`;

      if (gazeLRef.current && gazeRRef.current) {
        gazeLRef.current.style.transition = transition;
        gazeLRef.current.style.transform = transformL;
        gazeRRef.current.style.transition = transition;
        gazeRRef.current.style.transform = transformR;
      }

      const hold = rand(wp.holdRange[0], wp.holdRange[1]);

      timer = setTimeout(() => {
        waypointIdx.current = (waypointIdx.current + 1) % WAYPOINTS.length;
        schedule();
      }, hold);
    };

    timer = setTimeout(schedule, 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (isReducedMotion) return;

    const activeTimers = new Set<ReturnType<typeof setTimeout>>();

    const addTimer = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        activeTimers.delete(timer);
        callback();
      }, delay);
      activeTimers.add(timer);
    };

    const setBlinkStyle = (scaleY: number, transT: string) => {
      const transform = `scaleY(${scaleY})`;
      if (blinkLRef.current && blinkRRef.current) {
        blinkLRef.current.style.transition = transT;
        blinkLRef.current.style.transform = transform;
        blinkRRef.current.style.transition = transT;
        blinkRRef.current.style.transform = transform;
      }
    };

    const executeBlink = () => {
      setBlinkStyle(0.04, 'transform 0.075s ease-in');

      addTimer(() => {
        setBlinkStyle(1, 'transform 0.26s cubic-bezier(0.34, 1.7, 0.64, 1)');
      }, 110);
    };

    const scheduleNext = () => {
      const delay = rand(2400, 5200);
      const isDouble = Math.random() < 0.28;

      addTimer(() => {
        executeBlink();

        if (isDouble) {
          addTimer(executeBlink, rand(380, 520));
        }

        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      activeTimers.forEach(clearTimeout);
      activeTimers.clear();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ display: 'block' }}
    >
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />

      <g ref={gazeLRef} style={{ transform: 'translate(0px, 0px)' }}>
        <g
          ref={blinkLRef}
          style={{
            transform: 'scaleY(1)',
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}
        >
          <rect
            x={L.cx - EYE_RX}
            y={L.cy - EYE_RY}
            width={EYE_RX * 2}
            height={EYE_RY * 2}
            rx={EYE_RX}
            fill="currentColor"
            stroke="none"
          />
        </g>
      </g>

      <g
        ref={gazeRRef}
        style={{ transform: `translate(${R.cx - L.cx}px, 0px)` }}
      >
        <g
          ref={blinkRRef}
          style={{
            transform: 'scaleY(1)',
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}
        >
          <rect
            x={L.cx - EYE_RX}
            y={L.cy - EYE_RY}
            width={EYE_RX * 2}
            height={EYE_RY * 2}
            rx={EYE_RX}
            fill="currentColor"
            stroke="none"
          />
        </g>
      </g>
    </svg>
  );
}
