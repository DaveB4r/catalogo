import { Copyright } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-t-slate-300">
            <p className="md:text md flex items-center justify-center gap-2 py-4 text-sm text-gray-700">
                <Copyright /> Todos los derechos reservados micatalogofacil.com
            </p>
        </footer>
    );
};

export default Footer;
