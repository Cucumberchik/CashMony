import { useDispatch, useSelector } from "react-redux"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Button from '@mui/material/Button';
import { motion } from "../type";
export default function Page() {
    let historyStorage = JSON.parse(localStorage.getItem("historyPay",)) || []
    let balans = useSelector(state => state.cash)
    let product = useSelector(state => state.product);
    let basket = useSelector(state => state.basket)
    let dispatch = useDispatch();
    const handleProduct = (el) => {
        if (!basket.some(ell => ell.id === el.id)) {
            let obj = {
                title: el.title,
                price: el.price,
                id: el.id,
                count: 1
            }
            dispatch({ type: motion.addProduct, payload: obj })
        } else {
            dispatch({ type: motion.addCount, payload: el.id })
        }
    }

    const handlePey = () => {
        const totalCost = basket.map(el => el.price * el.count)
        const total = totalCost.length > 0 ? totalCost.reduce((ac, cu) => ac + cu) : []
        let obj = {
            date: Date().split(' ').slice(3).slice(0, 2).join(' '),
            summ: total
        }
        historyStorage.push(obj)
        localStorage.setItem("historyPay", JSON.stringify(historyStorage))
        dispatch({ type: motion.clear, payload: total })
    }
    return (
        <div className="Page">
            <div className="page_conteiner">
                <div className="addProducts">
                    <center><h1>Товары</h1></center>
                    {basket.length > 0 ? basket.map((el, id) => (
                        <div key={id} className="product">
                            <h3>{el.title}</h3>
                            <p>{el.price} * {el.count}шт = {el.price * el.count} сом</p>
                        </div>
                    )) : <center><h2>У вас еще нет товаров</h2></center>}
                    {basket.length !== 0 ? <Button onClick={handlePey} variant="outlined" startIcon={<CreditScoreIcon />}> Подвердить покупку</Button> : <></>}

                </div>
                <div className="products">
                    {product && product.map((el, id) => (
                        <div key={id} className="product_item">
                            <img src={el.img} alt="product" />
                            <div className="product_item_title">
                                <h3>{el.title} <br />
                                    <span>{el.price} сом</span>
                                </h3>
                                <Button onClick={() => handleProduct(el)} variant="outlined" startIcon={<ShoppingCartIcon />}>
                                    Добавить в покупки
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="balans">
                    <h2>Ваш баланс: {balans && balans} сом</h2>
                </div>
            </div>
        </div >
    )
};
