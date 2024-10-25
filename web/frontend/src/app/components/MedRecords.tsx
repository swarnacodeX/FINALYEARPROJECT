"use client"
import LitUpButton from '../../components/ui/litup';
import { useStore } from './storeZustand';

export default function MedRc(){
    const email = useStore((state) => state.email);
    
    const handleClick = () => {
        console.log('Button clicked');}
    return (
        <div>
          <LitUpButton text="Click Me" onClick={handleClick} />
        </div>
      );
}