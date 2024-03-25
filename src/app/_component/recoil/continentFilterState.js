import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
const localStorageEffect = function (key) {
  return function ({ setSelf, onSet, trigger }) {
    const loadPersisted = () => {
      const savedValue =
        typeof window !== "undefined" ? localStorage.getItem(key) : undefined;
      if (!savedValue) return;
      setSelf(JSON.parse(savedValue));
    };

    if (trigger === "get") {
      loadPersisted();
    }

    // onSet -> Subscribe to changes in the atom value.
    onSet(function (newValue, oldValue, isReset) {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
};
// const savedFilter = localStorage.getItem("current_category")
//   ? localStorage.getItem("current_category")
//   : localStorage.setItem("current_category", "전체");

export const continentFilterState = atom({
  key: "continentFilterState",
  default: "전체",
  effects_UNSTABLE: [localStorageEffect("current_continent")],
});
