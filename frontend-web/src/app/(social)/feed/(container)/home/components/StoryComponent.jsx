import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Zuck from 'zuck.js';
import 'zuck.js/dist/zuck.css';
import 'zuck.js/dist/skins/snapgram.css';
const StoryComponent = ({
  stories
}) => {
  const storiesRef = useRef(null);
  const storiesFunc = useRef(null);
  useEffect(() => {
    if (storiesRef.current && !storiesFunc.current) {
      storiesFunc.current = new Zuck(storiesRef.current, {
        reactive: true,
        previousTap: true,
        skin: 'snapgram',
        autoFullScreen: false,
        avatars: true,
        // was true
        list: false,
        openEffect: true,
        cubeEffect: true,
        backButton: true,
        rtl: false,
        localStorage: false,
        backNative: true,
        stories: stories
      });
    }

    // return () => {
    // storiesFunc.current?.remove();
    // }
  }, [storiesRef.current]);
  return <div ref={storiesRef} className="storiesWrapper  stories-square   carousel scroll-enable stories">
      {stories.map(story => {
      return <div key={story.id} className="story " data-id={story.id} data-photo={story.photo} data-last-updated={story.time}>
            <Link className="item-link" to="">
              <span className="item-preview">
                <img loading="eager" src={story.photo} alt="post" />
              </span>
              <span className="info" itemProp="author" itemScope itemType="http://schema.org/Person">
                <strong className="name" itemProp="name">
                  {story.name}
                </strong>
                <span className="time" />
              </span>
            </Link>
            <ul className="items">
              {story.items.map(storyItem => {
            return <li key={storyItem.id} data-id={storyItem.id}>
                    <a href={storyItem.src} data-link data-linktext data-time={storyItem.time} data-type={storyItem.type} data-length={storyItem.length}>
                      <img loading="lazy" src={storyItem.preview} alt="story-item" />
                    </a>
                  </li>;
          })}
            </ul>
          </div>;
    })}
    </div>;
};
export default StoryComponent;