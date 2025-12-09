import React from 'react';
import Hero from './PageComponet/Hero';
import WhoItWork from './PageComponet/WhoItWork';

const Home = () => {
    return (
        <div className='mt-10'>
            <Hero></Hero>
            <WhoItWork></WhoItWork>
        </div>
    );
};

export default Home;