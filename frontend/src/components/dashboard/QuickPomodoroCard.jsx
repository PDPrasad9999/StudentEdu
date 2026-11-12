import React from 'react'
import { Link } from 'react-router-dom'
import { Timer, Play, Pause, RotateCcw, ArrowUpRight } from 'lucide-react'
import Card from '../common/Card'
import Button from '../common/Button'
import { useApp } from '../../context/AppContext'

export const QuickPomodoroCard = () => {
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
    setTimerSubjectId
  } = useApp()

  const totalTime = timerMode === 'work' ? 25 * 60 : timerMode === 'shortBreak' ? 5 * 60 : 15 * 60
  const progressPercent = Math.round(((totalTime - timeLeft) / totalTime) * 100)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const currentSubject = subjects.find((s) => s.id === timerSubjectId)

  return (
    <Card className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <Timer className="w-5 h-5 text-blue-100" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Focus Timer</h3>
            <p className="text-xs text-blue-200">
              {timerMode === 'work' ? 'Deep Work Session' : 'Rest & Recharge'}
            </p>
          </div>
        </div>

        <Link
          to="/timer"
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Open Full Timer"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Timer Display */}
      <div className="text-center py-2">
        <div className="text-5xl font-extrabold tracking-tight font-mono text-white drop-shadow-sm">
          {formattedTime}
        </div>
        <p className="text-xs text-blue-200 mt-1">
          {isTimerRunning ? 'Session active – Stay focused!' : 'Ready to start concentrating?'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-1.5 my-4 overflow-hidden">
        <div
          className="bg-amber-300 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <select
          value={timerSubjectId}
          onChange={(e) => setTimerSubjectId(e.target.value)}
          className="bg-white/15 text-xs text-white border border-white/20 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-white/40 max-w-[130px] truncate"
        >
          {subjects.map((s) => (
            <option key={s.id} value={s.id} className="text-slate-800">
              {s.code}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => resetTimer(timerMode)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {isTimerRunning ? (
            <button
              onClick={pauseTimer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-colors"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              Pause
            </button>
          ) : (
            <button
              onClick={startTimer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-md hover:bg-blue-50 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Focus
            </button>
          )}
        </div>
      </div>

      {/* Cycles badge */}
      <div className="mt-3 text-center">
        <span className="text-[11px] text-blue-200 font-medium">
          Cycles completed today: <strong className="text-white">{completedPomodoros}</strong> 🍅
        </span>
      </div>
    </Card>
  )
}

export default QuickPomodoroCard
