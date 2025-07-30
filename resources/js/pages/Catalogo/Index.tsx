import CustomCard from '@/components/custom/CustomCard';
import Footer from '@/components/custom/Footer';
import Navbar from '@/components/custom/Navbar';
import { Button } from '@/components/ui/button';
import { ICategorias } from '@/interfaces/ICategorias';
import { IProducto } from '@/interfaces/IProducto';
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
    const [numColumns, setNumColumns] = useState('grid-cols-2');
    const [productosVirtual, setProductosVirtual] = useState<IProducto[]>([]);
    const [active, setActive] = useState('todas');

    useEffect(() => {
        setProductosVirtual(
            productos.filter((producto) => {
                if (active !== 'todas') {
                    return producto.categoria === active;
                }
                return producto.id !== 0;
            }),
        );
    }, [active, productos]);

    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl">
            <Navbar phone={phone} logo={logo} name={name} categorias={categorias} active={active} setActive={setActive} />
            <div className="my-4 ml-4 self-start md:hidden">
                {numColumns === 'grid-cols-2' ? (
                    <Button variant="outline" size="sm" onClick={() => setNumColumns('grid-cols-1')}>
                        <Square /> 1 Columna
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setNumColumns('grid-cols-2')}>
                        <Columns2 /> 2 Columnas
                    </Button>
                )}
            </div>
            <div className={`mb-10 grid ${numColumns} min-h-[calc(100vh-148px)] gap-2 px-2 md:mx-10 md:grid-cols-3 lg:grid-cols-4`}>
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
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}
