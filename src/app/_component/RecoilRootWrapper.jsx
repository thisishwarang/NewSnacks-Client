"use client";

import { RecoilRoot } from "recoil";
import React from "react";

const RecoilRootWrapper = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
export default RecoilRootWrapper;
