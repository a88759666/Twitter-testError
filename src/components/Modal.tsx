import { CloseIcon } from "assets/images"
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'



type Props = {
    postTweetModal?: boolean
    replyTweetModal?: boolean
    onClose?: () => void
}

const Modal:React.FC<Props> = ({
    postTweetModal,
    replyTweetModal,
    onClose
}) => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    return <>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="w-[500px] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="w-full flex flex-col items-start border-solid rounded-3xl">
                                    <div className="w-full p-[24px] border-b-2 border-slate-200 cursor-pointer">
                                        <CloseIcon onClick={onClose}/>
                                    </div>
                                    {postTweetModal && (
                                        <div className="w-full flex flex-row  p-[15px] min-h-[210px] justify-start items-start">
                                            <img
                                                src="https://picsum.photos/300/300?text=1"
                                                className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mr-[10px]"
                                            />
                                            <textarea
                                                id="postTweet" 
                                                name="postTweet"
                                                cols={30}
                                                rows={10}
                                                className="py-[10px] h-[50px] appearance-none outline-none"
                                                placeholder="有什麼新鮮事?"
                                            />
                                            <button className=" bg-orange-400 rounded-3xl text-white font-[700] ml-auto self-end px-[15px] py-[10px]">
                                                推文
                                            </button>
                                        </div>
                                    )}
                                    {replyTweetModal && (
                                        <div className="w-full flex flex-col">
                                            <div className="flex flex-row px-[24px] py-[16px]">
                                                <div className='flex flex-col items-center'>
                                                    <div
                                                        className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mb-[16px]"
                                                        style={{
                                                            backgroundImage: `url(https://picsum.photos/300/300?text=2)`,
                                                            backgroundPosition: "center",
                                                            backgroundSize: "cover",
                                                        }}
                                                    />
                                                    <hr className='bg-slate-500 w-[2px] h-[86px]' />
                                                </div>
                                                <div className="flex flex-col ml-[8px]">
                                                    <div className="flex flex-row items-end mb-[6px]">
                                                        <p className="font-bold text-[16px] leading-[26px] mr-[8px]">Aplle</p>
                                                        <p className="text-gray-400 text-[14px] leading-[22px] mr-[5px] font-[400]">@apple</p>
                                                        <p className="text-gray-400 text-[14px] leading-[22px] font-[400]">3小時</p>
                                                    </div>
                                                    <text className='text-[16px] font-[400] leading-[26px] mb-[10px]'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum</text>
                                                    <text className='text-[15px] font-[500] leading-[22px] mb-[10px]'>回覆 
                                                        <span className='text-[#FF6600]'>
                                                            @george
                                                        </span>
                                                    </text>
                                                </div>
                                            </div>
                                            <div className="flex flex-row px-[24px] pb-[16px] justify-start items-start min-h-[120px]">
                                                <img
                                                    src="https://picsum.photos/300/300?text=1"
                                                    className="w-[50px] h-[50px] overflow-hidden rounded-full min-w-[50px] mr-[10px]"
                                                />
                                                <textarea
                                                    id="postTweet" 
                                                    name="postTweet"
                                                    cols={30}
                                                    rows={10}
                                                    className="py-[10px] h-[50px] appearance-none outline-none"
                                                    placeholder="推你的回覆"
                                                />
                                                <button className=" bg-orange-400 rounded-3xl text-white font-[700] ml-auto self-end px-[15px] py-[10px]">
                                                    回覆
                                                </button>
                                        </div>
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    </>
}

export default Modal