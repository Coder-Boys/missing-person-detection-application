import Image from 'next/image';
import React from 'react';
import kidsImage from '@/public/kids.jpg'
import { Button } from './ui/button';

const About = () => {
    return (
        <div className='my-6 mx-3'>
            <h1 className='text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] drop-shadow-2xl text-center my-5 mb-12 uppercase'>About Us</h1>

            <div className='grid lg:grid-cols-2 gap-4'>
                <div>
                <Image className='object-cover rounded-sm shadow-lg shadow-[rgb(156,39,176)]/60' alt='' src={kidsImage}/>
                </div>
                <div className='flex justify-center items-center flex-col mx-10'>
                <h1 className=' text-gray-400 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, vel consequuntur excepturi non nobis optio dolorem perferendis blanditiis eum deserunt possimus repudiandae, ea debitis magnam ducimus in eligendi mollitia suscipit corporis, magni iusto adipisci officia autem odio. Voluptate rerum tempora nisi neque, harum repudiandae iste explicabo cumque, aliquid id at ab, ipsam vel unde. Natus, quis obcaecati. Corrupti doloremque eligendi quos inventore quaerat voluptatibus nam. Sit, dolores soluta dolorum hic, aperiam sint numquam rem placeat laboriosam explicabo vel eum dicta corrupti minima ab ratione nobis dignissimos harum, mollitia fugit sequi optio rerum voluptas. Ab, vitae natus. Doloremque quas aut cumque!</h1>
                <Button className='bg-my-gradient self-start my-6'>Reads More</Button>
                
                </div>
            </div>
        </div>
    );
};

export default About;