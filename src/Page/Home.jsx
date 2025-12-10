import React from 'react';
import Hero from './PageComponet/Hero';
import WhoItWork from './PageComponet/WhoItWork';
import MostOldClub from './PageComponet/MostOldClub';
import Contact from './PageComponet/Contact';

const Home = () => {
    return (
        <div className='mt-10'>
            <div className="mt-10">
                <Hero></Hero>
            </div>
            <div className="mt-10">
                <MostOldClub></MostOldClub>
            </div>
            <div className="mt-10">
                <Contact></Contact>
            </div>
            <div className="">
                <WhoItWork></WhoItWork>
            </div>
        </div>
    );
};

export default Home;