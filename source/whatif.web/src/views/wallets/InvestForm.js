import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useState } from 'react';

const initInvestForm = {
    pair: '',
    amount: 0,
};

export default function InvestForm() {
    const { investId } = useParams();
    const [invest, setInvest] = useState(initInvestForm);
    
    const { isLoading, data } = useQuery(['investment', investId], async () => {
        if (investId === 'new') {
            const response = await Promise.resolve({ pair: '', amount: 0 });
            return response;
        }
        const response = await Promise.resolve({ pair: 'USDTETH', amount: 4000 });
        return response;
    });

    return (
        <div>
            <h1>InvestForm</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="pair">Pair</label>
                    <input type="text" className="form-control" id="pair" placeholder="Pair" value={invest.pair} onChange={e => setInvest({ ...invest, pair: e.target.value })} />
                    </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" className="form-control" id="amount" placeholder="Amount" value={invest.amount} onChange={e => setInvest({ ...invest, amount: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}