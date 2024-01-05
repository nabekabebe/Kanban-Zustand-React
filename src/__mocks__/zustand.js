import { act } from "react-dom/test-utils";
import { jest, beforeEach } from "@jest/globals";

const { create: actualCreate } = jest.requireActual("zustand");

const storeResetFn = new Set();

export const create = (createState) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFn.add(() => store.setState(initialState, true));
  return store;
};

beforeEach(() => {
  act(() => storeResetFn.forEach((resetFn) => resetFn()));
});
