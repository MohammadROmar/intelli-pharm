import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import { cn } from '../lib';
import { Input } from './Input';

type Props = { placeholder?: string; className?: string };

export function SearchField({ placeholder, className }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('name') ?? '');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSearchParams((prev) => {
      if (inputValue) {
        prev.set('name', inputValue);
      } else {
        prev.delete('name');
      }

      return prev;
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        icon={Search}
        placeholder={placeholder}
        className={cn('w-full text-sm lg:w-48', className)}
      />
    </form>
  );
}
