import { AesirxContentXCategoryApiService } from 'aesirx-lib';
import { runInAction } from 'mobx';
import { history } from 'aesirx-uikit';

export default class CategoriesStore {
  async getList(filters, callbackOnSuccess, callbackOnError) {
    try {
      const results = true;
      if (results) {
        const getListInfoAPIService = new AesirxContentXCategoryApiService();
        const respondedData = await getListInfoAPIService.getList(filters);
        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }

  async getDetail(id, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      const getListInfoAPIService = new AesirxContentXCategoryApiService();
      const respondedData = await getListInfoAPIService.getDetail(id);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }

  async handleCreate(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      const getListInfoAPIService = new AesirxContentXCategoryApiService();
      const respondedData = await getListInfoAPIService.create(data);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
        if (redirect) {
          history.push('/categories');
        } else {
          history.push(`/categories-edit/${respondedData?.id}`);
        }
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }

  async updateDetail(data, redirect, callbackOnSuccess, callbackOnError) {
    // call api
    const getListInfoAPIService = new AesirxContentXCategoryApiService();
    const respondedData = await getListInfoAPIService.update(data);
    console.log('Store updateDetail', respondedData);
    if (respondedData) {
      runInAction(() => {
        callbackOnSuccess(respondedData);
      });
      if (redirect) {
        history.push('/categories');
      }
    } else {
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
      console.log('Error');
    }
  }

  async handleDelete(id, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      const getListInfoAPIService = new AesirxContentXCategoryApiService();
      const respondedData = await getListInfoAPIService.delete(id);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }

  async handleSearch(value, callbackOnSuccess, callbackOnError) {
    console.log('valueSearch', value);
    try {
      // call api
      // const getListInfoAPIService = new AesirxContentXCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (value) {
        runInAction(() => {
          callbackOnSuccess(value);
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

  async updateFeatured(id, featured, callbackOnSuccess, callbackOnError) {
    console.log('id + featured', id);
    try {
      // call api
      // const getListInfoAPIService = new AesirxContentXCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (id) {
        runInAction(() => {
          callbackOnSuccess(id);
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

  async clearData() {
    runInAction(() => {
      // categoriesStore.formPropsData = [];
    });
  }
}
