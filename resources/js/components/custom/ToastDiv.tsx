import { CheckCircle2, XCircle } from 'lucide-react';
type Props = {
    toastType: string;
    toastMessage: string;
};

export default function ToastDiv({ toastType, toastMessage }: Props) {
    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}
        >
            {toastType === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            <span>{toastMessage}</span>
        </div>
    );
}
