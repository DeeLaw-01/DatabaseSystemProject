import Hero from '../../Components/Hero.tsx'
import Features from '../../Components/Features.tsx'
import Particles from '../../Components/ui/particles.tsx'
export default function Home () {
  return (
    <div className='min-h-screen bg-gradient-to-t  from-purple-900  to-slate-900 text-white bg-gradient-size animate-gradient relative '>
      <main>
        <Hero />
        <Features />
      </main>
      <Particles className='absolute inset-0' quantity={100} ease={80} />
    </div>
  )
}
