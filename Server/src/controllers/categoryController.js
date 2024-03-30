import Category from '../models/categoryModel.js';

// Lấy tất cả danh mục
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh mục con của một danh mục cụ thể
export const getChildrenCategories = async (req, res) => {
  const parentId = req.params.id;
  try {
    const childrenCategories = await Category.find({ parent: parentId });
    res.json(childrenCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy một danh mục cụ thể
export const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm một danh mục mới (bao gồm cả danh mục con)
export const createCategory = async (req, res) => {
  const { name, children } = req.body;

  try {
    const newCategory = new Category({ name, children });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Thêm danh mục con cho một danh mục cha cụ thể
export const createChildCategory = async (req, res) => {
  const parentId = req.params.id;
  const { name } = req.body;

  try {
    const newChildCategory = { name };
    const savedParentCategory = await Category.findByIdAndUpdate(parentId, { $push: { children: newChildCategory } }, { new: true });
    res.status(201).json(savedParentCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Cập nhật một danh mục
export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, children } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, children }, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật danh mục con của một danh mục cha cụ thể
export const updateChildCategory = async (req, res) => {
  const { parentId, childId } = req.params;
  const { name } = req.body;

  try {
    const updatedParentCategory = await Category.findOneAndUpdate(
      { _id: parentId, 'children._id': childId },
      { $set: { 'children.$.name': name } },
      { new: true }
    );
    res.json(updatedParentCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Xóa một danh mục
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa danh mục con của một danh mục cha cụ thể
export const deleteChildCategory = async (req, res) => {
  const { parentId, childId } = req.params;

  try {
    const updatedParentCategory = await Category.findByIdAndUpdate(
      parentId,
      { $pull: { children: { _id: childId } } },
      { new: true }
    );
    res.json(updatedParentCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};