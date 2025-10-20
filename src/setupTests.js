// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Firebase globally for all tests
vi.mock("../firebase", async () => {
    return {
        auth: {},
        db: {},
    };
});

vi.mock("firebase/auth", async () => {
    return {
        onAuthStateChanged: vi.fn(),
        signOut: vi.fn(),
    };
});

vi.mock("firebase/firestore", async () => {
    return {
        getDoc: vi.fn(),
        doc: vi.fn(),
    };
});
