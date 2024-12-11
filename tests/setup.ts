import '@testing-library/jest-dom/vitest';

// Mocking `scrollIntoView` to prevent TypeError during tests.
// Mocking pointer capture methods to address "target.hasPointerCapture is not a function" errors.
// Reference: https://github.com/testing-library/user-event/discussions/1087
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
