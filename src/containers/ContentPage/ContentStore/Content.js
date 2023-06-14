import { runInAction } from 'mobx';

import { historyPush } from 'routes/routes';

export default class ContentStore {
  async getList(callbackOnSuccess, callbackOnError) {
    try {
      const results = true;
      if (results) {
        // const getListInfoAPIService = new AesirxCmsContentTypeApiService();
        // const respondedData = await getListInfoAPIService.getList();
        if (results) {
          runInAction(() => {
            callbackOnSuccess(results);
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
      // const getListInfoAPIService = new AesirxContentXCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(data.id);
      console.log('Store getDetail', id);
      if (id) {
        runInAction(() => {
          callbackOnSuccess({
            id: id,
            name: 'Name response',
            alias: 'alias response',
            organisation: { label: 'test', value: 1 },
            description: 'description',
            allow_frontend: 'true',
            upload_new_media: 'data response',
          });
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

  async getListByFilter(filter, callbackOnSuccess, callbackOnError) {
    console.log('filter', filter);
    // call api
    // const getListInfoAPIService = new AesirxContentXCategoryApiService();
    // const respondedData = await getListInfoAPIService.getDetail(data.id);
    if (filter) {
      runInAction(() => {
        callbackOnSuccess(filter);
      });
    } else {
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  }
  catch(error) {
    console.log('API - Get Content: ' + error);
    return null;
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

  async updateDetail(data, redirect, callbackOnSuccess, callbackOnError) {
    console.log('data UpdateDetail', data);
    // call api
    // const getListInfoAPIService = new AesirxContentXCategoryApiService();
    // const respondedData = await getListInfoAPIService.getDetail(data.id);
    if (data) {
      runInAction(() => {
        callbackOnSuccess(data);
      });
      setTimeout(() => {
        if (redirect) {
          historyPush('/content');
        }
      }, 2000);
    } else {
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
      console.log('Error');
    }
  }

  async handleCreate(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      // const getListInfoAPIService = new AesirxContentXCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(data.id);
      console.log('Store handleCreate', data);
      if (data) {
        runInAction(() => {
          callbackOnSuccess(data);
        });
        setTimeout(() => {
          if (redirect) {
            historyPush('/content');
          }
        }, 2000);
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

  async handleDelete(id, callbackOnSuccess, callbackOnError) {
    console.log('id', id);
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
            message: 'Something went wrong from Server response',
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
