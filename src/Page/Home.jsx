import React from 'react';
import Hero from './PageComponet/Hero';
import WhoItWork from './PageComponet/WhoItWork';
import MostOldClub from './PageComponet/MostOldClub';
import Contact from './PageComponet/Contact';
import ProjectAuthor from './PageComponet/ProjectAuthor';

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

                <div className="pt-10">
                    <Contact />
                </div>

                <div className="">
                    <ProjectAuthor />
                </div>
            </div>
        </div>
    );
};

export default Home;