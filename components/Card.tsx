import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

const Card = ({person}) => {
    return (
        <div>
              <div
            key={person}
            className="card bg-gray-900 w-96 rounded-xl shadow-lg my-5  shadow-[rgb(156,39,176)]/60"
          >
            <figure className="px-10 pt-10">
              <Image
                src={person.imageUrl}
                alt="Shoes"
                className="rounded-xl object-cover h-[300px] hover:scale-110 hover:duration-200 hover:ease-in-out"
                width={450}
                height={350}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="font-bold my-4">{person.name}</h2>
              <Link href={`/details/${person._id}`}><Button className="bg-my-gradient my-3">Details</Button></Link>
            </div>

          </div>
        </div>
    );
};

export default Card;