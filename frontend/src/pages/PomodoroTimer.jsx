import React, { useState, useEffect, useRef } from 'react'
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Coffee,
  CheckCircle2,
  ListTodo,
  Music
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'

export const PomodoroTimer = () => {
  const {
    timerMode,
    timeLeft,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    completedPomodoros,
    subjects,
    timerSubjectId,
    setTimerSubjectId,
    user,
    assignments,
    toggleSubtask
  } = useApp()

  const [activeSound, setActiveSound] = useState('none') // 'none' | 'whitenoise' | 'rain'
  const audioCtxRef = useRef(null)
  const noiseNodeRef = useRef(null)

  // Sound generator using Web Audio API for zero external file dependencies
  const toggleSound = (soundType) => {
    if (activeSound === soundType) {
      // Turn off
      stopSound()
      setActiveSound('none')
    } else {
      stopSound()
      playSound(soundType)
      setActiveSound(soundType)
    }
  }

  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()
      audioCtxRef.current = ctx

      // Generate brown/pink ambient noise
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let lastOut = 0.0

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        // Brown noise filter
        output[i] = (lastOut + (0.02 * white)) / 1.02
        lastOut = output[i]
        output[i] *= type === 'rain' ? 3.5 : 2.0
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0.04, ctx.currentTime)

      whiteNoise.connect(gainNode)
      gainNode.connect(ctx.destination)
      whiteNoise.start()

      noiseNodeRef.current = { source: whiteNoise, ctx }
    } catch (e) {
      console.warn('Web Audio Ambient sound could not initialize:', e)
    }
  }

  const stopSound = () => {
    if (noiseNodeRef.current?.source) {
      try {
        noiseNodeRef.current.source.stop()
        noiseNodeRef.current.ctx.close()
      } catch (e) {}
      noiseNodeRef.current = null
    }
  }

  useEffect(() => {
    return () => stopSound()
  }, [])

  // Timer formatted strings
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const totalModeDuration =
    timerMode === 'work' ? 25 * 60 : timerMode === 'shortBreak' ? 5 * 60 : 15 * 60
  const progressPercent = ((totalModeDuration - timeLeft) / totalModeDuration) * 100

  // Relevant tasks for current subject
  const currentSubjectAssignments = assignments.filter(
    (a) => a.subjectId === timerSubjectId && a.status !== 'Graded'
  )

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Pomodoro Study Timer</h2>
          <p className="text-xs text-slate-500 mt-1">
            Maintain deep concentration intervals using the proven 25/5 rhythm to avoid cognitive burnout.
          </p>
        </div>

        {/* Ambient Noise Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <Music className="w-4 h-4 text-blue-600 ml-1" />
          <span className="text-xs font-semibold text-slate-600">Ambient Noise:</span>
          <button
            onClick={() => toggleSound('whitenoise')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeSound === 'whitenoise'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Soft Static
          </button>
          <button
            onClick={() => toggleSound('rain')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              activeSound === 'rain'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Gentle Rain
          </button>
          {activeSound !== 'none' && (
            <button
              onClick={stopSound}
              className="p-1 text-rose-600 hover:text-rose-800"
              title="Mute"
            >
              <VolumeX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Timer Dial Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Timer Column (7 cols) */}
        <div className="lg:col-span-7">
          <Card padding="p-8" className="text-center relative overflow-hidden flex flex-col items-center">
            {/* Mode Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mb-8">
              <button
                onClick={() => resetTimer('work')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'work'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Focus Work (25m)
              </button>
              <button
                onClick={() => resetTimer('shortBreak')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'shortBreak'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => resetTimer('longBreak')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'longBreak'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Circular Timer Visualizer */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-slate-100"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  className="stroke-blue-600 transition-all duration-500 ease-linear"
                  strokeWidth="6"
                  strokeDasharray="276.46"
                  strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl sm:text-6xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {formattedTime}
                </span>
                <span className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wider">
                  {timerMode === 'work' ? 'Deep Concentration' : 'Resting'}
                </span>
              </div>
            </div>

            {/* Subject Selector for Session */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-medium text-slate-500">Studying:</span>
              <select
                value={timerSubjectId}
                onChange={(e) => setTimerSubjectId(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} – {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => resetTimer(timerMode)}
                className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {isTimerRunning ? (
                <Button
                  size="lg"
                  variant="primary"
                  icon={Pause}
                  onClick={pauseTimer}
                  className="px-8 shadow-md shadow-blue-500/25"
                >
                  Pause
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="primary"
                  icon={Play}
                  onClick={startTimer}
                  className="px-8 shadow-md shadow-blue-500/25"
                >
                  Start Focus
                </Button>
              )}

              <button
                onClick={() => {
                  if (timerMode === 'work') resetTimer('shortBreak')
                  else resetTimer('work')
                }}
                className="p-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Skip Session"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-around text-xs text-slate-500">
              <span>
                Completed Cycles Today: <strong className="text-slate-800">{completedPomodoros}</strong> 🍅
              </span>
              <span>
                Today's Focus: <strong className="text-slate-800">{user.todayFocusMinutes} mins</strong>
              </span>
            </div>
          </Card>
        </div>

        {/* Course Tasks Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  Target Course Tasks
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {currentSubjectAssignments.length} assignments
              </span>
            </div>

            {currentSubjectAssignments.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-xs">No pending tasks for this course</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentSubjectAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-semibold text-xs text-slate-900">
                        {asg.title}
                      </h4>
                      <Badge variant="primary" size="xs">
                        {asg.status}
                      </Badge>
                    </div>

                    {asg.subtasks && asg.subtasks.length > 0 && (
                      <div className="space-y-1.5 mt-2 pt-2 border-t border-slate-200/60">
                        {asg.subtasks.map((st) => (
                          <label
                            key={st.id}
                            className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900"
                          >
                            <input
                              type="checkbox"
                              checked={st.completed}
                              onChange={() => toggleSubtask(asg.id, st.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                            />
                            <span className={st.completed ? 'line-through text-slate-400' : ''}>
                              {st.title}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PomodoroTimer
