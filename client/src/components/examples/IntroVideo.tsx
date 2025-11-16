import IntroVideo from '../IntroVideo';

export default function IntroVideoExample() {
  return <IntroVideo onComplete={() => console.log('Intro video completed')} />;
}
