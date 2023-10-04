

export const apis = {
  baseUrl: "https://automobile.herokuapp.com/",
  // baseUrl: "http://localhost:3001/",

  vehicle: {
    add: "vehicle/addVehicle",
    getAll: "vehicle/get/getAllVehicle",
    get: "vehicle",
    update: "vehicle/updateVehicle",
    delete: "vehicle/deleteVehicle",
  },
  product: {
    add: "category/addCategory",
    getAll: "category/getAllCategory",
    get: "category",
    delete: "category/deleteCategory",
    update: "category/updateCategory",
  },
  company: {
    add: "brand/addBrand",
    getAll: "brand/getAllBrand",
    get: "brand/getBrandByIdForDashboard",
    delete: "brand/deleteBrand",
    update: "brand/updateBrand",
  },

  model: {
    add: "model/addModel",
    getAll: "model/getAllModel",
    get: "model/getCategoryManProduct/",
    delete: "model/deleteModel",
    update: "model/updateModel",
  },
  items: {
    add: "product/addProduct",
    getAll: "product/get/All",
    get: "product/",
    delete: "product/delete/",
    edit: "product/updateProduct/",
    stockStatus:"product/stockUpdate/",
    exportData:'product/data/exportData'
  },
  manufacture: {
    add: "manufacturer/addManufacturer/",
    getAll: "manufacturer/getAllManufacturer",
    get: "manufacturer/",
    delete: "manufacturer/deleteManufacturer/",
    edit: "manufacturer/updateManufacturer/",
  },
  getAllData: "vehicle/getSegmentBrandModel/all",
  getAllUsers: "user/getAllUser",
  bulkUpload: "product/bulkAddProduct",
  activeUser: "user/userActiveInactive/",
  deleteUsers: "user/deleteUser/",
 

  contain: {
    addabout: "aboutus/create",
    getAbout: "aboutus/getAll",
    updataAbout: "aboutus/updateData/",
    addPrivacy: "privacypolicy/create",
    getPrivacy: "privacypolicy/getAll",
    updatePrivacy: "privacypolicy/updateData/",
    addTerm: "termConditon/create",
    getTermsCondition: "termConditon/getAll",
    updateTerms: "termConditon/updateData/",
  },
  promo: {
    add: "promo/addpromo",
    getAllPromo: "promo/allpromo",
    getPromoId: "promo/",
    updatePromo: "promo/",
    deletePromo: "promo/",
  },
  mechanic: {
    addMechanic: "mechanic/addMechanic",
    getAllMechanic: "mechanic/getAllMechanicData",
    getMechanicId: "mechanic/getMechanic",
    updateMechanic: "mechanic/updateMechanic",
    deleteMechanic: "mechanic/deleteMechanical",
    isActive :"mechanic/isActive"
  },
  payment: {
    gerAllPayment: "payment/getallpayment",
  },
};
