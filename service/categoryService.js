const categoryRepository = require('../repository/categoryRepository');
const logger = require('@condor-labs/logger');

const gellAllCategory = (limite, desde) => categoryRepository.getAllCategorys(limite, desde);
const getCategoryByCode = (code) => categoryRepository.getCategoryByCode(code);
const saveCategory = (category) => categoryRepository.saveCategory(category);
const updateCategory = (code, category) => categoryRepository.updateCategory(code, category);

module.exports = {
    gellAllCategory,
    getCategoryByCode,
    saveCategory,
    updateCategory
};