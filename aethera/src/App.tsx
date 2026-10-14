import HeroVideo from './components/HeroVideo'

const MENU_ITEMS: Array<{ label: string; active?: boolean }> = [
  { label: 'Home', active: true },
  { label: 'Studio' },
  { label: 'About' },
  { label: 'Journal' },
  { label: 'Reach Us' },
]

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background font-body">
      {/* Background video layer (z-0) */}
      <HeroVideo />

      {/* Gradient overlay on the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Navigation bar (z-10) */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <a
          href="#"
          className="font-display text-3xl tracking-tight text-[#000000]"
        >
          Aethera<sup className="align-super text-[0.45em]">®</sup>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {MENU_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`text-sm transition-colors ${
                item.active
                  ? 'text-[#000000]'
                  : 'text-[#6F6F6F] hover:text-[#000000]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full bg-[#000000] px-6 py-2.5 text-sm text-[#FFFFFF] transition-transform duration-300 hover:scale-[1.03]"
        >
          Begin Journey
        </button>
      </nav>

      {/* Hero section (z-10) */}
      <main
        className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
        style={{ paddingTop: 'calc(8rem - 75px)' }}
      >
        <h1
          className="animate-fade-rise max-w-7xl font-display text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl"
          style={{ lineHeight: 0.95, letterSpacing: '-2.46px' }}
        >
          Beyond <em className="italic text-[#6F6F6F]">silence,</em> we build{' '}
          <em className="italic text-[#6F6F6F]">the eternal.</em>
        </h1>

        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
          Building platforms for brilliant minds, fearless makers, and
          thoughtful souls. Through the noise, we craft digital havens for deep
          work and pure flows.
        </p>

        <button
          type="button"
          className="animate-fade-rise-delay-2 mt-12 rounded-full bg-[#000000] px-14 py-5 text-base text-[#FFFFFF] transition-transform duration-300 hover:scale-[1.03]"
        >
          Begin Journey
        </button>
      </main>
    </div>
  )
}

export default App
