import '@testing-library/jest-dom';

// Mock ResizeObserver for tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;