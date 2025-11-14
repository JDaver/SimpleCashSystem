import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export function useLazyBackground(imageUrl) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          el.style.backgroundImage = `url(${imageUrl})`;
          setLoaded(true);
        };

        observer.unobserve(el);
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [imageUrl]);

  return { ref, loaded };
}
