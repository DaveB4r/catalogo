import { IForm } from '@/interfaces/IForm';

import { IVariationsData } from '@/interfaces/IVariations';
import { Plus } from 'lucide-react';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Variations from './Variations';

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
    variationsData?: IVariationsData[];
    setVariationsData?: Dispatch<SetStateAction<IVariationsData[]>>;
};

export default function CustomPopup({
    isOpen,
    setIsOpen,
    buttonName,
    dialogTitle,
    form,
    processing,
    preview,
    onClick,
    hasVariations,
    variationsData,
    setVariationsData,
}: Props) {
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
                    {hasVariations && variationsData && setVariationsData && (
                        <Variations isOpen={isOpen} variationsData={variationsData} setVariationsData={setVariationsData} />
                    )}
                    <Button type="submit" disabled={processing}>
                        {form.buttonSubmit}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
