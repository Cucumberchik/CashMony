import { createStore } from "redux"
import { motion } from "../type";

const init = {
    cash: 10000,
    product: [
        { id: "124124", title: "Яблоко Голд", img: "https://www.a-yabloko.ru/storage/catalog/goods/.thumbs/99fa57c75e2fadc8a11ece3a8cb74abd_w800.jpg", price: "45" },
        { id: "24214", title: "Памидоры Деревенские", img: "https://www.abri-kos.ru/upload/iblock/c28/c28a8c354eac05a2b4a5c601cfd00b13.jpg", price: "50" },
        { id: "214214", title: "Огурцы", img: "https://lenta.servicecdn.ru/globalassets/1/-/16/82/10/246179_3.png?preset=fulllossywhite", price: "65" },
        { id: "122223", title: "Докторская колбаса Тойбос", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNGsgMG0zUyF71a7v5HboynXNhpY_Ge8mUQ&usqp=CAU", price: "320" },
        { id: '21', title: "Orbit", img: "https://dastarkhan24.kz/upload/iblock/a0f/a0f24cdf4eb90781813b52f830cd532b.jpg", price: "35" },
        { id: "44", title: "Сендвич", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS6FmE8XryyT32EdVmQf4IwZNglcIIv8twRA&usqp=CAU", price: "80" },
        { id: "04", title: "Масло сливочное", img: "https://marr.ru/upload/resize_cache/webp/iblock/9e2/rbxp7i49e44ax0ai9c9k0f4slp8uyz3d.webp", price: "69" },
    ],
    basket: []
};

export const reducer = (state = init, action) => {
    switch (action.type) {
        case motion.addProduct:
            return { ...state, basket: [...state.basket, action.payload] };
        case motion.addCount:
            return { ...state, basket: state.basket.map(el => el.id === action.payload ? { ...el, count: (el.count || 0) + 1 } : el) };
        case motion.clear:
            return { ...state, cash: +state.cash - action.payload, basket: [] }
        default:
            return state;
    }
};

export const store = createStore(reducer);
