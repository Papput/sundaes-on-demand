import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { pricePerItem } from '../constans'
import {formatCurrency} from '../utilities'

const OrderDetails = createContext();


// create custom hook to check wheter we're inside a provider

export const useOrderDetails = () => {
    const context = useContext(OrderDetails);

    if(!context) {
        throw new Error('useOrderDetais must be used within an OrderDetailsProvider')
    }

    return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
    let optionCount = 0;

    for( const count of optionCounts[optionType].values() ) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType]
};

export const OrderDetailsProvider = (props) => {

    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });

    const zeroCurrency = formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    })

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal),
        })
        
    }, [optionCounts])
    const value = useMemo(() => {

        const updateItemCount = (itemName, newItemCunt, optionType) => {
            const { [optionType]: optionMap } = optionCounts;

            const newOptionMap = new Map(optionMap);
            // update option count fir this item with the new value
            newOptionMap.set(itemName, parseInt(newItemCunt));

            const newOptionCounts = { ...optionCounts }
            newOptionCounts[optionType] = newOptionMap;

            setOptionCounts(newOptionCounts)
        }
        // getter: object containing option counts for scoops and toppings, subtotals and totals
        // setter: updateoOtionCounts
        return [{ ...optionCounts, totals }, updateItemCount]

    }, [optionCounts, totals])
    return <OrderDetails.Provider value={value} {...props} />
} 