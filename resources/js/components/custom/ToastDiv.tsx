import { CheckCircle2, XCircle } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
type Props = {
    toastType: string;
    toastMessage: string;
    confirm?: boolean;
    setShowConfirm?: Dispatch<SetStateAction<boolean>>;
    setConfirmDelete?: Dispatch<SetStateAction<boolean>>;
};

export default function ToastDiv({ toastType, toastMessage, confirm, setShowConfirm, setConfirmDelete }: Props) {
    return (
        <div
            className={`fixed top-4 right-4 z-50 flex flex-col items-center gap-2 rounded-lg p-4 shadow-lg ${confirm ? 'bg-white' : toastType === 'success' || toastType === 'success_categoria' || toastType === 'success_user' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} animate-in fade-in slide-in-from-top-5`}
        >
            <div className="mt-5 flex w-full justify-between gap-4">
                {toastType === 'success' || toastType === 'success_categoria' || toastType === 'success_user' ? (
                    <CheckCircle2 className="h-5 w-5" />
                ) : (
                    <XCircle className="h-5 w-5" />
                )}
                <span>{toastMessage}</span>
            </div>
            {confirm && setConfirmDelete && setShowConfirm && (
                <div className="mt-5 flex w-full justify-between">
                    <Button
                        onClick={() => {
                            setConfirmDelete(true);
                            setShowConfirm(false);
                        }}
                        variant="destructive"
                    >
                        Eliminar
                    </Button>
                    <Button onClick={() => setShowConfirm(false)} variant="default">
                        Cancelar
                    </Button>
                </div>
            )}
        </div>
    );
}
