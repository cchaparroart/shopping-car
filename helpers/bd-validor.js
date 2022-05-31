const categoryService = require('../service/categoryService');
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await categoryService.getCategoryByCode(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    existeCategoriaPorId
}