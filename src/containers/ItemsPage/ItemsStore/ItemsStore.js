import { runInAction } from 'mobx';
import { AesirxContentXItemsApiService } from 'aesirx-lib';

export default class ItemsStore {
  // List Page
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListItemsAPIService = new AesirxContentXItemsApiService();
      const results = await getListItemsAPIService.getList(filters);
      if (results) {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      } else {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      }
    } catch (error) {
      callbackOnError(error);
    }
  }

  async deleteItems(data, callbackOnSuccess, callbackOnError) {
    try {
      const getListInfoAPIService = new AesirxContentXItemsApiService();
      const respondedData = await getListInfoAPIService.deleteItems(data);

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async toggleFeatured(id, isFeatured, callbackOnSuccess, callbackOnError) {
    try {
      const getListItemsAPIService = new AesirxContentXItemsApiService();
      const results = await getListItemsAPIService.toggleFeatured(id, isFeatured);
      if (results) {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      } else {
        runInAction(() => {
          callbackOnError(results);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  // Create || Edit Page
  async getFields(contentTypeId, callbackOnSuccess, callbackOnError) {
    try {
      const getFieldsAPIService = new AesirxContentXItemsApiService();
      const respondedData = await getFieldsAPIService.getFields(contentTypeId);

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getDetail(itemId, callbackOnSuccess, callbackOnError) {
    try {
      const getItemsDetailAPIService = new AesirxContentXItemsApiService();
      const respondedData = await getItemsDetailAPIService.getDetail(itemId);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async createItem(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      const createItemsAPIService = new AesirxContentXItemsApiService();
      const response = await createItemsAPIService.createItem(data);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, redirect);
        });
      } else {
        runInAction(() => {
          callbackOnError(response);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateItem(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      const updateItemsAPIService = new AesirxContentXItemsApiService();
      const response = await updateItemsAPIService.updateItem(data);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, redirect);
        });
      } else {
        runInAction(() => {
          callbackOnError(response);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
  async handlePagination(page, callbackOnSuccess, callbackOnError) {
    console.log('handlePagination', page);
    try {
      // call api
      // const getListInfoAPIService = new AesirxContentXCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (page) {
        runInAction(() => {
          callbackOnSuccess(page);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong !',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }
}
