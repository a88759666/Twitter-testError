import { SubmitBtn } from "components/AuthInput";
import Modal from "components/Modal";
import TweetCard, { UserImage } from "components/TweetCard";
import { useTweetContext } from "contexts/TweetContextProvider";
import { useState } from "react";

const PostTweet = () => {
  const [ show, setShow ] = useState(false)
  function handleClose() {
      setShow(false)
  }
  return <>
    <div className=" h-[140px] pl-7 mt-4 border-b-[10px] relative">
      <div className="flex">
        <UserImage avatar="https://picsum.photos/300/300?text=2" />
        <label htmlFor="postTweet" className="ml-2 pt-2">
          <textarea 
            id="postTweet" 
            name="postTweet" 
            placeholder="有什麼新鮮事" 
            cols={50} 
            className=" h-[50px] focus:outline-none "
            onDoubleClick={() => setShow(!show)}
          />
        </label>
      </div>
      <div className="w-16 absolute right-7">
        <SubmitBtn btn="推文"/>
      </div>
    </div>
    {show && (
      <Modal 
          postTweetModal={true}
          replyTweetModal={false}
          onClose={handleClose}
      />
    )}
  </>
}

const MainPage = () => {

  const {dummydata} = useTweetContext()
  const [ show, setShow ] = useState(false)
  function handleClose() {
    setShow(false)
  }
  function handleReplyModal() {
    setShow(!show)
  }

  return (
      <main className="basis-5/7 border-x ">
        <h4 className="pl-7 py-6 leading-[26px] font-bold border-b">首頁</h4>
        <PostTweet />
        <div>
          {dummydata.map(item => {
            return(
              <TweetCard 
                userName={item.userName} 
                account={item.account} 
                postTime={item.postTime}
                tweet={item.tweet}
                likeCount={item.likeCount}
                replyCount={item.replyCount}
                avatar={item.avatar}
                handleReplyModal={handleReplyModal}
              /> 
            )
          })}
        </div>
        {show && (
          <Modal 
              postTweetModal={false}
              replyTweetModal={true}
              onClose={handleClose}
          />
        )}
      </main>

  )
};

export default MainPage;
