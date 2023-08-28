export const randomIdGenerate = () => {
    return (Date.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
}