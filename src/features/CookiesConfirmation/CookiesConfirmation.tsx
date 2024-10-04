import React, { useState, useEffect } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import './CookiesConfirmation.css';

export const CookiesConfirmation = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowPopup(false);
  };
  return (
    <>
      {showPopup && (
        <Card className="CookiesConfirmation">
          <div>
            <p className="text-sm text-zinc-500">
              We use cookies to ensure you get the best experience on our
              website.
            </p>
            <div className="flex justify-end pt-2">
              <Button
                label="Accept Cookies"
                onClick={acceptCookies}
                severity="success"
                outlined
                size="small"
              />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
