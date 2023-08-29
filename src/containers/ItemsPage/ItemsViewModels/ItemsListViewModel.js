import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'aesirx-uikit';
class ItemsListViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.LOADING;

  tableData = [];

  pagination = {};

  filters = {
    'list[limitstart]': 0,
    'list[limit]': 20,
    'filter[search]': '',
    'list[direction]': '',
    views: 'all',
  };

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.getListItems();
  };

  // resetFilter = () => {
  //   this.filters = {
  //     views: 'all',
  //     'list[limitstart]': 0,
  //     limit: 10,
  //     page: 1,
  //   };
  // };

  resetObservable = () => {
    // this.resetFilter();
    this.tableData = [];
    this.formStatus = PAGE_STATUS.LOADING;
  };

  getListItems = async () => {
    await this.itemsStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.filters
    );
  };

  getListByFilter = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.filters
    );

    this.formStatus = PAGE_STATUS.READY;
  };

  handleDelete = async (data, msg) => {
    if (data?.length > 1) {
      notify(msg, 'error');
      return;
    }
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.deleteItems(
      data[0],
      this.callbackOnSuccessDeleteHandler,
      this.callbackOnErrorHandler
    );
  };

  toggleFeatured = async (id, isFeatured) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.toggleFeatured(
      id,
      isFeatured,
      this.callbackOnSuccessToggleFeatured,
      this.callbackOnErrorHandler
    );
  };

  handlePagination = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.getListItems();
  };

  callbackOnSuccessToggleFeatured = async () => {
    await this.getListItems();
    notify('txt_successfuly');
  };

  callbackOnSuccessDeleteHandler = async () => {
    await this.getListItems();
    notify('txt_delete_success');
  };

  callbackOnErrorHandler = () => {
    notify('txt_unsuccess', 'error');
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      this.tableData = result?.results?.items ?? [];
      this.pagination = result?.pagination;
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsListViewModel;
