import React from 'react';
import styles from '@/styles/about.module.css';

const About = () => {
  return (
    <div
      className={`${styles.background} px-4 sm:px-8 md:px-16 lg:px-28 gap-6 md:gap-10 lg:gap-14 mx-auto w-[90%] text-white mt-10 md:mt-16 lg:mt-20 font-inter`}
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h3 className="font-semibold leading-relaxed tracking-wider text-xl sm:text-2xl md:text-2xl lg:text-4xl text-center">
          Sign up with NOMOMICS to get the latest and interesting comic
        </h3>

        <div className="font-extralight text-[14px] sm:text-[15px] md:text-[16px] tracking-wide text-center mt-4 md:mt-6 space-y-6">
          <section>
            <h4 className="font-medium text-lg mb-2">What&rsquo;s Nomomics?</h4>
            <p>
              Nomomics is a platform that promotes African storytelling through comics, connecting people to authentic narratives, culture, and unique collectibles.
            </p>
          </section>

          <section>
            <h4 className="font-medium text-lg mb-2">Who&rsquo;s Nomomics serving?</h4>
            <p>
              Nomomics serves anyone passionate about authentic African storytelling, including comic enthusiasts, collectors, and those seeking to connect with African culture and creativity.
            </p>
          </section>

          {/* <section>
            <h4 className="font-medium text-lg mb-2">What&rsquo;s Nomomics&rsquo; goal?</h4>
            <p>
              Our goal is to showcase and promote African storytelling, preserve cultural heritage, and connect global audiences to authentic narratives through comics and collectibles.
            </p>
          </section>

          <section>
            <h4 className="font-medium text-lg mb-2">Who are Nomomics&rsquo; target audiences?</h4>
            <p>
              Nomomics&rsquo; target audience includes comic enthusiasts, collectors, young creators, and anyone passionate about African culture, storytelling, and creativity, both locally and globally.
            </p>
          </section>

          <section>
            <h4 className="font-medium text-lg mb-2">What content goes on Instagram?</h4>
            <p>
              On Nomomics&rsquo; Instagram, we share vibrant comic art, stories rooted in African culture, sneak peeks of new projects, updates on collectibles, and behind-the-scenes moments. It&rsquo;s all about connecting authentic creators with enthusiastic comics fans.
            </p>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default About;
