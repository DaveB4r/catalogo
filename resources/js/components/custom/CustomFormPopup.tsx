import { IForm } from '@/interfaces/IForm';
import { IVariations } from '@/interfaces/IVariations';
import { Plus, Trash2 } from 'lucide-react';
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    buttonName: string;
    dialogTitle: string;
    form: IForm;
    processing: boolean;
    preview?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    hasVariations?: boolean;
};

export default function CustomPopup({ isOpen, setIsOpen, buttonName, dialogTitle, form, processing, preview, onClick, hasVariations }: Props) {
    const [variations, setVariations] = useState<IVariations[]>([]);
    const [variationCount, setVariationCount] = useState(0);

    useEffect(() => {
        setVariations([]);
        setVariationCount(0);
    }, [isOpen]);

    const createVariation = () => {
        setVariationCount((variationCount) => variationCount + 1);
        setVariations((prev) => [
            ...prev,
            {
                id: variationCount,
                nombre: <Input type="text" id={`name-variation-${variationCount}`} placeholder="Ejemplo: Talla" />,
                opciones: <Input type="text" id={`opt-variation-${variationCount}`} placeholder="Separadas por coma ejemplo: Rojo, Azul, Amarillo" />,
            },
        ]);
    };

    const deleteVariation = (id: number) => {
        setVariations((variations) => variations.filter((variation) => variation.id !== id));
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button onClick={onClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    {buttonName}
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby="dialog-desc" className="max-h-screen overflow-y-auto sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.onSubmit} className="space-y-4">
                    {form.inputs.map((item, index) => (
                        <div className="mb-2 space-y-2" key={index}>
                            <Label htmlFor={item.inputId}>{item.label}</Label>
                            {item.selectOptions ? (
                                <Select value={item.inputValue} onValueChange={item.selectOnchange}>
                                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder={item.selectTitle} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {item.selectOptions?.map((selectOpt) => (
                                            <SelectItem key={selectOpt.id} value={selectOpt.id.toString()}>
                                                {selectOpt.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    type={item.inputType}
                                    id={item.inputId}
                                    value={item.inputValue}
                                    onChange={item.inputOnchange}
                                    placeholder={item.placeholder}
                                />
                            )}
                        </div>
                    ))}
                    {preview && (
                        <div className="space-y-2">
                            <img src={preview} alt="imagen" width={270} height={150} className="h-36 w-36 rounded-xl object-cover" />
                        </div>
                    )}
                    {hasVariations && (
                        <div className="space-y-2">
                            <div className="flex flex-col space-y-2">
                                {variations.map((item, index) => (
                                    <div key={index} className="my-2 border-t-1 border-t-black py-2">
                                        <div className="mb-2 space-y-2">
                                            <Label htmlFor={`name-variation-${index}`}>Nombre Variacion {index + 1}</Label>
                                            {item.nombre}
                                        </div>
                                        <div className="mb-2 space-y-2">
                                            <Label htmlFor={`opt-variation-${index}`}>Opciones Variacion {index + 1}</Label>
                                            {item.opciones}
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
                    )}
                    <Button type="submit" disabled={processing}>
                        {form.buttonSubmit}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
