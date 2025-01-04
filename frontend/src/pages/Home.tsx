import React, { useEffect, useState } from 'react';
import { fetchActivityTypes } from '../services/api.service';
import { Award, Info, HelpCircle, Trophy } from 'lucide-react';

const Home = () => {
  const [activityTypes, setActivityTypes] = useState([]);

  useEffect(() => {
    const loadActivityTypes = async () => {
      try {
        const data = await fetchActivityTypes();
        setActivityTypes(data);
      } catch (error) {
        console.error('There was an error fetching the activity types!', error);
      }
    };

    loadActivityTypes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold">S/M-KID point</h1>
        </div>
        <p className="text-lg leading-relaxed">
          Velkommen til S/M-KID rådets pointside. Her kan du se, hvilke point du selv og andre har opnået, 
          samt indstille dig selv og andre til point for opgaver, i har lavet i rådet.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Info className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Hvad er S/M-KID point?</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            S/M-KID point er måden, vi her i rådet følger med i, hvilke frivillige opgaver der er, og hvem der udfører dem.
            Pointene er en måde at anerkende og belønne jeres indsats.
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-accent mb-2">
            <Trophy className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Hvad kan jeg bruge dem til?</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            S/M-KID point bestemmer den interne prioritering af årsfestbilletterne, som rådet får tildelt.
            Jo flere point du har, jo større er din chance for at få en billet.
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <HelpCircle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Hvordan får jeg point?</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Du får point ved at udføre forskellige frivillige opgaver og ved at møde op til studierådsmøderne.
            Nogle opgaver giver flere point end andre, baseret på deres sværhedsgrad og betydning.
          </p>
        </div>
      </div>

      {/* Activity Points Table */}
      <div className="bg-card rounded-xl p-6 mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Point Oversigt</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-muted/20">
                <th className="px-6 py-4 text-left font-semibold">Aktivitet</th>
                <th className="px-6 py-4 text-center font-semibold">Point</th>
                <th className="px-6 py-4 text-left font-semibold">Beskrivelse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted/20">
              {activityTypes.map((activityType) => (
                <tr key={activityType.id} className="hover:bg-muted/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{activityType.activity}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[3rem] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {activityType.points}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{activityType.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;