export const apis = {
    baseUrl: "https://automobile.herokuapp.com/",
    // baseUrl: "https://automobile-f7cf.onrender.com/",

    vehicle: {
        add: "vehicle/addVehicle",
        getAll: 'vehicle/get/getAllVehicle',
        get: 'vehicle',
        update: 'vehicle/updateVehicle',
        delete: 'vehicle/deleteVehicle'
    },
    product: {
        add: "category/addCategory",
        getAll: 'category/getAllCategory',
        get: 'category',
        delete: 'category/deleteCategory',
        update: 'category/updateCategory',
    },
    company: {
        add: "brand/addBrand",
        getAll: 'brand/getAllBrand',
        get: 'brand',
        delete: 'brand/deleteBrand',
        update: 'brand/updateBrand',
    },

    model: {
        add: "model/addModel",
        getAll: 'model/getAllModel',
        get: 'model/getCategoryManProduct/',
        delete: 'model/deleteModel',
        update: 'model/updateModel',
    },
    items: {
        add: 'product/addProduct',
        getAll: 'product/get/All',
        get: 'product/',
        delete:'product/delete/',
        edit:'product/updateProduct/'
    },
    manufacture: {
        add: 'manufacturer/addManufacturer/',
        getAll: 'manufacturer/getAllManufacturer',
        get: 'manufacturer/',
        delete:'manufacturer/deleteManufacturer/',
        edit:'manufacturer/updateManufacturer/'
    },
    getAllData:'vehicle/getSegmentBrandModel/all'




}





