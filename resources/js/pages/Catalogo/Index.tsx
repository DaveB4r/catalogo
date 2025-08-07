import CustomCard from '@/components/custom/CustomCard';
import FloatButton from '@/components/custom/FloatButton';
import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import OrderBy from '@/components/custom/OrderBy';
import ProductView from '@/components/custom/ProductView';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ICategorias } from '@/interfaces/ICategorias';
import { IProducto } from '@/interfaces/IProducto';
import { Head } from '@inertiajs/react';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Columns2, Square } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
    logo: string;
    name: string;
    phone: string;
    productos: IProducto[];
    categorias: ICategorias[];
};

export default function CatalogoIndex({ productos, phone, name, logo, categorias }: Props) {
    const params = new URLSearchParams(window.location.search);
    const [numColumns, setNumColumns] = useState('columns-2');
    const [productosVirtual, setProductosVirtual] = useState<IProducto[]>([]);
    const [active, setActive] = useState('todas');
    const [producto, setProducto] = useState<IProducto | null>(null);
    const [productoId, setProductoId] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [orderBy, setOrderBy] = useState('nombreAsc');

    useEffect(() => {
        let productToView = productoId !== 0 ? productoId : Number(params.get('p'));
        if (productoId === 0 && params.size > 0) {
            setOpenDialog(true);
        }
        if (productToView > 0) {
            setProducto(productos.filter((producto) => producto.id === productToView)[0]);
        }
    }, [productoId]);

    useEffect(() => {
        setProductosVirtual(
            productos
                .filter((producto) => {
                    if (active !== 'todas') {
                        return producto.categoria === active;
                    }
                    return producto.id !== 0;
                })
                .sort((a, b) => {
                    if (orderBy == 'nombreAsc') {
                        return String(a.nombre).toLowerCase().localeCompare(String(b.nombre).toLowerCase());
                    } else if (orderBy == 'nombreDesc') {
                        return String(b.nombre).toLowerCase().localeCompare(String(a.nombre).toLowerCase());
                    } else if (orderBy == 'categoriaAsc') {
                        return String(a.categoria).toLowerCase().localeCompare(String(b.categoria).toLowerCase());
                    } else if (orderBy == 'categoriaDesc') {
                        return String(b.categoria).toLowerCase().localeCompare(String(a.categoria).toLowerCase());
                    } else if (orderBy == 'precioAsc') {
                        return Number(a.precio.replaceAll('.', '')) - Number(b.precio.replaceAll('.', ''));
                    } else if (orderBy == 'precioDesc') {
                        return Number(b.precio.replaceAll('.', '')) - Number(a.precio.replaceAll('.', ''));
                    } else {
                        return a.id - b.id;
                    }
                }),
        );
    }, [active, productos, orderBy]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-none">
            <Head title={name} />
            <Navbar logo={logo} name={name} categorias={categorias} active={active} setActive={setActive} />
            <div className="flex w-full justify-between p-4 md:justify-end">
                {numColumns === 'columns-2' ? (
                    <Button variant="outline" size="sm" onClick={() => setNumColumns('columns-1')} className="md:hidden">
                        <Square /> 1 Columna
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setNumColumns('columns-2')} className="md:hidden">
                        <Columns2 /> 2 Columnas
                    </Button>
                )}
                <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
            </div>
            <div className={`mb-10 ${numColumns} min-h-[calc(100vh-148px)] gap-1 px-2 md:mx-10 md:columns-3 lg:columns-4`}>
                {productosVirtual.map((producto) => (
                    <CustomCard
                        key={producto.id}
                        id={producto.id}
                        title={producto.nombre}
                        price={producto.precio}
                        image={producto.imagen}
                        category={producto.categoria}
                        category_id={producto.categoria_id}
                        admin={false}
                        type="product"
                        variations={`${producto.variations_ids}++${producto.variations_nombres}++${producto.variations_opciones}`}
                        numColumns={numColumns}
                        setProductId={setProductoId}
                        setOpenDialog={setOpenDialog}
                    />
                ))}
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="flex max-h-[calc(100vh-20%)] min-w-[calc(100vw-5%)] flex-col overflow-y-auto md:min-w-[calc(100vw-50%)]">
                    <DialogHeader>
                        <DialogTitle>Detalles del producto</DialogTitle>
                        <DialogDescription>
                            Vista detallada <span className="font-black">{producto?.nombre}</span>
                        </DialogDescription>
                    </DialogHeader>
                    {producto && <ProductView producto={producto} />}
                </DialogContent>
            </Dialog>
            <FloatButton phone={phone} />
            <Footer />
        </div>
    );
}
