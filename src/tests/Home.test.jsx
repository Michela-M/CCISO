import React from "react";
import { render } from "@testing-library/react";
import { expect } from "vitest";
import Home from "../views/Home";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

test("renders Home component", () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>,
    );

    expect(
        screen.getByText(/Ready to test your knowledge/i),
    ).toBeInTheDocument();

    expect(
        screen.getByText(
            /Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique./i,
        ),
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", { name: /Start quiz/i }),
    ).toBeInTheDocument();
});

/*test("renders Home component when logged in as admin", () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>,
    );

    expect(
        screen.getByText(/Ready to test your knowledge/i),
    ).toBeInTheDocument();

    expect(
        screen.getByText(
            /Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tristique./i,
        ),
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", { name: /Start quiz/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Upload CSV/i })).toBeInTheDocument();
});*/
