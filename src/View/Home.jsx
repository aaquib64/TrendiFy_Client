import React from 'react';
import Coupon from "./CouponCard/Coupon";
import SlidingCard from "./SlidingCard/SlidingCard";
import LongCard from "./LongCard/LongCard";
import Category from "./Category/Category";


function Home() {
  return (
    <div>
        <Coupon/>
        <SlidingCard/>
        <LongCard/>
        <Category/>
       
    </div>
  )
}

export default Home;