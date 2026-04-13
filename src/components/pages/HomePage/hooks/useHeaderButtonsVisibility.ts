import { throttle } from 'lodash-es';
import { RefObject, useEffect, useState } from 'react';

interface UseHeaderButtonsVisibilityProps {
  activityButtonsRef: RefObject<HTMLElement>;
  headerRef: RefObject<HTMLDivElement>;
}

/**
 * Shows buttons in the sticky header once the main hero buttons scroll above
 * the header area.
 */
export function useHeaderButtonsVisibility({
  activityButtonsRef,
  headerRef,
}: UseHeaderButtonsVisibilityProps): boolean {
  const [shouldShowHeaderButtons, setShouldShowHeaderButtons] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(
      () => {
        if (!headerRef.current || !activityButtonsRef.current) return;

        const headerPosition = headerRef.current.getBoundingClientRect();
        const activityButtonsPosition =
          activityButtonsRef.current.getBoundingClientRect();

        setShouldShowHeaderButtons(
          headerPosition.bottom > activityButtonsPosition.bottom,
        );
      },
      60,
      {
        leading: true,
        trailing: true,
      },
    );

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [activityButtonsRef, headerRef]);

  return shouldShowHeaderButtons;
}
