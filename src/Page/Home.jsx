import React from 'react';
import Hero from './PageComponet/Hero';
import WhoItWork from './PageComponet/WhoItWork';
import MostOldClub from './PageComponet/MostOldClub';
import Contact from './PageComponet/Contact';
import MostChipEvent from './PageComponet/MostChipEvent';

const Home = () => {
    return (
        <div className='mt-10 bg-gray-50'>

            <div className="pb-10">
                <Hero />
            </div>

            <div className='w-10/12 mx-auto'>
                <div className="py-10">
                    <WhoItWork />
                </div>

                <div className="py-10">
                    <MostOldClub />
                </div>
                <div className="py-10">
                    <MostChipEvent />
                </div>
                <div className="pt-10">
                    <h1 className='text-center font-semibold text-5xl'>Contact Us</h1>
                </div>
                <div className="mt-4">
                    <Contact />
                </div>
                {/* <div className="pt-10">
                    <h1 className='text-center font-semibold text-5xl'>About Author</h1>
                </div> */}
                {/* <div className="mt-4">
                    <ProjectAuthor />
                </div> */}
            </div>
        </div>
    );
};

export default Home;