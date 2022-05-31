const Category = require('./models/categoryEntity');
const getAllCategorys = (limite, desde) => Category.find().skip(desde).limit(limite);
const getCategoryByCode = (code) => Category.findById(code);
const saveCategory = async (body) => {
    const category = new Category(body);
    const categoryDbMongo = await category.save();
    return categoryDbMongo;
}

const updateCategory = (code, category) => Category.findByIdAndUpdate(code,category);

module.exports = {
    getAllCategorys,
    getCategoryByCode,
    saveCategory,
    updateCategory
};