import { useEffect, useState } from "react";

export const useStrictDroppable = (loading: boolean) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let animation: number;

    if (!loading) {
      animation = requestAnimationFrame(() => setEnabled(true));
    }

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, [loading]);

  return [enabled];
};
