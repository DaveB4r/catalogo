import { IVariationsData } from '@/interfaces/IVariations';
import { Plus, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {
    isOpen: boolean;
    variationsData: IVariationsData[];
    setVariationsData: Dispatch<SetStateAction<IVariationsData[]>>;
    isEditing?: boolean;
    variationEditId?: number;
    variationsError?: string;
};

const Variations = ({ isOpen, variationsData, setVariationsData, isEditing, variationEditId, variationsError }: Props) => {
    useEffect(() => {
        if (!isEditing) setVariationsData([]);
    }, [isOpen]);

    const createVariation = () => {
        const variationId = variationEditId ? variationEditId : Math.floor(Math.random() * 999999);
        setVariationsData((prev) => [...prev, { id: variationId, nombre: '', opciones: '' }]);
    };

    const deleteVariation = (id: number) => {
        setVariationsData((prev) => prev.filter((item) => item.id !== id));
    };
    return (
        <div className="space-y-2">
            <div className="flex flex-col space-y-2">
                {variationsData.map((item, index) => (
                    <div key={index} className="my-2 border-t-1 border-t-black py-2">
                        <div className="mb-2 space-y-2">
                            <Label htmlFor={`name-variation-${item.id}`}>Nombre Variacion {index + 1}</Label>
                            <Input
                                type="text"
                                id={`name-variation-${item.id}`}
                                placeholder="Ejemplo: Color"
                                value={item.nombre}
                                onChange={(e) =>
                                    setVariationsData((prev) => prev.map((i) => (i.id === item.id ? { ...i, nombre: e.target.value } : i)))
                                }
                                className={`${variationsError && !item.nombre && 'border border-red-500'}`}
                            />
                            {variationsError && !item.nombre && <small className="text-sm text-destructive">{variationsError}</small>}
                        </div>
                        <div className="mb-2 space-y-2">
                            <Label htmlFor={`opt-variation-${index}`}>Opciones Variacion {index + 1}</Label>
                            <Input
                                type="text"
                                id={`opt-variation-${item.id}`}
                                placeholder="Separados por coma, Ejemplo: Rojo, Azul, Amarillo"
                                value={item.opciones}
                                onChange={(e) =>
                                    setVariationsData((prev) => prev.map((i) => (i.id === item.id ? { ...i, opciones: e.target.value } : i)))
                                }
                                className={`${variationsError && !item.opciones && 'border border-red-500'}`}
                            />
                            {variationsError && !item.opciones && <small className="text-sm text-destructive">{variationsError}</small>}
                        </div>
                        <div className="mb-2 space-y-2">
                            <Button type="button" variant="destructive" onClick={() => deleteVariation(item.id)}>
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <p className='text-sm text-red-600 text-right'>Si el producto requiere variaciones presione el boton Añadir Variaciones</p>
            <Button variant="default" type="button" className='self-end float-end mb-4 cursor-pointer' onClick={createVariation}>
                <Plus />
                Añadir Variacion
            </Button>
        </div>
    );
};

export default Variations;
