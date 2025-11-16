import { CheckCircle2Icon, CircleXIcon, InfoIcon, Phone } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import AnimateSection from '../animate-ui/AnimateSection';
import { Alert, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../ui/input-group';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const FinalCTA = () => {
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
    });
    const [messageBox, setMessageBox] = useState({
        visible: false,
        success: false,
        text: '',
    });

    useEffect(() => {
        if (messageBox.visible) {
            setTimeout(() => {
                setMessageBox({ visible: false, success: false, text: '' });
            }, 5000);
        }
    }, [messageBox]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(false);
        if (!formData.company || !formData.email || !formData.name) {
            setMessageBox({
                visible: true,
                success: false,
                text: 'Por favor compete los campos requeridos!',
            });
            setError(true);
            return;
        }
        // Construct the WhatsApp Message
        const whatsappMessage = `¡Hola! Estoy interesado en crear mi catalogo con ustedes!\n
      ¿Que ventajas me ofrece crear un catalogo con ustedes?

      *Datos de Contacto*
      Nombre: ${formData.name}
      Email: ${formData.email}
      Teléfono: ${formData.phone}
      Empresa: ${formData.company}

      *Mensaje adicional:*
      ${formData.message}
      `.trim();

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Whatsapp number
        const whatsappNumber = '573007108782';

        // Construct the Whatsapp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        setMessageBox({
            visible: true,
            success: true,
            text: '¡Redirigiendo a WhatsApp! Por favor, confirma el envío del mensaje.',
        });
        window.open(whatsappUrl, '_blank');

        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
        });
    };

    return (
        <AnimateSection id="final-cta" className="bg-white py-20" duration={8}>
            <div className="mx-auto flex max-w-5xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
                <h2 className="mb-6 text-3xl font-extrabold md:text-5xl">¡Deja de perder ventas!</h2>
                <p className="mb-10 text-xl">
                    Únete a cientos de emprendedores que ya tienen su catálogo profesional con carrito de compras.
                    <br />
                    Completa el formulario y nos pondremos en contacto contigo para mostrarte cómo nuestro catalogo puede transformar tu negocio.
                </p>
                {messageBox.visible && (
                    <Alert variant={messageBox.success ? 'default' : 'destructive'}>
                        {messageBox.success ? <CheckCircle2Icon /> : <CircleXIcon />}
                        <AlertTitle>{messageBox.text}</AlertTitle>
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="w-full space-y-4 self-center md:w-6/12">
                    <InputGroup className='border-none'>
                        <InputGroupInput
                            id="name"
                            placeholder="John Doe"
                            type="text"
                            className="my-2"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="name" className='font-black'>
                                Nombre Completo <span className="text-red-700">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton variant="ghost" aria-label="Help" className="ml-auto rounded-full" size="icon-xs">
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Tu Nombre Completo para un trato mas cercano!</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className='border-none'>
                        <InputGroupInput
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="text"
                            className="my-2"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="email" className='font-black'>
                                Correo <span className="text-red-700">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton variant="ghost" aria-label="Help" className="ml-auto rounded-full" size="icon-xs">
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingresa tu correo para obtener informacion y promociones a futuro!</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className='border-none'>
                        <InputGroupInput
                            id="phone"
                            placeholder="3014155895"
                            type="tel"
                            className="my-2"
                            onChange={handleChange}
                            value={formData.phone}
                        />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="name" className='font-black'>
                                Número de Teléfono (WhatsApp) <span className="text-red-700">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton variant="ghost" aria-label="Help" className="ml-auto rounded-full" size="icon-xs">
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingresa tu Whatsapp para una comunicacion mas fluida!</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className='border-none'>
                        <InputGroupInput
                            id="company"
                            placeholder="Distrito F"
                            type="text"
                            className="my-2"
                            onChange={handleChange}
                            value={formData.company}
                        />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="name" className='font-black'>
                                Nombre de la Empresa <span className="text-red-700">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton variant="ghost" aria-label="Help" className="ml-auto rounded-full" size="icon-xs">
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingresa tu empresa para ofrecerte un abanico de opciones!</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className='border-none'>
                        <Textarea id="message" placeholder="Quiero saber mas" className="my-2 border-none" onChange={handleChange} value={formData.message} />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="name" className='font-black'>
                                Mensaje <span className="text-red-700">*</span>
                            </Label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <InputGroupButton variant="ghost" aria-label="Help" className="ml-auto rounded-full" size="icon-xs">
                                        <InfoIcon />
                                    </InputGroupButton>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ingresa lo que nos quieres decir!</p>
                                </TooltipContent>
                            </Tooltip>
                        </InputGroupAddon>
                    </InputGroup>
                    <Button variant="default" size="lg" type="submit">
                        <Phone /> Contactar
                    </Button>
                </form>
            </div>
        </AnimateSection>
    );
};

export default FinalCTA;
