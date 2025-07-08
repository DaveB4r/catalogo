
import CustomCard from '@/components/custom/CustomCard';
import Navbar from '@/components/custom/Navbar';
import { IProducto } from '@/interfaces/IProducto';

type Props = {
    productos: IProducto[];
};

export default function CatalogoIndex({ productos }: Props) {
    
    return (
        <div className="flex h-full w-full flex-1 flex-col rounded-xl justify-center items-center">
            <Navbar />
            <div className="md:mx-10 mb-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
