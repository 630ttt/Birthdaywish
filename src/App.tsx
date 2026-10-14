import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  LockKeyhole,
  Music2,
  Pause,
  Play,
  Plus,
  Printer,
  RotateCcw,
  Star,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { birthdayContent } from './data/birthdayContent'

const chapterOrder = [
  { id: 'beginning', label: 'The Beginning' },
  { id: 'memories', label: 'Our Memories' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'letter', label: 'My Letter' },
  { id: 'funny', label: 'Our Chaos' },
  { id: 'reasons', label: 'Reasons' },
  { id: 'birthday', label: 'Your Birthday' },
  { id: 'secret', label: 'A Little Secret' },
  { id: 'secret-door', label: 'Secret Door' },
  { id: 'stars', label: 'Star Wishes' },
  { id: 'awards', label: 'Nanna Awards' },
  { id: 'open-when', label: 'Open When' },
  { id: 'treasure-hunt', label: 'Treasure Hunt' },
  { id: 'future', label: 'Our Future' },
  { id: 'bucket-list', label: 'Our Bucket List' },
  { id: 'heart-quiz', label: 'Quiz' },
  { id: 'keepsake', label: 'The Gift' },
  { id: 'finale', label: 'Forever Begins Again' },
] as const

type BucketItem = { id: string; title: string; done: boolean }

const bucketStorageKey = 'nanna-birthday-bucket-list'

function readBucketItems(): BucketItem[] {
  try {
    const stored = localStorage.getItem(bucketStorageKey)
    if (!stored) {
      return birthdayContent.bucketList.map((title, index) => ({
        id: `starter-${index}`,
        title,
        done: false,
      }))
    }

    const parsed: unknown = JSON.parse(stored)
    if (
      Array.isArray(parsed) &&
      parsed.every(
        (item): item is BucketItem =>
          typeof item === 'object' &&
          item !== null &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.done === 'boolean',
      )
    ) {
      return parsed
    }
  } catch {
    return birthdayContent.bucketList.map((title, index) => ({
      id: `starter-${index}`,
      title,
      done: false,
    }))
  }

  return birthdayContent.bucketList.map((title, index) => ({
    id: `starter-${index}`,
    title,
    done: false,
  }))
}

