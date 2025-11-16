export const formatWithSeparator = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '');
    return cleaned ? Number(cleaned).toLocaleString('es-CO') : '';
};
