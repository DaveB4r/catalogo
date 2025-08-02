import { ICategorias } from '@/interfaces/ICategorias';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import Categories from './Categories';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    categorias: ICategorias[];
};

const Filters = ({ isOpen, setIsOpen, active, setActive, categorias }: Props) => {
    return (
        <div
            className={`fixed top-0 left-0 z-50 flex h-full w-full transform flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-96 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-black">Filtros</h2>
                <button className="cursor-pointer text-3xl text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(!isOpen)}>
                    <X />
                </button>
            </div>
            <Categories active={active} setActive={setActive} categorias={categorias} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Filters;
