import { Copyright } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t-2 border-t-blue-900">
            <p className="md:text md flex items-center justify-center gap-2 py-4 text-sm text-gray-700">
                <Copyright /> Todos los derechos reservados micatalogofacil.
            </p>
        </footer>
    );
};

export default Footer;
