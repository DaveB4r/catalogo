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
    lastVariationId: number;
};

const Variations = ({ isOpen, variationsData, setVariationsData, isEditing, lastVariationId }: Props) => {
    useEffect(() => {
        if (!isEditing) setVariationsData([]);
    }, [isOpen]);

    const createVariation = () => {
        const plus = isEditing ? 1 : variationsData.length + 1;
        console.log(lastVariationId,plus)
        setVariationsData((prev) => [...prev, { id: lastVariationId + plus, nombre: '', opciones: '' }]);
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
                            <Label htmlFor={`name-variation-${item.id}`}>Nombre Variacion {item.id}</Label>
                            <Input
                                type="text"
                                id={`name-variation-${item.id}`}
                                placeholder="Ejemplo: Color"
                                value={item.nombre}
                                onChange={(e) =>
                                    setVariationsData((prev) => prev.map((i) => (i.id === item.id ? { ...i, nombre: e.target.value } : i)))
                                }
                            />
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
                            />
                        </div>
                        <div className="mb-2 space-y-2">
                            <Button type="button" variant="destructive" onClick={() => deleteVariation(item.id)}>
                                <Trash2 />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="default" type="button" onClick={createVariation}>
                <Plus />
                Añadir Variacion
            </Button>
        </div>
    );
};

export default Variations;
