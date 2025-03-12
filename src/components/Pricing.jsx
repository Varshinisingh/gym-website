import React from "react";
import { Link } from "react-router-dom";  // ✅ Fixed import
import { Link2 } from "lucide-react";
import Check from "./Check";  // ✅ Ensure this matches your Check.jsx file's export


const Pricing = () => {
    const pricing = [
        {
            imgUrl: "/pricing.jpg",
            title: "QUARTERLY",
            price: "18000",
            length: 3
        },
        {
            imgUrl: "/pricing.jpg",
            title: "HALF-YEARLY",
            price: "34000",
            length: 6
        },
        {
            imgUrl: "/pricing.jpg",
            title: "YEARLY",
            price: "67000",
            length: 12
        },
    ];

    return (
        <div>
            <section className='pricing'>
                <h1>ELITE EDGE FITNESS PLANS</h1>
                <div className="wrapper">
                    {pricing.map((element) => (
                        <div className="card" key={element.title}>
                            <img src={element.imgUrl} alt={element.title} />
                            <div className="title">
                                <h1>{element.title}</h1>
                                <h1>PACKAGE</h1>
                                <h3>Rs {element.price}</h3>
                                <p>for {element.length} months</p>
                            </div> 
                            <div className="description">
                                <p><Check /> Equipment</p>
                                <p><Check /> All day free Training</p>
                                <p><Check /> Free restroom</p>
                                <p><Check /> 24/7 Skilled support</p>
                                <p><Check /> 20 days freezing option</p>
                                <Link to={"/"}>Join Now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};    

export default Pricing;
