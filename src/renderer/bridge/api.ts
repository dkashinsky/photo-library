if (typeof window.bridge === 'undefined') {
  throw new Error("Run this app in electron context");
}

export default window.bridge.api;
