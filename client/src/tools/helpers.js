export const generateId = (prefix = 'id') => `${prefix}-${Math.random()}`.replace('.', '');
