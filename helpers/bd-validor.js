const categoryService = require('../service/categoryService');
const productService = require('../service/productService');
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await categoryService.getCategoryByCode(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProducto= async (product) => {
   console.log("Consultago el producto",product);
    try {

        const existeProducto = await productService.getProductById(product._id);
        if (!existeProducto) {
            throw new Error(`El id no existe ${product._id}`);
        }
        
    } catch (error) {
        throw new Error(`El id no existe ${product._id}`);
    }
 
}

module.exports = {
    existeCategoriaPorId,existeProducto

}