import React from 'react';
import { FaBug, FaNewspaper, FaPhone } from 'react-icons/fa';
import { RiCustomerServiceFill } from "react-icons/ri";
const Contact = () => {
    return (
        <div>
             <div className=" mx-auto px-2 md:px-4">

<section className="mb-32">

    <div className="flex justify-center"
     data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="800">
        <div className="text-center md:max-w-xl lg:max-w-3xl">
            <h2 className="my-20 px-6 text-3xl font-bold uppercase text-violet-500">
                Contact us
            </h2>
        </div>
    </div>

    <div className="flex flex-wrap">

        <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6"
         data-aos="fade-down-right"
         data-aos-easing="linear"
         data-aos-duration="800">

            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-violet-500" htmlFor="exampleInput90">
                        Name
                </label>
                <input type="text" className="px-2 py-2 border w-full outline-none rounded-md" id="exampleInput90" placeholder="Name" />
            </div>

            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-violet-500" htmlFor="exampleInput90">
                        Email
                </label>
                <input type="email" className="px-2 py-2 border w-full outline-none rounded-md" id="exampleInput90"
                        placeholder="Enter your email address" />
            </div>

            <div className="mb-3 w-full">
                <label className="block font-medium mb-[2px] text-violet-500" htmlFor="exampleInput90">
                        Message
                </label>
                <textarea className="px-2 py-2 border rounded-[5px] w-full outline-none" name="" id=""></textarea>
            </div>

            <button type="button"
                    className="mb-6 inline-block w-full rounded bg-my-gradient px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md">
                    Send
            </button>

        </form>

        <div className="w-full pt-5 shrink-0 grow-0 basis-auto lg:w-7/12"
         data-aos="fade-down-left"
         data-aos-easing="linear"
         data-aos-duration="800">
            <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                    <div className="flex items-start">
                        <div className="shrink-0">
                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-violet-500">
                            <FaPhone size={25} />
                            </div>
                        </div>
                        <div className="ml-6 grow">
                            <p className="mb-2 font-bold">
                                Technical support
                            </p>
                            <p className="text-neutral-500 ">
                                support@finder.com
                            </p>
                            <p className="text-neutral-500 ">
                                +1 234-567-89
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                    <div className="flex items-start">
                        <div className="shrink-0">
                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-violet-500">
                            <RiCustomerServiceFill size={25} />
                            </div>
                        </div>
                        <div className="ml-6 grow">
                            <p className="mb-2 font-bold uppercase ">
                                Missing questions
                            </p>
                            <p className="text-neutral-500 ">
                                missing@finder.com
                            </p>
                            <p className="text-neutral-500 ">
                                +1 234-567-89
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                    <div className="align-start flex">
                        <div className="shrink-0">
                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-violet-500">
                            <FaNewspaper size={25} />
                            </div>
                        </div>
                        <div className="ml-6 grow">
                            <p className="mb-2 font-bold uppercase">Press</p>
                            <p className="text-neutral-500 ">
                                press@finder.com
                            </p>
                            <p className="text-neutral-500 ">
                                +1 234-567-89
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                    <div className="align-start flex">
                        <div className="shrink-0">
                            <div className="inline-block rounded-md bg-teal-400-100 p-4 text-violet-500">
                            <FaBug size={25} />
                            </div>
                        </div>
                        <div className="ml-6 grow">
                            <p className="mb-2 uppercase font-bold">
                                Bug report
                            </p>
                            <p className="text-neutral-500 ">
                                bugs@mealCage.com
                            </p>
                            <p className="text-neutral-500">
                                +1 234-567-89
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
</div>  
        </div>
    );
};

export default Contact;