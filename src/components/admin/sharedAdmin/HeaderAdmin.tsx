// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
// import React from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'

const HeaderAdmin = () => {
    return (
        <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200">
            <div className="relative">
                <HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-sm focus: outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 px-4"
                />
            </div>
            <div className="flex items-center gap-2 mr-2">
                <HiOutlineChatAlt fontSize={24}/>
                <HiOutlineBell fontSize={24}/>
            </div>
        </div>
    )
}

export default HeaderAdmin


//                 {/* <Popover>
//                     <PopoverButton className="block w-10 h-10 rounded-full border border-slate-900 text-sm/6 font-semibold text-slate/50 focus:outline-none data-[active]:text-slate-800 data-[hover]:text-gray-950 data-[focus]:outline-1 data-[focus]:outline-red-700">
//                         S
//                     </PopoverButton>
//                     <PopoverPanel
//                         transition
//                         anchor="bottom"
//                         className="divide-y divide-white/5 rounded-xl bg-gray/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-1)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//                     >
//                         <div className="p-3">
//                             <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
//                                 <p className="font-semibold text-black">Insights</p>
                              
//                             </a>
//                             <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
//                                 <p className="font-semibold text-black">Automations</p>
                            
//                             </a>
//                             <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
//                             <HiOutlineLogout />
//                                 <p className="font-semibold text-black">Logout</p>
                                
//                             </a>
//                         </div>
//                         <div className="p-3">
//                             <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
//                                 <p className="font-semibold text-white">Documentation</p>
                      
//                             </a>
//                         </div>
//                     </PopoverPanel>
//                 </Popover> */}
//                 {/* <button className="h-10 w-10 border border-solid border-slate-800 rounded-full">
// <p className='text-slate-800'> S</p>
//                 </button> */}