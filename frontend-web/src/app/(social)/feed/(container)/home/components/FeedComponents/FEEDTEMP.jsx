import { getAllFeeds } from '@/helpers/data';
import People from './People';
import PostCard from '@/components/cards/PostCard';
import LoadMoreButton from './LoadMoreButton';
import { useFetchData } from '@/hooks/useFetchData';
import Post2 from './FeedComponents/Post2';
import Post3 from './FeedComponents/Post3';
import CommonPost from './FeedComponents/CommonPost';

const Feeds = () => {
  const postData = [{
    progress: 25,
    title: 'We have cybersecurity insurance coverage'
  }, {
    progress: 15,
    title: 'Our dedicated staff will protect us'
  }, {
    progress: 10,
    title: 'We give regular training for best practices'
  }, {
    progress: 55,
    title: 'Third-party vendor protection'
  }];
  const allPosts = useFetchData(getAllFeeds);
  return <>
      {allPosts?.map((post, idx) => <PostCard {...post} key={idx} />)}

      {/* <SponsoredCard /> */}
      <Post2 />
      <People />
      {/* <CommonPost>
        <div className="vstack gap-2">
          <div>
            <input type="radio" className="btn-check" name="poll" id="option" />
            <label className="btn btn-outline-primary w-100" htmlFor="option">
              We have cybersecurity insurance coverage
            </label>
          </div>

          <div>
            <input type="radio" className="btn-check" name="poll" id="option2" />
            <label className="btn btn-outline-primary w-100" htmlFor="option2">
              Our dedicated staff will protect us
            </label>
          </div>

          <div>
            <input type="radio" className="btn-check" name="poll" id="option3" />
            <label className="btn btn-outline-primary w-100" htmlFor="option3">
              We give regular training for best practices
            </label>
          </div>

          <div>
            <input type="radio" className="btn-check" name="poll" id="option4" />
            <label className="btn btn-outline-primary w-100" htmlFor="option4">
              Third-party vendor protection
            </label>
          </div>
        </div>
      </CommonPost> */}

      {/* <CommonPost>
        <Card className="card-body mt-4">
          <div className="d-sm-flex justify-content-sm-between align-items-center">
            <span className="small">16/20 responded</span>
            <span className="small">Results not visible to participants</span>
          </div>
          <div className="vstack gap-4 gap-sm-3 mt-3">
            {postData.map((item, idx) => <div className="d-flex align-items-center justify-content-between" key={idx}>
                <div className="overflow-hidden w-100 me-3">
                  <div className="progress bg-primary bg-opacity-10 position-relative" style={{
                height: 30
              }}>
                    <div className="progress-bar bg-primary bg-opacity-25" role="progressbar" style={{
                  width: `${item.progress}%`
                }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                    <span className="position-absolute pt-1 ps-3 fs-6 fw-normal text-truncate w-100">{item.title} </span>
                  </div>
                </div>
                <div className="flex-shrink-0">{item.progress}%</div>
              </div>)}
          </div>
        </Card>
      </CommonPost> */}

      <Post3 />


      <LoadMoreButton />
    </>;
};
export default Feeds;