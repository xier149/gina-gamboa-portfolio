import { useEffect, useRef } from "react";

const DEFAULT_SPRING = { stiffness: 170, damping: 16, mass: 1 };

const Magnet = ({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 2,
  maxOffset = 10,
  spring = DEFAULT_SPRING,
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let frame = 0;
    let pointer = null;
    const current = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const wake = () => { if (!frame) frame = requestAnimationFrame(step); };
    const measure = () => {
      if (disabled || reduce || !pointer) { target.x = 0; target.y = 0; return; }
      const rect = wrapper.getBoundingClientRect();
      const dx = pointer.x - (rect.left + rect.width / 2);
      const dy = pointer.y - (rect.top + rect.height / 2);
      const outside = Math.hypot(Math.max(0, Math.abs(dx) - rect.width / 2), Math.max(0, Math.abs(dy) - rect.height / 2));
      if (outside > padding) { target.x = 0; target.y = 0; return; }
      const pull = padding ? 1 - Math.min(1, outside / padding) : 1;
      target.x = Math.max(-maxOffset, Math.min(maxOffset, (dx / magnetStrength) * pull));
      target.y = Math.max(-maxOffset, Math.min(maxOffset, (dy / magnetStrength) * pull));
    };
    const step = () => {
      frame = 0;
      measure();
      const dt = 1 / 60;
      let resting = true;
      ["x", "y"].forEach((axis) => {
        const force = spring.stiffness * (target[axis] - current[axis]) - spring.damping * velocity[axis];
        velocity[axis] += (force / spring.mass) * dt;
        current[axis] += velocity[axis] * dt;
        if (Math.abs(target[axis] - current[axis]) > 0.05 || Math.abs(velocity[axis]) > 0.05) resting = false;
      });
      inner.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (!resting) frame = requestAnimationFrame(step);
    };
    const onMove = (event) => { if (event.pointerType !== "touch") { pointer = { x: event.clientX, y: event.clientY }; wake(); } };
    const onLeave = () => { pointer = null; wake(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled, magnetStrength, maxOffset, padding, spring]);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={{ position: "relative", display: "inline-block" }} {...props}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>{children}</div>
    </div>
  );
};

export default Magnet;
