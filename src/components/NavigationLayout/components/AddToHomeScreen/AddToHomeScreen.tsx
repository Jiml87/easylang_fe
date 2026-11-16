import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const checkIsIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

export const AddToHomeScreen = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handleBeforeInstallPrompt = useCallback((e: Event) => {
    e.preventDefault();
    setDeferredPrompt(e as BeforeInstallPromptEvent);
  }, []);

  useEffect(() => {
    if (checkIsIOS()) {
      setIsIOS(true);
      return;
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, [handleBeforeInstallPrompt]);

  const handleAddToHomeScreenClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    } else {
      console.log('Install prompt is not available');
    }
  };

  if (isIOS) {
    return null;
  }

  return (
    <div>
      <div
        className="menu-button separated mb-2"
        role="button"
        onClick={handleAddToHomeScreenClick}
      >
        <i className="pi pi-thumbtack mr-2"></i>
        <span>
          Add&nbsp;
          <span className="text-gray-700">My Words</span>&nbsp; to Home Screen
        </span>
      </div>
    </div>
  );
};
