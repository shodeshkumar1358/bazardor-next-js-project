"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Products } from "@/type/type";

interface ProductsContextType {
  products: Products[];
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products",
        );

        if (!res.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি");
        }

        const data: Products[] = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "একটি সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts অবশ্যই ProductsProvider-এর ভিতরে ব্যবহার করতে হবে",
    );
  }

  return context;
};
