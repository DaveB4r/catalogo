import CustomCard from '@/components/custom/CustomCard';
import Navbar from '@/components/custom/Navbar';
import { IProducto } from '@/interfaces/IProducto';

type Props = {
    logo: string;
    name: string;
    phone: string;
    productos: IProducto[];
};

export default function CatalogoIndex({ productos, phone, name, logo }: Props) {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl">
            <Navbar phone={phone} logo={logo} name={name} />
            <div className="mb-10 grid grid-cols-1 gap-4 md:mx-10 md:grid-cols-3 lg:grid-cols-4">
                {productos.map((producto) => (
                    <CustomCard
                        key={producto.id}
                        id={producto.id}
                        title={producto.nombre}
                        image={producto.imagen}
                        category={producto.categoria}
                        category_id={producto.categoria_id}
                        admin={false}
                        type="product"
                        sizes={producto.tallas?.split(',')}
                        colors={producto.colores?.split(',')}
                    />
                ))}
            </div>
        </div>
    );
}
