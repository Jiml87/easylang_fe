import { FC, useEffect, useState } from 'react';

const SITE_URL = 'https://mywords.pro';
const SITE_TITLE = 'My Words';
const SITE_TEXT = 'MyWords helps to learn new language efficiently';

interface ShareSiteButtonProps {
  onShared?: () => void;
}

const isInstalledApp = () => {
  const displayMode = window.matchMedia(
    '(display-mode: standalone), (display-mode: fullscreen)',
  ).matches;
  const iosStandalone =
    'standalone' in navigator &&
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

  return displayMode || iosStandalone;
};

export const ShareSiteButton: FC<ShareSiteButtonProps> = ({ onShared }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      '(display-mode: standalone), (display-mode: fullscreen)',
    );
    const update = () => {
      setVisible(isInstalledApp() && typeof navigator.share === 'function');
    };

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  if (!visible) {
    return null;
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: SITE_TITLE,
        text: SITE_TEXT,
        url: SITE_URL,
      });
      onShared?.();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    }
  };

  return (
    <div
      className="menu-button separated mb-2"
      role="button"
      onClick={handleShare}
    >
      <i className="pi pi-share-alt mr-2" />
      <span>Share</span>
    </div>
  );
};
