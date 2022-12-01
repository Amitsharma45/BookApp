import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import Footer from "./Components/Footer/Footer";
import AllBooksList from "./Components/AllBooks/AllBooksList";

describe("App rendering is OK", () => {
    beforeEach(() => {
        render(<App />);
    });

    describe("Navbar rendering is OK", () => {

        it("Navbar is rendered", () => {
            expect(screen.queryAllByRole("link")[1]).toHaveTextContent("Home");
            expect(screen.queryAllByRole("link")[2]).toHaveTextContent("About");
            expect(screen.queryAllByRole("link")[3]).toHaveTextContent("Contact");
            expect(screen.queryAllByRole("link")[4]).toHaveTextContent("Log In");
            expect(screen.queryAllByRole("link")[5]).toHaveTextContent("Sign Up");
        });

        it("About page is rendered", () => {
            fireEvent.click(screen.queryAllByRole("link")[2]);
            expect(screen.queryByText("About Us")).toBeInTheDocument();
        });

        it("Contact page is rendered", () => {
            fireEvent.click(screen.queryAllByRole("link")[3]);
            expect(screen.queryByText("Contact Us")).toBeInTheDocument();
        });

        it("Login page is rendered", () => {
            fireEvent.click(screen.queryAllByRole("link")[4]);
            expect(screen.queryByText(/Create new account/i)).toBeInTheDocument();
        });

        it("Register page is rendered", () => {
            fireEvent.click(screen.queryAllByRole("link")[5]);
            expect(screen.queryByText(/already have account/i)).toBeInTheDocument();
        });

        it("Home is rendered on clicking nav link", () => {
            fireEvent.click(screen.getByRole("link", { name: "Home" }));
            expect(screen.queryByText(/Books for all/i)).toBeInTheDocument();
        });

    });

    describe("Home component rendered", () => {

        it("All sections are rendered", () => {
            let headings = ["Books For All", "Romance", "War", "Adventures", "Crime", "Fantasy", "Thrillers"]
            expect(screen.queryAllByRole("heading")).toHaveLength(7);
            for (let i = 0; i < 7; i++) {
                expect(screen.queryAllByRole("heading")[i]).toHaveTextContent(headings[i]);
            }
        });

        it("SearchBox rendered", () => {
            fireEvent.change(screen.getByPlaceholderText("Type to search..."), { target: { value: "Harry Potter" } });
            expect(screen.getByPlaceholderText("Type to search...")).toHaveValue("Harry Potter");
            expect(screen.getAllByRole("option")).toHaveLength(3);
        });

    });

    describe("AllBooksList component is rendered", () => {

        it("When no books passed", () => {
            let books = [
                "Not Found"
            ];
            render(
                <MemoryRouter initialEntries={['/romance']}>
                    <AllBooksList books={books} loading={false} />
                </MemoryRouter>
            )
            expect(screen.getByText("404")).toBeInTheDocument();
        });

        it("When loading is true", () => {
            let books = [
                "Not Found"
            ];
            render(
                <MemoryRouter initialEntries={['/romance']}>
                    <AllBooksList books={books} loading={true} />
                </MemoryRouter>
            )
            expect(screen.getAllByText(/Loading/i)[1]).toBeInTheDocument();
        });
    });

    describe("Footer rendering is OK", () => {
        it("Footer rendered", () => {
            render(<Footer />);
            expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
        });
    })

// <<<<<<< HEAD
});
// =======
// });
// >>>>>>> 3f5a49415f2b39464e9ae8b071745ed821afbe4b
