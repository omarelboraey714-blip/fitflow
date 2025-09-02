"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { createClient } from "@supabase/supabase-js";

// إعداد Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CART_STORAGE_KEY = "fitflow-cart";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART":
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

// جلب السلة من localStorage
const getLocalCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("فشل قراءة من localStorage:", error);
    return [];
  }
};

// حفظ في localStorage
const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("فشل الحفظ في localStorage:", error);
  }
};

// جلب السلة من Supabase
const fetchCartFromSupabase = async (userId) => {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      quantity,
      products (
        id, name, price, image, slug
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("فشل جلب السلة:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.products.id,
    name: item.products.name,
    price: item.products.price,
    image: item.products.image,
    slug: item.products.slug,
    quantity: item.quantity,
  }));
};

// حفظ عنصر في Supabase
const saveItemToSupabase = async (userId, product, quantity) => {
  const { error } = await supabase.from("cart_items").upsert(
    {
      user_id: userId,
      product_id: product.id,
      quantity: quantity,
    },
    { onConflict: "user_id,product_id" }
  );
  if (error) console.error("فشل الحفظ في Supabase:", error);
};

// حذف عنصر من Supabase
const removeItemFromSupabase = async (userId, productId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) console.error("فشل الحذف من Supabase:", error);
};

// مسح السلة من Supabase
const clearCartInSupabase = async (userId) => {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);
  if (error) console.error("فشل مسح السلة:", error);
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState(null);

  // 1. تحقق من حالة تسجيل الدخول
  useEffect(() => {
    const checkUser = async () => {
      const { session } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      // استمع لتغيرات التسجيل
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          const currentUser = session?.user ?? null;
          setUser(currentUser);

          // عند التسجيل، دمج السلة
          if (event === "SIGNED_IN" && currentUser) {
            const localCart = getLocalCart();
            const serverCart = await fetchCartFromSupabase(currentUser.id);

            // دمج السلتين
            const merged = [...localCart];
            serverCart.forEach((serverItem) => {
              const exists = merged.find((item) => item.id === serverItem.id);
              if (exists) {
                exists.quantity = Math.max(
                  exists.quantity,
                  serverItem.quantity
                );
              } else {
                merged.push(serverItem);
              }
            });

            dispatch({ type: "SET_CART", payload: merged });
            saveLocalCart(merged);

            // حفظ في السيرفر
            merged.forEach((item) => {
              saveItemToSupabase(currentUser.id, item, item.quantity);
            });
          }

          // عند تسجيل الخروج، احفظ في localStorage وامسح من السيرفر
          if (event === "SIGNED_OUT") {
            saveLocalCart(state.cart);
            if (user?.id) {
              await clearCartInSupabase(user.id);
            }
          }
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    checkUser();
  }, []);

  // 2. هيكلة السلة
  useEffect(() => {
    const initializeCart = async () => {
      const localCart = getLocalCart();

      if (user) {
        const serverCart = await fetchCartFromSupabase(user.id);
        dispatch({ type: "SET_CART", payload: serverCart });
      } else {
        dispatch({ type: "SET_CART", payload: localCart });
      }

      setIsHydrated(true);
    };

    if (!isHydrated) {
      initializeCart();
    }
  }, [user, isHydrated]);

  // 3. مزامنة التحديثات مع Supabase
  useEffect(() => {
    if (!isHydrated || !user) return;
    saveLocalCart(state.cart);

    // مزامنة كل عنصر
    state.cart.forEach((item) => {
      saveItemToSupabase(user.id, item, item.quantity);
    });
  }, [state.cart, user, isHydrated]);

  // 4. وظائف السلة
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

    if (user) {
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        await saveItemToSupabase(user.id, item, quantity);
      }
    }
  };

  const removeFromCart = async (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    if (user) {
      await removeItemFromSupabase(user.id, id);
    }
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });
    if (user) {
      await clearCartInSupabase(user.id);
    }
  };

  const getTotalItems = () => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  if (!isHydrated) {
    return <div />;
  }

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        user,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
