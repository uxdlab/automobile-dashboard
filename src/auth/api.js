export const apis = {
    baseUrl: "https://ob0xnxnfil.execute-api.ap-southeast-1.amazonaws.com/dev/",
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
        get: 'model',
        delete: 'model/deleteModel',
        update: 'model/updateModel',
    },
    items: {
        add: 'item/addItem',
        getAll: 'item/get/All',
        get: 'item/',
        delete:'item/delete/',
        edit:'item/updateItem/'
    },
    manufacture: {
        add: 'manufacturer/addManufacturer/',
        getAll: 'manufacturer/getAllManufacturer',
        get: 'manufacturer/',
        delete:'item/delete/',
        edit:'manufacturer/updateManufacturer/'
    }



}