function App() {
  const reduceMotion = useReducedMotion()
  const [introStep, setIntroStep] = useState(0)
  const [introVisible, setIntroVisible] = useState(true)
  const [activeChapter, setActiveChapter] = useState('beginning')
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [revealedFunny, setRevealedFunny] = useState<Record<number, boolean>>({})
  const [revealedReasons, setRevealedReasons] = useState<number[]>([])
  const [showLetter, setShowLetter] = useState(false)
  const [showFullLetter, setShowFullLetter] = useState(false)
  const [candlesLit, setCandlesLit] = useState(true)
  const [wishMade, setWishMade] = useState(false)
  const [celebrationComplete, setCelebrationComplete] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [openPromises, setOpenPromises] = useState<Record<number, boolean>>({})
  const [openSurprise, setOpenSurprise] = useState<number | null>(null)
  const [openedStars, setOpenedStars] = useState<number[]>([])
  const [selectedWish, setSelectedWish] = useState<number | null>(null)
  const [revealedAwards, setRevealedAwards] = useState<number[]>([])
  const [activeOpenWhen, setActiveOpenWhen] = useState<number | null>(null)
  const [visitedOpenWhen, setVisitedOpenWhen] = useState<number[]>([])
  const [collectedClues, setCollectedClues] = useState<number[]>([])
  const [bucketItems, setBucketItems] = useState<BucketItem[]>(readBucketItems)
  const [bucketDraft, setBucketDraft] = useState('')
  const [storageAvailable, setStorageAvailable] = useState(true)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [keepsakeOpen, setKeepsakeOpen] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chapterNavRef = useRef<HTMLElement | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    element.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const chapters = document.querySelectorAll('[data-chapter]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveChapter(visibleEntry.target.getAttribute('data-chapter') ?? 'beginning')
        }
      },
      { threshold: [0.2, 0.4, 0.7], rootMargin: '-10% 0px -30% 0px' },
    )

    chapters.forEach((chapter) => observer.observe(chapter))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = chapterNavRef.current
    const activeButton = nav?.querySelector<HTMLElement>('.chapter-pill.active')
    if (!nav || !activeButton) return

    const left = activeButton.getBoundingClientRect().left - nav.getBoundingClientRect().left + nav.scrollLeft
    nav.scrollTo({
      left: left - (nav.clientWidth - activeButton.clientWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeChapter, reduceMotion])

  useEffect(() => {
    if (selectedMemory === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMemory(null)
      }

      if (event.key === 'ArrowRight') {
        setSelectedMemory((current) => {
          if (current === null) return 0
          return (current + 1) % birthdayContent.memoryPhotos.length
        })
      }

      if (event.key === 'ArrowLeft') {
        setSelectedMemory((current) => {
          if (current === null) return birthdayContent.memoryPhotos.length - 1
          return (current - 1 + birthdayContent.memoryPhotos.length) % birthdayContent.memoryPhotos.length
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMemory])

  useEffect(() => {
    if (!birthdayContent.audioPath) return

    const audio = new Audio(birthdayContent.audioPath)
    audio.loop = true
    audioRef.current = audio

    const handleError = () => {
      setAudioError(true)
      setAudioReady(false)
      setAudioPlaying(false)
    }

    const handleCanPlay = () => {
      setAudioReady(true)
      setAudioError(false)
    }

    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.pause()
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audioRef.current = null
    }
  }, [])

  const saveBucketItems = (nextItems: BucketItem[]) => {
    setBucketItems(nextItems)
    try {
      localStorage.setItem(bucketStorageKey, JSON.stringify(nextItems))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }

  const collectClue = (clueIndex: number) => {
    setCollectedClues((current) =>
      current.includes(clueIndex) ? current : [...current, clueIndex].sort((a, b) => a - b),
    )
  }

  const resetTreasureHunt = () => setCollectedClues([])

  const resetBucketList = () => {
    saveBucketItems(
      birthdayContent.bucketList.map((title, index) => ({
        id: `starter-${index}`,
        title,
        done: false,
      })),
    )
    setBucketDraft('')
  }

  const submitQuizAnswer = (answerIndex: number) => {
    if (quizFinished || selectedQuizAnswer !== null) return
    setSelectedQuizAnswer(answerIndex)
  }

  const continueQuiz = () => {
    if (selectedQuizAnswer === null) return
    const nextAnswers = [...quizAnswers, selectedQuizAnswer]
    setQuizAnswers(nextAnswers)
    setSelectedQuizAnswer(null)

    if (quizIndex === birthdayContent.relationshipQuiz.length - 1) {
      setQuizFinished(true)
      return
    }

    setQuizIndex((current) => current + 1)
  }

  const replayQuiz = () => {
    setQuizIndex(0)
    setQuizAnswers([])
    setSelectedQuizAnswer(null)
    setQuizFinished(false)
  }

  const memory = selectedMemory !== null ? birthdayContent.memoryPhotos[selectedMemory] : null
  const favouriteMemoryIndex = birthdayContent.memoryPhotos.findIndex(
    (photo) => photo.src === birthdayContent.favouriteMemoryRef,
  )

  const revealNextReason = () => {
    setRevealedReasons((current) => {
      const nextIndex = birthdayContent.reasons.findIndex((_, index) => !current.includes(index))

      if (nextIndex === -1) {
        return current
      }

      return [...current, nextIndex].sort((a, b) => a - b)
    })
  }

  const progressValue = ((chapterOrder.findIndex((chapter) => chapter.id === activeChapter) + 1) / chapterOrder.length) * 100

  const handleMusicToggle = async () => {
    const audio = audioRef.current
    if (!audio || !birthdayContent.audioPath) {
      setAudioError(true)
      return
    }

    try {
      if (audioPlaying) {
        audio.pause()
        setAudioPlaying(false)
        return
      }

      await audio.play()
      setAudioPlaying(true)
      setAudioError(false)
    } catch {
      setAudioPlaying(false)
      setAudioError(true)
    }
  }

  const resetExperience = () => {
    setIntroStep(0)
    setIntroVisible(true)
    setSelectedMemory(null)
    setRevealedFunny({})
    setRevealedReasons([])
    setShowLetter(false)
    setShowFullLetter(false)
    setCandlesLit(true)
    setWishMade(false)
    setCelebrationComplete(false)
    setSecretOpen(false)
    setOpenPromises({})
    setOpenSurprise(null)
    setOpenedStars([])
    setSelectedWish(null)
    setRevealedAwards([])
    setActiveOpenWhen(null)
    setVisitedOpenWhen([])
    setCollectedClues([])
    saveBucketItems(
      birthdayContent.bucketList.map((title, index) => ({
        id: `starter-${index}`,
        title,
        done: false,
      })),
    )
    setQuizIndex(0)
    setQuizAnswers([])
    setSelectedQuizAnswer(null)
    setQuizFinished(false)
    setKeepsakeOpen(false)
    setAudioPlaying(false)
    setAudioError(false)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const handleIntroContinue = () => {
    if (introStep < birthdayContent.introMessages.length - 1) {
      setIntroStep((current) => current + 1)
      return
    }

    setIntroVisible(false)
    scrollToSection('beginning')
  }

  const currentReasonCount = revealedReasons.length
  const allReasonsOpened = currentReasonCount === birthdayContent.reasons.length

  return (
    <MotionConfig reducedMotion="user">
    <div className="page-shell">
      <AnimatePresence>
        {introVisible && (
          <motion.div
            className="intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <motion.div
              className="intro-card"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="envelope-illustration" aria-hidden="true">
                <div className="seal-heart">♥</div>
              </div>

              <div className="intro-copy">
                <motion.p
                  key={introStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {birthdayContent.introMessages[introStep]}
                </motion.p>
              </div>

              <div className="intro-actions">
                <button type="button" className="secondary-button" onClick={() => setIntroVisible(false)}>
                  Skip intro
                </button>
                <button type="button" className="primary-button" onClick={handleIntroContinue}>
                  {introStep === birthdayContent.introMessages.length - 1 ? 'Open your surprise' : 'Continue'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chapter-progress" aria-label="Story progress">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressValue}%` }} />
        </div>
        <nav className="chapter-labels" aria-label="Birthday story chapters" ref={chapterNavRef}>
          {chapterOrder.map((chapter) => (
            <button
              key={chapter.id}
              className={`chapter-pill ${activeChapter === chapter.id ? 'active' : ''}`}
              type="button"
              aria-label={`Go to ${chapter.label}`}
              onClick={() => scrollToSection(chapter.id)}
            >
              {chapter.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="page-content">
        <section className="hero-section" id="beginning" data-chapter="beginning">
          <div className="hero-backdrop" aria-hidden="true">
            <span className="glow glow-one" />
            <span className="glow glow-two" />
            <span className="gold-dust" />
          </div>

          <div className="hero-content">
            <p className="eyebrow">For my Nanna</p>
            <h1>{birthdayContent.hero.title}</h1>
            <p className="hero-subheading">{birthdayContent.hero.subheading}</p>
            <p className="hero-supporting">{birthdayContent.hero.supportingLine}</p>

            <div className="button-row">
              <button type="button" className="primary-button" onClick={() => scrollToSection('memories')}>
                Let&apos;s relive our story <ArrowRight size={18} />
              </button>
              <button type="button" className="secondary-button" onClick={() => scrollToSection('letter')}>
                A letter from my heart
              </button>
            </div>

            <div className="scroll-cue" aria-hidden="true">
              <span />
            </div>
          </div>

          <div className="hero-visual" aria-label="Couple memory hero illustration">
            <div className="hero-photo-card">
              <img
                src={birthdayContent.favouriteMemoryRef}
                alt="A warm memory of us together"
                fetchPriority="high"
                onError={(event) => {
                  event.currentTarget.src = '/images/memories/fallback.svg'
                }}
              />
            </div>
          </div>
        </section>

        <section className="story-section memories" id="memories" data-chapter="memories">
          <div className="section-heading">
            <p className="eyebrow">Chapter One</p>
            <h2>Chapter One: The Little Moments That Became Everything</h2>
            <p>
              If someone asked me what happiness looks like, I would think of so many moments with you.
            </p>
          </div>

          <div className="memory-grid">
            {birthdayContent.memoryPhotos.map((photo, index) => (
              <button
                key={photo.caption}
                type="button"
                className={`memory-card memory-card-${index % 2 === 0 ? 'portrait' : 'landscape'}`}
                onClick={() => setSelectedMemory(index)}
                aria-label={`Open memory ${index + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = '/images/memories/fallback.svg'
                  }}
                />
                <span className="caption">{photo.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="story-section relationship-story-section" id="our-story" data-chapter="our-story">
          <div className="section-heading narrow">
            <p className="eyebrow">Our story · chapter one</p>
            <h2>{birthdayContent.ourStory.title}</h2>
            <p className="story-opening">{birthdayContent.ourStory.opening}</p>
          </div>

          <div className="relationship-timeline">
            {birthdayContent.ourStory.chapters.map((chapter, index) => (
              <motion.article
                className={`relationship-chapter ${index % 2 === 1 ? 'reverse' : ''}`}
                key={chapter.era}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55 }}
              >
                <div className="relationship-marker" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="relationship-card">
                  <div className="relationship-copy">
                    <p className="eyebrow">{chapter.era}</p>
                    <h3>{chapter.title}</h3>
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {chapter.photo && (
                    <figure className="relationship-photo">
                      <img
                        src={chapter.photo.src}
                        alt={chapter.photo.alt}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.src = '/images/memories/fallback.svg'
                        }}
                      />
                    </figure>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="relationship-forever">
            <Heart size={22} aria-hidden="true" />
            <p>Our next chapter is waiting.</p>
            <button type="button" className="primary-button" onClick={() => scrollToSection('future')}>
              Turn the page toward forever <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="story-section letter-section" id="letter" data-chapter="letter">
          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Two</p>
            <h2>Dear Nanna…</h2>
            <p>
              There are some things my heart feels every day, even when I do not find the perfect words to say them.
            </p>
          </div>

          <div className="letter-stack">
            <motion.div
              className={`letter-envelope ${showLetter ? 'opened' : ''}`}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: showLetter ? -12 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="envelope-front" />
              <div className="letter-paper">
                <div className="paper-content">
                  <p>{showFullLetter ? birthdayContent.loveLetter : 'My dearest Nanna,'}</p>
                </div>
              </div>
            </motion.div>

            <div className="letter-toolbar">
              <button type="button" className="primary-button" onClick={() => setShowLetter(true)}>
                {showLetter ? 'Read it again' : 'Open the letter'}
              </button>
              <button type="button" className="secondary-button" onClick={() => setShowFullLetter((current) => !current)}>
                {showFullLetter ? 'Hide details' : 'Show the full letter'}
              </button>
            </div>

            {showLetter && (
              <motion.article
                className={`letter-body ${showFullLetter ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p>{showFullLetter ? birthdayContent.loveLetter : birthdayContent.loveLetter.split('\n').slice(0, 6).join('\n')}</p>
              </motion.article>
            )}
          </div>
        </section>

        <section className="story-section funny-section" id="funny" data-chapter="funny">
          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Three</p>
            <h2>Chapter Three: Things Only We Would Understand 😄</h2>
            <p>
              Because our love story is romantic, but let&apos;s be honest… we can be a little ridiculous too.
            </p>
          </div>

          <div className="funny-grid">
            {birthdayContent.funnyMoments.map((moment, index) => (
              <button
                key={moment.title}
                type="button"
                className={`funny-card ${revealedFunny[index] ? 'visible' : ''}`}
                onClick={() => setRevealedFunny((current) => ({ ...current, [index]: !current[index] }))}
              >
                <span className="funny-card-title">{moment.title}</span>
                {revealedFunny[index] && <span className="funny-card-detail">{moment.detail}</span>}
              </button>
            ))}
          </div>

          <div className="button-row center-row">
            <button type="button" className="primary-button" onClick={() => setRevealedFunny((current) => ({ ...current, [birthdayContent.funnyMoments.length - 1]: true }))}>
              Should I expose another secret? 👀
            </button>
          </div>
        </section>

        <section className="story-section reasons-section" id="reasons" data-chapter="reasons">
          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Four</p>
            <h2>If I tried to count all the reasons I love you…</h2>
            <p>…we would probably be here until your next birthday.</p>
          </div>

          <div className="reasons-panel">
            <div className="reasons-counter">
              {currentReasonCount}/{birthdayContent.reasons.length}
            </div>
            <div className="reasons-list">
              {birthdayContent.reasons.map((reason, index) => (
                <motion.button
                  key={reason.title}
                  type="button"
                  className={`reason-card ${revealedReasons.includes(index) ? 'visible' : ''}`}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  onClick={() => {
                    if (!revealedReasons.includes(index)) {
                      setRevealedReasons((current) => [...current, index].sort((a, b) => a - b))
                    }
                  }}
                >
                  <span className="reason-index">0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  {revealedReasons.includes(index) ? <p>{reason.message}</p> : <p>Tap to reveal a little reason.</p>}
                </motion.button>
              ))}
            </div>
            <div className="button-row center-row">
              <button type="button" className="primary-button" onClick={revealNextReason}>
                {allReasonsOpened ? 'All the reasons are here' : 'Next little reason'}
              </button>
            </div>
          </div>
        </section>

        <section className="story-section birthday-section" id="birthday" data-chapter="birthday">
          <div className="birthday-backdrop" aria-hidden="true">
            <span className="gold-light" />
            <span className="gold-light secondary" />
          </div>

          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Five</p>
            <h2>Okay, birthday boy… this moment is yours. 🎂</h2>
            <p>Close your eyes, make a wish, and save a little happiness for yourself.</p>
          </div>

          <div className="cake-scene">
            <div className={`birthday-cake ${celebrationComplete ? 'celebrated' : ''}`}>
              <div className="cake-top" />
              <div className="cake-body" />
              <div className="cake-plate" />

              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`candle ${candlesLit ? 'lit' : 'out'}`}
                  style={{ ['--candle-delay' as string]: `${index * 110}ms` }}
                >
                  <span className="wick" />
                  <span className="flame" />
                </div>
              ))}
            </div>

            <div className="cake-actions">
              <button type="button" className="primary-button" onClick={() => setWishMade(true)}>
                Make a wish
              </button>
              <button type="button" className="secondary-button" onClick={() => {
                setCandlesLit(false)
                setCelebrationComplete(true)
              }}>
                Blow out the candles
              </button>
            </div>

            <AnimatePresence>
              {(wishMade || celebrationComplete) && (
                <motion.div
                  className="cake-message"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {wishMade && <p>Your wish is in the air.</p>}
                  {celebrationComplete && <p>{birthdayContent.birthdayWish.afterBlowOut}</p>}
                  {celebrationComplete && <p>{birthdayContent.birthdayWish.closing}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={index} style={{ ['--confetti-index' as string]: index }} />
              ))}
            </div>

            <div className="button-row center-row">
              <button type="button" className="primary-button" onClick={() => {
                setCandlesLit(true)
                setCelebrationComplete(false)
                setWishMade(false)
              }}>
                Celebrate one more time
              </button>
            </div>
          </div>
        </section>

        <section className="story-section secret-section" id="secret" data-chapter="secret">
          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Six</p>
            <h2>Nanna, I saved one more little surprise for you…</h2>
          </div>

          <div className={`secret-envelope ${secretOpen ? 'opened' : ''}`}>
            <button type="button" className="secret-button" onClick={() => setSecretOpen(true)}>
              Open your secret message 💌
            </button>
          </div>

          <AnimatePresence>
            {secretOpen && (
              <motion.div
                className="secret-letter"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Heart className="heart-burst" />
                <p>{birthdayContent.secretMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="button-row center-row">
            <button type="button" className="primary-button" onClick={() => scrollToSection('future')}>
              There&apos;s one last chapter…
            </button>
          </div>
        </section>

        <section className="story-section surprise-section" id="secret-door" data-chapter="secret-door">
          <div className="section-heading narrow">
            <p className="eyebrow">A hidden room</p>
            <h2>Four little surprises, sealed just for you.</h2>
            <p>Choose a keepsake to open. Every note can be revisited or read again.</p>
          </div>
          <div className="surprise-grid">
            {birthdayContent.secretDoor.map((note, index) => (
              <article className={`surprise-box ${openSurprise === index ? 'is-open' : ''}`} key={note.title}>
                <div className="box-lid" aria-hidden="true" />
                <LockKeyhole size={24} aria-hidden="true" />
                <h3>{note.title}</h3>
                {openSurprise === index ? (
                  <motion.div
                    className="surprise-message"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>{note.message}</p>
                    <button type="button" className="text-button" onClick={() => setOpenSurprise(null)}>
                      Close this note
                    </button>
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setOpenSurprise(index)
                      collectClue(0)
                    }}
                    aria-label={`Open surprise: ${note.title}`}
                  >
                    Open your surprise
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="story-section stars-section" id="stars" data-chapter="stars">
          <div className="section-heading narrow">
            <p className="eyebrow">A wish on every star</p>
            <h2>If the stars could talk…</h2>
            <p>Choose a star to reveal a birthday wish. Once all six are found, they gather into a little constellation for you.</p>
          </div>
          <div className={`star-sky ${openedStars.length === birthdayContent.starWishes.length ? 'constellation-formed' : ''}`}>
            <div className="moon" aria-hidden="true" />
            <div className="sky-dust" aria-hidden="true" />
            {birthdayContent.starWishes.map((wish, index) => {
              const skyPosition = [
                { left: 17, top: 24 },
                { left: 35, top: 42 },
                { left: 57, top: 23 },
                { left: 79, top: 38 },
                { left: 24, top: 69 },
                { left: 71, top: 70 },
              ][index % 6]
              const heartPosition = [
                { left: 50, top: 58 },
                { left: 39, top: 46 },
                { left: 40, top: 32 },
                { left: 50, top: 39 },
                { left: 60, top: 32 },
                { left: 61, top: 46 },
              ][index % 6]
              const position = openedStars.length === birthdayContent.starWishes.length ? heartPosition : skyPosition
              return (
                <button
                  type="button"
                  className={`wish-star ${openedStars.includes(index) ? 'revealed' : ''}`}
                  key={wish.title}
                  style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  aria-label={`${wish.title} star${openedStars.includes(index) ? ', wish revealed' : ', reveal wish'}`}
                  aria-pressed={selectedWish === index}
                  onClick={() => {
                    setOpenedStars((current) => current.includes(index) ? current : [...current, index])
                    setSelectedWish(index)
                    collectClue(1)
                  }}
                >
                  <Star size={25} fill="currentColor" aria-hidden="true" />
                  <span className="sr-only">{wish.title}</span>
                </button>
              )
            })}
          </div>
          {selectedWish !== null && (
            <motion.div
              key={selectedWish}
              className="wish-reveal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              aria-live="polite"
            >
              <strong>{birthdayContent.starWishes[selectedWish].title}</strong>
              <p>{birthdayContent.starWishes[selectedWish].wish}</p>
            </motion.div>
          )}
          <p className="sky-progress" aria-live="polite">
            {openedStars.length} of {birthdayContent.starWishes.length} wishes found
            {openedStars.length === birthdayContent.starWishes.length ? ' · Your constellation is complete.' : ''}
          </p>
        </section>

        <section className="story-section awards-section" id="awards" data-chapter="awards">
          <div className="section-heading narrow">
            <p className="eyebrow">The Nanna awards</p>
            <h2>A very exclusive ceremony. Just one guest of honour.</h2>
            <p>Take your seat for a few affectionate awards, presented with absolutely serious ceremony.</p>
          </div>
          <div className="awards-grid">
            {birthdayContent.awards.map((award, index) => {
              const isRevealed = revealedAwards.includes(index)
              return (
                <article className={`award-card ${isRevealed ? 'revealed' : ''}`} key={award.title}>
                  <div className="award-curtain left" aria-hidden="true" />
                  <div className="award-curtain right" aria-hidden="true" />
                  <div className="award-spotlight" aria-hidden="true" />
                  <Award size={29} aria-hidden="true" />
                  <span className="award-label">Award no. {String(index + 1).padStart(2, '0')}</span>
                  <h3>{award.title}</h3>
                  {isRevealed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{award.description}</motion.p>}
                  <button
                    type="button"
                    className="secondary-button"
                    aria-expanded={isRevealed}
                    onClick={() => {
                      setRevealedAwards((current) => current.includes(index) ? current : [...current, index])
                      collectClue(2)
                    }}
                  >
                    {isRevealed ? 'Award revealed' : 'Present this award'}
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section className="story-section open-when-section" id="open-when" data-chapter="open-when">
          <div className="section-heading narrow">
            <p className="eyebrow">A little love for later</p>
            <h2>Open when…</h2>
            <p>These notes are here whenever you want them. Pick one, close it, and come back to any you have already read.</p>
          </div>
          <div className="open-when-layout">
            <div className="open-when-list">
              {birthdayContent.openWhenNotes.map((note, index) => (
                <button
                  type="button"
                  className={`open-when-note ${activeOpenWhen === index ? 'active' : ''} ${visitedOpenWhen.includes(index) ? 'visited' : ''}`}
                  key={note.category}
                  aria-pressed={activeOpenWhen === index}
                  onClick={() => {
                    setActiveOpenWhen(index)
                    setVisitedOpenWhen((current) => current.includes(index) ? current : [...current, index])
                  }}
                >
                  <span aria-hidden="true">{visitedOpenWhen.includes(index) ? '✦' : '✉'}</span>
                  {note.category}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {activeOpenWhen !== null ? (
                <motion.article
                  key={activeOpenWhen}
                  className="open-when-letter"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  aria-live="polite"
                >
                  <p className="eyebrow">{birthdayContent.openWhenNotes[activeOpenWhen].category}</p>
                  <p>{birthdayContent.openWhenNotes[activeOpenWhen].message}</p>
                  <button type="button" className="text-button" onClick={() => setActiveOpenWhen(null)}>Close this letter</button>
                </motion.article>
              ) : (
                <motion.div className="open-when-empty" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Choose a sealed note to read. Your previously opened letters stay marked for this visit.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section className="story-section treasure-section" id="treasure-hunt" data-chapter="treasure-hunt">
          <div className="section-heading narrow">
            <p className="eyebrow">A tiny optional adventure</p>
            <h2>Birthday treasure hunt</h2>
            <p>Explore the surprise boxes, stargaze, and visit the awards. Collect each clue along the way—nothing is timed and every chapter is still yours to visit.</p>
          </div>
          <div className="treasure-progress" aria-label={`${collectedClues.length} of ${birthdayContent.treasureHunt.clues.length} clues collected`}>
            <div className="treasure-track"><span style={{ width: `${(collectedClues.length / birthdayContent.treasureHunt.clues.length) * 100}%` }} /></div>
            <p>{collectedClues.length} of {birthdayContent.treasureHunt.clues.length} clues collected</p>
          </div>
          <ol className="clue-list">
            {birthdayContent.treasureHunt.clues.map((clue, index) => (
              <li className={collectedClues.includes(index) ? 'collected' : ''} key={clue}>
                <span>{collectedClues.includes(index) ? <Check size={17} /> : `0${index + 1}`}</span>
                {collectedClues.includes(index) ? clue : 'A little clue is waiting in another surprise chapter.'}
              </li>
            ))}
          </ol>
          {collectedClues.length === birthdayContent.treasureHunt.clues.length && (
            <motion.p className="treasure-reward" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              {birthdayContent.treasureHunt.finalMessage}
            </motion.p>
          )}
          <div className="button-row center-row">
            <button type="button" className="secondary-button" onClick={resetTreasureHunt}><RotateCcw size={16} /> Restart the hunt</button>
          </div>
        </section>

        <section className="story-section future-section" id="future" data-chapter="future">
          <div className="section-heading narrow">
            <p className="eyebrow">Chapter Seven</p>
            <h2>The best chapters are still ahead of us.</h2>
            <p>
              There are still so many birthdays to celebrate, new places to discover, silly moments to laugh about, ordinary days to make beautiful, and memories we have not even imagined yet.
            </p>
          </div>

          <div className="promise-grid">
            {birthdayContent.futurePromises.map((promise, index) => (
              <motion.button
                key={promise.title}
                type="button"
                className={`promise-card ${openPromises[index] ? 'visible' : ''}`}
                onClick={() => setOpenPromises((current) => ({ ...current, [index]: !current[index] }))}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <span className="promise-title">{promise.title}</span>
                {openPromises[index] && <span className="promise-message">{promise.message}</span>}
              </motion.button>
            ))}
          </div>
        </section>

        <section className="story-section bucket-section" id="bucket-list" data-chapter="bucket-list">
          <div className="section-heading narrow">
            <p className="eyebrow">A list for the chapters ahead</p>
            <h2>Our future bucket list</h2>
            <p>Little hopes and experiences to look forward to, one lovely thing at a time.</p>
          </div>
          <form
            className="bucket-add-form"
            onSubmit={(event) => {
              event.preventDefault()
              const title = bucketDraft.trim()
              if (!title) return
              saveBucketItems([...bucketItems, { id: `custom-${Date.now()}`, title, done: false }])
              setBucketDraft('')
            }}
          >
            <label className="sr-only" htmlFor="bucket-item">Add a future experience</label>
            <input id="bucket-item" value={bucketDraft} onChange={(event) => setBucketDraft(event.target.value)} maxLength={100} placeholder="Add a little dream of your own…" />
            <button type="submit" className="primary-button" disabled={!bucketDraft.trim()}><Plus size={17} /> Add to our list</button>
          </form>
          <ul className="bucket-list">
            {bucketItems.map((item) => (
              <li key={item.id} className={item.done ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => saveBucketItems(bucketItems.map((entry) => entry.id === item.id ? { ...entry, done: !entry.done } : entry))}
                  />
                  <span className="bucket-check" aria-hidden="true"><Check size={15} /></span>
                  <span>{item.title}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="bucket-footer">
            <p>{storageAvailable ? 'This list is saved on this device only; it is not synced across devices.' : 'This browser could not save the list locally. It will remain available for this visit.'}</p>
            <button type="button" className="text-button" onClick={resetBucketList}>Reset the list</button>
          </div>
        </section>

        <section className="story-section quiz-section" id="heart-quiz" data-chapter="heart-quiz">
          <div className="section-heading narrow">
            <p className="eyebrow">A little game for two</p>
            <h2>How well do you know my heart?</h2>
            <p>No answer key and no wrong answers—just a few questions to make us smile.</p>
          </div>
          {!quizFinished ? (
            <motion.div className="quiz-card" key={quizIndex} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <div className="quiz-progress" aria-label={`Question ${quizIndex + 1} of ${birthdayContent.relationshipQuiz.length}`}>
                {birthdayContent.relationshipQuiz.map((_, index) => <span key={index} className={index <= quizIndex ? 'active' : ''} />)}
              </div>
              <p className="quiz-count">Question {quizIndex + 1} of {birthdayContent.relationshipQuiz.length}</p>
              <h3>{birthdayContent.relationshipQuiz[quizIndex].question}</h3>
              <div className="quiz-options">
                {birthdayContent.relationshipQuiz[quizIndex].options.map((option, index) => (
                  <button
                    type="button"
                    key={option}
                    className={`quiz-option ${selectedQuizAnswer === index ? 'selected' : ''}`}
                    aria-pressed={selectedQuizAnswer === index}
                    onClick={() => submitQuizAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {selectedQuizAnswer !== null && (
                <div className="quiz-feedback" aria-live="polite">
                  <p>{birthdayContent.relationshipQuiz[quizIndex].feedback}</p>
                  <button type="button" className="primary-button" onClick={continueQuiz}>
                    {quizIndex === birthdayContent.relationshipQuiz.length - 1 ? 'See our little result' : 'Next question'}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div className="quiz-result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Heart size={28} aria-hidden="true" />
              <p>{birthdayContent.quizFinalMessage}</p>
              <button type="button" className="secondary-button" onClick={replayQuiz}>Play again</button>
            </motion.div>
          )}
        </section>

        <section className="story-section keepsake-section" id="keepsake" data-chapter="keepsake">
          <div className="section-heading narrow">
            <p className="eyebrow">The final gift</p>
            <h2>A birthday keepsake, made for you.</h2>
            <p>A little page to keep, print, and remember this birthday by.</p>
          </div>
          <div className={`gift-reveal ${keepsakeOpen ? 'open' : ''}`}>
            <div className="gift-box-art" aria-hidden="true"><Gift size={45} /></div>
            {!keepsakeOpen ? (
              <button type="button" className="primary-button" onClick={() => setKeepsakeOpen(true)}>Open your final gift</button>
            ) : (
              <motion.article className="print-keepsake" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="keepsake-overline">A birthday keepsake · made with love</span>
                <h3>Happy Birthday, {birthdayContent.recipientName}</h3>
                <p>{birthdayContent.keepsake.message}</p>
                <p className="keepsake-signature">{birthdayContent.signature}</p>
                <button type="button" className="primary-button print-button" onClick={() => window.print()}><Printer size={17} /> Print this keepsake</button>
              </motion.article>
            )}
          </div>
        </section>

        <section className="story-section finale-section" id="finale" data-chapter="finale">
          <div className="finale-glow" aria-hidden="true" />
          <div className="section-heading narrow">
            <h2>{birthdayContent.finalMessage.title}</h2>
          </div>

          <div className="finale-copy">
            <p>{birthdayContent.finalMessage.opening}</p>
            <p>{birthdayContent.finalMessage.middle}</p>
            <p>{birthdayContent.finalMessage.paragraph}</p>
            <p>{birthdayContent.finalMessage.closing}</p>
            <p className="signature">{birthdayContent.finalMessage.signature}</p>
          </div>

          <div className="finale-photo">
            <img
              src={birthdayContent.favouriteMemoryRef}
              alt="A favourite moment with the people we love"
              loading="lazy"
              decoding="async"
              onError={(event) => {
                event.currentTarget.src = '/images/memories/fallback.svg'
              }}
            />
          </div>

          <div className="button-row center-row">
            <button type="button" className="primary-button" onClick={resetExperience}>
              Relive our story
            </button>
            <button type="button" className="secondary-button" onClick={() => setSelectedMemory(Math.max(0, favouriteMemoryIndex))}>
              Visit my favourite memory
            </button>
          </div>
        </section>
      </main>

      {birthdayContent.audioPath && (
        <div className="music-player" aria-live="polite">
          <button type="button" className="music-toggle" onClick={handleMusicToggle} aria-label={audioPlaying ? 'Pause music' : 'Play music'}>
            {audioPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <div className="music-meta">
            <span className="music-label">
              {audioError ? 'Audio unavailable' : audioReady ? (audioPlaying ? 'Playing your song' : 'Music ready when you are') : 'Loading music'}
            </span>
            {audioError && <span className="music-note">The audio could not start, but the rest of the page still works.</span>}
          </div>
          <button type="button" className="music-toggle muted" onClick={() => setAudioPlaying(false)} aria-label="Mute the music">
            {audioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      )}

      {!birthdayContent.audioPath && (
        <div className="music-placeholder">
          <Music2 size={16} />
          <span>Add a local file to public/audio/ to play a song here.</span>
        </div>
      )}

      <AnimatePresence>
        {selectedMemory !== null && memory && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              className="lightbox-panel"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="lightbox-close" aria-label="Close lightbox" onClick={() => setSelectedMemory(null)}>
                <X size={18} />
              </button>

              <div className="lightbox-image-shell">
                <button
                  type="button"
                  className="lightbox-nav prev"
                  aria-label="Previous memory"
                  onClick={() => setSelectedMemory((current) => (current === null ? 0 : (current - 1 + birthdayContent.memoryPhotos.length) % birthdayContent.memoryPhotos.length))}
                >
                  <ChevronLeft size={20} />
                </button>

                <img
                  src={memory.src}
                  alt={memory.alt}
                  onError={(event) => {
                    event.currentTarget.src = '/images/memories/fallback.svg'
                  }}
                />

                <button
                  type="button"
                  className="lightbox-nav next"
                  aria-label="Next memory"
                  onClick={() => setSelectedMemory((current) => (current === null ? 0 : (current + 1) % birthdayContent.memoryPhotos.length))}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="lightbox-caption">
                <p>{memory.caption}</p>
                {memory.date && <span>{memory.date}</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  )
}

export default App
