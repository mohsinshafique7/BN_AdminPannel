export const usersEditInputs = (companiesData) => {
  return {
    inputData: [
      { label: "First Name", name: "first_name", type: "text", required: true },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
      { label: "User Id", name: "id", type: "text", required: true, display: false },
    ],
    selectData: [
      {
        name: "companyId",
        value: "id",
        option: "name",
        store: companiesData,
        lable: "Select company",
        required: true,
        mode: false,
      },
      {
        name: "status",
        value: "name",
        option: "name",
        store: [{ name: "active" }, { name: "inactive" }],
        lable: "Change status",
        required: true,
        mode: false,
      },
    ],
    switchData: [{ label: "Admin", name: "is_stuff", default: "active", required: false }],
  };
};
export const usersCreateInputs = (companiesData) => {
  return {
    inputData: [
      { label: "First Name", name: "first_name", type: "text", required: true },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email", name: "email", type: "email", required: true },
    ],
    selectData: [
      {
        name: "companyId",
        value: "id",
        option: "name",
        store: companiesData,
        lable: "Select company",
        required: true,
        mode: false,
      },
      {
        name: "status",
        value: "name",
        option: "name",
        store: [{ name: "active" }, { name: "inactive" }],
        lable: "Change status",
        required: true,
        mode: false,
      },
    ],
    passwordData: [{ label: "Password", name: "password", type: "password", required: true }],
    switchData: [{ label: "Admin", name: "is_staff", default: "active", required: false }],
  };
};
export const usersSelectors = (initialValue, companiesData) => {
  return [
    {
      param: "company",
      initialValue: initialValue,
      placeholder: "Select Company",
      actionParam: "company",
      value: "name",
      option: "name",
      // initialId={item.initial}
      lable: "Company",
      store: companiesData,
    },
  ];
};
