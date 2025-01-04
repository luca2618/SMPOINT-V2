import React, { useEffect, useState } from 'react';
import { fetchActivityTypes } from '../services/api.service';

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
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold mb-4">S/M-KID point</h1>
      <p className="mb-4">
        Velkommen til S/M-KID rådets pointside. <br />
        Her kan du se, hvilke point du selv og andre har opnået, 
        samt indstille dig selv og andre til point for opgaver, i har lavet i rådet.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Hvad er S/M-KID point?</h2>
      <p className="mb-4">
        S/M-KID point er måden, vi her i rådet følger med i, hvilke frivillige opgaver der er, og hvem der udfører dem. <br />
        Pointene er en måde at anerkende og belønne jeres indsats for at gøre S/M-KID til et bedre studiemiljø og fællesskab.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Hvad kan jeg bruge S/M-KID point til?</h2>
      <p className="mb-4">
        Hvad kan jeg bruge S/M-KID point til? S/M-KID point bestemmer 
        den interne prioritering af årsfestbilletterne, som rådet får tildelt. <br />
        Jo flere point du har, jo større er din chance for at få en billet til den festlige begivenhed.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Hvordan får jeg S/M-KID point?</h2>
      <p className="mb-4">
        Du får S/M-KID point ved at udføre forskellige frivillige opgaver i S/M-KID rådet 
        og ved at møde op til studierådsmøderne. <br />
        Nogle opgaver giver flere point end andre, afhængigt af deres sværhedsgrad, varighed og betydning. <br />
        Du kan også få bonuspoint for at være ekstra aktiv, kreativ eller hjælpsom. <br />
        Hvor mange point du får for en opgave kan ses i tabellen her:
      </p>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Activity</th>
            <th className="border border-gray-300 px-4 py-2">Points</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {activityTypes.map((activityType) => (
            <tr key={activityType.id}>
              <td className="border border-gray-300 px-4 py-2">{activityType.activity}</td>
              <td className="border border-gray-300 px-4 py-2">{activityType.points}</td>
              <td className="border border-gray-300 px-4 py-2">{activityType.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;