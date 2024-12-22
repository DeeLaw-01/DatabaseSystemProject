import Hero from '../../Components/Hero.tsx'
import Features from '../../Components/Features.tsx'
import Particles from '../../Components/ui/particles.tsx'
import { Button } from '../../Components/ui/button.tsx'
import userAuthStore from '../../ZustandStore/AuthStore.tsx'

export default function Home () {
  const user = userAuthStore(state => state.user)
  return (
    <div className='min-h-screen bg-gradient-to-t  from-purple-900  to-slate-900 text-white bg-gradient-size animate-gradient relative '>
      <main>
        <Hero />
        <Features />
        {/* <Button
          onClick={() => {
            console.log(user)
          }}
        >
          Click for user
        </Button> */}
      </main>
      <Particles className='absolute inset-0' quantity={100} ease={80} />
    </div>
  )
}
