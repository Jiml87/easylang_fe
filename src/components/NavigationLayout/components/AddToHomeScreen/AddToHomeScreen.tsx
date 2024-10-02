import { useEffect, useState, useCallback } from 'react';

export const AddToHomeScreen = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleBeforeInstallPrompt = useCallback((e: any) => {
    e.preventDefault();
    setDeferredPrompt(e);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, [handleBeforeInstallPrompt]);

  const handleAddToHomeScreenClick = async () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (deferredPrompt) {
      // @ts-ignore
      deferredPrompt.prompt();
      // @ts-ignore
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      console.log(
        "To add this web app to your Home Screen, open this app in Safari and tap the Share button, then select 'Add to Home Screen'.",
      );
    } else {
      console.log('Install prompt is not available');
    }
  };

  return (
    <div
      className="menu-button separated"
      role="button"
      onClick={handleAddToHomeScreenClick}
    >
      <i className="pi pi-thumbtack mr-2"></i>
      <span>
        Add&nbsp;
        <span className="text-gray-700">My Words</span>&nbsp; to Home Screen
      </span>
    </div>
  );
};
