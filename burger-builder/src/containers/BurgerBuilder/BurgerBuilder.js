import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import axios from 'axios';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'



const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                meat: 0,
                cheese: 0
            },
            
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        }
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancel = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinue = () => {
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            custumer_info: {
                name: 'Hung Pham',
                address: '33, Cau Dien street',
                city: 'Ha noi',
                country: 'Viet Nam'
            },
            deliveryMethod: 'Fast and Furious'
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false   
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
    }

    updatePurchasable = (ingredients) => {  
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const additionPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatePrice = additionPrice + oldPrice;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatePrice
        })
        this.updatePurchasable(updateIngredients);
    }

    removeIgredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }

        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updateCount;
        const deductionPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice - deductionPrice;

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatePrice
        })
        this.updatePurchasable(updateIngredients);
    }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }

        let orderSummary =  <OrderSummary 
                                    price={this.state.totalPrice}
                                    ingredients={this.state.ingredients}
                                    purchaseCancelled={this.purchaseCancel}
                                    purchaseContinued={this.purchaseContinue}/>

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancel}>
                   {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuilderControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIgredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    order={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;