import React from 'react';
import Lottie from 'lottie-react';

/* 
  Using a direct URL for the animation. 
  In a real scenario, you can import a local JSON file.
*/
const animationUrl = "https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json";

const HeroAnimation = () => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    fetch(animationUrl)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie:", err));
  }, []);

  if (!animationData) return <div className="w-full h-full bg-transparent" />;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-full max-w-2xl"
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </div>
  );
};

export default HeroAnimation;
