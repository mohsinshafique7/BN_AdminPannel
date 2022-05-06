import _ from "lodash";
import { notification } from "antd";
export const searchSort = (data, searchValue, sortedValue, searchParam, reverse) => {
  let filterData = data;

  const isReverseData = (sortedData) => {
    if (reverse) {
      filterData = sortedData.reverse();
    } else {
      filterData = sortedData;
    }
  };

  if (data && data.length) {
    switch (sortedValue) {
      case "createdAt": {
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        isReverseData(sortedData);

        break;
      }
      case "brand":
      case "manufacturer":
      case "retailer":
      case "productGroup":
      case "company":
      case "sourceCategory":
      case "category": {
        const sortedData = data.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "categoryParser": {
        const sortedData = data.sort((a, b) => {
          if (a.category.toLowerCase() < b.category.toLowerCase()) {
            return -1;
          }
          if (a.category.toLowerCase() > b.category.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "coreProduct": {
        const sortedData = data.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "categoryType": {
        const sortedData = data.sort((a, b) => {
          if (a.categoryType.toLowerCase() < b.categoryType.toLowerCase()) {
            return -1;
          }
          if (a.categoryType.toLowerCase() > b.categoryType.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "retailerParser": {
        const sortedData = data.sort((a, b) => {
          if (a.retailer.toLowerCase() < b.retailer.toLowerCase()) {
            return -1;
          }
          if (a.retailer.toLowerCase() > b.retailer.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "manufacturerBrand": {
        const sortedData = data
          .sort((a, b) => {
            if (a.manufacture) {
              return -1;
            }
          })
          .sort((a, b) => {
            if (a.manufacture) {
              if (a.manufacture.name.toLowerCase() < b.manufacture.name.toLowerCase()) {
                return -1;
              }
              if (a.manufacture.name.toLowerCase() > b.manufacture.name.toLowerCase()) {
                return 1;
              }
              return 0;
            }
          });

        isReverseData(sortedData);

        break;
      }
      case "id": {
        const sortedData = data.sort((a, b) => a.id - b.id);

        isReverseData(sortedData);

        break;
      }
      case "ean": {
        const sortedData = data.sort((a, b) => a.ean - b.ean);

        isReverseData(sortedData);

        break;
      }
      case "productCount": {
        const sortedData = data.sort((a, b) => Number(b.productCount) - Number(a.productCount));

        isReverseData(sortedData);

        break;
      }
      case "name": {
        const sortedData = data.sort((a, b) => {
          if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
            return -1;
          }
          if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "email": {
        const sortedData = data.sort((a, b) => {
          if (a.email.toLowerCase() < b.email.toLowerCase()) {
            return -1;
          }
          if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "userEmail": {
        const sortedData = data.sort((a, b) => {
          if (a.user !== null && b.user === null) {
            return 1;
          }
          if (a.user === null && b.user !== null) {
            return -1;
          }
          if (a.user === null && b.user === null) {
            return 0;
          }
          if (a.user.email.toLowerCase() < b.user.email.toLowerCase()) {
            return -1;
          }
          if (a.user.email.toLowerCase() > b.user.email.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "companyName": {
        const sortedData = data.sort((a, b) => {
          if (a.company !== null && b.company === null) {
            return 1;
          }
          if (a.company === null && b.company !== null) {
            return -1;
          }
          if (a.company === null && b.company === null) {
            return 0;
          }
          if (a.company.name.toLowerCase() < b.company.name.toLowerCase()) {
            return -1;
          }
          if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "companyUser": {
        const sortedData = data.sort((a, b) => {
          if (a.company.name.toLowerCase() < b.company.name.toLowerCase()) {
            return -1;
          }
          if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "error": {
        const sortedData = data.sort((a, b) => {
          if (a.message.toLowerCase() < b.message.toLowerCase()) {
            return -1;
          }
          if (a.message.toLowerCase() > b.message.toLowerCase()) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      case "type": {
        const sortedData = data.sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });

        isReverseData(sortedData);

        break;
      }
      default:
        break;
    }

    return filterData.filter((item) => {
      if (searchValue) {
        if (Array.isArray(searchParam)) {
          return (
            item[searchParam[0]].toLowerCase().includes(searchValue.toLowerCase()) ||
            item[searchParam[1]].toLowerCase().includes(searchValue.toLowerCase())
          );
        } else {
          return item[searchParam].toLowerCase().includes(searchValue.toLowerCase());
        }
      }
      return item;
    });
  }

  return filterData;
};

export const deepSearch = (findBy, childrenP, tree, value) => {
  const toCheck = [...tree];
  let item = null;
  while ((item = toCheck.pop())) {
    if (item[findBy] === value) {
      return item;
    }
    if (item[childrenP]) {
      toCheck.unshift(...item[childrenP]);
    }
  }
};

export const renderTableData = (page, perPage, dataSource) => {
  const limit = page * perPage + perPage < dataSource.length ? page * perPage + perPage : dataSource.length;
  return dataSource.slice(page * perPage, limit);
};
export const getFilter = (data, name) => {
  return _.uniq(_.map(data, name)).map((item) => {
    return { text: item, value: item };
  });
};
export const setColor = (color) => {
  return { backgroundColor: color, padding: "10px", border: "1px solid green" };
};

export const openNotification = (type, message = "Error", description = "An Error Occured") => {
  notification[type]({
    message,
    description,
  });
};
