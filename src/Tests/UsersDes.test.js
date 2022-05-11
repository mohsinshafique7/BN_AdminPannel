import UserDesc from "../components/Description/UserDesc";
import { Route } from "react-router-dom";
import {
  useGetSingleUser,
  useGetAllUsers,
  useDeleteUsers,
  useResetUserPassword,
  useUpdateUsers,
  useGetUserHistory,
} from "../Requests/UsersRequest";
import { useGetAllCompanies } from "../Requests/CompanyRequest";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

jest.mock("../Requests/UsersRequest", () => ({
  useGetSingleUser: jest.fn(),
  useGetAllUsers: jest.fn(),
  useDeleteUsers: jest.fn(),
  useResetUserPassword: jest.fn(),
  useUpdateUsers: jest.fn(),
  useGetUserHistory: jest.fn(),
}));

jest.mock("../Requests/CompanyRequest", () => ({
  useGetAllCompanies: jest.fn(),
}));

describe("Update User", () => {
  beforeEach(() => {
    useGetSingleUser.mockImplementation(() => ({}));
    useGetAllUsers.mockImplementation(() => ({}));
    useGetAllCompanies.mockImplementation(() => ({}));
    useDeleteUsers.mockImplementation(() => ({}));
    useResetUserPassword.mockImplementation(() => ({}));
    useUpdateUsers.mockImplementation(() => ({}));
    useGetUserHistory.mockImplementation(() => ({}));
  });

  it("fetches the book data for the given id", () => {
    const { debug, getByTestId } = renderWithRouter(
      () => (
        <Provider store={store}>
          <Route path="/:id">
            <UserDesc />
          </Route>
        </Provider>
      ),
      "/id"
    );
    expect(useGetSingleUser).toHaveBeenCalledWith("id");
    expect(useGetAllUsers).toBeCalled();
    expect(useGetAllCompanies).toBeCalled();
    expect(getByTestId("pageTitle"));
  });

  describe("while Loading", () => {
    it("render Loader", () => {
      useGetSingleUser.mockImplementation(() => ({
        isLoading: true,
      }));
      useGetAllUsers.mockImplementation(() => ({
        isLoading: true,
      }));
      useGetAllCompanies.mockImplementation(() => ({
        isLoading: true,
      }));
      const { getByTestId } = renderWithRouter(
        () => (
          <Provider store={store}>
            <Route path="/:id">
              <UserDesc />
            </Route>
          </Provider>
        ),
        "/test-book-id"
      );
      expect(getByTestId("loaders")).toBeTruthy();
    });
  });
  describe("With Error", () => {
    it.todo("render and Error Message");
  });
  describe("with Data", () => {
    it("render the update User title and form", () => {
      useGetSingleUser.mockImplementation(() => ({
        isLoading: false,
      }));
      useGetAllUsers.mockImplementation(() => ({
        isLoading: false,
      }));
      useGetAllCompanies.mockImplementation(() => ({
        isLoading: false,
      }));
      const { debug, getByText, getByRole } = renderWithRouter(
        () => (
          <Provider store={store}>
            <Route path="/:id">
              <UserDesc />
            </Route>
          </Provider>
        ),
        "/test-book-id"
      );
      expect(getByText(/Created At:/i)).toBeTruthy();
      expect(getByText(/Updated At:/i)).toBeTruthy();
      expect(getByText(/First name:/i)).toBeTruthy();
      expect(getByText(/Last name:/i)).toBeTruthy();
      expect(getByText(/Email:/i)).toBeTruthy();
      expect(getByText(/Status:/i)).toBeTruthy();
      expect(getByText(/Company:/i)).toBeTruthy();
      expect(getByText(/Admin:/i)).toBeTruthy();
      expect(getByRole("button", { name: "Delete" })).toBeTruthy();
      expect(getByRole("button", { name: "Edit User" })).toBeTruthy();
      expect(getByRole("button", { name: "Reset Password" })).toBeTruthy();
    });
    describe("On Delete User", () => {
      it.todo("Delete  User and navaigate to root");
    });
    describe("On Edit User", () => {
      it.todo("Edit  User");
    });
    describe("On Reset User Password", () => {
      it.todo("Reset User Password");
    });
  });
});
