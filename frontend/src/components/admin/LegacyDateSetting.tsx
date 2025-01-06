import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { getSetting, updateSetting } from '../../services/api/settings.service.ts';

const LegacyDateSetting: React.FC = () => {
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchInitialDate = async () => {
      const initialDate = await getSetting('legacy_date');
      if (initialDate) {
        setDate(initialDate);
      }
    };
    fetchInitialDate();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateSetting('legacy_date', date);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update legacy date');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg space-y-4">
      <div className="flex items-center gap-3">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Legacy Date Setting</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="legacy-date" className="block text-sm font-medium mb-1">
            Legacy Date
          </label>
          <input
            type="date"
            id="legacy-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg bg-background border border-foreground/20 focus:border-primary focus:outline-none"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-accent/10 text-accent rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-500/10 text-green-500 rounded-lg text-sm">
            Legacy date updated successfully
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating...' : 'Update Legacy Date'}
        </button>
      </form>
    </div>
  );
};

export default LegacyDateSetting;