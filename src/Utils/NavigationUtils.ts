import { createRef } from 'react';


export const navigationRef = createRef();

export function navigate(name) {
    navigationRef.current?.navigate(name);
  }

export function navigateWithParams(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}
