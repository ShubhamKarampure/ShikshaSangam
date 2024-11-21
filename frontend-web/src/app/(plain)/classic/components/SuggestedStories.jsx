import TinySlider from '@/components/TinySlider';
import { Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router-dom';
import post1 from '@/assets/images/post/1by1/01.jpg';
import post2 from '@/assets/images/post/1by1/02.jpg';
import post3 from '@/assets/images/post/1by1/03.jpg';
import post4 from '@/assets/images/post/1by1/04.jpg';
import post5 from '@/assets/images/post/1by1/05.jpg';
import post6 from '@/assets/images/post/1by1/06.jpg';
const SuggestedStories = () => {
  const storySliderSettings = {
    arrowKeys: true,
    gutter: 12,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    mouseDrag: true,
    controlsText: [renderToString(<FaChevronLeft size={16} />), renderToString(<FaChevronRight size={16} />)],
    autoplay: true,
    controls: true,
    edgePadding: 24,
    loop: false,
    items: 3,
    nav: false,
    responsive: {
      1: {
        items: 2
      },
      576: {
        items: 3
      },
      768: {
        items: 3
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
  const stories = [{
    name: 'Judy Nguyen',
    image: post2
  }, {
    name: 'Samuel Bishop',
    image: post3
  }, {
    name: 'Carolyn Ortiz',
    image: post4
  }, {
    name: 'Amanda Reed',
    image: post5
  }, {
    name: 'Lori Stevens',
    image: post1
  }, {
    name: 'Joan Wallace',
    image: post6
  }];
  return <div>
      <h6 className="mb-3">Suggested stories </h6>
      <div className="tiny-slider arrow-hover overflow-hidden">
        <TinySlider settings={storySliderSettings} className="ms-n4">
          {stories.map((story, idx) => <div key={idx}>
              <Card className="card-overlay-bottom border-0 position-relative h-150px" style={{
            backgroundImage: `url(${story.image})`,
            backgroundPosition: 'center left',
            backgroundSize: 'cover'
          }}>
                <div className="card-img-overlay d-flex align-items-center p-2">
                  <div className="w-100 mt-auto">
                    <Link to="" className="stretched-link text-white small">
                      {story.name}
                    </Link>
                  </div>
                </div>
              </Card>
            </div>)}
        </TinySlider>
      </div>
    </div>;
};
export default SuggestedStories;