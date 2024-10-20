import { cn } from "@/lib/utils";

import React from 'react'

interface TimeLineProps{
  items: 
}
const Timeline = () => {
  return (
    <div>
      
    </div>
  )
}

export default Timeline

// const Timeline =
//   () =>
//   ({
//     items,
//     className,
//   }: {
//     items: {
//       title: string;
//       description: string;
//       icon?: React.ReactNode;
//     }[];
//     className?: string;
//   }) => {
//     return (
//       <div className={cn("space-y-8", className)}>
//         {items.map((item, index) => (
//           <div key={index} className="relative">
//             {index !== items.length - 1 && (
//               <div
//                 className="absolute mt-3 left-3 top-3 h-full w-0.5 bg-gray-200 dark:bg-gray-800"
//                 aria-hidden="true"
//               ></div>
//             )}
//             <div className="relative flex items-start space-x-3">
//               <div className="relative px-1">
//                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white ring-8 ring-white dark:ring-gray-900">
//                   {item.icon || (
//                     <span className="h-3 w-3 rounded-full bg-primary" />
//                   )}
//                 </div>
//               </div>
//               <div className="min-w-0 flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                   {item.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                   {item.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

export default Timeline;
