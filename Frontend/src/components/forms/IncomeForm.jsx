import { useEffect, useState } from "react";

const AddIncome = ({onAddIncome,editingIncome,onUpdateIncome}) =>{
    const [selectedCategory, setSelectedCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const res = await fetch('http://127.0.0.1:8000/api/income_categories/');
                const data = await res.json(); 
                
                setCategories(data)
            } catch(error){
                console.log("Error Fetching Categories: ", error)
            }
        };
        fetchCategories();
    },[]);

    useEffect(()=>{
        if (editingIncome){
            setSelectedCategory(editingIncome.category);
            setAmount(editingIncome.amount);
            setDate(editingIncome.date);
            setDescription(editingIncome.description || "");
        }
    },[editingIncome]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access');

        try {
            let response;

            if (editingIncome) {
                response = await fetch(
                    `http://127.0.0.1:8000/api/income/${editingIncome.id}/`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            category: selectedCategory,
                            amount,
                            date,
                            description
                        })
                    }
                );
            } else {
                response = await fetch(
                    'http://127.0.0.1:8000/api/income/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            category: selectedCategory,
                            amount,
                            date,
                            description
                        })
                    }
                );
            }

            const data = await response.json();

            if (response.ok) {

                if (editingIncome) {
                    onUpdateIncome(data);
                } else {
                    onAddIncome(data);

                    setAmount('');
                    setSelectedCategory('');
                    setDate('');
                    setDescription('');
                }

            } else {
                console.log("Error:", data);
            }

        } catch(error) {
            console.log('Error Detected: ', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <select 
                value={selectedCategory} 
                onChange={(e)=> setSelectedCategory(e.target.value)}
            >
                <option value="">Select Category</option>

                {categories.map((cat, index) => {
                    return (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    );
                })}
            </select>

            <input 
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            />

            <input 
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            />

            <input 
            type="text"
            placeholder="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />

            <button type="submit">
                {editingIncome? "Edit":"Add"}
            </button>
        </form>
    );
}

export default AddIncome;