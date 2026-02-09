import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Sun, Moon, Menu, X } from "lucide-react";
import logo2 from '../assets/2.svg';
import { useProductsContext } from "../context/ProductsContext";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const { totalProducts, setOpenFavProducts, setOpenShoppingCart } = useProductsContext();

    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);


    const links = [
        { label: "Products", href: "#products" },
        { label: "Contact", href: "#contacts" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-blue-600 backdrop-blur-md transition-colors dark:border-blue-800 dark:bg-blue-950/90">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <a
                    href="#"
                    className="flex items-center gap-2">
                    <img src={logo2} loading="lazy" alt="SIEG Marketplace" className="h-8 w-auto" />
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-blue-50 transition-colors hover:text-blue-200 dark:text-blue-200 dark:hover:text-blue-400"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setIsDark((prev) => !prev)}
                        className="p-2 cursor-pointer text-blue-50 hover:text-blue-200 rounded-full dark:text-blue-200 dark:hover:bg-blue-900"
                        aria-label="Switch theme"
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    <button
                        onClick={() => setOpenFavProducts(true)}
                        className="relative cursor-pointer p-2 text-blue-50 hover:text-blue-200 rounded-full dark:text-blue-200 dark:hover:bg-blue-900"
                        aria-label="Ver favoritos"
                    >
                        <Heart className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => setOpenShoppingCart(true)}
                        className="relative cursor-pointer p-2 text-blue-50 hover:text-blue-200 rounded-full dark:text-blue-200 dark:hover:bg-blue-900"
                        aria-label="Open shopping cart"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-blue-50">{totalProducts}</span>
                    </button>

                    <button
                        className="p-2 md:hidden text-blue-50 cursor-pointer dark:text-blue-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Menu principal"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-blue-600 backdrop-blur-md transition-colors dark:border-blue-800 dark:bg-blue-950/90 p-4 shadow-lg border-t border-blue-100 md:hidden dark:border-blue-900">
                    <nav className="flex flex-col gap-4">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-lg font-medium text-blue-50 dark:text-blue-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}