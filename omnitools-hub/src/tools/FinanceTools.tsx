import React, { useState, useEffect } from 'react';

export function FinanceTools({ toolId }: { toolId: number }) {
  switch (toolId) {
    case 1: return <CompoundInterest />;
    case 2: return <AutoLoan />;
    case 3: return <Mortgage />;
    case 4: return <NetSalary />;
    case 5: return <CurrencyConverter />;
    case 6: return <VATCalc />;
    case 7: return <InflationCalc />;
    case 8: return <ROICalc />;
    case 9: return <BillSplitter />;
    case 10: return <FIRECalc />;
    default: return null;
  }
}

// 1. Compound Interest
function CompoundInterest() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [contribution, setContribution] = useState(100);

  const calculate = () => {
    let total = principal;
    for (let i = 0; i < years; i++) {
      total = total * (1 + rate / 100) + contribution * 12;
    }
    return total;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Initial Principal ($)" value={principal} onChange={setPrincipal} />
        <Input label="Annual Interest Rate (%)" value={rate} onChange={setRate} />
        <Input label="Years to Grow" value={years} onChange={setYears} />
        <Input label="Monthly Contribution ($)" value={contribution} onChange={setContribution} />
      </div>
      <ResultBox title="Future Value" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// 2. Auto Loan
function AutoLoan() {
  const [price, setPrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(5000);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(4.5);

  const calculate = () => {
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / term;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Vehicle Price ($)" value={price} onChange={setPrice} />
        <Input label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
        <Input label="Loan Term (Months)" value={term} onChange={setTerm} />
        <Input label="Interest Rate (%)" value={rate} onChange={setRate} />
      </div>
      <ResultBox title="Estimated Monthly Payment" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// 3. Mortgage
function Mortgage() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [termYears, setTermYears] = useState(30);
  const [rate, setRate] = useState(6.5);

  const calculate = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = termYears * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Home Price ($)" value={homePrice} onChange={setHomePrice} />
        <Input label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
        <Input label="Loan Term (Years)" value={termYears} onChange={setTermYears} />
        <Input label="Interest Rate (%)" value={rate} onChange={setRate} />
      </div>
      <ResultBox title="Monthly Principal & Interest" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// 4. Net Salary
function NetSalary() {
  const [gross, setGross] = useState(60000);
  const [taxRate, setTaxRate] = useState(22);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Annual Gross Salary ($)" value={gross} onChange={setGross} />
        <Input label="Estimated Tax Rate (%)" value={taxRate} onChange={setTaxRate} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultBox title="Annual Take Home" value={`$${(gross * (1 - taxRate / 100)).toFixed(2)}`} />
        <ResultBox title="Monthly Take Home" value={`$${((gross * (1 - taxRate / 100)) / 12).toFixed(2)}`} />
      </div>
    </div>
  );
}

// 5. Currency Converter (Static rates for demo as per instruction to run client side without API keys)
function CurrencyConverter() {
  const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.3, AUD: 1.53, CAD: 1.36 };
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const calculate = () => {
    const usdAmount = amount / rates[from];
    return (usdAmount * rates[to]).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Amount" value={amount} onChange={setAmount} />
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-400">From</label>
          <select 
            value={from} onChange={(e) => setFrom(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-400">To</label>
          <select 
            value={to} onChange={(e) => setTo(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            {Object.keys(rates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
          </select>
        </div>
      </div>
      <ResultBox title="Converted Amount" value={`${calculate()} ${to}`} />
      <p className="text-xs text-gray-500 text-center">Note: Rates are indicative and may not be real-time.</p>
    </div>
  );
}

// 6. VAT Calc
function VATCalc() {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<'add'|'extract'>('add');

  const calculate = () => {
    if (mode === 'add') {
      const vat = amount * (rate / 100);
      return { net: amount, vat, gross: amount + vat };
    } else {
      const net = amount / (1 + rate / 100);
      const vat = amount - net;
      return { net, vat, gross: amount };
    }
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setMode('add')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'add' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Add VAT</button>
        <button onClick={() => setMode('extract')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'extract' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Extract VAT</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label={mode === 'add' ? 'Net Amount' : 'Gross Amount'} value={amount} onChange={setAmount} />
        <Input label="VAT Rate (%)" value={rate} onChange={setRate} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Net Amount</div>
          <div className="text-xl font-mono text-white">{result.net.toFixed(2)}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">VAT Amount</div>
          <div className="text-xl font-mono text-emerald-400">{result.vat.toFixed(2)}</div>
        </div>
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400">Gross Amount</div>
          <div className="text-xl font-mono text-white">{result.gross.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

// 7. Inflation Calc
function InflationCalc() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(10);

  const calculate = () => amount * Math.pow(1 + rate / 100, years);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Initial Amount ($)" value={amount} onChange={setAmount} />
        <Input label="Avg Inflation Rate (%)" value={rate} onChange={setRate} />
        <Input label="Years" value={years} onChange={setYears} />
      </div>
      <ResultBox title="Equivalent Future Cost" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// 8. ROI Calc
function ROICalc() {
  const [invested, setInvested] = useState(1000);
  const [returned, setReturned] = useState(1500);

  const roi = ((returned - invested) / invested) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Amount Invested ($)" value={invested} onChange={setInvested} />
        <Input label="Amount Returned ($)" value={returned} onChange={setReturned} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultBox title="Net Profit" value={`$${(returned - invested).toFixed(2)}`} />
        <ResultBox title="ROI (%)" value={`${roi.toFixed(2)}%`} valueColor={roi >= 0 ? "text-emerald-400" : "text-red-400"} />
      </div>
    </div>
  );
}

// 9. Bill Splitter
function BillSplitter() {
  const [total, setTotal] = useState(100);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(2);

  const calculate = () => {
    const totalWithTip = total * (1 + tip / 100);
    return totalWithTip / (people || 1);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Total Bill ($)" value={total} onChange={setTotal} />
        <Input label="Tip (%)" value={tip} onChange={setTip} />
        <Input label="Number of People" value={people} onChange={setPeople} />
      </div>
      <ResultBox title="Amount per Person" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// 10. FIRE Calculator
function FIRECalc() {
  const [expenses, setExpenses] = useState(50000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);

  const calculate = () => expenses / (withdrawalRate / 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Expected Annual Expenses ($)" value={expenses} onChange={setExpenses} />
        <Input label="Safe Withdrawal Rate (%)" value={withdrawalRate} onChange={setWithdrawalRate} />
      </div>
      <ResultBox title="Required FIRE Number" value={`$${calculate().toFixed(2)}`} />
    </div>
  );
}

// --- Helpers ---
function Input({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
      />
    </div>
  );
}

function ResultBox({ title, value, valueColor = "text-emerald-400" }: { title: string, value: string, valueColor?: string }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 flex flex-col items-center justify-center">
      <div className="text-sm font-medium text-gray-400 mb-2">{title}</div>
      <div className={`text-4xl font-bold font-mono tracking-tight ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}
