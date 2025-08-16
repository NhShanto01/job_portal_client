import React from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';
import HotBlogs from './HotBlogs';
import DemoBlogs from './DemoBlogs';

const root = () => {
    return (
        <div>
            <Banner />
            <HotJobs />
            {/* <DemoBlogs /> */}
            <HotBlogs />
        </div>
    );
};

export default root;