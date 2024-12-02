import Header from '../../Components/Header.tsx'
import Hero from '../../Components/Hero.tsx'
import Features from '../../Components/Features.tsx'
import Footer from '../../Components/Footer.tsx'

export default function Home () {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 text-white'>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
