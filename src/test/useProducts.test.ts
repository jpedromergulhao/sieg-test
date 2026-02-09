import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useProducts } from "../hooks/useProducts";

describe("useProducts", () => {
    it("should fetch products successfully", async () => {
        const { result } = renderHook(() => useProducts());

        expect(result.current.status).toBe("loading");

        await waitFor(() => {
            expect(result.current.status).toBe("success");
        });

        expect(result.current.products.length).toBeGreaterThan(0);
    });
});