import { useState, useEffect } from 'react';
import { usePreferences } from '@hooks/usePreferences';
import Checkbox from '@themes/Minimal/InsertItem/Checkbox';
import DotsLoader from '@components/DotsLoader';

const Preferences = () => {
  const { preferences, isLoading, updatePreferences } = usePreferences();
  const [initialized, setInitialized] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [theme, setTheme] = useState('minimal');
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    if (preferences && !initialized) {
      setShowTime(preferences.showTime ?? false);
      setShowPaymentModal(preferences.showPaymentModal ?? false);
      setTheme(preferences.theme ?? 'minimal');
      setCarouselItems(preferences.carouselItems ?? []);
      setInitialized(true);
    }
  }, [preferences, initialized]);

  const handleSubmit = async e => {
    e.preventDefault();

    updatePreferences({ showTime, showPaymentModal, theme, carouselItems });
  };

  if (isLoading || !preferences) return <DotsLoader />;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Checkbox
          id="hour"
          label="Mostra orario"
          checked={showTime}
          onChange={e => setShowTime(e.target.checked)}
        />
        <Checkbox
          id="payment"
          label="Mostra tipo di pagamento"
          checked={showPaymentModal}
          onChange={e => setShowPaymentModal(e.target.checked)}
        />
      </div>
      <button type="submit">Salva</button>
    </form>
  );
};

export default Preferences;
