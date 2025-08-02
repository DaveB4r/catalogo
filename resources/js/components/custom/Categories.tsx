import { ICategorias } from '@/interfaces/ICategorias';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

type Props = {
    categorias: ICategorias[];
    horizontal?: boolean;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

const Categories = ({ categorias, active, setActive, horizontal, setIsOpen }: Props) => {
    const changeActive = (thisActive: string) => {
        setActive(thisActive);
        if (setIsOpen) setIsOpen((isOpen) => !isOpen);
    };
    return (
        <div className={`flex-grow p-4 ${horizontal ? 'overflow-x-auto max-w-screen' : 'overflow-y-auto'}`}>
            {!horizontal && <h3 className="text-lg font-bold capitalize">Categorias</h3>}
            {categorias.length === 0 ? (
                <p className="text-center text-gray-500">No hay categorias</p>
            ) : (
                <ul className={`flex list-none ${horizontal ? 'max-w-full' : 'flex-col flex-wrap'} gap-2`}>
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
    );
};

export default Categories;
