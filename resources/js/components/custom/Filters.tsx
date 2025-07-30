import { ICategorias } from '@/interfaces/ICategorias';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    categorias: ICategorias[];
};

const Filters = ({ isOpen, setIsOpen, active, setActive, categorias }: Props) => {
    const changeActive = (thisActive: string) => {
        setActive(thisActive);
        setIsOpen(!isOpen);
    };

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
            <div className="flex-grow overflow-y-auto p-4">
                <h3 className="text-lg font-bold capitalize">Categorias</h3>
                {categorias.length === 0 ? (
                    <p className="text-center text-gray-500">No hay categorias</p>
                ) : (
                    <ul className="flex list-none flex-col flex-wrap gap-2">
                        <li>
                            <Button
                                variant="link"
                                className={`cursor-pointer text-lg ${active === 'todas' && 'underline'}`}
                                onClick={() => changeActive('todas')}
                            >
                                Todas
                            </Button>
                        </li>
                        {categorias.map((categoria) => (
                            <li key={categoria.id}>
                                <Button
                                    variant="link"
                                    className={`cursor-pointer text-lg ${active === categoria.nombre && 'underline'}`}
                                    onClick={() => changeActive(categoria.nombre)}
                                >
                                    {categoria.nombre}
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Filters;
