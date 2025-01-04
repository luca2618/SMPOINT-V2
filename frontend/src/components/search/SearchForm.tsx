import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getMembersList } from '../../services/api/members.service';
import { Member } from '../../types/member';

interface SearchFormProps {
  onSearch: (studynr: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [studynr, setStudienr] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await getMembersList();
        setMembers(data);
      } catch (error) {
        console.error('Failed to load members:', error);
      }
    };
    loadMembers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studynr) {
      onSearch(studynr);
    }
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    const member = members.find(m => m.name.toLowerCase() === newName.toLowerCase());
    if (member) {
      setStudienr(member.studynr);
    }
  };

  const handleStudienrChange = (newStudienr: string) => {
    setStudienr(newStudienr);
    const member = members.find(m => m.studynr.toLowerCase() === newStudienr.toLowerCase());
    if (member) {
      setName(member.name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            list="namelist"
            id="name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full p-2 rounded-lg bg-card border border-muted focus:border-primary focus:outline-none"
            placeholder="Search by name"
            autoComplete="off"
          />
          <datalist id="namelist">
            {members.map(m => (
              <option key={m.studynr} value={m.name} />
            ))}
          </datalist>
        </div>

        <div className="space-y-2">
          <label htmlFor="studienr" className="block text-sm font-medium">
            Study Number
          </label>
          <input
            type="text"
            list="studienrlist"
            id="studienr"
            value={studynr}
            onChange={(e) => handleStudienrChange(e.target.value)}
            className="w-full p-2 rounded-lg bg-card border border-muted focus:border-primary focus:outline-none"
            placeholder="Search by study number"
            required
            autoComplete="off"
          />
          <datalist id="studienrlist">
            {members.map(m => (
              <option key={m.studynr} value={m.studynr} />
            ))}
          </datalist>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90"
      >
        <SearchIcon className="w-4 h-4" />
        Search
      </button>
    </form>
  );
};

export default SearchForm;