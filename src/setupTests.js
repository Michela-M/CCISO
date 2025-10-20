// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { vi } from "vitest";

// --- Mock Firebase core ---
vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(() => ({})), // fake app instance
}));

// --- Mock Firebase Auth ---
vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
}));

// --- Mock Firebase Firestore ---
vi.mock("firebase/firestore", () => ({
    getFirestore: vi.fn(() => ({})),
    getDoc: vi.fn(),
    doc: vi.fn(),
}));

// --- Mock Firebase Storage (optional, if used) ---
vi.mock("firebase/storage", () => ({
    getStorage: vi.fn(() => ({})),
    ref: vi.fn(),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
}));

// --- Mock your local firebase.js wrapper ---
vi.mock("../firebase", () => ({
    auth: {},
    db: {},
    storage: {},
}));
